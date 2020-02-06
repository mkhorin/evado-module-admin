/**
 * @copyright Copyright (c) 2020 Maxim Khorin <maksimovichu@gmail.com>
 */
'use strict';

const Base = require('evado/component/base/BaseViewModel');

module.exports = class MetaTargetList extends Base {

    prepareModels (models) {
        const rbac = this.module.getRbac();
        const typeMap = rbac.VALUE_LABELS.targets;
        for (const model of models) {
            model.setAttrValueLabel('type', typeMap);
            model.setViewAttr('key', model.getTargetKey());
        }
    }
};