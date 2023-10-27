/**
 * @copyright Copyright (c) 2020 Maxim Khorin <maksimovichu@gmail.com>
 */
'use strict';

const Base = require('evado/component/security/UserPassword');

module.exports = class UserPassword extends Base {

    static getConstants () {
        return {
            RULES: [
                ...super.RULES,
                ['password', 'required']
            ]
        };
    }
};
module.exports.init(module);