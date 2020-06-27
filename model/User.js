/**
 * @copyright Copyright (c) 2020 Maxim Khorin <maksimovichu@gmail.com>
 */
'use strict';

const Base = require('evado/model/User');

module.exports = class User extends Base {

    static getConstants () {
        return {
            RULES: super.RULES.concat([
                ['password', 'required', {on: 'create'}],
                ['password', (attr, model) => model.spawn('security/PasswordValidator').validateAttr(attr, model)],
                [['roles', 'userPasswords'], 'relation']
            ]),
            BEHAVIORS: {
                relationChange: require('areto/behavior/RelationChangeBehavior'),
            },
            UNLINK_ON_DELETE: [
                'assignments',
                'filterIncludes',
                'filterExcludes',
                'notices',
                'popupNotifications',
                'userLogs',
                'userPasswords'
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
        return this.hasMany(Class, 'user', this.PK).deleteOnUnlink();
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

    relNotices () {
        const Class = this.getClass('model/Notice');
        return this.hasMany(Class, 'users', this.PK).viaArray();
    }

    relPopupNotifications () {
        const Class = this.getClass('model/PopupNotification');
        return this.hasMany(Class, 'user', this.PK).deleteOnUnlink();
    }

    relUserLogs () {
        const Class = this.getClass('model/UserLog');
        return this.hasMany(Class, 'user', this.PK).order({[Class.PK]: -1}).deleteOnUnlink();
    }

    relUserPasswords () {
        const Class = this.getClass('model/UserPassword');
        return this.hasMany(Class, 'user', this.PK).order({[Class.PK]: -1}).deleteOnUnlink();
    }
};
module.exports.init(module);