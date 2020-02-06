/**
 * @copyright Copyright (c) 2020 Maxim Khorin <maksimovichu@gmail.com>
 */
'use strict';

const Base = require('../component/base/CrudController');

module.exports = class UserController extends Base {

    getModelClass () {
        return this.getClass('model/User');
    }

    actionList () {
        return super.actionList(this.createModel().find().with('roles'));
    }
};
module.exports.init(module);