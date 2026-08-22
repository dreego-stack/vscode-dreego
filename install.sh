#!/bin/sh
set -e

SCRIPT_DIR="$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)"
TARGET="${HOME}/.vscode/extensions/dreego"

case "${1:-install}" in
install)
  rm -rf "${TARGET}"
  ln -s "${SCRIPT_DIR}" "${TARGET}"
  echo "dreego extension installed → restart VS Code"
  ;;
uninstall)
  rm -rf "${TARGET}"
  echo "dreego extension removed"
  ;;
*)
  echo "usage: install.sh [install|uninstall]" >&2
  exit 1
  ;;
esac
