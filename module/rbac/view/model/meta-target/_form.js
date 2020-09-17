/**
 * @copyright Copyright (c) 2020 Maxim Khorin <maksimovichu@gmail.com>
 */
'use strict';

const Base = require('areto/view/ViewModel');

module.exports = class MetaTargetForm extends Base {

    resolveTemplateData () {
        const model = this.data.model;
        const rbac = model.getRbac();
        const metaClass = rbac.baseMeta.getClass(model.get('class'));
        const section = rbac.navMeta.getSection(model.get('section'));
        return {
            types: this.controller.getMapSelectItems(rbac.VALUE_LABELS.targets),
            view: metaClass ? metaClass.getView(model.get('view')) : null,
            attr: metaClass ? metaClass.getAttr(model.get('attr')) : null,
            state: metaClass ? metaClass.getState(model.get('state')) : null,
            transition: metaClass ? metaClass.getTransition(model.get('transition')) : null,
            node: section ? section.getNode(model.get('node')) : null,
            section,
            metaClass
        };
    }
};