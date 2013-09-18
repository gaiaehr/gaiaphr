Ext.define('App.view.phone.NavigationBar', {
    extend: 'Ext.TitleBar',
    xtype: 'phonenavigationbar',

    config: {
        ui: 'dark'
    },

    platformConfig: [{
        platform: 'blackberry',
        ui: 'light'
    }]
});
