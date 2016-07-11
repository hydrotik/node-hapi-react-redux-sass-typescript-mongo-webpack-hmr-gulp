const Config = require('../config');
const spawn = require('child_process').spawn;
const fs = require('fs');
const mkdirp = require('mkdirp');
const path = require('path');

var mongoDataDir = path.resolve(__dirname + '/../data/db');
var pidFile = path.resolve(__dirname + '/../mongod.pid');

function runMongo() {
    var mongoRunning = false;
    if (fs.existsSync(pidFile)) {
        var pid = fs.readFileSync(pidFile);
        
        try {
            process.kill(pid, 0);
            console.log("mongod process " + pid + " already exists");
            mongoRunning = true;
        }
        catch(ex) {
            // process does not exist, destroy pid file.
            console.log("mongod process " + pid + " does not exist");
            fs.unlinkSync(pidFile);
            mongoRunning = false;
        }
        
    }

    if (!mongoRunning) {
        const mongoProc = spawn(
            'mongod', 
            ['--dbpath', mongoDataDir],
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

        fs.writeFileSync(
            path.resolve(pidFile),
            mongoProc.pid,
            {
                mode: "0755"
            }
        )
    }
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



