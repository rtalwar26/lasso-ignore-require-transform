'use strict';
var path = require('path');
module.exports = {
    id: __filename,
    stream: false,
    createTransform: function (transformConfig) {
        var extensions = transformConfig.extensions;
        if (!extensions) {
            extensions = ['.js', '.es6'];
        }
        transformConfig.modules = transformConfig.modules || [];
        extensions = extensions.reduce(function (lookup, ext) {
            if (ext.charAt(0) !== '.') {
                ext = '.' + ext;
            }
            lookup[ext] = true;
            return lookup;
        }, {});
        return function lassoBabelTransform(code, lassoContext) {
            var filename = lassoContext.filename;
            if (!filename || !extensions.hasOwnProperty(path.extname(filename))) {
                // This shouldn't be the case
                return code;
            }
            for (var _i = 0, _a = transformConfig.modules; _i < _a.length; _i++) {
                var mod = _a[_i];
                var reg = new RegExp("require\\(['\"]" + mod + "['\"]\\)", 'g');
                code = code.replace(reg, "{}");
            }
            return code;
        };
    }
};
