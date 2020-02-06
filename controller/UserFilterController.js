/**
 * @copyright Copyright (c) 2020 Maxim Khorin <maksimovichu@gmail.com>
 */
'use strict';

const Base = require('../component/base/CrudController');

module.exports = class UserFilterController extends Base {

    getModelClass () {
        return this.getClass('model/UserFilter');
    }
};
module.exports.init(module);