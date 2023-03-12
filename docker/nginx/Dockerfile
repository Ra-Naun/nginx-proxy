FROM node:16.14-alpine

# NGINX START
ENV NGINX_VERSION=1.22.0

ENV BUILD_DEPS="gettext"  \
    RUNTIME_DEPS="libintl"

RUN set -x && \
    apk add --update $RUNTIME_DEPS && \
    apk add --virtual build_deps $BUILD_DEPS &&  \
    cp /usr/bin/envsubst /usr/local/bin/envsubst && \
    apk del build_deps

RUN \
  build_pkgs="build-base linux-headers openssl-dev pcre-dev wget zlib-dev" && \
  runtime_pkgs="ca-certificates openssl pcre zlib tzdata git" && \
  apk --no-cache add ${build_pkgs} ${runtime_pkgs} && \
  cd /tmp && \
  wget https://nginx.org/download/nginx-${NGINX_VERSION}.tar.gz && \
  tar xzf nginx-${NGINX_VERSION}.tar.gz && \
  cd /tmp/nginx-${NGINX_VERSION} && \
  ./configure \
    --prefix=/etc/nginx \
    --sbin-path=/usr/sbin/nginx \
    --conf-path=/etc/nginx/nginx.conf \
    --error-log-path=/var/log/nginx/error.log \
    --http-log-path=/var/log/nginx/access.log \
    --pid-path=/var/run/nginx.pid \
    --lock-path=/var/run/nginx.lock \
    --http-client-body-temp-path=/var/cache/nginx/client_temp \
    --http-proxy-temp-path=/var/cache/nginx/proxy_temp \
    --http-fastcgi-temp-path=/var/cache/nginx/fastcgi_temp \
    --http-uwsgi-temp-path=/var/cache/nginx/uwsgi_temp \
    --http-scgi-temp-path=/var/cache/nginx/scgi_temp \
    --user=nginx \
    --group=nginx \
    --with-http_ssl_module \
    --with-http_realip_module \
    --with-http_addition_module \
    --with-http_sub_module \
    --with-http_dav_module \
    --with-http_flv_module \
    --with-http_mp4_module \
    --with-http_gunzip_module \
    --with-http_gzip_static_module \
    --with-http_random_index_module \
    --with-http_secure_link_module \
    --with-http_stub_status_module \
    --with-http_auth_request_module \
    --with-mail \
    --with-mail_ssl_module \
    --with-file-aio \
    --with-threads \
    --with-stream \
    --with-stream_ssl_module \
    --with-stream_realip_module \
    --with-http_slice_module \
    --with-http_v2_module && \
  make && \
  make install && \
  sed -i -e 's/#access_log  logs\/access.log  main;/access_log \/dev\/stdout;/' -e 's/#error_log  logs\/error.log  notice;/error_log stderr notice;/' /etc/nginx/nginx.conf && \
  addgroup -S nginx && \
  adduser -D -S -h /var/cache/nginx -s /sbin/nologin -G nginx nginx && \
  rm -rf /tmp/* && \
  apk del ${build_pkgs} && \
  rm -rf /var/cache/apk/*

RUN apk add inotify-tools

COPY ./docker/nginx/files/html/index.html ./docker/nginx/files/html/favicon.ico /etc/nginx/html/
COPY ./docker/nginx/files/nginx.default.conf /etc/nginx/nginx.conf
COPY ./docker/nginx/files/certs/ /etc/nginx/certs/
COPY ./docker/nginx/files/update-env-vars.sh ./docker/nginx/files/start.sh  /etc/nginx/
COPY ./docker/nginx/files/dockerhost/in-docker/set-ip.sh ./docker/nginx/files/dockerhost/in-docker/watch-ip.sh /etc/nginx/
COPY ./docker/nginx/files/nginx.conf/in-docker/set-conf.sh ./docker/nginx/files/nginx.conf/in-docker/watch-conf.sh /etc/nginx/

RUN ["chmod", "+x", "/etc/nginx/start.sh", "/etc/nginx/update-env-vars.sh", "/etc/nginx/set-ip.sh", "/etc/nginx/watch-ip.sh", "/etc/nginx/set-conf.sh", "/etc/nginx/watch-conf.sh"]

VOLUME ["/var/cache/nginx"]

EXPOSE 80 443

CMD ["sh", "-c", "/etc/nginx/start.sh"]

# NGINX END

# FROM base as dev
# WORKDIR /app

# RUN yarn install

# HEALTHCHECK --interval=10s --timeout=5s --start-period=15s --retries=20 \
#   CMD node ./healthcheck.js

# CMD ["sh", "-c", "/etc/nginx/start.sh & yarn dev"]

# FROM base as test
# WORKDIR /app

# COPY ./app/package.json ./app/yarn.lock /app/

# COPY ./app /app

# RUN rm -rf ./.next ./node_modules

# RUN yarn install

# HEALTHCHECK --interval=10s --timeout=5s --start-period=15s --retries=300 \
#     CMD node ./healthcheck.js

# CMD ["sh", "-c", "/etc/nginx/start.sh & yarn build && yarn start"]
