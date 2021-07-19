/**
 * @copyright Copyright (c) 2020 Maxim Khorin (maksimovichu@gmail.com)
 */
'use strict';

const Base = require('areto/view/ViewModel');

module.exports = class ClassFilter extends Base {

    async resolveTemplateData () {
        const model = this.data.model;
        const rbac = this.module.getRbac();
        const roles = await SelectHelper.queryLabelItems(this.spawn('rbac/model/Item').find().onlyRoles());
        return {
            types: rbac.VALUE_LABELS.types,
            actions: rbac.VALUE_LABELS.actions,
            targetTypes: rbac.VALUE_LABELS.targets,
            roles
        };
    }
};

const SelectHelper = require('evado/component/helper/SelectHelper');