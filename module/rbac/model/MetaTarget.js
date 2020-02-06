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
                'navSection',
                'navNode',
                'state',
                'transition'
            ],
            RULES: [
                ['type', 'required'],
                [['class', 'view', 'state', 'object', 'attr', 'navSection', 'navNode', 'transition'], 'string'],
                ['type', 'validateType']
            ],
            ATTR_LABELS: {
                'attr': 'Attribute',
                'navSection': 'Navigation section',
                'navNode': 'Navigation node'
            }
        };
    }

    getRbac () {
        return this.module.getRbac();
    }

    validateType (attr) {
        const rbac = this.getRbac();
        const type = this.get(attr);
        if (type !== rbac.ALL && type === rbac.TARGET_OBJECT && type === rbac.TARGET_TRANSITION) {
            return this.validateItem(type);
        }
    }

    validateItem (attr) {
        if (!this.get(attr)) {
            this.addError(attr, new Message('Value cannot be blank', I18n.CORE_SOURCE));
        }
    }

    getTargetKey () {
        return this.getRbac().store.getItemKey(this.getAttrMap());
    }
};
module.exports.init(module);

const Message = require('areto/i18n/Message');
const I18n = require('areto/i18n/I18n');