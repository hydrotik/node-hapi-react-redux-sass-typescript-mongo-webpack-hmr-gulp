#!/bin/sh

set -e

IMPORT_PATH="${BASH_SOURCE%/*}"
if [[ ! -d "$IMPORT_PATH" ]]; then IMPORT_PATH="$PWD"; fi
source "$IMPORT_PATH/helpers.sh"

# Save script's current directory
DIR="$( cd -P "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
#cd "${DIR}"

WDIR="$( pwd )"
mongod=/usr/local/bin/mongod
mongod_data="${WDIR}/data/db"
mongod_log="${WDIR}/data/mongodb.log"
prog=mongod.sh
PIDFILE="${WDIR}/mongod.pid"
RETVAL=0



setup() {
    echo "Setting Up Mongo!"
    # if [ ! -d /data ]
    # then
    #     mkdir -p /data
    # fi

    if [ ! -d $mongod_data ]
    then
         mkdir -p $mongod_data
    fi
}

stop() {
    echo "Stopping Mongo!"
    if [ -s $PIDFILE ]
    then
      SELPID=`cat $PIDFILE`
      if [[ "$(ps aux $SELPID | grep mongod)" != "" ]]
      then
        echo "Killing mongod process $SELPID"
        kill $SELPID
      fi
    fi
    exit 0
    # grep_mongo=`ps aux | grep -v grep | grep "${mongod}"`
    # if [ ${#grep_mongo} -gt 0 ]
    # then
    # echo "Stop MongoDB."
    # PID=`ps x | grep -v grep | grep "${mongod}" | awk '{ print $1 }'`
    # `kill -2 ${PID}`
    # RETVAL=$?
    # else
    # echo "MongoDB is not running."
    # fi
}
start() {
    echo "Starting Mongo!"
    mongod --dbpath "${mongod_data}" --logpath "${mongod_log}" --logappend --quiet  &
    echo $! > $PIDFILE
    exit 0
    # grep_mongo=`ps aux | grep -v grep | grep "${mongod}"`
    # if [ -n "${grep_mongo}" ]
    # then
    # echo "MongoDB is already running."
    # else
    # echo "Start MongoDB."
    # mongod --dbpath ${mongod_data} &
    # TSD_PID=$!
    # wait $TSD_PID
    # RETVAL=$?
    # fi
}

case "$1" in
    start)
    start
    ;;
    stop)
    stop
    ;;
    restart)
    stop
    start
    ;;
    setup)
    setup
    ;;
    *)
    echo $"Usage: $prog {start|stop|restart}"
    exit 1
esac

exit $RETVAL
