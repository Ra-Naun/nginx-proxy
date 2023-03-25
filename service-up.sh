#!/bin/bash
# нам нужна утилита ifconfig из набора net-tools, для этого ставим net-tools:
# sudo apt install net-tools

# запускаем скрипт: ./service-up.sh --help

# example: ./service-up.sh -m dev -d
# example: ./service-up.sh -m dev -l

MODE="" # переменная для хранения режима запуска: dev | test | prod
D="" # запускаем docker compose up с флагом -d или без
IS_LOGS=false # logs -f вместо up (взаимоисключающая с "-d")

function show_usage (){
  printf "Usage: $0 [options [parameters]]\n"
  printf "\n"
  printf "Options (* - required):\n"
  printf "* -m - run docker-compose filename with mode: dev | test | prod \n"
  printf " -d - docker compose up -d. Must be in the last position\n"
  printf " -l - docker compose logs -f. Must be in the last position\n"
  printf " -h|--help, Print help\n"

  return 0
}

# exit if no arguments
if [ "$#" == "0" ]; then
  printf "Arguments -s, -m required \n"
  show_usage
  exit 1;
fi

while [ ! -z "$1" ]; do
  case "$1" in
     -m)
        shift
        MODE="$1"
        ;;
     -d)
        shift
        if [ "$#" != "0" ]; then
          printf "Arguments -d must be in the last position \n"
          show_usage
          exit 1;
        fi
        D="-d"
        ;;
     -l)
        shift
        if [ "$#" != "0" ]; then
          printf "Arguments -l must be in the last position \n"
          show_usage
          exit 1;
        fi
        IS_LOGS=true
        ;;
     *)
        printf "Invalid Argument $1 \n"
        show_usage
        exit 1;
        ;;
  esac
shift
done

if [ -z "$MODE" ]; then
  echo "Argument -m is required \n"
  show_usage
  exit 1;
fi

NGINX_PATH="-f ./docker-compose.$MODE.yml"

if [ $IS_LOGS == true ];
then
  echo "Logs containers"
  docker compose $NGINX_PATH logs -f
else
  # сохраняем IP хоста, чтоб запустился nginx
  ./docker/nginx/files/dockerhost/in-host/get-ip.sh
  flock -n /tmp/flock-watch-ip.lock -c ./docker/nginx/files/dockerhost/in-host/watch-ip.sh &

  echo "Down Existing containers"
  docker compose $NGINX_PATH down;

  echo "Start Build"
  docker compose $NGINX_PATH build;

  echo "Run new containers"
  docker compose $NGINX_PATH up $D;

  echo "Clear"
  docker system prune -f --volumes

  if [ ! -z "$D" ]; then
    # обновляем IP хоста, после запуска контейнера IP зачастую сдвигается
    ./docker/nginx/files/dockerhost/in-host/get-ip.sh
  fi
fi
