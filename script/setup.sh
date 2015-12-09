#!/bin/sh

set -e

IMPORT_PATH="${BASH_SOURCE%/*}"
if [[ ! -d "$IMPORT_PATH" ]]; then IMPORT_PATH="$PWD"; fi
source "$IMPORT_PATH/helpers.sh"

vercomp () {
    if [[ $1 == $2 ]]
    then
        echo "equal"
        return 0
    fi
    local IFS=.
    local i ver1=($1) ver2=($2)
    # fill empty fields in ver1 with zeros
    for ((i=${#ver1[@]}; i<${#ver2[@]}; i++))
    do
        ver1[i]=0
    done
    for ((i=0; i<${#ver1[@]}; i++))
    do
        if [[ -z ${ver2[i]} ]]
        then
            # fill empty fields in ver2 with zeros
            ver2[i]=0
        fi
        if ((10#${ver1[i]} > 10#${ver2[i]}))
        then
            echo "greater"
            return 1
        fi
        if ((10#${ver1[i]} < 10#${ver2[i]}))
        then
            echo "less than"
            return 2
        fi
    done
    return 0
}

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

# Save script's current directory
DIR="$( cd -P "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
#cd "${DIR}"

echo "node:     ${NODE_VERSION} $(echo_if 1)"
echo "npm:     ${NPM_VERSION} $(echo_if 1)"



echo "node: $(vercomp ${NODE_VERSION} ${TARGET_NODE_VERSION})"

#
# Check if Node is installed and at the right version
#
echo "Checking for Node version ${TARGET_NODE_VERSION}"
if [[ "$(vercomp ${NODE_VERSION} ${TARGET_NODE_VERSION})" == "2" ]]; then
    echo "Node version does NOT meet requirements"
    echo "Please install nvm and use node ${TARGET_NODE_VERSION} or greater"
    exit 0
else
    echo "Node version meets requirements"
fi

#
# Check if Node Package Manager is installed and at the right version
#
echo "Checking for NPM version ${NPM_VERION}"
if [[ "$(vercomp ${NPM_VERSION} ${TARGET_NPM_VERSION})" == "2" ]]; then
    echo "NPM version does NOT meet requirements"
    echo "Please install nvm and use npm ${TARGET_NPM_VERSION} or greater"
    exit 0
else
    echo "NPM version meets requirements"
fi


run 'npm config set registry http://registry.npmjs.org/'

# Clean dependencies
run "npm prune"

# Install Nodemon globally if not already installed.
if [ ! -x "$(command -v nodemon)" ]; then
    echo "WARNING: nodemon command not found, installing globally."
    run "sudo npm install -g nodemon" &
    NODEMON_PID=$!
    wait $NODEMON_PID
else
    echo "nodemon found"
fi

# Install Karma globally if not already installed.
if [ ! -x "$(command -v karma)" ]; then
    echo "WARNING: karma-cli command not found, installing globally."
    run "sudo npm install -g karma-cli" &
    KARMA_PID=$!
    wait $KARMA_PID
else
    echo "karma-cli found"
fi

# Install Typescript globally if not already installed.
if [ ! -x "$(command -v tsc)" ]; then
    echo "WARNING: tsc command not found, installing globally."
    run "sudo npm install -g typescript" &
    TSC_PID=$!
    wait $TSC_PID
else
    echo "tsc found"
fi

# Install Typescript Definition Utility globally if not already installed.
if [ ! -x "$(command -v tsd)" ]; then
    echo "WARNING: tsd command not found, installing globally."
    run "sudo npm install -g tsd" &
    TSD_PID=$!

    wait $TSD_PID
else
    echo "tsd found"
fi

run "npm install"

run "npm run setup-config"