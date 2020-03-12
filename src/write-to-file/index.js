const fs = require('fs');
const path = require('path');
const sass = require('node-sass');
const postcssProcess = require("../postcss-process");
const wrapESModule = require("../wrap-esmodule");

/**
 * Error callback to log failures
 */
const errorCallback = (error) => {
    if (error) throw new Error(error);
};

/**
 * Given the file path transpile and create JS/TS module
 * @param {string} file path
 */
const writeToFile = async (file, moduleType, postcssPlugins, isSourcemapsEnabled) => {
    const outputFilePath = path.join(`${file}.${moduleType}`);
    const sassRenderOptions = {
        file,
        outputStyle: 'compressed',
        sourceMap: isSourcemapsEnabled,
        outFile: outputFilePath
    };

    const sassRenderResults = sass.renderSync(sassRenderOptions);

    // apply postcss transformation
    const { css, map } = await postcssProcess(sassRenderResults.css, sassRenderResults.map, file, postcssPlugins);

    // write js/ts file
    fs.writeFile(outputFilePath, wrapESModule(css), { encoding: 'utf8' }, errorCallback);
    console.info(`-----------------------  styles to ${moduleType} module complete :: ${outputFilePath}`);

    // skip writing sourcemaps file if sourcemaps not enabled
    if (!isSourcemapsEnabled || !map) return;

    const sourceMapFilePath = `${outputFilePath}.map`;
    fs.writeFile(sourceMapFilePath, map, errorCallback);
    console.info(`-----------------------  generate sourcemap complete :: ${sourceMapFilePath}`);
};

module.exports = writeToFile;
