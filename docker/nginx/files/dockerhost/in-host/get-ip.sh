#!/bin/sh

# скрипт выполняется на хосте.
echo "скрипт get-ip.sh";
DOCKERHOST_DIR_PATH="docker/nginx/files/dockerhost/file/"
DOCKERHOST_FILE_PATH=$DOCKERHOST_DIR_PATH"file"

mkdir -p $DOCKERHOST_DIR_PATH
touch $DOCKERHOST_FILE_PATH

# обновляем IP хоста:
OLD_DOCKERHOST=$(cat $DOCKERHOST_FILE_PATH);
NEW_DOCKERHOST=$(ifconfig | grep -E "([0-9]{1,3}\.){3}[0-9]{1,3}" | grep -v 0.0.0.0 | awk '{ print $2"	dockerhost" }' | cut -f2 -d: | head  -n1);

if [ "${OLD_DOCKERHOST}" != "${NEW_DOCKERHOST}" ]; 
then
    echo "${NEW_DOCKERHOST}" > $DOCKERHOST_FILE_PATH;
fi
