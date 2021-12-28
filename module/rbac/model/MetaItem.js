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
                'rules'
            ],
            RULES: [
                ['type', 'required'],
                ['type', 'range', {values: ['allow', 'deny']}],
                ['actions', 'filter', {method: 'split'}],
                ['actions', 'each', {
                    rule: 'range',
                    params: {values: ['all', 'read', 'create', 'update', 'delete', 'history']}
                }],
                ['actions', 'validateActions'],
                ['description', 'string'],
                [['roles', 'rules', 'targets'], 'relation']
            ],
            DELETE_ON_UNLINK: [
                'targets'
            ]
        };
    }

    isAllow () {
        return this.get('type') === this.getRbac().ALLOW;
    }

    isDeny () {
        return this.get('type') === this.getRbac().DENY;
    }

    getRbac () {
        return this.module.getRbac();
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

    relRules (Class = Rule) {
        return this.hasMany(Class, Class.PK, 'rules').viaArray();
    }

    relTargets (Class = MetaTarget) {
        return this.hasMany(Class, 'item', Class.PK);
    }
};
module.exports.init(module);

const Item = require('./Item');
const MetaTarget = require('./MetaTarget');
const Rule = require('./Rule');