/**
 * @copyright Copyright (c) 2020 Maxim Khorin <maksimovichu@gmail.com>
 */
'use strict';

const Base = require('../component/base/CrudController');

module.exports = class RuleController extends Base {

    actionListRelated (params = {}) {
        switch (this.getQueryParam('rel')) {
            case 'metaItems': params.with = ['targets']; break;
        }
        return super.actionListRelated(params);
    }
};
module.exports.init(module);