/**
 * @copyright Copyright (c) 2020 Maxim Khorin <maksimovichu@gmail.com>
 */
'use strict';

const Base = require('../component/base/CrudController');

module.exports = class RawFileController extends Base {

    static getConstants () {
        return {
            METHODS: {
                'update': 'GET'
            }
        };
    }

    getModelClass () {
        return this.getClass('model/RawFile');
    }

    actionList () {
        return super.actionList(this.createModel().find().with('creator'));
    }

    actionCreate () {
    }

    actionUpdate () {
        return super.actionUpdate({with: ['creator']});
    }

    async actionDelete () {
        const model = await this.getModel();
        if (model.getOwner()) {
            throw new BadRequest('File has owner');
        }
        await model.delete();
        this.sendText(model.getId());
    }

    async actionDeleteList () {
    }

    async actionDownload () {
        const model = await this.getModel();
        const file = model.getPath();
        const stat = await FileHelper.getStat(file);
        if (!stat) {
            model.log('error', 'File not found');
            return this.sendStatus(404);
        }
        this.setHttpHeader(model.getFileHeaders());
        this.sendFile(file);
    }

    async actionThumbnail () {
        const model = await this.getModel();
        const file = await model.ensureThumbnail(this.getQueryParam('s'));
        if (!file) {
            return this.sendStatus(404);
        }
        this.setHttpHeader(model.getThumbnailHeaders());
        this.sendFile(file);
    }
};
module.exports.init(module);

const BadRequest = require('areto/error/BadRequestHttpException');
const FileHelper = require('areto/helper/FileHelper');