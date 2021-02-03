/**
 * @copyright Copyright (c) 2020 Maxim Khorin <maksimovichu@gmail.com>
 */
'use strict';

const Base = require('evado/component/observer/Listener');

module.exports = class Listener extends Base {

    static getConstants () {
        return {
            RULES: super.RULES.concat([
                ['active', 'checkbox'],
                ['description', 'string'],
                [['notifications', 'handlers', 'tasks'], 'relation']
            ]),
            BEHAVIORS: {
                relationChange: require('areto/behavior/RelationChangeBehavior'),
            }
        };
    }

    relHandlers () {
        const Class = this.getClass('model/EventHandler');
        return this.hasMany(Class, Class.PK, 'handlers').viaArray();
    }

    relNotifications () {
        const Class = this.getClass('model/Notification');
        return this.hasMany(Class, Class.PK, 'notifications').viaArray();
    }

    relTasks () {
        const Class = this.getClass('model/Task');
        return this.hasMany(Class, Class.PK, 'tasks').viaArray();
    }
};
module.exports.init(module);