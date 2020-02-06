/**
 * @copyright Copyright (c) 2020 Maxim Khorin <maksimovichu@gmail.com>
 */
'use strict';

const Base = require('areto/base/Model');

module.exports = class Data extends Base {

    static getConstants () {
        return {
            RULES: [
                ['data', 'json']
            ]
        };
    }
};
module.exports.init(module);