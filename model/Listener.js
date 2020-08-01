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
                [['notices', 'handlers', 'tasks'], 'relation']
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