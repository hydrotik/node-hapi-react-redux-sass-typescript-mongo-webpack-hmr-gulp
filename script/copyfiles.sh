#!/bin/sh
DIR="$( cd -P "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

mkdir -p ${DIR}/../www
#cp -aR ${DIR}/../src/global/client/{media,assets} ${DIR}/../www
cp -aR ${DIR}/../node_modules/font-awesome/fonts ${DIR}/../www

