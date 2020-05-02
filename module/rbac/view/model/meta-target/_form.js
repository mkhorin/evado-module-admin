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
        const navSection = rbac.navMeta.getSection(model.get('navSection'));
        return {
            types: this.controller.getMapSelectItems(rbac.VALUE_LABELS.targets),
            view: metaClass ? metaClass.getView(model.get('view')) : null,
            attr: metaClass ? metaClass.getAttr(model.get('attr')) : null,
            state: metaClass ? metaClass.getState(model.get('state')) : null,
            transition: metaClass ? metaClass.getTransition(model.get('transition')) : null,
            navNode: navSection ? navSection.getNode(model.get('navNode')) : null,
            navSection,
            metaClass
        };
    }
};