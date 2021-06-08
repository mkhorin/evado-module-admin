/**
 * @copyright Copyright (c) 2021 Maxim Khorin <maksimovichu@gmail.com>
 */
'use strict';

const Base = require('./RawFileController');

module.exports = class S3FileController extends Base {

    getModelClass () {
        return this.getClass('model/S3File');
    }

    async actionDownload () {
        const model = await this.getModel();
        const url = await model.getSignedDownloadUrl();
        this.sendText(url);
    }
};
module.exports.init(module);