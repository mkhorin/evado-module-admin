/**
 * @copyright Copyright (c) 2020 Maxim Khorin <maksimovichu@gmail.com>
 */
'use strict';

const Base = require('evado/model/Task');

module.exports = class Task extends Base {

    static getConstants () {
        return {
            RULES: this.RULES.concat([
            ])
        };
    }

    afterSave (insert) {
        this.module.getScheduler().updateTask(this);
        return super.afterInsert(insert);
    }
};
module.exports.init(module);