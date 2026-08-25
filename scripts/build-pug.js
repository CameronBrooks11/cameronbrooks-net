'use strict';
const upath = require('upath');
const sh = require('shelljs');
const renderPug = require('./render-pug');

const srcPath = upath.resolve(upath.dirname(__filename), '../src');

const pugFiles = sh.find(srcPath).filter(
    filePath =>
        filePath.match(/\.pug$/)
        && !filePath.match(/include/)
        && !filePath.match(/mixin/)
        && !filePath.match(/\/pug\/layouts\//)
);

// renderPug is async (Prettier 3), so forEach would not wait and a render
// failure would leave the process exiting 0 with dist/ already cleaned.
(async () => {
    for (const filePath of pugFiles) {
        await renderPug(filePath);
    }
})().catch(err => {
    console.error(err);
    process.exit(1);
});
