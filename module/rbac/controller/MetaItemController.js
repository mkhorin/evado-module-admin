/**
 * @copyright Copyright (c) 2020 Maxim Khorin <maksimovichu@gmail.com>
 */
'use strict';

const Base = require('../component/base/CrudController');

module.exports = class MetaItemController extends Base {

    static getConstants () {
        return {
            ACTIONS: {
                'sortRelatedArray': {
                    Class: require('evado/component/action/SortRelatedArrayAction')
                }
            }
        };
    }

    actionList () {
        const query = this.createModel().find().with('roles', 'rules', 'targets');
        return super.actionList(query);
    }
};
module.exports.init(module);