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
        const query = this.createModel().find().with('message', 'user');
        return super.actionList(query);
    }

    getListRelatedWith (relation) {
        switch (relation) {
            case 'message':
                return 'notification';
        }
    }
};
module.exports.init(module);