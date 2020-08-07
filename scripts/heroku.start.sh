#!/bin/sh -e

(
  PROJECT_ROOT="$(cd $(dirname $0)/..; pwd)"

  cd $PROJECT_ROOT

  if [ "$BUILD_ENV" = "app" ]; then
    node webapp.server.js
  elif [ "$BUILD_ENV" = "api" ]; then
    cd dist/apps/api
    node main.js
  else
    echo "ERROR: No run config for BUILD_ENV value '$BUILD_ENV'"
    exit 1
  fi
)