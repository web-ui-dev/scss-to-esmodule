const optionator = require('optionator');

// parsed arguments/options passed in via CLI from the user
const parseOptions = optionator({
    prepend: 'sass-to-esmodule [options]',
    defaults: {
        concatRepeatedArrays: true,
        mergeRepeatedObjects: true
    },
    options: [
        {
            heading: 'Basic configuration'
        },
        {
            option: 'files',
            alias: 'f',
            type: 'String',
            default: '',
            description: 'Glob with file path, ex: --files="src/**/*.scss"'
        },
        {
            option: 'ignore',
            alias: 'i',
            type: 'Array',
            default: '[]',
            description: `Pattern or an array of glob patterns to exclude matches, ex: --ignore="['src/skip-dir/**']"`
        },
        {
            option: 'module-type',
            alias: 'm',
            type: 'String',
            default: 'js',
            description: 'Output module extension js | ts, defaults to js, ex: --module-type="ts"'
        },
        {
            option: 'watch',
            alias: 'w',
            type: 'Boolean',
            default: 'false',
            description: 'watch for changes'
        },
        {
            option: 'sourcemaps',
            alias: 's',
            type: 'Boolean',
            default: 'false',
            description: 'Generate external sourcemaps'
        }
    ]
});

module.exports = parseOptions.parse;
