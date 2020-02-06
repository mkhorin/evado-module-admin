/**
 * @copyright Copyright (c) 2020 Maxim Khorin <maksimovichu@gmail.com>
 */
'use strict';

const Base = require('evado/component/base/BaseModule');

module.exports = class AdminModule extends Base {

    static getConstants () {
        return {
            BEHAVIORS: {
                'access': {
                    Class: require('areto/filter/AccessControl'),
                    rules: [{permissions: ['moduleAdmin']}]
                }
            }
        };
    }
};
module.exports.init(module);