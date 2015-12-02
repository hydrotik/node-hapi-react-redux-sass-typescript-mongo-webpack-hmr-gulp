#!/bin/sh

set -e

IMPORT_PATH="${BASH_SOURCE%/*}"
if [[ ! -d "$IMPORT_PATH" ]]; then IMPORT_PATH="$PWD"; fi
source "$IMPORT_PATH/helpers.sh"

# Start Chrome.
/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --remote-debugging-port=9222 &
CHROME_PID=$!
echo $?

wait $CHROME_PID

# Start Test.
run "node ./test/chrometools.js" &
PERF_PID=$!
echo $?

wait $PERF_PID
