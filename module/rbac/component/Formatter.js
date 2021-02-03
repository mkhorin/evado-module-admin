/**
 * @copyright Copyright (c) 2020 Maxim Khorin <maksimovichu@gmail.com>
 */
'use strict';

const Base = require('evado/component/other/Formatter');

module.exports = class Formatter extends Base {

    asPermissionType (value) {
        return value === 'deny'
            ? '<b class="semi-bold text-danger" data-t="">Deny</b>'
            : '<span class="semi-bold text-success" data-t="">Allow</span>'
    }
};