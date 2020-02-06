/**
 * @copyright Copyright (c) 2020 Maxim Khorin <maksimovichu@gmail.com>
 */
'use strict';

const Base = require('../component/base/CrudController');

module.exports = class ListenerController extends Base {

    getModelClass () {
        return this.getClass('model/Listener');
    }

    async actionRestart () {
        await this.module.getObserver().load();
        this.sendText('Observer restarted')
    }

    async actionTrigger () {
        const model = this.spawn('model/Trigger');
        if (this.isGet()) {
            return this.render('trigger', {model});
        }
        model.load(this.getPostParams());
        if (!await model.execute()) {
            return this.handleModelError(model);
        }
        this.sendText('Events triggered');
    }
};
module.exports.init(module);