#!/bin/sh

set -e

BUILD_DIR="build"

# https://coderwall.com/p/it3b-q/bash-include-guard
if [ -n "$HELPERS_IMPORTED" ]; then return; fi
readonly HELPERS_IMPORTED=1

run () {
    echo "$ $1"
    $1
}
