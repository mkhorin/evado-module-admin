/**
 * @copyright Copyright (c) 2020 Maxim Khorin <maksimovichu@gmail.com>
 */
'use strict';

const Base = require('../component/base/BaseActiveRecord');

module.exports = class MetaTarget extends Base {

    static getConstants () {
        return {
            TABLE: 'sys_rbac_meta_target',
            ATTRS: [
                'item',
                'type',
                'class',
                'view',
                'attr',
                'object',
                'section',
                'node',
                'state',
                'transition'
            ],
            RULES: [
                ['type', 'required'],
                [['class', 'view', 'state', 'object', 'attr', 'section', 'node', 'transition'], 'string'],
            ],
            ATTR_LABELS: {
                attr: 'Attribute',
                node: 'Navigation node',
                section: 'Navigation section'
            }
        };
    }

    getRbac () {
        return this.module.getRbac();
    }

    validateItem (attr) {
        if (!this.get(attr)) {
            const message = new Message(I18n.CORE_SOURCE, 'Value cannot be blank');
            this.addError(attr, message);
        }
    }

    getTargetKey () {
        return this.getRbac().store.getItemKey(this.getAttrMap());
    }
};
module.exports.init(module);

const Message = require('areto/i18n/Message');
const I18n = require('areto/i18n/I18n');