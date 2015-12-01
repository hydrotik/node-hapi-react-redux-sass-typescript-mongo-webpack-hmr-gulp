#!/bin/bash

SELENIUM=./selenium-server-standalone-2.48.2.jar
LOG=./selenium.log
PIDFILE=./selenium.pid

ARG=$1

if [ ${#ARG} -lt 1 ]
    then echo "\nUSAGE: $0 {start|stop}\n"                                    
exit 1
fi

if [ $ARG = stop ] 
    then SELPID=`cat $PIDFILE` && kill $SELPID 
echo "Stopping Selenium server!"
exit 0
fi

if [ $ARG = start ]
    then java -jar $SELENIUM > $LOG &
echo "Starting Selenium server!"
echo $! > $PIDFILE
exit 0
fi