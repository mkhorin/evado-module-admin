/**
 * @copyright Copyright (c) 2020 Maxim Khorin <maksimovichu@gmail.com>
 */
'use strict';

const Base = require('evado/component/notifier/Notice');

module.exports = class Notice extends Base {

    static getConstants () {
        return {
            RULES: super.RULES.concat([
                ['active', 'checkbox'],
                [['users', 'userFilters', 'noticeMessages'], 'relation']
            ]),
            BEHAVIORS: {
                relationChange: require('areto/behavior/RelationChangeBehavior'),
            },
            ATTR_LABELS: {
                name: 'Code name',
                recipient: 'Recipient configuration',
                template: 'Template configuration'
            },
            ATTR_VALUE_LABELS: {
                'methods': {
                    popup: 'Popup',
                    email: 'Email'
                }
            }
        };
    }

    relNoticeMessages () {
        const Class = this.getClass('model/NoticeMessage');
        return this.hasMany(Class, 'notice', this.PK);
    }

    relUserFilters () {
        const Class = this.getClass('model/UserFilter');
        return this.hasMany(Class, Class.PK, 'userFilters').viaArray();
    }

    relUsers () {
        const Class = this.getClass('model/User');
        return this.hasMany(Class, Class.PK, 'users').viaArray();
    }
};
module.exports.init(module);