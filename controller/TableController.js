/**
 * @copyright Copyright (c) 2020 Maxim Khorin <maksimovichu@gmail.com>
 */
'use strict';

const Base = require('../component/base/BaseController');

module.exports = class TableController extends Base {

    getModelClass () {
        return this.getClass('model/Table');
    }

    async actionIndex () {
        const model = this.createModel();
        return this.render('index', {model});
    }

    async actionUpdate () {
        const model = this.createModel();
        model.set('name', this.getQueryParam('id'));
        try {
            const indexes = await model.getIndexes();
            return this.render('update', {model, indexes});
        } catch (err) {
            throw new BadRequest(err);
        }
    }

    async actionList () {
        const model = this.createModel();
        const data = await model.getListData(this.getPostParams());
        return this.sendJson(data);
    }
};
module.exports.init(module);

const BadRequest = require('areto/error/http/BadRequest');