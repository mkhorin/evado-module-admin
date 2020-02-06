/**
 * @copyright Copyright (c) 2020 Maxim Khorin <maksimovichu@gmail.com>
 */
'use strict';

const Base = require('areto/base/Model');

module.exports = class Trigger extends Base {

    static getConstants () {
        return {
            RULES: [
                ['events', 'required'],
                ['events', 'filter', {filter: 'split'}],
                ['data', 'json']
            ]
        };
    }

    async execute () {
        if (await this.validate()) {
            const data = this.get('data');
            for (const event of this.get('events')) {
                await this.module.getObserver().catch(event, data);
            }
            return true;
        }
    }
};
module.exports.init(module);