/**
 * @copyright Copyright (c) 2020 Maxim Khorin <maksimovichu@gmail.com>
 */
'use strict';

const Base = require('evado/component/observer/EventHandler');

module.exports = class EventHandler extends Base {

    static getConstants () {
        return {
            ATTR_LABELS: {
                config: 'Spawn configuration',
                name: 'Code name'
            }
        };
    }
};
module.exports.init(module);