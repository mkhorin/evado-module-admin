/**
 * @copyright Copyright (c) 2020 Maxim Khorin <maksimovichu@gmail.com>
 */
'use strict';

const Base = require('areto/db/ActiveQuery');

module.exports = class ItemQuery extends Base {

    exceptRoles () {
        return this.and(['!=', 'type', Item.TYPE_ROLE]);
    }

    exceptRoutes () {
        return this.and(['!=', 'type', Item.TYPE_ROUTE]);
    }

    onlyRoles () {
        return this.and({type: Item.TYPE_ROLE});
    }

    onlyPermissions () {
        return this.and({type: Item.TYPE_PERMISSION});
    }

    onlyRoutes () {
        return this.and({type: Item.TYPE_ROUTE});
    }
};
module.exports.init(module);

const Item = require('../model/Item');