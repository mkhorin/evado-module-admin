/**
 * @copyright Copyright (c) 2020 Maxim Khorin <maksimovichu@gmail.com>
 */
'use strict';

const Base = require('../component/base/BaseActiveRecord');

module.exports = class AssignmentRule extends Base {

    static getConstants () {
        return {
            TABLE: 'sys_rbac_assignment_rule',
            ATTRS: [
                'active',
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
                ['config', 'spawn'],
                ['active', 'checkbox'],
                ['items', 'relation']
            ],
            UNLINK_ON_DELETE: [
                'items'
            ],
            ATTR_LABELS: {
                config: 'Spawn configuration',
                name: 'Code name'
            }
        };
    }

    relItems (Class = Item) {
        return this.hasMany(Class, 'assignmentRules', this.PK).viaArray();
    }
};
module.exports.init(module);

const Item = require('./Item');