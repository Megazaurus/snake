#!/bin/bash

# Перевірка наявності аргументів
if [ $# -eq 0 ]; then
  echo "Usage: $0 <command>"
  exit 1
fi

# Команда, яку будемо виконувати в docker-compose exec php
command_to_execute="$@"


docker compose exec backend $command_to_execute

