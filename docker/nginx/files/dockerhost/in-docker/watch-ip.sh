#!/bin/sh

# Отслеживаем закрытие файла после записи
# Получаем вывод в нужном нам формате
inotifywait -e modify --format '%w %f' -m /etc/docker-host/file | \
(
    while read dir events file; do
        echo "Changed $events $dir$file"
        /etc/nginx/set-ip.sh
    done
)
