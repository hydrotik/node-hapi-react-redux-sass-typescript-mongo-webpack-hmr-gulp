#!/bin/sh

set -e

IMPORT_PATH="${BASH_SOURCE%/*}"
if [[ ! -d "$IMPORT_PATH" ]]; then IMPORT_PATH="$PWD"; fi
source "$IMPORT_PATH/helpers.sh"

# Remove previously generated artifacts.
#run "rimraf $COVERAGE_OUTPUT"

run "env NODE_ENV=test karma start --single-run"
