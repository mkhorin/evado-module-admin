/**
 * @copyright Copyright (c) 2020 Maxim Khorin <maksimovichu@gmail.com>
 */
'use strict';

const Base = require('../component/base/CrudController');

module.exports = class NotificationController extends Base {

    getModelClass () {
        return this.getClass('model/Notification');
    }

    async actionCreateMessage () {
        const notification = await this.getModel();
        const model = this.spawn('model/Data');
        if (this.isGetRequest()) {
            return this.render('createMessage', {model});
        }
        if (!await model.load(this.getPostParams()).validate()) {
            return this.handleModelError(model);
        }
        await this.module.getNotifier().createMessage(notification, model.getData());
        if (notification.hasError()) {
            return this.handleModelError(notification);
        }
        this.sendText('Notification message created');
    }
};
module.exports.init(module);