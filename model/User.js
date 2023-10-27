/**
 * @copyright Copyright (c) 2020 Maxim Khorin <maksimovichu@gmail.com>
 */
'use strict';

const Base = require('evado/model/User');

module.exports = class User extends Base {

    static getConstants () {
        return {
            RULES: [
                ...super.RULES,
                ['password', 'required', {on: 'create'}],
                ['password', 'validator/PasswordValidator'],
                [['roles', 'userPasswords'], 'relation']
            ],
            BEHAVIORS: {
                relationChange: require('areto/behavior/RelationChangeBehavior'),
            },
            DELETE_ON_UNLINK: [
                'assignments',
                'popupNotifications',
                'userLogs',
                'userPasswords'
            ],
            UNLINK_ON_DELETE: [
                'filterIncludes',
                'filterExcludes',
                'notifications',
                'notificationMessages'
            ],
        };
    }

    async afterInsert () {
        await this.createPassword();
        return super.afterInsert();
    }

    createPassword () {
        const model = this.spawn('security/UserPassword');
        model.set('user', this.getId());
        model.set('password', this.get('password'));
        return model.save();
    }

    relAssignments () {
        const Class = this.getClass('rbac/model/Assignment');
        return this.hasMany(Class, 'user', this.PK);
    }

    relRoles () {
        const Class = this.getClass('rbac/model/Item');
        return this.hasMany(Class, Class.PK, 'item').via('assignments');
    }

    relFilterIncludes () {
        const Class = this.getClass('model/UserFilter');
        return this.hasMany(Class, 'includes', this.PK).viaArray();
    }

    relFilterExcludes () {
        const Class = this.getClass('model/UserFilter');
        return this.hasMany(Class, 'excludes', this.PK).viaArray();
    }

    relNotifications () {
        const Class = this.getClass('model/Notification');
        return this.hasMany(Class, 'users', this.PK).viaArray();
    }

    relNotificationMessages () {
        const Class = this.getClass('model/NotificationMessage');
        return this.hasMany(Class, 'recipients', this.PK).viaArray();
    }

    relPopupNotifications () {
        const Class = this.getClass('model/PopupNotification');
        return this.hasMany(Class, 'user', this.PK);
    }

    relUserLogs () {
        const Class = this.getClass('model/UserLog');
        return this.hasMany(Class, 'user', this.PK).order({[Class.PK]: -1});
    }

    relUserPasswords () {
        const Class = this.getClass('model/UserPassword');
        return this.hasMany(Class, 'user', this.PK).order({[Class.PK]: -1});
    }
};
module.exports.init(module);