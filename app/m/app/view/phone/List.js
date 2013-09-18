Ext.define('App.view.phone.List', {
    extend: 'Ext.NestedList',
    xtype: 'phonelist',

    platformConfig: [{
        platform: 'blackberry',
        toolbar: {
            ui: 'dark'
        }
    }]
});
