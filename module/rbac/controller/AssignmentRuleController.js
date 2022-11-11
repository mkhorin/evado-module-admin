/**
 * @copyright Copyright (c) 2020 Maxim Khorin <maksimovichu@gmail.com>
 */
'use strict';

const Base = require('../component/base/CrudController');

module.exports = class AssignmentRuleController extends Base {

    actionList () {
        const query = this.createModel().find().with('items');
        return super.actionList(query);
    }
};
module.exports.init(module);