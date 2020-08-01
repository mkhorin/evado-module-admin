/**
 * @copyright Copyright (c) 2020 Maxim Khorin <maksimovichu@gmail.com>
 */
'use strict';

const Base = require('evado/component/notifier/NoticeMessage');

module.exports = class NoticeMessage extends Base {

    static getConstants () {
        return {
            RULES: super.RULES.concat([
                ['notice', 'relation']
            ]),
            BEHAVIORS: {
                relationChange: require('areto/behavior/RelationChangeBehavior'),
                timestamp: require('areto/behavior/TimestampBehavior')
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
};
module.exports.init(module);