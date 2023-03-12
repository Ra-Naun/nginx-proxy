#!/bin/bash
# запускаем скрипт: ./service-down.sh --help

# example: ./service-down.sh -m dev

MODE="" # переменная для хранения режима запуска: dev | test | prod

function show_usage (){
  printf "Usage: $0 [options [parameters]]\n"
  printf "\n"
  printf "Options (* - required):\n"
  printf "* -m - down docker-compose filename with mode: dev | test | prod \n"
  printf " -h|--help, Print help\n"
  return 0
}

# exit if no arguments
if [ "$#" == "0" ]; then
  printf "Argument -m is required \n"
  show_usage
  exit 1;
fi


while [ ! -z "$1" ]; do
  case "$1" in
     -m)
        shift
        MODE="$1"
        ;;
     *)
        printf "Invalid Argument $1 \n"
        show_usage
        exit 1;
        ;;
  esac
shift
done

# exit if was not found required arguments
if [ -z "$MODE" ]; then
  printf "Argument -m is required \n"
  show_usage
  exit 1;
fi

NGINX_PATH="-f ./docker-compose/nginx.$MODE.yml"
printf "NGINX_PATH: $NGINX_PATH \n"

# echo "Down Existing containers"
docker compose $NGINX_PATH down
