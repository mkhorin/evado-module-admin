/**
 * @copyright Copyright (c) 2020 Maxim Khorin <maksimovichu@gmail.com>
 */
'use strict';

const Base = require('../component/base/CrudController');

module.exports = class ItemController extends Base {

    static getConstants () {
        return {
            ACTIONS: {
                'sortRelatedArray': {
                    Class: require('evado/component/action/SortRelatedArrayAction')
                }
            },
            METHODS: {
                'listFreeChildren': ['post'],
                'listFreeParents': ['post']
            }
        };
    }

    async actionRestart () {
        await this.module.getRbac().load();
        this.sendText('Security restarted')
    }

    actionRoles () {
        return this.actionIndex({
            template: 'roles'
        });
    }

    actionPermissions () {
        return this.actionIndex({
            template: 'permissions'
        });
    }

    actionListRole () {
        const query = this.createItemQuery().onlyRoles();
        return this.actionList(query);
    }

    actionListPermission () {
        const query = this.createItemQuery().onlyPermissions();
        return this.actionList(query);
    }

    actionUpdateRole () {
        return this.actionUpdate({
            template: 'updateRole'
        });
    }

    actionUpdatePermission () {
        return this.actionUpdate({
            template: 'updatePermission'
        });
    }

    actionCreateRole () {
        return this.actionCreate({
            template: 'createRole'
        });
    }

    actionCreatePermission () {
        return this.actionCreate({
            template: 'createPermission'
        });
    }

    async actionListRoles () {
        const model = await this.getModel();
        const query = model.find().excludeModel(model).onlyRoles();
        const ids = await model.relParentItems().column('parent');
        query.andNotIn(model.PK, ids);
        return this.sendGridList(query);
    }

    async actionListPermissions () {
        const model = await this.getModel();
        const query = model.find().excludeModel(model).onlyPermissions();
        const ids = await model.relParentItems().column('parent');
        query.andNotIn(model.PK, ids);
        return this.sendGridList(query);
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
        query.andNotIn(model.PK, items);
        return this.sendGridList(query);
    }

    async actionListFreeParents () {
        const model = await this.getModel();
        const query = model.createQuery().excludeModel(model).exceptRoutes();
        if (model.isRole()) {
            query.onlyRoles();
        }
        return this.sendGridList(query);
    }

    createItemQuery () {
        const nameOrder = query => query.order({name: 1});
        return this.createModel().find().with({
            children: nameOrder,
            parentPermissions: nameOrder,
            parentRoles: nameOrder,
            rules: true
        });
    }

    getListRelatedWith (relation) {
        switch (relation) {
            case 'metaItems':
                return 'targets';
        }
    }
};
module.exports.init(module);