const Config = require('../config');
const spawn = require('child_process').spawn;
const fs = require('fs');
const mkdirp = require('mkdirp');
const path = require('path');

// Warning do not put data directory for mongodb in a docker/virtualbox shared folder 
// https://github.com/mvertes/docker-alpine-mongo/issues/1
var mongoDataDir = path.resolve(process.env.MONGO_DATA_DIR || __dirname + '/../data/db');
var pidFile = path.resolve(__dirname + '/../mongod.pid');

function runMongo() {

        const mongoProc = spawn(
            'mongod', 
            ['--dbpath', mongoDataDir, '--pidfilepath', pidFile],
            {
                detached: true,
                stdio: ['ignore']
            }
        );

        mongoProc.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
        });

        mongoProc.stderr.on('data', (data) => {
        console.log(`stderr: ${data}`);
        });

        mongoProc.on('close', (code) => {
        console.log(`mongod process exited with code ${code}`);
        });

        mongoProc.unref();

    process.exit(0);
}



if (!fs.existsSync(mongoDataDir)) {
    mkdirp(mongoDataDir, function(err) {
        if (err) {
            console.log("Could not create directory " + mongoDataDir);
            process.exit(1);
        }
        else {
            runMongo();
        }
    });
}
else {
    runMongo();
}



