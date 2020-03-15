const { stripIndents } = require('common-tags');
/**
 * Wraps ES6 module definition arround the transpiled CSS string and logs with file name to notify
 * @param {buffer} cssContent transformed CSS
 */
const wrapESModule = (content, styleTemplate) => {
    if(styleTemplate === 'lit') return stripIndents`
        import {css} from 'lit-element';
        export const styles = css\`${content}\`;
        export default styles;
    `;

    return stripIndents`
        export const styles = \`${content}\`;
        export default styles;
    `;
};

module.exports = wrapESModule;
