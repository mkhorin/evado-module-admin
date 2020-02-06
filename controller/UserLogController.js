/**
 * @copyright Copyright (c) 2020 Maxim Khorin <maksimovichu@gmail.com>
 */
'use strict';

const Base = require('../component/base/CrudController');

module.exports = class UserLogController extends Base {

    getModelClass () {
        return this.getClass('model/UserLog');
    }
};
module.exports.init(module);