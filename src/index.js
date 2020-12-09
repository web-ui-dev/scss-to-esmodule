#! /usr/bin/env node

const glob = require('glob');
const chokidar = require('chokidar');
const parseOptions = require('./parse-options');
const writeToFile = require("./write-to-file");
const getPostCSSConfig = require("./postcss-process/get-postcss-config");

// parsed arguments/options passed in via CLI from the user
const { files, ignore, moduleType, watch, sourcemaps, styleTemplate } = parseOptions(process.argv);

if (!files) throw new Error('invalid files path!');

const getPostcssPlugins = async () => {
    const { postcssPlugins } = await getPostCSSConfig();
    return postcssPlugins;
};

const watchForChange = async (file) => {
    console.info('changed:', file);
    const postcssPlugins = await getPostcssPlugins();
    writeToFile({ file, moduleType, postcssPlugins, isSourcemapsEnabled: sourcemaps, styleTemplate });
}

// iterate through given path
glob(files, { nonull: true, ignore }, async (err, filteredFiles) => {
    const postcssPlugins = await getPostcssPlugins();

    if (err) throw new Error(err);
    for await (let file of filteredFiles) writeToFile({ file, moduleType, postcssPlugins, isSourcemapsEnabled: sourcemaps, styleTemplate });

    // watch file changes in watch mode
    if (!watch) return;
    chokidar.watch(filteredFiles, { ignored: ignore }).on('change', watchForChange);
});
