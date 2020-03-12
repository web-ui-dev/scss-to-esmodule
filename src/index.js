#! /usr/bin/env node

const glob = require('glob');
const chokidar = require('chokidar');
const parseOptions = require('./parse-options');
const writeToFile = require("./write-to-file");
const getPostCSSConfig = require("./postcss-process/get-postcss-config");

// parsed arguments/options passed in via CLI from the user
const { files, ignore, moduleType, watch, sourcemaps } = parseOptions(process.argv);

if (!files) throw new Error('invalid files path!');

// iterate through given path
glob(files, { nonull: true, ignore }, async (err, files) => {
    const { postcssPlugins } = await getPostCSSConfig();

    if (err) throw new Error(err);

    for await (let file of files) writeToFile(file, moduleType, postcssPlugins, sourcemaps);
});

if (!watch) return;

// watch file changes in watch mode
chokidar.watch(files, { ignored: ignore, persistent: true }).on('change', (file) => {
    console.info('changed:', file);
    writeToFile(file, moduleType, postcssPlugins, sourcemaps);
});
