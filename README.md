## Запуск проекта

В проекте есть два скрипта: `service-up.sh` и `service-down.sh` для управления контейнерами

### DEV UP EXAMPLE:

`./service-up.sh -m dev`

### DEV DOWN EXAMPLE:

`./service-down.sh -m dev`

### TEST UP EXAMPLE:

`./service-up.sh -m test`

### TEST DOWN EXAMPLE:

`./service-down.sh -m test`

## Создание самоподписного сертификата

Eсли еще не созданы файлы `generate-certs/rootCA.pem` и `rootCA.key` - запустить `generate-certs/create_root_cert_and_key.sh`

Перейти в дирректорию: `cd generate-certs`
Запустить `./create_certificate_for_domain.sh www.nebons007.comdev www.nebons007.comdev` или для тестового сервера `./create_certificate_for_domain.sh www.nebons007.comtest www.nebons007.comtest`
