/**
 * @copyright Copyright (c) 2020 Maxim Khorin <maksimovichu@gmail.com>
 */
'use strict';

Jam.Indexing = class Indexing extends Jam.Element {

    init () {
        this.params = this.$element.data('params');
        this.model = Jam.Element.getInstance(this.$element.closest('.model'));
        this.notice = this.model.notice;
        this.table = this.model.id;

        this.$commands = this.$element.find('[data-command]');
        this.findCommand('create').click(this.onCreate.bind(this));
        this.findCommand('delete').click(this.onDelete.bind(this));

        this.$list = this.$element.find('.index-list');
        this.$list.html(this.renderItems(this.params.indexes));
        this.$list.on('click', '.list-group-item', this.onClickIndex.bind(this));

        // resolve nested forms
        this.$modal = $(Jam.Helper.getTemplate('modal', this.$element)).appendTo(document.body);
        this.$modal.find('[data-command="save"]').click(this.onSave.bind(this));
        this.$modal.on('show.bs.modal', this.onBeforeShowModal.bind(this));
        this.$form = this.$modal.find('form');
        this.modalNotice = new Jam.Notice({container: this.$form});
    }

    findCommand (name) {
        return this.$commands.filter(`[data-command="${name}"]`);
    }

    getSelectedItems () {
        return this.$list.find('.selected');
    }

    reindex () {
        return this.post(this.params.reindex, {table: this.table}).done(()=> {
            this.notice.success('Indexing completed');
        }).fail(({responseText}) => {
            this.notice.danger(this.getModelError(responseText, 'Indexing failed'));
        });
    }

    onCreate () {
        this.$modal.modal();
    }

    onDelete () {
        const $items = this.getSelectedItems();
        if ($items.length === 1) {
            Jam.dialog.confirmDeletion('Delete this index permanently?')
                .then(this.delete.bind(this, $items));
        }
    }

    delete ($item) {
        Jam.toggleGlobalLoader(true);
        const data = {
            table: this.table,
            name: this.getItemData($item).name
        };
        this.post(this.params.delete, data).done(()=> {
            $item.remove();
        }).fail(({responseText}) => {
            this.notice.danger(this.getModelError(responseText, 'Deletion failed'));
        });
    }

    post (url, data) {
        Jam.toggleGlobalLoader(true);
        return Jam.Helper.post(url, data).always(()=> Jam.toggleGlobalLoader(false));
    }

    onClickIndex (event) {
        this.$list.children().removeClass('selected');
        $(event.currentTarget).addClass('selected');
    }

    renderItems (items) {
        return items.map(this.renderItem, this).join('');
    }

    renderItem (data) {
        const text = JSON.stringify(data);
        const template = Jam.Helper.getTemplate('index', this.$element);
        return Jam.Helper.resolveTemplate(template, {text});
    }

    getItemData ($item) {
        return Jam.Helper.parseJson($item.html());
    }

    // MODAL

    onBeforeShowModal () {
        Jam.i18n.translateContainer(this.$modal);
        this.modalNotice.hide();
    }

    onSave () {
        this.modalNotice.hide();
        Jam.Helper.post(this.params.create, this.$form.serialize()).done(data => {
            this.$list.html(this.renderItems(data));
            this.$modal.modal('hide');
        }).fail(({responseText}) => {
            this.modalNotice.danger(this.getModelError(responseText, 'Save failed'));
        });
    }

    getModelError (data, defaults) {
        let message = Jam.Helper.parseJson(data);
        if (message && typeof message === 'object') {
            message = this.formatErrorData(message);
        }
        return message || data || defaults;
    }

    formatErrorData (data) {
        const messages = [];
        for (const key of Object.keys(data)) {
            messages.push(`<b>${key}</b>: ${data[key]}`);
        }
        return messages.join('<br>');
    }
};