/**
 * @copyright Copyright (c) 2020 Maxim Khorin <maksimovichu@gmail.com>
 */
'use strict';

const Base = require('areto/base/Model');

module.exports = class Indexing extends Base {

    static getConstants () {
        return {
            RULES: [
                [['table'], 'required'],
                [['keys'], 'required', {on: 'create'}],
                [['name'], 'required', {on: 'delete'}],
                [['table', 'keys', 'name'], 'string'],
                [['unique', 'background'], 'checkbox'],
                ['keys', 'validateKeys'],
                ['name', 'validateDeletedName', {on: 'delete'}]
            ],
            SYSTEM_INDEXES: ['_id_']
        };
    }

    getDb () {
        return this.module.getDb();
    }

    getTable () {
        return this.get('table');
    }

    spawnTable () {
        const model = this.spawn('model/Table');
        model.set('name', this.getTable());
        return model;
    }

    validateKeys (attr) {
        const data = StringHelper.parseObject(this.get(attr));
        for (const key of Object.keys(data)) {
            data[key] = Number(data[key]);
            if (data[key] !== 1 && data[key] !== -1) {
                this.addError(attr, 'Invalid key value');
            }
        }
        if (!Object.values(data).length) {
            this.addError(attr, 'Invalid keys');
        }
        this.set(attr, data);
    }

    validateDeletedName (attr) {
        if (this.SYSTEM_INDEXES.includes(this.get(attr))) {
            this.addError(attr, 'Refuse to drop the system index');
        }
    }

    async create () {
        if (await this.validate()) {
            return this.catchError(this.executeCreation);
        }
    }

    executeCreation () {
        const data = this.getCreationData();
        return this.getDb().createIndex(this.getTable(), data);
    }

    getCreationData () {
        const data = {
            name: this.get('name') || undefined,
            unique: this.get('unique') || undefined,
            background: this.get('background') || undefined
        };
        ObjectHelper.deleteEmptyProperties(data);
        return [this.get('keys'), data];
    }

    async delete () {
        if (await this.validate()) {
            return this.catchError(this.executeDeletion);
        }
    }

    executeDeletion () {
        return this.getDb().dropIndex(this.getTable(), this.get('name'));
    }

    async catchError (method) {
        try {
            await method.call(this);
            return true;
        } catch (err) {
            this.addError('table', String(err));
        }
    }

};
module.exports.init(module);

const ObjectHelper = require('areto/helper/ObjectHelper');
const StringHelper = require('areto/helper/StringHelper');