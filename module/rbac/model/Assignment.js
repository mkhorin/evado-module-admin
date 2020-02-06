/**
 * @copyright Copyright (c) 2020 Maxim Khorin <maksimovichu@gmail.com>
 */
'use strict';

const Base = require('../component/base/BaseActiveRecord');

module.exports = class Assignment extends Base {

    static getConstants () {
        return {
            TABLE: 'sys_rbac_assignment',
            ATTRS: [
                'user',
                'item'
            ],
            RULES: [
                [['user', 'item'], 'required'],
                [['user', 'item'], 'id'],
                [['user', 'item'], 'unique', { targetAttr: ['parent', 'child']}],
            ]
        };
    }

    relItem (Class = Item) {
        return this.hasOne(Class, Class.PK, 'item');
    }

    relUser () {
        const Class = this.getClass('model/User');
        return this.hasOne(Class, Class.PK, 'user');
    }
};
module.exports.init(module);

const Item = require('./Item');