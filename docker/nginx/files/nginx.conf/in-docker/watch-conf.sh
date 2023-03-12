#!/bin/sh

# Отслеживаем закрытие файла после записи
# Получаем вывод в нужном нам формате
inotifywait -e modify --format '%w %f' -m /etc/nginx.conf/file | \
(
    while read dir events file; do
        echo "Changed $events $dir$file"
        /etc/nginx/set-conf.sh
    done
)
