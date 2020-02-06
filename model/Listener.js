/**
 * @copyright Copyright (c) 2020 Maxim Khorin <maksimovichu@gmail.com>
 */
'use strict';

const Base = require('evado/component/observer/Listener');

module.exports = class Listener extends Base {

    static getConstants () {
        return {
            ATTRS: [
                'active',
                'events',
                'description',
                'handlers',
                'notices',
                'tasks'
            ],
            RULES: [
                ['events', 'required'],
                ['active', 'checkbox'],
                [['events', 'description'], 'string'],
                ['events', 'filter', {filter: 'split'}],
                [['notices', 'handlers', 'tasks'], 'relation']
            ],
            BEHAVIORS: {
                relationChange: require('areto/behavior/RelationChangeBehavior'),
            }
        };
    }

    relHandlers () {
        const Class = this.getClass('model/EventHandler');
        return this.hasMany(Class, Class.PK, 'handlers').viaArray();
    }

    relNotices () {
        const Class = this.getClass('model/Notice');
        return this.hasMany(Class, Class.PK, 'notices').viaArray();
    }

    relTasks () {
        const Class = this.getClass('model/Task');
        return this.hasMany(Class, Class.PK, 'tasks').viaArray();
    }
};
module.exports.init(module);