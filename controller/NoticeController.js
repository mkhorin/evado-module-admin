/**
 * @copyright Copyright (c) 2020 Maxim Khorin <maksimovichu@gmail.com>
 */
'use strict';

const Base = require('../component/base/CrudController');

module.exports = class NoticeController extends Base {

    getModelClass () {
        return this.getClass('model/Notice');
    }

    async actionExecute () {
        const notice = await this.getModel();
        const model = this.spawn('model/Data');
        if (this.isGet()) {
            return this.render('execute', {model});
        }
        if (!await model.load(this.getPostParams()).validate()) {
            return this.handleModelError(model);
        }
        await notice.execute(model.get('data'));
        if (notice.hasError()) {
            return this.handleModelError(notice);
        }
        this.sendText('Notification executed');
    }
};
module.exports.init(module);