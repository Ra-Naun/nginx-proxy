#!/bin/sh

# скрипт выполняется в докер-контейнере.

# сохраняем хосты в буферный файл, очищая от старой записи хоста dockerhost:
cat < /etc/hosts | grep -v ".*dockerhost" > /etc/hosts-clear

# добавляем новую запись хоста dockerhost в буферный файл:
cat < /etc/docker-host/file >> /etc/hosts-clear

# переносим данные из буферного файла:
cat < /etc/hosts-clear > /etc/hosts

#  удаляем буферный файл:
rm -rf /etc/hosts-clear
