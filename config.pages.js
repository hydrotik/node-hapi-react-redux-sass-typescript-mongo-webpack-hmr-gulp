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
    }/*,
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
    }*/,
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

exports.pages = pages;
