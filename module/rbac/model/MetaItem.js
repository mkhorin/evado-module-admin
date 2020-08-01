/**
 * @copyright Copyright (c) 2020 Maxim Khorin <maksimovichu@gmail.com>
 */
'use strict';

const Base = require('../component/base/BaseActiveRecord');

module.exports = class MetaItem extends Base {

    static getConstants () {
        return {
            TABLE: 'sys_rbac_meta_item',
            ATTRS: [
                'type',
                'actions',
                'description',
                'roles',
                'rule'
            ],
            RULES: [
                [['type', 'actions'], 'required'],
                ['type', 'range', {range: ['allow', 'deny']}],
                ['actions', 'filter', {filter: 'split'}],
                ['actions', 'each', {rule: 'range', params: {range: ['all', 'read', 'create', 'update', 'delete']}}],
                ['actions', 'validateActions'],
                ['description', 'string'],
                [['roles', 'rule', 'targets'], 'relation']
            ],
            DELETE_ON_UNLINK: [
                'targets'
            ]
        };
    }

    getRbac () {
        return this.module.getRbac();
    }

    isDeny () {
        return this.get('type') === this.getRbac().DENY;
    }

    validateActions (attr) {
        const rbac = this.getRbac();
        const value = this.get(attr);
        if (value.includes(rbac.ALL)) {
            this.set(attr, [rbac.ALL]);
        }
    }

    // RELATIONS

    relRoles (Class = Item) {
        return this.hasMany(Class, Class.PK, 'roles').onlyRoles().viaArray();
    }

    relRule (Class = Rule) {
        return this.hasOne(Class, Class.PK, 'rule');
    }

    relTargets (Class = MetaTarget) {
        return this.hasMany(Class, 'item', Class.PK);
    }
};
module.exports.init(module);

const Item = require('./Item');
const MetaTarget = require('./MetaTarget');
const Rule = require('./Rule');