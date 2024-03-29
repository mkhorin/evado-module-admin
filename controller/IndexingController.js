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
                'delete': 'post'
            }
        };
    }

    getModelClass () {
        return this.getClass('model/Indexing');
    }

    async actionCreate () {
        this.checkCsrfToken();
        const model = this.createModel();
        model.scenario = 'create';
        model.load(this.getPostParams());
        if (await model.create()) {
            const data = await model.spawnTable().getIndexes();
            this.sendJson(data);
        } else {
            this.sendError(model);
        }
    }

    async actionDelete () {
        this.checkCsrfToken();
        const model = this.createModel();
        model.scenario = 'delete';
        const {name, table} = this.getPostParams();
        model.set('name', name);
        model.set('table', table);
        await model.delete()
            ? this.sendStatus(Response.OK)
            : this.sendError(model);
    }

    sendError (model) {
        const errors = model.getFirstErrorMap();
        const messages = this.translateMessageMap(errors);
        this.send(messages, Response.BAD_REQUEST);
    }
};
module.exports.init(module);

const Response = require('areto/web/Response');