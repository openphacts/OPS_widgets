Ext.define('CS.view.search.Simple', {
    extend: 'CS.view.search.Base',
    bodyStyle: 'padding: 5px;',
    alias: 'widget.simplesearch',
    height: 34,
    width: 250,
    layout: 'column',
    initComponent: function () {
        Ext.apply(this, {
            items: [
                {
                    xtype: 'textfield',
                    id: 'searchField',
                    emptyText: 'eg. Aspirin',
                    //value: 'c6h7',
                    columnWidth: 1
                },
                {
                    xtype: 'button',
                    id: 'searchBtn',
                    text: 'Search',
                    width: 80,
                    scope: this,
                    handler: function (btn, evn) {
                        this.doSimpleSearch();
                    }
                }
            ]
        });

        this.store = Ext.create('CS.store.Search', { operation: 'SimpleSearch' });

        this.callParent(arguments);
    },
    doSimpleSearch: function () {
        var query = Ext.getCmp('searchField').getValue();
        if (query != '') {
            Ext.MessageBox.show({
                title: 'Searching...',
                progressText: 'Searching...',
                width: 300,
                buttons: Ext.MessageBox.CANCEL,
                fn: function (btnId) {
                    Ext.MessageBox.alert('Cancel', 'Cancel search... not implemented yet');
                },
                progress: true,
                closable: false
            });

            this.store.load({
                params: { 'searchOptions.QueryText': query },
                scope: this,
                callback: function (records, options, success) {
                    this.rid = this.store.getProxy().reader.rawData;
                    this.updateSearchStatus();
                }
            });
        }
        else {
            Ext.Msg.show({
                title: 'Nothing to search',
                msg: 'Please enter some text for searching',
                buttons: Ext.Msg.OK,
                scope: this,
                icon: Ext.MessageBox.INFO
            });
        }
    }
});
