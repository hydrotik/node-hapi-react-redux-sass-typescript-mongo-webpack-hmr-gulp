#!/bin/sh

set -e

BUILD_DIR="build"
COVERAGE_PORT="3001"
COVERAGE_OUTPUT="$BUILD_DIR/reports/coverage"
#JSDOC_PORT="3002"
#JSDOC_OUTPUT="$BUILD_DIR/reports/jsdoc"
#GITBOOK_PORT="3006"
#GITBOOK_INPUT="doc"
#GITBOOK_OUTPUT="$BUILD_DIR/reports/gitbook"
#PLATO_CLONE_URL="git@github.com:saksdirect/saks.com.git"
#PLATO_PORT="3003"
#PLATO_OUTPUT="$BUILD_DIR/reports/plato"
#STYLEGUIDE_PORT="3004"
#STYLEGUIDE_OUTPUT="$BUILD_DIR/reports/styleguide"
WEBPACK_PORT="3005"

# https://coderwall.com/p/it3b-q/bash-include-guard
if [ -n "$HELPERS_IMPORTED" ]; then return; fi
readonly HELPERS_IMPORTED=1

run () {
    echo "$ $1"
    $1
}
