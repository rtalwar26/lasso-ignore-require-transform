'use strict';
const path = require('path');
module.exports = {
    id: __filename,
    stream: false,
    createTransform(transformConfig) {

        let extensions = transformConfig.extensions;

        if (!extensions) {
            extensions = ['.js', '.es6'];
        }
        transformConfig.modules = transformConfig.modules || [];
        extensions = extensions.reduce((lookup, ext) => {
            if (ext.charAt(0) !== '.') {
                ext = '.' + ext;
            }
            lookup[ext] = true;
            return lookup;
        }, {});

        return function lassoBabelTransform(code, lassoContext) {
            let filename = lassoContext.filename;

            if (!filename || !extensions.hasOwnProperty(path.extname(filename))) {
                // This shouldn't be the case
                return code;
            }


            for (let mod of transformConfig.modules) {
                let reg = new RegExp(`require\\(['"]${mod}['"]\\)`, 'g');
                code = code.replace(reg, `{}`);
            }

            return code;
        };
    }
};