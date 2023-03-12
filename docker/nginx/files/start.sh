#!/bin/sh

# /etc/nginx/update-env-vars.sh
/etc/nginx/set-ip.sh
/etc/nginx/watch-ip.sh & /etc/nginx/watch-conf.sh & nginx
