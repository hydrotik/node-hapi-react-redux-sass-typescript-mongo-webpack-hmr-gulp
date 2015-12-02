#!/bin/bash

CHROMEDRIVER=../chromedriver
LOG=../chromedriver.log
PIDFILE=../chromedriver.pid

ARG=$1

if [ ${#ARG} -lt 1 ]
    then echo "\nUSAGE: $0 {start|stop}\n"                                    
exit 1
fi

if [ $ARG = stop ] 
    then SELPID=`cat $PIDFILE` && kill $SELPID 
echo "Stopping Chromedriver!"
exit 0
fi

if [ $ARG = start ]
    then java -jar $CHROMEDRIVER > $LOG &
echo "Starting Chromedriver!"
echo $! > $PIDFILE
exit 0
fi