/**
 * @copyright Copyright (c) 2020 Maxim Khorin <maksimovichu@gmail.com>
 */
'use strict';

const Base = require('evado/component/notifier/NotificationMessage');

module.exports = class NotificationMessage extends Base {

    static getConstants () {
        return {
            RULES: [
                ...super.RULES,
                [['notification', 'recipients'], 'relation']
            ],
            BEHAVIORS: {
                relationChange: require('areto/behavior/RelationChangeBehavior'),
                timestamp: require('areto/behavior/TimestampBehavior')
            },
            ATTR_LABELS: {
                'recipients': 'Direct recipients'
            }
        };
    }

    relNotification () {
        const Class = this.getClass('model/Notification');
        return this.hasOne(Class, Class.PK, 'notification');
    }

    relPopupNotifications () {
        const Class = this.getClass('model/PopupNotification');
        return this.hasMany(Class, 'message', this.PK);
    }

    relRecipients () {
        const Class = this.getClass('model/User');
        return this.hasMany(Class, Class.PK, 'recipients').viaArray();
    }
};
module.exports.init(module);