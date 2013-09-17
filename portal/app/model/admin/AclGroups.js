Ext.define('App.model.admin.AclGroups', {
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
            name: 'active',
            type: 'bool'
        },
        {
            name: 'role_id',
            type: 'auto'
        }
    ],
    proxy: {
        type: 'direct',
        api: {
            read: Acl.GroupGetList,
            create: Acl.GroupAdd,
            update: Acl.GroupUpdate
        },
        paramOrder: 'filter|start|limit|sort',
        reader: {
            root: 'data'
        }
    }
});