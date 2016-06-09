var path = require('path');
// Config Helper with delimeters for scafollding support
function ConfigPages() {
    // Me
    var self = this;

    // Privates
    var isLoaded = false;

    var delta = [];

    var pages = [

        // %START PAGE%
        {
            route: {
                plugin: {
                    register: './misc/build',
                    options: {
                    }
                }
            },
            webpack: {
                id: '',
                src: ''
            }
        },
        // %END PAGE%

        // %START PAGE%
        {
            route: {
                plugin: {
                    register: './misc/assets',
                    options: {
                    }
                }
            },
            webpack: {
                id: '',
                src: ''
            }
        },
        // %END PAGE%

        // %START PAGE%
        {
            route: {
                plugin: {
                    register: './views/home',
                    options: {
                        bundleName: 'app'
                    }
                }
            },
            webpack: {
                id: 'home',
                src: path.join(__dirname, '../client/pages/home/index')
            }
        },
        // %END PAGE%

        // %START PAGE%
        {
            route: {
                plugin: {
                    register: './views/about',
                    options: {
                        bundleName: 'app'
                    }
                }
            },
            webpack: {
                id: 'about',
                src: path.join(__dirname, '../client/pages/about/index')
            }
        },
        // %END PAGE%

        // %START PAGE%
        {
            route: {
                plugin: {
                    register: './views/contact',
                    options: {
                        bundleName: 'app'
                    }
                }
            },
            webpack: {
                id: 'contact',
                src: path.join(__dirname, '../client/pages/contact/index')
            }
        },
        // %END PAGE%

        // %START PAGE%
        {
            route: {
                plugin: {
                    register: './views/signup',
                    options: {
                        bundleName: 'app'
                    }
                }
            },
            webpack: {
                id: 'signup',
                src: path.join(__dirname, '../client/pages/signup/index')
            }
        },
        // %END PAGE%

        // %START PAGE%
        {
            route: {
                plugin: {
                    register: './views/account',
                    options: {
                        bundleName: 'app'
                    }
                }
            },
            webpack: {
                id: 'account',
                src: path.join(__dirname, '../client/pages/account/index')
            }
        },
        // %END PAGE%

        // %START PAGE%
        {
            route: {
                plugin: {
                    register: './views/admin',
                    options: {
                        bundleName: 'app'
                    }
                }
            },
            webpack: {
                id: 'admin',
                src: path.join(__dirname, '../client/pages/admin/index')
            }
        },
        // %END PAGE%

        // %START PAGE%
        {
            route: {
                plugin: {
                    register: './views/login',
                    options: {
                        bundleName: 'app'
                    }
                }
            },
            webpack: {
                id: 'login',
                src: path.join(__dirname, '../client/pages/login/index')
            }
        },
        // %END PAGE%

        // %START PAGE%
        {
            route: {
                plugin: {
                    register: './views/dashboard',
                    options: {
                        bundleName: 'app'
                    }
                }
            },
            webpack: {
                id: 'dashboard',
                src: path.join(__dirname, '../client/pages/dashboard/index')
            }
        }
        // %END PAGE%
    ]

    // Public method
    self.getConfig = function(options, callback) {
        if(isLoaded) return delta;

        if(process.env.EXCLUDE != undefined){

            var keys = process.env.EXCLUDE.split(',');
            var plength = pages.length, klength = keys.length;

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

            // Push Assets and Build first
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

        }else{

            delta = pages;

        }

        isLoaded = true;

        return delta;
    }

}

module.exports = new ConfigPages();


