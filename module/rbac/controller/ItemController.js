/**
 * @copyright Copyright (c) 2020 Maxim Khorin <maksimovichu@gmail.com>
 */
'use strict';

const Base = require('../component/base/CrudController');

module.exports = class ItemController extends Base {

    static getConstants () {
        return {
            METHODS: {
                'list-free-children': ['post'],
                'list-free-parents': ['post']
            }
        };
    }

    async actionRestart () {
        await this.module.getRbac().load();
        this.sendText('Security restarted')
    }

    actionRoles () {
        return this.actionIndex({template: 'roles'});
    }

    actionPermissions () {
        return this.actionIndex({template: 'permissions'});
    }

    actionListRole () {
        const nameOrder = query => query.order({name: 1});
        return this.actionList(this.createModel().find().onlyRoles().with({
            childPermissions: nameOrder,
            childRoles: nameOrder,
            parentRoles: nameOrder,
            rule: true
        }));
    }

    actionListPermission () {
        const nameOrder = query => query.order({name: 1});
        return this.actionList(this.createModel().find().onlyPermissions().with({
            children: nameOrder,
            parentPermissions: nameOrder,
            parentRoles: nameOrder,
            rule: true
        }));
    }

    actionUpdateRole () {
        return this.actionUpdate({template: 'updateRole'});
    }

    actionUpdatePermission () {
        return this.actionUpdate({template: 'updatePermission'});
    }

    actionCreateRole () {
        return this.actionCreate({template: 'createRole'});
    }

    actionCreatePermission () {
        return this.actionCreate({template: 'createPermission'});
    }

    async actionListRoles () {
        const model = await this.getModel();
        const query = model.find().excludeModel(model).onlyRoles();
        const ids = await model.relParentItems().column('parent');
        return this.sendGridList(query.andNotIn(model.PK, ids));
    }

    async actionListPermissions () {
        const model = await this.getModel();
        const query = model.find().excludeModel(model).onlyPermissions();
        const ids = await model.relParentItems().column('parent');
        return this.sendGridList(query.andNotIn(model.PK, ids));
    }

    async actionListFreeChildren () {
        const model = await this.getModel();
        if (model.isRoute()) {
            return this.sendJson();
        }
        const query = model.createQuery().excludeModel(model);
        if (model.isPermission()) {
            query.exceptRoles();
        }
        const items = await model.relParentItems().column('parent');
        return this.sendGridList(query.andNotIn(model.PK, items));
    }

    async actionListFreeParents () {
        const model = await this.getModel();
        const query = model.createQuery().excludeModel(model).exceptRoutes();
        if (model.isRole()) {
            query.onlyRoles();
        }
        return this.sendGridList(query);
    }
};
module.exports.init(module);