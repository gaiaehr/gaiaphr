Ext.define('App.model.admin.AclGrpupPermsGrid', {
    extend: 'Ext.data.Model',
    fields: [
        {
            name: 'id',
            type: 'int'
        },
        {
            name: 'title',
            type: 'string'
        },
        {
            name: 'groupId',
            type: 'int'
        },
        {
            name: 'category',
            type: 'string'
        }
    ],
    proxy: {
        type: 'direct',
        api: {
            read: Acl.GetGroupPemrsList,
            create: Acl.UpdateGroupPemrs,
            update: Acl.UpdateGroupPemrs
        },
        paramOrder: 'filter|start|limit|sort',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});