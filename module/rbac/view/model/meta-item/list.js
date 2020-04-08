/**
 * @copyright Copyright (c) 2020 Maxim Khorin <maksimovichu@gmail.com>
 */
'use strict';

const Base = require('evado/component/base/BaseViewModel');

module.exports = class MetaItemList extends Base {

    prepareModels (models) {
        const rbac = this.module.getRbac();
        const actionMap = rbac.VALUE_LABELS.actions;
        const targetMap = rbac.VALUE_LABELS.targets;
        for (const model of models) {
            model.setViewAttr('type', this.controller.formatter.asPermissionType(model.get('type')));
            model.setViewAttr('actions', this.getActions(model, actionMap));
            model.setViewAttr('targets', this.getTargets(model, targetMap));
        }
    }

    getActions (model, actionMap) {
        const actions = model.get('actions');
        return Array.isArray(actions) ? actions.map(key => actionMap[key]) : actions;
    }

    getTargets (model, targetMap) {
        const targets = [];
        for (const target of model.rel('targets')) {
            const type = this.controller.formatter.asTranslatable(targetMap[target.get('type')]);
            targets.push(`${type} (${target.getTargetKey()})`);
        }
        return targets;
    }
};