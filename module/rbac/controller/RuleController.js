/**
 * @copyright Copyright (c) 2020 Maxim Khorin <maksimovichu@gmail.com>
 */
'use strict';

const Base = require('../component/base/CrudController');

module.exports = class RuleController extends Base {

    getListRelatedWith (relation) {
        switch (relation) {
            case 'metaItems':
                return 'targets';
        }
    }
};
module.exports.init(module);