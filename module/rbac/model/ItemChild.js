/**
 * @copyright Copyright (c) 2020 Maxim Khorin <maksimovichu@gmail.com>
 */
'use strict';

const Base = require('../component/base/BaseActiveRecord');

module.exports = class ItemChild extends Base {

    static getConstants () {
        return {
            TABLE: 'sys_rbac_item_child',
            ATTRS: [
                'parent',
                'child'
            ],
            RULES: [
                [['parent', 'child'], 'required'],
                [['parent', 'child'], 'id'],
                [['parent', 'child'], 'unique', {targetAttr: ['parent', 'child']}]
            ]
        };
    }

    relParent (Class = Item) {
        return this.hasOne(Class, Class.PK, 'parent');
    }

    relChild (Class = Item) {
        return this.hasOne(Class, Class.PK, 'child');
    }
};
module.exports.init(module);

const Item = require('./Item');