#!/bin/bash

# DB files will live in container fs
mkdir containerdb
mongod --auth --dbpath=/containerdb &


until mongo admin --eval 'db.createUser({"user":"userAdmin", "pwd":"'${USERADMIN_PASS}'", "roles": [ "userAdminAnyDatabase" ] })'
do
  echo 'Mongo not yet ready, waiting 1 sec until retry'
  sleep 1
done

mongo admin --port 27017 -u userAdmin -p ${USERADMIN_PASS} --authenticationDatabase "admin" --eval 'db.createUser({"user":"admin", "pwd":"'${ADMIN_PASS}'", "roles": [ "dbAdminAnyDatabase", "readWriteAnyDatabase" ] })'
mongo watts --port 27017 -u admin -p ${ADMIN_PASS} --authenticationDatabase "admin" db.js

mongoimport -u admin -p ${ADMIN_PASS} --authenticationDatabase "admin" --db watts --collection headers --jsonArray --drop --file ./header.data.json

mongod --shutdown --dbpath=/containerdb
