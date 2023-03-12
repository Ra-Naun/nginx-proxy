#!/bin/sh

export PORT="${PORT:-3000}"
export DOMAIN="${DOMAIN:-nebons007.comdev}"

envsubst '${PORT},${DOMAIN}' < /etc/nginx/nginx.prebuild.conf > /etc/nginx/nginx.conf
