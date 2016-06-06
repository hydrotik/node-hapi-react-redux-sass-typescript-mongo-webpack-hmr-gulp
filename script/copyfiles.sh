#!/bin/sh
DIR="$( cd -P "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

mkdir -p ${DIR}/../build
#cp -aR ${DIR}/../src/global/client/{media,assets} ${DIR}/../build
cp -aR ${DIR}/../node_modules/font-awesome/fonts ${DIR}/../build

