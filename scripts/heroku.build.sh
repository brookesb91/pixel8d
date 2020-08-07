#!/bin/sh -e

usage(){
  echo "Building apps according to BULD_ENV value"
  exit
}

if [ "$1" = '-h' ] || [ "$1" = '--help' ]; then
  usage
fi

(
  PROJECT_ROOT="$(cd $(dirname $0)/..; pwd)"

  cd $PROJECT_ROOT

  case "$BUILD_ENV" in

    "app")
      ng build --project=lyfe --prod
      ;;

    "api")
      nx build --project=api --prod
      ;;

    *)
      echo "ERROR: No build config for BUILD_ENV value '$BUILD_ENV'"
      exit 1
      ;;
  esac
)