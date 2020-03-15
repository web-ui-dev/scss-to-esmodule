[![npm][npm]][npm-url]
[![node][node]][node-url]
[![license][license]][license-url]

# @web-ui/scss-to-esmodule

Transpile .scss files, apply postcss plugins if defined and wrap the styles inside template literal string and export as ESM.

## Install

```
    npm i -g|-D @web-ui/scss-to-esmodule
```

## Usage

```text
Usage:
    scss-to-esmodule [-f|--files="src/**/*.scss"] [OPTIONS] [-i|--ignore="['src/ignore-dir/**']"] [-m|--module-type="ts|js"] [--watch|-w] [--sourcemaps|-s] [--template|-t]

Options:
    -f, --files         File path/glob pattern                                                              [string]
    -i, --ignore        ignore files/folders                                                                [array]
    -m, --module-type   Output module type[ts|js], defaults to js                                           [string]
    -s, --sourcemaps    Generate sourcemaps                                                                 [boolean]
    -w, --watch         Watch files for changes and recompile as needed                                     [boolean]
    -t,--template       Esmodule created with lit-element `css` tagged template, defaults to native         [string]

Examples:
    scss-to-esmodule -f="input.scss"                                Basic usage
    scss-to-esmodule -f="src/**/*.scss" -i="['src/ignore-dir/**']"  Glob Pattern & ignore specific folders
    scss-to-esmodule -f="input.scss" -m="ts"                        Module type as TS, defaults to JS
    scss-to-esmodule -f="input.scss" -s                             Sourcemaps enabled
    scss-to-esmodule -f="input.scss" -w                             Watch for file changes
    scss-to-esmodule -f="input.scss" -t='lit                        Esmodule created with lit-element `css` tagged template

```

> Note: if  styles module imported as tagged template literal to embed inside shadowDOM, source maps won't work.

[npm]: https://img.shields.io/npm/v/@web-ui/scss-to-esmodule.svg
[npm-url]: https://npmjs.com/package/@web-ui/scss-to-esmodule
[node]: https://img.shields.io/node/v/@web-ui/scss-to-esmodule.svg
[node-url]: https://nodejs.org/
[license]: https://img.shields.io/npm/l/baseui-wc-base-component.svg
[license-url]: https://opensource.org/licenses/MIT
