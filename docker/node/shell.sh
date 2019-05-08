#!/bin/sh

set -e

_name=node

docker build docker/node -t $_name

exec docker run --rm -it --name $_name \
  -v "${PWD}:/app" -w /app \
  -v "${PWD}/.data/root/.cache:/root/.cache" \
  -v "${PWD}/.data/root/.npm:/root/.npm" \
  $_name sh
