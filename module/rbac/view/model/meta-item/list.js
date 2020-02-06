/**
 * @copyright Copyright (c) 2020 Maxim Khorin <maksimovichu@gmail.com>
 */
'use strict';

const Base = require('evado/component/base/BaseViewModel');

module.exports = class MetaItemList extends Base {

    prepareModels (models) {
        const rbac = this.module.getRbac();
        const actionMap = rbac.VALUE_LABELS.actions;
        const targetTypeMap = rbac.VALUE_LABELS.targets;
        const formatter = this.controller.formatter;
        for (const model of models) {
            model.setViewAttr('type', formatter.asPermissionType(model.get('type')));

            let actions = model.get('actions');
            actions = Array.isArray(actions) ? actions.map(key => actionMap[key]) : actions;
            model.setViewAttr('actions', actions);

            let targets = [];
            for (const target of model.rel('targets')) {
                const type = formatter.asTranslatable(targetTypeMap[target.get('type')]);
                targets.push(`${type} (${target.getTargetKey()})`);
            }
            model.setViewAttr('targets', targets);
        }
    }
};