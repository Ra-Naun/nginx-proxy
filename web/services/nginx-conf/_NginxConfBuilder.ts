import fs from 'fs/promises';
import path from 'path';

import { Site } from '@app/store/siteStore/types';

class _NginxConfBuilder {
  private getNginxConfig = (sites: Site[]) => {
    type GetServer = (params: {
      domain: string;
      port: number;
      ip?: string;
      isExternal: boolean;
    }) => string;

    const getServer: GetServer = ({ domain, port, ip, isExternal }) => `
  
  
    server {
    listen 443 ssl${/.*nginx.proxy.*/.test(domain) ? ' default_server' : ''};
      server_name www.${domain};
  
      ssl_certificate     /etc/nginx/certs/www.${domain}.crt;
      ssl_certificate_key /etc/nginx/certs/server.key;
  
      location / {
        add_header Cache-Control "no-cache, no-store, must-revalidate" always;
        proxy_set_header   X-Real-IP            $remote_addr;
        proxy_set_header   X-Forwarded-For  $proxy_add_x_forwarded_for;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_pass http://${isExternal ? ip : 'dockerhost'}:${port};
        proxy_read_timeout 15s;
      }
  
      location = /basic_status {
          stub_status;
      }
    }
  
    server {
      listen 443 ssl;
      server_name ${domain};
  
      ssl_certificate     /etc/nginx/certs/www.${domain}.crt;
      ssl_certificate_key /etc/nginx/certs/server.key;
  
      return 301 https://www.${domain}$request_uri;
    }
  
    server {
      listen 80${/.*nginx.proxy.*/.test(domain) ? ' default_server' : ''};
      server_name ${domain} www.${domain};
  
      return 301 https://www.$host$request_uri;
    }
    \n`;

    const servers = sites.map((site) => getServer(site.dns)).join('');

    return `
  daemon off;
  user nginx;
  worker_processes  auto;
  pid /run/nginx.pid;
  
  #error_log  logs/error.log;
  error_log stderr notice;
  #error_log  logs/error.log  info;
  
  #pid        logs/nginx.pid;
  
  events {
    worker_connections  1024;
    multi_accept on;
  }
  
  
  http {
    include       mime.types;
    default_type  application/octet-stream;
  
    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"'
                      'rt=$request_time uct="$upstream_connect_time" uht="$upstream_header_time" urt="$upstream_response_time"';
  
    error_log /var/log/nginx/error.log;
  
    access_log /dev/stdout main;
    access_log /var/log/nginx/access.log main;
  
    sendfile on;
    tcp_nopush on;
    tcp_nodelay on;
    keepalive_timeout 65;
    types_hash_max_size 2048;
  
    gzip on;
  
    ${servers}
  
  }
    `;
  };

  private NGINX_CONF_PATH = '/etc/nginx.conf/file';

  private saveNginxConfFile = (newConf: string) =>
    fs.writeFile(this.NGINX_CONF_PATH, newConf, 'utf8');

  private readNginxConfFile = () => fs.readFile(path.join(this.NGINX_CONF_PATH), 'utf8');

  private prevNginxConf = '';

  sync = async (sites: Site[]) => {
    const nginxConf = this.getNginxConfig(sites);

    if (this.prevNginxConf !== nginxConf) {
      this.saveNginxConfFile(nginxConf);
      this.prevNginxConf = nginxConf;
    }
  };
}

const _nginxConfBuilder = new _NginxConfBuilder();

export default _nginxConfBuilder;
