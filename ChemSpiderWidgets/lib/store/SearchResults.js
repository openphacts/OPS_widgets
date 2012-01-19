Ext.define('CS.store.SearchResults', {
    extend: 'Ext.data.Store',
    requires: ['CS.model.SearchResults', 'CS.config.Settings'],
    model: 'CS.model.SearchResults',
    constructor: function () {
        this.callParent(arguments);

        this.setProxy({
            type: 'jsonp',
            url: CS.config.Settings.baseUrl + '/JSON.ashx?op=getSearchResultAsCompounds'
        });
    }
});
