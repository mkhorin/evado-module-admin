/**
 * @copyright Copyright (c) 2020 Maxim Khorin <maksimovichu@gmail.com>
 */
'use strict';

const Base = require('../component/base/BaseActiveRecord');

module.exports = class Item extends Base {

    static getConstants () {
        return {
            TABLE: 'sys_rbac_item',
            ATTRS: [
                'type',
                'name',
                'label',
                'description',
                'rule',
                'assignmentRules'
            ],
            RULES: [
                ['name', 'required'],
                ['type', 'required', {on: 'create'}],
                ['type', 'range', {range: ['permission', 'role', 'route'], on: 'create'}],
                ['name', 'string', {min: 1, max: 48}],
                ['name', 'regex', {pattern: /^[0-9a-z-_\/ ]+$/i}],
                ['name', 'unique'],
                [['description', 'label'], 'string'],
                [['childPermissions', 'childRoles', 'parentRoles', 'rule', 'users', 'assignmentRules'], 'relation']
            ],
            DELETE_ON_UNLINK: [
                'assignments',
                'childItems',
                'parentItems'
            ],
            UNLINK_ON_DELETE: [
                'metaItems'
            ],
            QUERY_CLASS: require('../query/ItemQuery'),
            TYPE_PERMISSION: 'permission',
            TYPE_ROLE: 'role',
            TYPE_ROUTE: 'route',
            ATTR_LABELS: {
                'children': 'Child items',
                'parents': 'Parent items'
            },
            ATTR_VALUE_LABELS: {
                'type': {
                    permission: 'Permission',
                    role: 'Role',
                    route: 'Route'
                }
            }
        };
    }

    isRole () {
        return this.get('type') === this.TYPE_ROLE;
    }

    isPermission () {
        return this.get('type') === this.TYPE_PERMISSION;
    }

    isRoute () {       
        return this.get('type') === this.TYPE_ROUTE;
    }

    // RELATIONS

    relAssignments () {
        const Class = this.getClass('model/Assignment');
        return this.hasMany(Class, 'item', this.PK);
    }

    relAssignmentRules () {
        const Class = this.getClass('model/AssignmentRule');
        return this.hasMany(Class, Class.PK, 'assignmentRules').viaArray();
    }

    relChildItems () {
        const Class = this.getClass('model/ItemChild');
        return this.hasMany(Class, 'parent', this.PK);
    }

    relChildren () {
        return this.hasMany(this.constructor, this.PK, 'child').via('childItems');
    }

    relChildPermissions () {
        return this.relChildren().onlyPermissions();
    }

    relChildRoles () {
        return this.relChildren().onlyRoles();
    }

    relMetaItems () {
        const Class = this.getClass('model/MetaItem');
        return this.hasMany(Class, 'roles', this.PK).viaArray();
    }

    relParentItems () {
        const Class = this.getClass('model/ItemChild');
        return this.hasMany(Class, 'child', this.PK);
    }

    relParents () {
        return this.hasMany(this.constructor, this.PK, 'parent').via('parentItems');
    }

    relParentPermissions () {
        return this.relParents().onlyPermissions();
    }

    relParentRoles () {
        return this.relParents().onlyRoles();
    }

    relRule () {
        const Class = this.getClass('model/Rule');
        return this.hasOne(Class, Class.PK, 'rule');
    }

    relUsers () {
        const Class = this.getClass('model/User');
        return this.hasMany(Class, Class.PK, 'user').via('assignments');
    }
};
module.exports.init(module);