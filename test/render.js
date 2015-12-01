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
    .title(function(err, res) {
        console.log('Title was: ' + res.value);
    })
    .end();