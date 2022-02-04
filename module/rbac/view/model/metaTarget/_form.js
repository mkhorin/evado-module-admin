/**
 * @copyright Copyright (c) 2020 Maxim Khorin <maksimovichu@gmail.com>
 */
'use strict';

const Base = require('areto/view/ViewModel');

module.exports = class MetaTargetForm extends Base {

    resolveTemplateData () {
        const model = this.data.model;
        const rbac = model.getRbac();
        const cls = rbac.baseMeta?.getClass(model.get('class'));
        const section = rbac.navMeta?.getSection(model.get('section'));
        return {
            cls, section,
            types: SelectHelper.getMapItems(rbac.VALUE_LABELS.targets),
            view: cls?.getView(model.get('view')),
            attr: cls?.getAttr(model.get('attr')),
            state: cls?.getState(model.get('state')),
            transition: cls?.getTransition(model.get('transition')),
            node: section?.getNode(model.get('node')),
            resolveTitle: this.resolveTitle
        };
    }

    resolveTitle (item) {
        return item ? `${item.label} (${item.name})` : null
    }
};

const SelectHelper = require('evado/component/helper/SelectHelper');