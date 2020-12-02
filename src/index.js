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
// iterate through given path
glob(files, { nonull: true, ignore }, async (err, files) => {
    const postcssPlugins = await getPostcssPlugins();

    if (err) throw new Error(err);

    for await (let file of files) writeToFile({ file, moduleType, postcssPlugins, isSourcemapsEnabled: sourcemaps, styleTemplate });
});

if (!watch) return;

// watch file changes in watch mode
chokidar.watch(files, { ignored: ignore }).on('change', async (file, stats) => {
    const postcssPlugins = await getPostcssPlugins();
    if (stats) console.log(`File ${file} changed size to ${stats.size}`);
    console.info('changed:', file);
    writeToFile({ file, moduleType, postcssPlugins, isSourcemapsEnabled: sourcemaps, styleTemplate });
});
