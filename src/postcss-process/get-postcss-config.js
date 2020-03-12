const to = require('await-to-js').default;
const postcssrc = require('postcss-load-config');

/**
 * Check if post config and plugins exist
 * @returns {array} postcssPlugins list of plugins from config
 */
const getPostCSSConfig = async () => {
    const [error, postCSSConfig] = await to(postcssrc());

    // no config found, display warning
    if (!postCSSConfig) {
        console.warn(error.message);
        console.info('skipping postCSS process!');
        return { postcssPlugins: null };
    }

    const { plugins } = postCSSConfig;

    // config found but plugins undefined,
    if (!plugins || plugins.length === 0) {
        console.info('postcss plugins not found, skipping postCSS process!');
        return { postcssPlugins: null };
    }

    return { postcssPlugins: plugins };
};

module.exports = getPostCSSConfig;
