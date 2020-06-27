/**
 * @copyright Copyright (c) 2020 Maxim Khorin <maksimovichu@gmail.com>
 */
'use strict';

const Base = require('../component/base/CrudController');

module.exports = class PopupNotificationController extends Base {

    getModelClass () {
        return this.getClass('model/PopupNotification');
    }

    actionList () {
        return super.actionList(this.createModel().find().with('message', 'user'));
    }

    actionListRelated (params = {}) {
        switch (this.getQueryParam('rel')) {
            case 'message': params.with = 'notice'; break;
        }
        return super.actionListRelated(params);
    }
};
module.exports.init(module);