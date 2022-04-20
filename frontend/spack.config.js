const { config } = require('@swc/core/spack')


module.exports = config({
    entry: {
        'render': __dirname + '/src/index.js',
    },
    output: {
        path: __dirname + '/../backend'
    },
    module: {
        "type": "es5",
    },
});