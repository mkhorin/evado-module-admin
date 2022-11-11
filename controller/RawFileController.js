/**
 * @copyright Copyright (c) 2020 Maxim Khorin <maksimovichu@gmail.com>
 */
'use strict';

const Base = require('../component/base/CrudController');

module.exports = class RawFileController extends Base {

    static getConstants () {
        return {
            METHODS: {
                'update': 'get'
            }
        };
    }

    getModelClass () {
        return this.getClass('model/RawFile');
    }

    actionList () {
        const query = this.createModel().find().with('creator');
        return super.actionList(query);
    }

    actionCreate () {
    }

    actionUpdate () {
        return super.actionUpdate({
            with: 'creator'
        });
    }

    async actionDelete () {
        const model = await this.getModel();
        if (model.getOwner()) {
            throw new BadRequest('This file is associated with some owner');
        }
        await model.delete();
        this.sendText(model.getId());
    }

    async actionDownload () {
        const model = await this.getModel();
        await this.sendModelFile(model);
    }

    async actionThumbnail () {
        const model = await this.getModel();
        if (model.isSvg()) {
            return this.sendModelFile(model);
        }
        const {s: size} = this.getQueryParams();
        const file = await model.ensureThumbnail();
        if (!file) {
            return this.sendStatus(404);
        }
        this.setHttpHeader(model.getThumbnailHeaders());
        this.sendFile(file);
    }

    createDeletionQuery () {
        return super.createDeletionQuery(...arguments).and({
            owner: null
        });
    }

    async sendModelFile (model) {
        const file = model.getPath();
        const stat = await FileHelper.getStat(file);
        if (stat) {
            this.setHttpHeader(model.getFileHeaders());
            return this.sendFile(file);
        }
        model.log('error', 'File not found');
        this.sendStatus(404);
    }
};
module.exports.init(module);

const BadRequest = require('areto/error/http/BadRequest');
const FileHelper = require('areto/helper/FileHelper');