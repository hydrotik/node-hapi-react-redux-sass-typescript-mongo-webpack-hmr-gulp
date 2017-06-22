#!/bin/bash

mkdir containerdb

mongod --auth --dbpath=/containerdb &

until mongo admin --eval 'db.createUser({"user":"admin", "pwd":"admin", "roles": [ "root" ] })'
do
  echo 'Mongo not yet ready, waiting 1 sec until retry'
  sleep 1
done

mongod --shutdown --dbpath=/containerdb