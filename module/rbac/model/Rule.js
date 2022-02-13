/**
 * @copyright Copyright (c) 2020 Maxim Khorin <maksimovichu@gmail.com>
 */
'use strict';

const Base = require('../component/base/BaseActiveRecord');

module.exports = class Rule extends Base {

    static getConstants () {
        return {
            TABLE: 'sys_rbac_rule',
            ATTRS: [
                'name',
                'label',
                'description',
                'config'
            ],
            RULES: [
                [['name', 'config'], 'required'],
                ['name', 'string', {min: 2, max: 48}],
                ['name', 'regex', {pattern: /^[0-9a-z-]+$/i}],
                ['name', 'unique'],
                [['description', 'label'], 'string'],
                ['config', 'spawn', {BaseClass: require('areto/security/rbac/Rule')}],
                [['items', 'metaItems'], 'relation']
            ],
            UNLINK_ON_DELETE: [
                'items',
                'metaItems'
            ],
            ATTR_LABELS: {
                config: 'Spawn configuration',
                metaItems: 'Metadata items',
                name: 'Code name'
            }
        };
    }

    // RELATIONS

    relItems (Class = Item) {
        return this.hasMany(Class, 'rules', this.PK);
    }

    relMetaItems (Class = MetaItem) {
        return this.hasMany(Class, 'rules', this.PK);
    }
};
module.exports.init(module);

const Item = require('./Item');
const MetaItem = require('./MetaItem');