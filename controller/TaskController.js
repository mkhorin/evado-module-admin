/**
 * @copyright Copyright (c) 2020 Maxim Khorin <maksimovichu@gmail.com>
 */
'use strict';

const Base = require('../component/base/CrudController');

module.exports = class TaskController extends Base {

    getModelClass () {
        return this.getClass('model/Task');
    }

    async actionExecute () {
        const model = await this.getModel();
        await model.execute()
            ? this.sendText('Task executed')
            : this.sendText(model.getFirstError(), 400);
    }

    async actionRefresh () {
        await this.module.getScheduler().refresh();
        this.sendText('Scheduler refreshed');
    }
};
module.exports.init(module);