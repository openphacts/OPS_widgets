Ext.define('CS.view.search.Structure', {
    extend: 'CS.view.search.Base',
    alias: 'widget.structuresearch',
    bodyStyle: 'padding: 5px;',
    height: 34,
    onRender: function () {
        this.callParent(arguments);

        this.add({
            border: false,
            items: {
                xtype: 'button',
                id: 'structureSearchBtn',
                text: 'Structure Search',
                width: 80,
                scope: this,
                handler: function (btn, evn) {
                    this.getWindow().show();
                }
            }
        });
    },
    initComponent: function () {
        //  compose data store for ExactStructureSearch...
        this.exactStructureSearchStore = Ext.create('CS.store.Search', { operation: 'ExactStructureSearch' });

        //  compose data store for SubstructureSearch...
        this.subStructureSearchStore = Ext.create('CS.store.Search', { operation: 'SubstructureSearch' });

        this.callParent(arguments);
    },
    doSearch: function () {
        var activeTab = this.tabs.getActiveTab();
        var index = this.tabs.items.findIndex('id', activeTab.id);

        var smiles;
        if (index == 0) {
            smiles = Ext.getCmp('jChemPaint').getSmiles();
        }
        else if (index == 1) {
            smiles = Ext.getCmp('jme').getSmiles();
        }

        this.getWindow().hide();

        if (smiles != '') {
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

            if (Ext.getCmp('exactSearch').checked) {
                this.exactStructureSearchStore.load({
                    params: { 'searchOptions.Molecule': smiles },
                    scope: this,
                    callback: function () {
                        this.rid = this.exactStructureSearchStore.getProxy().reader.rawData;
                        this.updateSearchStatus();
                    }
                });
            }
            else {
                Ext.Msg.show({
                    title: 'Not supported',
                    msg: 'Only exact structure search supported at this momment',
                    buttons: Ext.Msg.OK,
                    scope: this,
                    icon: Ext.MessageBox.INFO
                });
            }
        }
        else {
            Ext.Msg.show({
                title: 'Forgot to draw molecule?',
                msg: 'Please draw molecule at first and try again!',
                buttons: Ext.Msg.OK,
                scope: this,
                fn: function () {
                    this.getWindow().show();
                },
                icon: Ext.MessageBox.INFO
            });
        }
    },
    getWindow: function () {
        if (this.wnd == null) {
            this.tabs = new Ext.TabPanel({
                activeTab: 0,
                deferredRender: false,
                items: [
                    {
                        title: 'JChemPaint',
                        items: Ext.create('CS.applet.JChemPaint', { id: 'jChemPaint' })
                    },
                    {
                        title: 'JME',
                        items: Ext.create('CS.applet.JME', { id: 'jme' })
                    }
                ]
            });

            this.wnd = new Ext.Window({
                width: 700,
                height: 580,
                closeAction: 'hide',
                title: 'Structure Search',
                border: true,
                shadow: true,
                items: [
                    this.tabs,
                    {
                        xtype: 'radiogroup',
                        id: 'searchType',
                        width: 300,
                        items: [
                            {
                                id: 'exactSearch',
                                name: 'searchType',
                                boxLabel: 'Exact search',
                                inputValue: 'exact',
                                checked: true
                            },
                            {
                                id: 'substructureSearch',
                                name: 'searchType',
                                boxLabel: 'Substructure search',
                                inputValue: 'substructure',
                                disabled: true
                            }
                        ]
                    }
                ],
                bbar: [
                    '->',
                    {
                        text: 'Search',
                        scope: this,
                        handler: function () {
                            this.doSearch();
                        }
                    },
                    {
                        text: 'Close',
                        scope: this,
                        handler: function () {
                            this.getWindow().hide();
                        }
                    }
                ]
            });
        }

        return this.wnd;
    }
});
