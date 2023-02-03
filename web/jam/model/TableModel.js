/**
 * @copyright Copyright (c) 2020 Maxim Khorin <maksimovichu@gmail.com>
 */
'use strict';

Jam.TableModel = class TableModel extends Jam.Model {

    init () {
        super.init();
        this.indexing = this.findInstanceByClass(Jam.Indexing);
    }

    getCommandMethod (name) {
        switch (name) {
            case 'rename': return this.onRename;
            case 'clone': return this.onClone;
        }
        return super.getCommandMethod(name);
    }

    onRename () {
    }

    onClone () {
    }
};