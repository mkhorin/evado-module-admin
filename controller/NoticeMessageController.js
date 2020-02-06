/**
 * @copyright Copyright (c) 2020 Maxim Khorin <maksimovichu@gmail.com>
 */
'use strict';

const Base = require('../component/base/CrudController');

module.exports = class NoticeMessageController extends Base {

    getModelClass () {
        return this.getClass('model/NoticeMessage');
    }

    async actionSend () {
        const message = await this.getModel();
        await message.send()
            ? this.sendText('Message sent')
            : this.sendText('Message sending failed', 400);
    }

    actionList () {
        return super.actionList(this.createModel().find().with('notice'));
    }
};
module.exports.init(module);