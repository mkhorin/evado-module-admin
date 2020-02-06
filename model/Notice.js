/**
 * @copyright Copyright (c) 2020 Maxim Khorin <maksimovichu@gmail.com>
 */
'use strict';

const Base = require('evado/component/notifier/Notice');

module.exports = class Notice extends Base {

    static getConstants () {
        return {
            RULES: [
                [['subject', 'text', 'methods'], 'required'],
                ['active', 'checkbox'],
                ['methods', 'filter', {filter: 'split'}],
                [['users', 'userFilters', 'noticeMessages'], 'relation'],
                ['options', 'json']
            ],
            BEHAVIORS: {
                relationChange: require('areto/behavior/RelationChangeBehavior'),
            },
            ATTR_VALUE_LABELS: {
                'methods': {
                    message: 'Message',
                    email: 'Email'
                }
            }
        };
    }

    relNoticeMessages () {
        const Class = this.getClass('model/NoticeMessage');
        return this.hasMany(Class, 'notice', this.PK).deleteOnUnlink();
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