const to = require('await-to-js').default;
const postcss = require('postcss');

/**
 * Apply postCSS plugins if config defined
 * @param {buffer} cssContent transformed CSS
 * @param {string} filepath
 * @returns {object} results object, { css, map, opts, root, messages, processor }
 */
const postcssProcess = async (cssContent, mapContent, filepath, postcssPlugins) => {
    // if plugins not defined skip process
    if (!postcssPlugins) return { css: cssContent, map: mapContent };

    const postcssProcessOptions = {
        from: filepath,
        map: mapContent ? { inline: false } : false,
        sourcesContent: true,
        prev: mapContent
    };

    const [err, transformedCSS] = await to(postcss(postcssPlugins).process(cssContent, postcssProcessOptions));

    if (err) throw Error(err);

    return transformedCSS;
};

module.exports = postcssProcess;
