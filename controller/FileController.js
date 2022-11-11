/**
 * @copyright Copyright (c) 2020 Maxim Khorin <maksimovichu@gmail.com>
 */
'use strict';

const Base = require('../component/base/CrudController');

module.exports = class FileController extends Base {

    getModelClass () {
        return this.getClass('model/File');
    }

    actionList () {
        const query = this.createModel().find().with('creator');
        return super.actionList(query);
    }

    actionUpdate () {
        return super.actionUpdate({
            with: ['creator', 'editor']
        });
    }
};
module.exports.init(module);