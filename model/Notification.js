/**
 * @copyright Copyright (c) 2020 Maxim Khorin <maksimovichu@gmail.com>
 */
'use strict';

const Base = require('evado/component/notifier/Notification');

module.exports = class Notification extends Base {

    static getConstants () {
        return {
            RULES: [
                ...super.RULES,
                ['active', 'checkbox'],
                [['users', 'userFilters', 'messages'], 'relation']
            ],
            BEHAVIORS: {
                relationChange: require('areto/behavior/RelationChangeBehavior'),
            },
            ATTR_LABELS: {
                name: 'Code name',
                recipient: 'Recipient configuration',
                messageTemplate: 'Message template configuration',
                methods: 'Delivery methods'
            },
            ATTR_VALUE_LABELS: {
                'methods': {
                    popup: 'Popup',
                    email: 'Email'
                }
            }
        };
    }

    relMessages () {
        const Class = this.getClass('model/NotificationMessage');
        return this.hasMany(Class, 'notification', this.PK);
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