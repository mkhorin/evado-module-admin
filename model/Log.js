/**
 * @copyright Copyright (c) 2020 Maxim Khorin <maksimovichu@gmail.com>
 */
'use strict';

const Base = require('areto/base/Model');

module.exports = class Log extends Base {

    getFileByName (name) {
        const data = FileLogStore.parseFilename(name);
        if (data) {
            const store = this.getLogger().getStore(data[0]);
            return store?.getFile(data[1]);
        }
    }

    getLogger () {
        return this.module.get('logger');
    }

    async getItems () {
        const items = [];
        for (const store of Object.values(this.getLogger().stores)) {
            items.push(...await this.getStoreItems(store));
        }
        return items;
    }

    async getStoreItems (store) {
        const items = [];
        for (const {name, stat} of await store.getFiles()) {
            items.push({
                name,
                size: stat.size,
                updatedAt: stat.mtime.toISOString()
            });
        }
        return items;
    }
};
module.exports.init(module);

const FileLogStore = require('areto/log/FileLogStore');