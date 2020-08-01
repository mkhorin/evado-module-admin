/**
 * @copyright Copyright (c) 2020 Maxim Khorin <maksimovichu@gmail.com>
 */
'use strict';

const Base = require('../component/base/BaseController');

module.exports = class LogController extends Base {

    getModelClass () {
        return this.getClass('model/Log');
    }

    async actionIndex () {
        const model = this.createModel();
        const items = await model.getItems();
        return this.render('index', {model, items});
    }

    async actionDownload () {
        const model = this.createModel();
        const file = model.getFileByName(this.getQueryParam('id'));
        if (!file) {
            throw new NotFound;
        }
        const stat = await FileHelper.getStat(file);
        if (!stat) {
            throw new NotFound;
        }
        this.setHttpHeader({
            'Content-Disposition': `attachment; filename=${path.basename(file)}`
        });
        this.sendFile(file);
    }
};
module.exports.init(module);

const path = require('path');
const FileHelper = require('areto/helper/FileHelper');
const NotFound = require('areto/error/http/NotFound');