#!/bin/sh

# скрипт выполняется на хосте.

ATTEMPTS_5s=1000;
ATTEMPTS_10s=1000;
ATTEMPTS_30s=1000;

while true;
do
    if [ $ATTEMPTS_5s -gt 0 ]; then
        sleep 5;
        ATTEMPTS_5s=$((ATTEMPTS_5s-1))
    elif [ $ATTEMPTS_10s -gt 0 ]; then
        sleep 10;
        ATTEMPTS_10s=$((ATTEMPTS_10s-1))
    elif [ $ATTEMPTS_30s -gt 0 ]; then
        sleep 30;
        ATTEMPTS_30s=$((ATTEMPTS_30s-1))
    else break;
    fi

    ./docker/nginx/files/dockerhost/in-host/get-ip.sh; 
done;
