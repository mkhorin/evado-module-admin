/**
 * @copyright Copyright (c) 2020 Maxim Khorin <maksimovichu@gmail.com>
 */
'use strict';

module.exports = {

    'model/Data': require('../model/Data'),
    'model/EventHandler': require('../model/EventHandler'),
    'model/File': require('../model/File'),
    'model/Indexing': require('../model/Indexing'),
    'model/Listener': require('../model/Listener'),
    'model/Log': require('../model/Log'),
    'model/LoginSession': require('../model/LoginSession'),
    'model/Notification': require('../model/Notification'),
    'model/NotificationMessage': require('../model/NotificationMessage'),
    'model/PopupNotification': require('../model/PopupNotification'),
    'model/Table': require('../model/Table'),
    'model/Task': require('../model/Task'),
    'model/Trigger': require('../model/Trigger'),
    'model/User': require('../model/User'),
    'model/UserFilter': require('../model/UserFilter'),
    'model/UserLog': require('../model/UserLog'),
    'model/UserPassword': require('../model/UserPassword'),

    ...require('../module/rbac/config/default-classes')
};