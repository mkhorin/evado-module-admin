/**
 * @copyright Copyright (c) 2020 Maxim Khorin <maksimovichu@gmail.com>
 */
'use strict';

const Base = require('evado/model/Task');

module.exports = class Task extends Base {

    static getConstants () {
        return {
            RULES: [
                ...super.RULES,
                ['stopOnFail', 'default', {value: true}]
            ],
            ATTR_LABELS: {
                name: 'Code name'
            }
        };
    }

    afterSave (insert) {
        this.module.getScheduler().updateTask(this);
        return super.afterInsert(insert);
    }
};
module.exports.init(module);