
var webdriverio = require('webdriverio');

var options = {
    desiredCapabilities: {
        browserName: 'chrome'
    }
};
 
webdriverio
    .remote(options)
    .init()
    .url('http://127.0.0.1:8000')
    .click('#element-link-2')
    .pause(5000)
    .end();


/*

// init WebdriverIO
var matrix = require('webdriverio').multiremote({
    'browserA': {
        desiredCapabilities: {
            browserName: 'chrome'
        }
    },
    'browserB': {
        desiredCapabilities: {
            browserName: 'chrome'
        }
    }
});
var WebdriverRTC = require('webdriverrtc');
WebdriverRTC.init(matrix);


matrix
    .init()
    .url('http://127.0.0.1:8000')
    .startAnalyzing()
    .getConnectionInformation(function(err, connectionType) {
        console.log(connectionType);
    })
    .click('#element-link-2')
    .getStats(10000, function(err, mean, median, max, min, rawdata) {
        console.log('mean:', mean);
        console.log('median:', median);
        console.log('max:', max);
        console.log('min:', min);
        console.log('rawdata', rawdata); // contains the complete RTCStatsReport with even more information (mostly browser specific)
    })
    .end();
    */