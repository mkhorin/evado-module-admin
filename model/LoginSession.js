/**
 * @copyright Copyright (c) 2022 Maxim Khorin <maksimovichu@gmail.com>
 */
'use strict';

const Base = require('areto/base/Model');

module.exports = class LoginSession extends Base {

    static getConstants () {
        return {
            ATTR_LABELS: {
                sid: 'SID'
            }
        };
    }

    getSession () {
        return this.module.getSession();
    }

    async getListData ({start, length, search}) {
        const session = this.getSession();
        const items = await session.store.list(start, length, search);
        return {
            items: items.map(this.getListItemData, this),
            maxSize: await session.store.count(),
            totalSize: await session.store.count(search),
        };
    }

    getListItemData (item) {
        const session = this.getSession();
        return {
            sid: item.sid,
            expiry: session.getExpiryDate(item.updatedAt),
            updatedAt: item.updatedAt,
            user: item.data[session.store.userIdParam]
        };
    }

    async setBySid (id) {
        const session = this.getSession();
        const item = await session.store.getById(id);
        this.assign(item);
        this.set('expiry', session.getExpiryDate(item?.updatedAt));
        this.set('user', item?.data[session.store.userIdParam]);
    }

    async delete (id) {
        await this.getSession().deleteById(id);
        return true;
    }

    async deleteExpired () {
        await this.getSession().deleteExpired();
        return true;
    }
};
module.exports.init(module);