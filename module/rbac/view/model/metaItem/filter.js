/**
 * @copyright Copyright (c) 2020 Maxim Khorin (maksimovichu@gmail.com)
 */
'use strict';

const Base = require('areto/view/ViewModel');

module.exports = class ClassFilter extends Base {

    async resolveTemplateData () {
        const {model} = this.data;
        const rbac = this.module.getRbac();
        const query = this.spawn('rbac/model/Item').find().onlyRoles();
        const roles = await SelectHelper.queryLabelItems(query);
        return {
            types: rbac.VALUE_LABELS.types,
            actions: rbac.VALUE_LABELS.actions,
            targetTypes: rbac.VALUE_LABELS.targets,
            roles
        };
    }
};

const SelectHelper = require('evado/component/helper/SelectHelper');