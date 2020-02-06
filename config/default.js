/**
 * @copyright Copyright (c) 2020 Maxim Khorin <maksimovichu@gmail.com>
 */
'use strict';

module.exports = {

    title: 'Admin',

    components: {
        'i18n': {
        }
    },
    modules: {
        'rbac': {
        }
    },
    widgets: {
        'sideMenu': {
            Class: require('evado/component/widget/SideMenu')
        }
    },
    classes: require('./default-classes'),
    indexes: [
    ]
};