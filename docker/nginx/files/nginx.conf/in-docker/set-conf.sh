#!/bin/sh

# скрипт выполняется в докер-контейнере.

# обновляем nginx.conf:
cat < /etc/nginx.conf/file > /etc/nginx/nginx.conf

# перезапускаем nginx:
nginx -s reload
