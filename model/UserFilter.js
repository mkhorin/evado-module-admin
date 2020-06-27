/**
 * @copyright Copyright (c) 2020 Maxim Khorin <maksimovichu@gmail.com>
 */
'use strict';

const Base = require('evado/component/notifier/UserFilter');

module.exports = class UserFilter extends Base {

    static getConstants () {
        return {
            RULES: this.RULES.concat([
                [['items', 'includes', 'excludes'], 'relation']
            ]),
            BEHAVIORS: {
                relationChange: require('areto/behavior/RelationChangeBehavior'),
            },
            UNLINK_ON_DELETE: [
                'notices'
            ],
            ATTR_LABELS: {
                'name': 'Code name',
                'includes': 'Included users',
                'excludes': 'Excluded users',
                'config': 'Spawn configuration'
            }
        };
    }

    relItems () {
        const Class = this.getClass('rbac/model/Item');
        return this.hasMany(Class, Class.PK, 'items').viaArray();
    }

    relIncludes () {
        const Class = this.getClass('model/User');
        return this.hasMany(Class, Class.PK, 'includes').viaArray();
    }

    relExcludes () {
        const Class = this.getClass('model/User');
        return this.hasMany(Class, Class.PK, 'excludes').viaArray();
    }

    relNotices () {
        const Class = this.getClass('model/Notice');
        return this.hasMany(Class, 'userFilters', this.PK).viaArray();
    }
};
module.exports.init(module);