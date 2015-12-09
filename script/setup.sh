#!/bin/sh

set -e

IMPORT_PATH="${BASH_SOURCE%/*}"
if [[ ! -d "$IMPORT_PATH" ]]; then IMPORT_PATH="$PWD"; fi
source "$IMPORT_PATH/helpers.sh"

NODE_VERSION=4.2.0
NPM_VERSION=3.3.0

# Save script's current directory
DIR="$( cd -P "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
#cd "${DIR}"


#
# Check if Node is installed and at the right version
#
echo "Checking for Node version ${NODE_VERSION}"
if [[ $(node --version | awk '{print $2}') > ${NODE_VERSION} ]]; then
    echo "Node version does NOT meet requirements"
    echo "Please install nvm and use node ${NODE_VERSION} or greater"
    exit 0
else
    echo "Node version meets requirements"
fi

#
# Check if Node Package Manager is installed and at the right version
#
echo "Checking for NPM version ${NPM_VERION}"
if [[ $(npm --version | awk '{print $2}') > ${NPM_VERSION} ]]; then
    echo "NPM version does NOT meet requirements"
    echo "Please install nvm and use npm ${NPM_VERSION} or greater"
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
if [ ! -x "$(command -v karma-cli)" ]; then
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