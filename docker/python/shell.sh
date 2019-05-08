#!/bin/sh

set -e

_name=python

docker build docker/python -t $_name

exec docker run --rm -it --name $_name \
  -v "${PWD}:/app" -w /app \
  -v "${PWD}/.data/root/.cache/pip:/root/.cache/pip" \
  -v "${PWD}/.data/root/.local/lib/python3.7/site-packages:/root/.local/lib/python3.7/site-packages" \
  $_name sh
