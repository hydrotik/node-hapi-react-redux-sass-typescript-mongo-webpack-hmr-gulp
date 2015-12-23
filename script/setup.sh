#!/bin/sh

set -e

IMPORT_PATH="${BASH_SOURCE%/*}"
if [[ ! -d "$IMPORT_PATH" ]]; then IMPORT_PATH="$PWD"; fi
source "$IMPORT_PATH/helpers.sh"

# Save script's current directory
DIR="$( cd -P "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
#cd "${DIR}"

#########################################################################################
# Settings/Formats
DATE=`date +%m-%d-%Y" "%r`
FORMAT_WIDTH=105
WINDOW_WIDTH=$(tput cols)
#########################################################################################
# Software version targets
TARGET_NODE_VERSION=4.2.0
TARGET_NPM_VERSION=3.3.0

#########################################################################################
# Freshen Up
clear

#########################################################################################
## each separate version number must be less than 3 digit wide !
function version { echo "$@" | awk -F. '{ printf("%d%03d%03d%03d\n", $1,$2,$3,$4); }'; }

#########################################################################################
# Pretty Feedback Functions ✔✔✔✔✔✔✔
# Print ✘
function echo_fail {
  printf "\e[31m✘ ${1}"
  echo "\033[0m"
}
# Print ✔
function echo_pass {
  printf "\e[32m✔ ${1}"
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

# Terminal output formatting
function echo_cause {
    printf "\e[1;37m${1}"
}

function echo_effect {
    printf "\e[32m${1}"
}

function echo_warn {
    printf "\e[1;33m${1}"
}

function echo_success {
    printf "\e[1;32m${1}"
}

function echo_clear {
    echo "\033[0m${1}"
}


#########################################################################################
# Capture versions
NODE_VERSION="$(node --version | sed 's/[^0-9.]*//g')"
NPM_VERSION="$(npm --version | sed 's/[^0-9.]*//g')"



#########################################################################################
#
# WELCOME!
echo "\n$(echo_cause)"
if test $WINDOW_WIDTH -gt $FORMAT_WIDTH
then
    echo "██████╗ ██████╗  ██████╗      ██╗███████╗ ██████╗████████╗    ███████╗███████╗████████╗██╗   ██╗██████╗ ";
    echo "██╔══██╗██╔══██╗██╔═══██╗     ██║██╔════╝██╔════╝╚══██╔══╝    ██╔════╝██╔════╝╚══██╔══╝██║   ██║██╔══██╗";
    echo "██████╔╝██████╔╝██║   ██║     ██║█████╗  ██║        ██║       ███████╗█████╗     ██║   ██║   ██║██████╔╝";
    echo "██╔═══╝ ██╔══██╗██║   ██║██   ██║██╔══╝  ██║        ██║       ╚════██║██╔══╝     ██║   ██║   ██║██╔═══╝ ";
    echo "██║     ██║  ██║╚██████╔╝╚█████╔╝███████╗╚██████╗   ██║       ███████║███████╗   ██║   ╚██████╔╝██║     ";
    echo "╚═╝     ╚═╝  ╚═╝ ╚═════╝  ╚════╝ ╚══════╝ ╚═════╝   ╚═╝       ╚══════╝╚══════╝   ╚═╝    ╚═════╝ ╚═╝     ";
else
    echo "███████╗███████╗████████╗██╗   ██╗██████╗ ";
    echo "██╔════╝██╔════╝╚══██╔══╝██║   ██║██╔══██╗";
    echo "███████╗█████╗     ██║   ██║   ██║██████╔╝";
    echo "╚════██║██╔══╝     ██║   ██║   ██║██╔═══╝ ";
    echo "███████║███████╗   ██║   ╚██████╔╝██║     ";
    echo "╚══════╝╚══════╝   ╚═╝    ╚═════╝ ╚═╝     ";
fi
printf '%*s\n' "${COLUMNS:-$(tput cols)}" '' | tr ' ' \█
printf '%*s\n' "${COLUMNS:-$(tput cols)}" '' | tr ' ' \═
echo "Starting installation tool ${DATE}$(echo_clear)"


#########################################################################################
#
# Check NVM globally if not already installed.
echo "\n$(echo_cause)Checking NVM path$(echo_clear)"
if [ ! -f ~/.nvm/nvm.sh ]; then
    echo "$(echo_warn)WARNING: NVM not found. $(echo_if 0)$(echo_clear)"
    echo "$(echo_warn)Please run:$(echo_clear)"
    echo "curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.29.0/install.sh | bash"
    echo "$(echo_warn)Then in ~/.bash_profile add:$(echo_clear)"
    echo 'export NVM_DIR="$HOME/.nvm"\n[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh" # This loads nvm"\n\n'
    exit 0
else
    . ~/.nvm/nvm.sh
    NVM_VERSION="$(nvm --version | sed 's/[^0-9.]*//g')"
    echo "$(echo_effect)NVM version ${NVM_VERSION} found $(echo_if 1)$(echo_clear)"
fi


# NOT WORKING????????
# Check NVM globally if not already installed.
#echo "\n$(echo_cause)Checking for NVM$(echo_clear)"
#if [ ! -x "$(nvm)" ]; then
#    echo "$(echo_warn)WARNING: Check NVM version if issues persist$(echo_clear)"
#    #run "${RUN_SUDO}npm install -g karma-cli" &
#    #KARMA_PID=$!
#    #wait $KARMA_PID
#    #echo "$(echo_effect)Karma installed globally $(echo_if 1)$(echo_clear)"
#else
#    echo "$(echo_effect)NVM found $(echo_if 1)$(echo_clear)"
#fi

#########################################################################################
#
# Prompt for sudo
echo ""
read -p "Run global installs with sudo? " -n 1 -r
echo    # (optional) move to a new line
if [[ $REPLY =~ ^[Yy]$ ]]
then
    RUN_SUDO="sudo "
else
    RUN_SUDO=""
fi


#########################################################################################
#
# Check if Node is installed and at the right version
echo "\n$(echo_cause)Checking for Node version ${TARGET_NODE_VERSION} or greater$(echo_clear)"
if [ "$(version "$TARGET_NODE_VERSION")" -gt "$(version "$NODE_VERSION")" ]; then
    echo "$(echo_warn)Node version does NOT meet requirements $(echo_if 0)$(echo_clear)"
    echo "Please install nvm and use node ${TARGET_NODE_VERSION} or greater$(echo_clear)"
    exit 0
else
    echo "$(echo_effect)Node version ${NODE_VERSION} meets requirements $(echo_if 1)$(echo_clear)"
fi

#########################################################################################
#
# Check if NPM is installed and at the right version
echo "\n$(echo_cause)Checking for NPM version ${TARGET_NPM_VERSION} or greater$(echo_clear)"
if [ "$(version "$TARGET_NPM_VERSION")" -gt "$(version "$NPM_VERSION")" ]; then
    echo "$(echo_warn)NPM version does NOT meet requirements $(echo_if 0)$(echo_clear)"
    echo "Please install nvm and use node ${TARGET_NODE_VERSION} or greater$(echo_clear)"
    exit 0
else
    echo "$(echo_effect)NPM version ${NPM_VERSION} meets requirements $(echo_if 1)$(echo_clear)"
fi

#########################################################################################
#
# Install Nodemon globally if not already installed.
echo "\n$(echo_cause)Checking for Nodemon$(echo_clear)"
if [ ! -x "$(command -v nodemon)" ]; then
    echo "$(echo_warn)WARNING: nodemon command not found, installing globally. $(echo_if 0)$(echo_clear)"
    run "${RUN_SUDO}npm install -g nodemon" &
    NODEMON_PID=$!
    wait $NODEMON_PID
    echo "$(echo_effect)Nodemon installed globally $(echo_if 1)$(echo_clear)"
else
    echo "$(echo_effect)Nodemon found $(echo_if 1)$(echo_clear)"
fi

#########################################################################################
#
# Install Karma globally if not already installed.
echo "\n$(echo_cause)Checking for Karma testing CLI$(echo_clear)"
if [ ! -x "$(command -v karma)" ]; then
    echo "$(echo_warn)WARNING: karma-cli command not found, installing globally. $(echo_if 0)$(echo_clear)"
    run "${RUN_SUDO}npm install -g karma-cli" &
    KARMA_PID=$!
    wait $KARMA_PID
    echo "$(echo_effect)Karma installed globally $(echo_if 1)$(echo_clear)"
else
    echo "$(echo_effect)karma-cli found $(echo_if 1)$(echo_clear)"
fi

#########################################################################################
#
# Install Typescript globally if not already installed.
echo "\n$(echo_cause)Checking for Typescript$(echo_clear)"
if [ ! -x "$(command -v tsc)" ]; then
    echo "$(echo_warn)WARNING: tsc command not found, installing globally. $(echo_if 0)$(echo_clear)"
    run "${RUN_SUDO}npm install -g typescript" &
    TSC_PID=$!
    wait $TSC_PID
    echo "$(echo_effect)TSD installed globally $(echo_if 1)$(echo_clear)"
else
    echo "$(echo_effect)tsc found $(echo_if 1)$(echo_clear)"
fi

#########################################################################################
#
# Install Typescript Definition Utility globally if not already installed.
echo "\n$(echo_cause)Checking for Typescript Definitions CLI$(echo_clear)"
if [ ! -x "$(command -v tsd)" ]; then
    echo "$(echo_warn)WARNING: tsd command not found, installing globally. $(echo_if 0)$(echo_clear)"
    run "${RUN_SUDO}npm install -g tsd" &
    TSD_PID=$!
    wait $TSD_PID
    echo "$(echo_effect)Typescript installed globally $(echo_if 1)$(echo_clear)"
else
    echo "$(echo_effect)tsd found $(echo_if 1)$(echo_clear)"
fi

#########################################################################################
#
# Install NCU Definition Utility globally if not already installed.
echo "\n$(echo_cause)Checking for NCU package utility for NPM$(echo_clear)"
if [ ! -x "$(command -v ncu)" ]; then
    echo "$(echo_warn)WARNING: ncu command not found, installing globally. $(echo_if 0)$(echo_clear)"
    run "${RUN_SUDO}npm install -g npm-check-updates" &
    NCU_PID=$!
    wait $NCU_PID
    echo "$(echo_effect)NCU installed globally $(echo_if 1)$(echo_clear)"
else
    echo "$(echo_effect)ncu found $(echo_if 1)$(echo_clear)"
fi



#########################################################################################
#
# NPM Core install
echo "\n$(echo_cause)Starting NPM install and setup$(echo_clear)"
run 'npm config set registry http://registry.npmjs.org/'
echo "$(echo_effect)NPM registry config complete $(echo_if 1)$(echo_clear)"
# NPM Clean dependencies
run "npm prune"
echo "$(echo_effect)NPM prune complete $(echo_if 1)$(echo_clear)"
# NPM Install
run "npm install"
echo "$(echo_effect)NPM install complete $(echo_if 1)$(echo_clear)"
# NPM Link
read -p "Run NPM link command? (Not recommended for Yosemite/El Capitan users or if you are experiencing permission problems) " -n 1 -r
#echo    # (optional) move to a new line
if [[ $REPLY =~ ^[Yy]$ ]]
then
    echo ""
    run "npm link" &
    NPM_LINK_PID=$!
    wait $NPM_LINK_PID
    echo "$(echo_effect)NPM link complete $(echo_if 1)$(echo_clear)"
else
    echo "\n$(echo_warn)Run 'npm link' if you have errors when running locally$(echo_clear)"
fi

echo "$(echo_effect)NPM install and setup complete $(echo_if 1)$(echo_clear)"


#########################################################################################
# Config Setup using Promptly in ./setup.js
#
echo "\n$(echo_cause)Starting config setup$(echo_clear)"

if [ ! -f ./config.js ]; then
    echo "$(echo_effect)Config not present. Running config setup.$(echo_clear)"
    # start ./setup.js
    run "npm run setup-config"
    # config setup complete
    echo "$(echo_effect)Config setup complete $(echo_if 1)$(echo_clear)"
else
    read -p "Config exists, would you like to run the config setup? " -n 1 -r
    echo    # (optional) move to a new line
    if [[ $REPLY =~ ^[Yy]$ ]]
    then
        echo ""
        # start ./setup.js
        run "npm run setup-config"
        # config setup complete
        echo "$(echo_effect)Config setup complete $(echo_if 1)$(echo_clear)"
    else
        echo "$(echo_success)SUCCESS $(echo_if 1)$(echo_if 1)$(echo_if 1)$(echo_if 1): NPM Setup complete!$(echo_clear)"
    fi
fi



#########################################################################################
# Run Local instance?
#
echo "\n$(echo_cause)Finalizing project setup$(echo_clear)"
read -p "Would you like to start the local instance? " -n 1 -r
echo    # (optional) move to a new line
if [[ $REPLY =~ ^[Yy]$ ]]
then
    clear
    DELTADATE=`date +%m-%d-%Y" "%r`
    echo "\n$(echo_cause)"
    printf '%*s\n' "${COLUMNS:-$(tput cols)}" '' | tr ' ' \*
    echo "$(echo_success)SUCCESS $(echo_if 1)$(echo_if 1)$(echo_if 1)$(echo_if 1): NPM Setup complete!$(echo_clear)\n\n"
    echo "$(echo_effect)Installation started ${DATE} and finished ${DELTADATE} $(echo_if 1)$(echo_clear)"
    echo "$(echo_cause)Starting local instance...$(echo_clear)\n\n"
    run "npm run watch"
else
    clear
    DELTADATE=`date +%m-%d-%Y" "%r`
    echo "\n$(echo_cause)"
    printf '%*s\n' "${COLUMNS:-$(tput cols)}" '' | tr ' ' \*
    echo "$(echo_success)SUCCESS $(echo_if 1)$(echo_if 1)$(echo_if 1)$(echo_if 1): NPM Setup complete!$(echo_clear)\n\n"
    echo "$(echo_effect)Installation started ${DATE} and finished ${DELTADATE} $(echo_if 1)$(echo_clear)"
fi