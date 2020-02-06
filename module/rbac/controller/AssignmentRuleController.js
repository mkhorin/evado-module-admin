/**
 * @copyright Copyright (c) 2020 Maxim Khorin <maksimovichu@gmail.com>
 */
'use strict';

const Base = require('../component/base/CrudController');

module.exports = class AssignmentRuleController extends Base {

    actionList () {
        return super.actionList(this.createModel().find().with('items'));
    }
};
module.exports.init(module);