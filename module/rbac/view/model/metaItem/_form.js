/**
 * @copyright Copyright (c) 2020 Maxim Khorin <maksimovichu@gmail.com>
 */
'use strict';

const Base = require('areto/view/ViewModel');

module.exports = class MetaItemForm extends Base {

    resolveTemplateData () {
        const {model} = this.data;
        const rbac = model.getRbac();
        return {
            types: rbac.VALUE_LABELS.types,
            actions: rbac.VALUE_LABELS.actions
        };
    }
};