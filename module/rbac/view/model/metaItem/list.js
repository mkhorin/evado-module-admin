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
            const type = this.controller.format(model.get('type'), 'permissionType');
            model.setViewAttr('type', type);
            const actions = this.getActions(model, actionMap);
            model.setViewAttr('actions', actions);
            const targets = this.getTargets(model, targetMap);
            model.setViewAttr('targets', targets);
        }
    }

    getActions (model, actionMap) {
        const actions = model.get('actions');
        return Array.isArray(actions)
            ? actions.map(key => actionMap[key])
            : actions;
    }

    getTargets (model, targetMap) {
        const result = [];
        const targets = model.rel('targets');
        for (const target of targets) {
            const label = targetMap[target.get('type')];
            const type = this.controller.format(label, 'translatable');
            const key = target.getTargetKey();
            result.push(`${type} (${key || '*'})`);
        }
        return result;
    }
};