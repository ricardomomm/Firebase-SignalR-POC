module.exports = function () {
    var root = '';
    var app = root + 'app/';
    var assets = root + 'assets/';
    var assetsPath = {
        styles: assets + 'styles/',
        images: assets + 'images/',
        fonts: assets + 'fonts/'
    };
    var index = root + 'index.html';
    var tsFiles = [
        app + '**/!(*.spec)+(.ts)'
    ];
    var build = {
        path: 'build/',
        app: 'build/app/',
        fonts: 'build/fonts',
        assetPath: 'build/assets/',
        assets: {
            lib: {
                js: 'lib.js',
                css: 'lib.css'
            }
        }
    };
    var liveServer = {
        dev: {
            port: 3000,
            host: "0.0.0.0",
            open: '/',
            file: "index.html",
            wait: 1000,
            logLevel: 0
        },
        prod: {
            port: 3001,
            host: "0.0.0.0",
            root: 'build/',
            file: "index.html",
            wait: 1000,
            logLevel: 0
        }
    };

    var systemJs = {
        builder: {
            normalize: true,
            minify: true,
            // TODO: remove this when angular2 bug is solved
            mangle: false,
            // TODO
            globalDefs: { DEBUG: false }
        }
    };

    var config = {
        root: root,
        app: app,
        assets: assets,
        index: index,
        build: build,
        assetsPath: assetsPath,
        tsFiles: tsFiles,
        liveServer: liveServer,
        systemJs: systemJs
    };

    return config;
};
