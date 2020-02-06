/**
 * @copyright Copyright (c) 2020 Maxim Khorin <maksimovichu@gmail.com>
 */
'use strict';

const Base = require('../component/base/CrudController');

module.exports = class MetaItemController extends Base {

    actionList () {
        return super.actionList(this.createModel().find().with('roles', 'rule', 'targets'));
    }
};
module.exports.init(module);