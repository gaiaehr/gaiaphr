Ext.define('App.store.admin.Settings', {
    extend: 'Ext.data.Store',
    model: 'App.model.admin.Settings',
    groupField: 'category',
    autoLoad: true
})