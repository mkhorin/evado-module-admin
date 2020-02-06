/**
 * @copyright Copyright (c) 2020 Maxim Khorin <maksimovichu@gmail.com>
 */
'use strict';

const Base = require('../component/base/BaseController');

module.exports = class IndexingController extends Base {

    static getConstants () {
        return {
            METHODS: {
                'create': 'post',
                'delete': 'post',
                'reindex': 'post'
            }
        };
    }

    getModelClass () {
        return this.getClass('model/Indexing');
    }

    async actionCreate () {
        const model = this.createModel();
        model.scenario = 'create';
        model.load(this.getPostParams());
        await model.create()
            ? this.sendJson(await model.spawnTable().getIndexes())
            : this.sendError(model);
    }

    async actionDelete () {
        const model = this.createModel();
        model.scenario = 'delete';
        model.set('table', this.getPostParam('table'));
        model.set('name', this.getPostParam('name'));
        await model.delete()
            ? this.sendStatus(200)
            : this.sendError(model);
    }

    async actionReindex () {
        const model = this.createModel();
        model.scenario = 'reindex';
        model.set('table', this.getPostParam('table'));
        await model.reindex()
            ? this.sendStatus(200)
            : this.sendError(model);
    }

    sendError (model) {
        this.send(this.translateMessageMap(model.getFirstErrorMap()), 400);
    }
};
module.exports.init(module);