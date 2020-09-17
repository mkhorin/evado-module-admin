/**
 * @copyright Copyright (c) 2020 Maxim Khorin <maksimovichu@gmail.com>
 */
'use strict';

const Base = require('evado/component/notifier/NoticeMessage');

module.exports = class NoticeMessage extends Base {

    static getConstants () {
        return {
            RULES: super.RULES.concat([
                [['notice', 'recipients'], 'relation']
            ]),
            BEHAVIORS: {
                relationChange: require('areto/behavior/RelationChangeBehavior'),
                timestamp: require('areto/behavior/TimestampBehavior')
            },
            ATTR_LABELS: {
                'recipients': 'Direct recipients'
            }
        };
    }

    relNotice () {
        const Class = this.getClass('model/Notice');
        return this.hasOne(Class, Class.PK, 'notice');
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