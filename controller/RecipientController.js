/**
 * @copyright Copyright (c) 2020 Maxim Khorin <maksimovichu@gmail.com>
 */
'use strict';

const Base = require('../component/base/CrudController');

module.exports = class RecipientController extends Base {

    getModelClass () {
        return this.getClass('model/Recipient');
    }

    actionList () {
        return super.actionList(this.createModel().find().with('message', 'user'));
    }
};
module.exports.init(module);