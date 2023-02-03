/**
 * @copyright Copyright (c) 2020 Maxim Khorin (maksimovichu@gmail.com)
 */
'use strict';

const Base = require('areto/view/ViewModel');

module.exports = class ItemFilter extends Base {

    async resolveTemplateData () {
        const Item = this.getClass('rbac/model/Item');
        const itemQuery = this.spawn(Item).find();
        const items = await SelectHelper.queryLabelItems(itemQuery);
        return {items};
    }
};

const SelectHelper = require('evado/component/helper/SelectHelper');