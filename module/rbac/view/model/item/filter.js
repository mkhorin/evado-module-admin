/**
 * @copyright Copyright (c) 2020 Maxim Khorin (maksimovichu@gmail.com)
 */
'use strict';

const Base = require('areto/view/ViewModel');

module.exports = class ItemFilter extends Base {

    async resolveTemplateData () {
        const Item = this.getClass('model/Item');
        return {
            items: await SelectHelper.queryLabelItems(this.spawn(Item).find())
        };
    }
};

const SelectHelper = require('evado/component/helper/SelectHelper');