Ext.define('ChemSpider.controller.Main', {
    extend: 'Ext.app.Controller',
    requires: ['CS.store.Compound'],

    init: function () {
        this.control({
            '#csSearchResults': {
                itemclick: this.onSearchResultsClick
            },
            'viewport': {
                afterrender: function () {
                    //  show Viagra compound...
                    this.showCompound(56586);
//                    this.showCompound(2157);
                }
            },
            'portlet': {
                close: this.onPortletClose
            }
        });
    },

    showCompound: function (csid) {
        var oThis = this;

        var store = this.getStore('CS.store.Compound');
        store.load({
            params: { 'csids[0]': csid },
            callback: function () {
                var compound = store.first();

                var cmp = Ext.getCmp('csCompound');
                if (cmp != null) cmp.loadData(compound);

                var syn = Ext.getCmp('csSynonyms');
                if (syn != null) syn.loadData(compound);

                var ds = Ext.getCmp('csDataSources');
                if (ds != null) ds.loadData(compound);

                var spectra = Ext.getCmp('csSpectra');
                if (spectra != null) spectra.loadData(compound);

                oThis.showMsg("Compound " + compound.data.Name + " loaded");
            }
        });
    },

    onSearchResultsClick: function (view) {
        this.showCompound(view.CSID);
    },

    onPortletClose: function (portlet) {
        this.showMsg('"' + portlet.title + '" was removed');
    },

    showMsg: function (msg) {
        var el = Ext.get('app-msg'),
            msgId = Ext.id();

        this.msgId = msgId;
        el.update(msg).show();

        Ext.defer(this.clearMsg, 3000, this, [msgId]);
    },

    clearMsg: function (msgId) {
        if (msgId === this.msgId) {
            Ext.get('app-msg').hide();
        }
    }
});
