#!/bin/sh

set -e

IMPORT_PATH="${BASH_SOURCE%/*}"
if [[ ! -d "$IMPORT_PATH" ]]; then IMPORT_PATH="$PWD"; fi
source "$IMPORT_PATH/helpers.sh"

# Save script's current directory
DIR="$( cd -P "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
#cd "${DIR}"

## each separate version number must be less than 3 digit wide !
function version { echo "$@" | awk -F. '{ printf("%d%03d%03d%03d\n", $1,$2,$3,$4); }'; }

# display a message in red with a cross by it
# example
# echo echo_fail "No"
function echo_fail {
  # echo first argument in red
  printf "\e[31m✘ ${1}"
  # reset colours back to normal
  echo "\033[0m"
}

# display a message in green with a tick by it
# example
# echo echo_fail "Yes"
function echo_pass {
  # echo first argument in green
  printf "\e[32m✔ ${1}"
  # reset colours back to normal
  echo "\033[0m"
}

# echo pass or fail
# example
# echo echo_if 1 "Passed"
# echo echo_if 0 "Failed"
function echo_if {
  if [ $1 == 1 ]; then
    echo_pass $2
  else
    echo_fail $2
  fi
}

TARGET_NODE_VERSION=4.2.0
TARGET_NPM_VERSION=3.3.0

NODE_VERSION="$(node --version | sed 's/[^0-9.]*//g')"
NPM_VERSION="$(npm --version | sed 's/[^0-9.]*//g')"

#
# Check if Node is installed and at the right version
#
echo "Checking for Node version ${TARGET_NODE_VERSION} or greater"
if [ "$(version "$TARGET_NODE_VERSION")" -gt "$(version "$NODE_VERSION")" ]; then
    echo "Node version does NOT meet requirements $(echo_if 0)"
    echo "Please install nvm and use node ${TARGET_NODE_VERSION} or greater"
    exit 0
else
    echo "Node version ${NODE_VERSION} meets requirements $(echo_if 1)"
fi

#
# Check if Node Package Manager is installed and at the right version
#
echo "Checking for NPM version ${TARGET_NPM_VERSION} or greater"
if [ "$(version "$TARGET_NPM_VERSION")" -gt "$(version "$NPM_VERSION")" ]; then
    echo "Node version does NOT meet requirements $(echo_if 0)"
    echo "Please install nvm and use node ${TARGET_NODE_VERSION} or greater"
    exit 0
else
    echo "NPM version ${NPM_VERSION} meets requirements $(echo_if 1)"
fi

run 'npm config set registry http://registry.npmjs.org/'

# Clean dependencies
run "npm prune"

# Install Nodemon globally if not already installed.
if [ ! -x "$(command -v nodemon)" ]; then
    echo "WARNING: nodemon command not found, installing globally. $(echo_if 0)"
    run "sudo npm install -g nodemon" &
    NODEMON_PID=$!
    wait $NODEMON_PID
else
    echo "nodemon found $(echo_if 1)"
fi

# Install Karma globally if not already installed.
if [ ! -x "$(command -v karma)" ]; then
    echo "WARNING: karma-cli command not found, installing globally. $(echo_if 0)"
    run "sudo npm install -g karma-cli" &
    KARMA_PID=$!
    wait $KARMA_PID
else
    echo "karma-cli found $(echo_if 1)"
fi

# Install Typescript globally if not already installed.
if [ ! -x "$(command -v tsc)" ]; then
    echo "WARNING: tsc command not found, installing globally. $(echo_if 0)"
    run "sudo npm install -g typescript" &
    TSC_PID=$!
    wait $TSC_PID
else
    echo "tsc found $(echo_if 1)"
fi

# Install Typescript Definition Utility globally if not already installed.
if [ ! -x "$(command -v tsd)" ]; then
    echo "WARNING: tsd command not found, installing globally. $(echo_if 0)"
    run "sudo npm install -g tsd" &
    TSD_PID=$!

    wait $TSD_PID
else
    echo "tsd found $(echo_if 1)"
fi

# Install NCU Definition Utility globally if not already installed.
if [ ! -x "$(command -v ncu)" ]; then
    echo "WARNING: ncu command not found, installing globally. $(echo_if 0)"
    run "sudo npm install -g npm-check-updates" &
    NCU_PID=$!

    wait $NCU_PID
else
    echo "ncu found $(echo_if 1)"
fi

run "npm install"

run "npm link"

run "npm run setup-config" &
SETUP_PID=$!

wait $SETUP_PID
echo "SUCCESS $(echo_if 1)$(echo_if 1)$(echo_if 1)$(echo_if 1): NPM Setup complete!"