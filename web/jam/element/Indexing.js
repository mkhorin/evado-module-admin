/**
 * @copyright Copyright (c) 2020 Maxim Khorin <maksimovichu@gmail.com>
 */
'use strict';

Jam.Indexing = class Indexing extends Jam.Element {

    init () {
        this.params = this.$element.data('params');
        this.model = Jam.Element.getInstance(this.$element.closest('.model'));
        this.alert = this.model.alert;
        this.table = this.model.id;

        this.$commands = this.$element.find('[data-command]');
        this.findCommand('create').click(this.onCreate.bind(this));
        this.findCommand('delete').click(this.onDelete.bind(this));

        this.$list = this.$element.find('.index-list');
        this.$list.html(this.renderItems(this.params.indexes));
        this.$list.on('click', '.list-group-item', this.onIndex.bind(this));

        // append to body to resolve nested forms
        this.$modal = $(Jam.Helper.getTemplate('modal', this.$element)).appendTo(document.body);
        this.$modal.find('[data-command="save"]').click(this.onSave.bind(this));
        this.$modal.on('show.bs.modal', this.onBeforeShowModal.bind(this));
        this.$form = this.$modal.find('form');
        this.modalAlert = new Jam.Alert({container: this.$form});
        Jam.Helper.bindLabelsToInputs(this.$form);
    }

    findCommand (name) {
        return this.$commands.filter(`[data-command="${name}"]`);
    }

    getSelectedItems () {
        return this.$list.find('.active');
    }

    reindex () {
        return this.post(this.params.reindex, {table: this.table})
            .done(this.onDoneIndexing.bind(this))
            .fail(this.onFailIndexing.bind(this));
    }

    onDoneIndexing () {
        this.alert.success('Indexing completed');
    }

    onFailIndexing ({responseText}) {
        this.alert.danger(this.getModelError(responseText, 'Indexing failed'));
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
        Jam.toggleLoader(true);
        const data = {
            table: this.table,
            name: this.getItemData($item).name
        };
        return this.post(this.params.delete, data)
            .done(this.onDoneDeletion.bind(this, $item))
            .fail(this.onFailDeletion.bind(this));
    }

    onDoneDeletion ($item) {
        $item.remove();
    }

    onFailDeletion ({responseText}) {
        this.alert.danger(this.getModelError(responseText, 'Deletion failed'));
    }

    post (url, data) {
        Jam.toggleLoader(true);
        return Jam.post(url, data).always(() => Jam.toggleLoader(false));
    }

    onIndex (event) {
        event.preventDefault();
        this.$list.children().removeClass('active');
        $(event.currentTarget).addClass('active');
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
        Jam.t(this.$modal);
        this.modalAlert.hide();
    }

    onSave () {
        this.modalAlert.hide();
        return Jam.post(this.params.create, this.$form.serialize())
            .done(this.onDoneSaving.bind(this))
            .fail(this.onFailSaving.bind(this));
    }

    onDoneSaving (data) {
        this.$list.html(this.renderItems(data));
        this.$modal.modal('hide');
    }

    onFailSaving ({responseText}) {
        this.modalAlert.danger(this.getModelError(responseText, 'Failed to save'));
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