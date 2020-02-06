/**
 * @copyright Copyright (c) 2020 Maxim Khorin (maksimovichu@gmail.com)
 */
'use strict';

const Base = require('areto/view/ViewModel');

module.exports = class UserFilter extends Base {

    async resolveTemplateData () {
        const Item = this.getClass('rbac/model/Item');
        return {
            roles: await SelectHelper.queryLabelItems(this.spawn(Item).find().onlyRoles())
        };
    }
};

const SelectHelper = require('evado/component/helper/SelectHelper');