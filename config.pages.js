var _ = require('lodash');

var delta = [];

var pages = [
    {
        route: {
            plugin: {
                register: './global/server/misc/build',
                options: {
                }
            }
        },
        webpack: {
            id: '',
            src: ''
        }
    },
    {
        route: {
            plugin: {
                register: './global/server/misc/assets',
                options: {
                }
            }
        },
        webpack: {
            id: '',
            src: ''
        }
    },
    {
        route: {
            plugin: {
                register: './global/server/views/home',
                options: {
                    bundleName: 'app'
                }
            }
        },
        webpack: {
            id: 'home',
            src: './src/global/client/pages/home/index'
        }
    },
    {
        route: {
            plugin: {
                register: './global/server/views/about',
                options: {
                    bundleName: 'app'
                }
            }
        },
        webpack: {
            id: 'about',
            src: './src/global/client/pages/about/index'
        }
    },
    {
        route: {
            plugin: {
                register: './global/server/views/contact',
                options: {
                    bundleName: 'app'
                }
            }
        },
        webpack: {
            id: 'contact',
            src: './src/global/client/pages/contact/index'
        }
    },
    {
        route: {
            plugin: {
                register: './global/server/views/signup',
                options: {
                    bundleName: 'app'
                }
            }
        },
        webpack: {
            id: 'signup',
            src: './src/global/client/pages/signup/index'
        }
    },
    {
        route: {
            plugin: {
                register: './global/server/views/account',
                options: {
                    bundleName: 'app'
                }
            }
        },
        webpack: {
            id: 'account',
            src: './src/global/client/pages/account/index'
        }
    },
    {
        route: {
            plugin: {
                register: './global/server/views/admin',
                options: {
                    bundleName: 'app'
                }
            }
        },
        webpack: {
            id: 'admin',
            src: './src/global/client/pages/admin/index'
        }
    },
    {
        route: {
            plugin: {
                register: './global/server/views/login',
                options: {
                    bundleName: 'app'
                }
            }
        },
        webpack: {
            id: 'login',
            src: './src/global/client/pages/login/index'
        }
    },
    {
        route: {
            plugin: {
                register: './global/server/views/dashboard',
                options: {
                    bundleName: 'app'
                }
            }
        },
        webpack: {
            id: 'dashboard',
            src: './src/global/client/pages/dashboard/index'
        }
    }
]

if(process.env.EXCLUDE != undefined){

    var keys = process.env.EXCLUDE.split(',');
    var plength = pages.length, klength = keys.length;

    console.log('Excluding Pages: ' + keys.join(', '));

    for(var p = 0; p < plength; p += 1){

        var pid = pages[p].webpack.id;
        var flag = false;

        keyloop: for(var k = 0; k < klength; k += 1){
            if(keys[k] === pid){
                flag = true;
                break keyloop;
            }
        }

        if(!flag) delta.push(pages[p]);
    }


}else if(process.env.INCLUDE != undefined){

    var keys = process.env.INCLUDE.split(',');
    var plength = pages.length, klength = keys.length;

    console.log('Including Pages: ' + keys.join(', '));

    delta.push(pages[0]);
    delta.push(pages[1]);

    for(var p = 0; p < plength; p += 1){

        var pid = pages[p].webpack.id;

        keyloop: for(var k = 0; k < klength; k += 1){
            if(keys[k] === pid){
                delta.push(pages[p]);
                break keyloop;
            }
        }
    }


}

exports.pages = (delta.length > 2) ? delta : pages;
