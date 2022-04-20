const { config } = require('@swc/core/spack')


module.exports = config({
    entry: {
        'ssr': __dirname + '/src/index.js',
    },
    output: {
        path: __dirname + '/lib'
    },
    module: {
        "type": "es6",
    },
});