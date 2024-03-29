/**
 * @copyright Copyright (c) 2022 Maxim Khorin <maksimovichu@gmail.com>
 */
'use strict';

const Base = require('../component/base/BaseController');

module.exports = class LoginSessionController extends Base {

    getModelClass () {
        return this.getClass('model/LoginSession');
    }

    async actionIndex () {
        const model = this.createModel();
        return this.render('index', {model});
    }

    async actionList () {
        const model = this.createModel();
        const data = await model.getListData(this.getPostParams());
        return this.sendJson(data);
    }

    async actionUpdate () {
        const model = this.createModel();
        const {id} = this.getQueryParams();
        await model.setBySid(id);
        return this.render('update', {model});
    }

    async actionDelete () {
        this.checkCsrfToken();
        const model = this.createModel();
        const {id} = this.getPostParams();
        await model.delete(id)
            ? this.sendStatus(Response.OK)
            : this.send(model.getFirstError(), Response.BAD_REQUEST);
    }

    async actionDeleteList () {
        this.checkCsrfToken();
        let {ids} = this.getPostParams();
        ids = String(ids).split(',');
        const model = this.createModel();
        for (const id of ids) {
            await model.delete(id);
        }
        this.sendStatus(Response.OK);
    }
};
module.exports.init(module);

const Response = require('areto/web/Response');