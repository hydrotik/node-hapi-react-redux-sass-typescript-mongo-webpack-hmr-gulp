#!/bin/sh

set -e

IMPORT_PATH="${BASH_SOURCE%/*}"
if [[ ! -d "$IMPORT_PATH" ]]; then IMPORT_PATH="$PWD"; fi
source "$IMPORT_PATH/helpers.sh"

# Remove previously generated artifacts.
#run "rimraf $COVERAGE_OUTPUT"

# Monitor source files and run unit tests when files are modified.
run "env NODE_ENV=test karma start karma.conf.dev.js" &
KARMA_PID=$!

wait $KARMA_PID
