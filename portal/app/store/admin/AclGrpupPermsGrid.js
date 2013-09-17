Ext.define('App.store.admin.AclGrpupPermsGrid', {
    extend: 'Ext.data.Store',
    requires: ['App.model.admin.AclGrpupPermsGrid'],
    model: 'App.model.admin.AclGrpupPermsGrid',
    groupField: 'category'
})