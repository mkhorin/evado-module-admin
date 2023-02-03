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
        const stores = this.getLogger().stores;
        for (const store of Object.values(stores)) {
            const data = await this.getStoreItems(store);
            items.push(...data);
        }
        return items;
    }

    async getStoreItems (store) {
        const files = await store.getFiles();
        return files.map(({name, stat}) => ({
            name,
            size: stat.size,
            updatedAt: stat.mtime.toISOString()
        }));
    }
};
module.exports.init(module);

const FileLogStore = require('areto/log/FileLogStore');