#!/bin/sh

# скрипт выполняется на хосте.

ATTEMPTS_10s=100;
ATTEMPTS_60s=100;

while true;
do
    if [ $ATTEMPTS_10s -gt 0 ]; then
        sleep 10;
        ATTEMPTS_10s=$((ATTEMPTS_10s-1))
    elif [ $ATTEMPTS_60s -gt 0 ]; then
        sleep 60;
        ATTEMPTS_60s=$((ATTEMPTS_60s-1))
    else sleep 600;
    fi

    ./docker/nginx/files/dockerhost/in-host/get-ip.sh; 
done;
