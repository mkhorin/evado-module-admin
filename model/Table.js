/**
 * @copyright Copyright (c) 2020 Maxim Khorin <maksimovichu@gmail.com>
 */
'use strict';

const Base = require('areto/base/Model');

module.exports = class Table extends Base {

    static getConstants () {
        return {
            RULES: [
                ['name', 'required'],
                ['name', 'regex', {pattern: /^[0-9a-zA-Z-_]+$/, except: 'delete'}]
            ]
        };
    }

    getDb () {
        return this.module.getDb();
    }

    getTitle () {
        return this.get('name');
    }

    async getIndexes () {
        const items = await this.getDb().getIndexes(this.get('name'));
        return items.map(data => ({
            keys: data.key,
            name: data.name,
            unique: data.unique,
            background: data.background
        }));
    }

    async create () {
        this.scenario = 'create';
        if (!await this.validate()) {
            return false;
        }
        try {
            await this.getDb().create(this.get('name'));
            return true;
        } catch (err) {
            this.addError('name', err.toString());
        }
    }

    async delete () {
        this.scenario = 'delete';
        if (!await this.validate()) {
            return false;
        }
        try {
            await this.getDb().drop(this.get('name'));
            return true;
        } catch (err) {
            this.addError('name', err.toString());
        }
    }

    async getListData ({start, length, order, search}) {
        let names = await this.getDb().getTableNames();      
        names.sort((a, b) => a.localeCompare(b) * order.name);
        const maxSize = names.length;
        if (search) {
            search = new RegExp(search, 'i');
            names = names.filter(name => search.test(name));
        }
        const totalSize = names.length;
        const items = names.slice(start, start + length).map(name => ({name}));
        return {items, maxSize, totalSize};
    }
};
module.exports.init(module);