/**
 * @copyright Copyright (c) 2020 Maxim Khorin <maksimovichu@gmail.com>
 */
'use strict';

const Base = require('evado/component/observer/EventHandler');

module.exports = class EventHandler extends Base {

    static getConstants () {
        return {            
            RULES: [
                [['name', 'config'], 'required'],
                ['name', 'string'],
                ['name', 'unique'],
                ['config', 'spawn']
            ],
            ATTR_LABELS: {
                'config': 'Spawn configuration'
            }
        };
    }
};
module.exports.init(module);