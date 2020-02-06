/**
 * @copyright Copyright (c) 2020 Maxim Khorin (maksimovichu@gmail.com)
 */
'use strict';

const Base = require('areto/view/ViewModel');

module.exports = class ClassFilter extends Base {

    async resolveTemplateData () {
        const model = this.data.model;
        const rbac = this.module.getRbac();
        return {
            types: rbac.VALUE_LABELS.types,
            actions: rbac.VALUE_LABELS.actions,
            roles: await SelectHelper.queryLabelItems(this.spawn('model/Item').find().onlyRoles()),
            targetTypes: rbac.VALUE_LABELS.targets
        };
    }
};

const SelectHelper = require('evado/component/helper/SelectHelper');