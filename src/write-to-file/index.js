const fs = require('fs');
const path = require('path');
const sass = require('node-sass');
const postcssProcess = require("../postcss-process");
const wrapESModule = require("../wrap-esmodule");

/**
 * Error callback to log failures
 */
const writeFileCallback = (error) => {
    if (error) throw new Error(error);
};

/**
 * Given the file path transpile and create JS/TS module
 * @param {string} file path
 */
const writeToFile = async ({ file, moduleType, postcssPlugins, isSourcemapsEnabled, styleTemplate }) => {
    const outputFilePath = path.join(file.replace('.scss', `.${moduleType}`));
    const sassRenderOptions = {
        file,
        outFile: outputFilePath,
        outputStyle: 'compressed',
        sourceMap: isSourcemapsEnabled,
        sourceMapContents: isSourcemapsEnabled,
        omitSourceMapUrl: true
    };

    const sassRenderResults = sass.renderSync(sassRenderOptions);

    // apply postcss transformation
    const { css, map } = await postcssProcess(sassRenderResults.css, sassRenderResults.map, file, postcssPlugins);

    // write js/ts file
    fs.writeFileSync(outputFilePath, wrapESModule(css, styleTemplate), writeFileCallback);
    console.info(`------  styles to ${moduleType} module  with ${styleTemplate} complete :: ${outputFilePath}`);

    // skip writing sourcemaps file if sourcemaps not enabled
    if (!isSourcemapsEnabled || !map) return;

    const sourceMapFilePath = `${file}.map`;
    fs.writeFileSync(sourceMapFilePath, map, writeFileCallback);
    console.info(`------  generate sourcemap complete :: ${sourceMapFilePath}`);
};

module.exports = writeToFile;
