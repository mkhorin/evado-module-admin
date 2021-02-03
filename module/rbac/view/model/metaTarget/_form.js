/**
 * @copyright Copyright (c) 2020 Maxim Khorin <maksimovichu@gmail.com>
 */
'use strict';

const Base = require('areto/view/ViewModel');

module.exports = class MetaTargetForm extends Base {

    resolveTemplateData () {
        const model = this.data.model;
        const rbac = model.getRbac();
        const cls = rbac.baseMeta.getClass(model.get('class'));
        const section = rbac.navMeta.getSection(model.get('section'));
        return {
            metadataClass: cls,
            types: this.controller.getMapSelectItems(rbac.VALUE_LABELS.targets),
            view: cls?.getView(model.get('view')),
            attr: cls?.getAttr(model.get('attr')),
            state: cls?.getState(model.get('state')),
            transition: cls?.getTransition(model.get('transition')),
            node: section?.section.getNode(model.get('node')),
            section
        };
    }
};