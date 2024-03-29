/**
 * @copyright Copyright (c) 2021 Maxim Khorin <maksimovichu@gmail.com>
 */
'use strict';

module.exports = {

    items: [{
        url: 'admin/user',
        label: 'Users'
    }, {
        label: 'Security',
        children: [{
            url: 'admin/rbac/meta-item',
            label: 'Metadata permissions'
        }, {
            url: 'admin/rbac/item/permissions',
            label: 'Permissions'
        }, {
            url: 'admin/rbac/item/roles',
            label: 'Roles'
        }, {
            url: 'admin/rbac/assignment-rule',
            label: 'Assignment rules'
        }, {
            url: 'admin/rbac/rule',
            label: 'Rules'
        }]
    }, {
        label: 'Informing',
        children: [{
            url: 'admin/notification',
            label: 'Notifications'
        }, {
            url: 'admin/notification-message',
            label: 'Messages'
        }, {
            url: 'admin/popup-notification',
            label: 'Popup notifications'
        }, {
            url: 'admin/user-filter',
            label: 'User filters'
        }]
    }, {
        label: 'Events',
        children: [{
            url: 'admin/listener',
            label: 'Listeners'
        }, {
            url: 'admin/event-handler',
            label: 'Event handlers'
        }]
    }, {
        url: 'admin/task',
        label: 'Tasks'
    }, {
        url: 'admin/login-session',
        label: 'Login sessions'
    }, {
        url: 'admin/table',
        label: 'Database'
    }, {
        url: 'admin/log',
        label: 'Logs'
    }, {
        label: 'Uploads',
        children: [{
            url: 'admin/raw-file',
            label: 'Raw files'
        }, {
            url: 'admin/s3-file',
            label: 'S3 files'
        }]
    }]
};