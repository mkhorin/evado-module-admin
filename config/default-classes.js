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
    'model/Notice': require('../model/Notice'),
    'model/NoticeMessage': require('../model/NoticeMessage'),
    'model/Recipient': require('../model/Recipient'),
    'model/Table': require('../model/Table'),
    'model/Task': require('../model/Task'),
    'model/Trigger': require('../model/Trigger'),
    'model/User': require('../model/User'),
    'model/UserFilter': require('../model/UserFilter'),
    'model/UserLog': require('../model/UserLog'),
    'model/UserPassword': require('../model/UserPassword'),

    'rbac/model/Assignment': require('../module/rbac/model/Assignment'),
    'rbac/model/Item': require('../module/rbac/model/Item'),
};