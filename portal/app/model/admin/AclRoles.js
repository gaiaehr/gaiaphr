Ext.define('App.model.admin.AclRoles', {
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
            name: 'groupId',
            type: 'int'
        }
    ],
    proxy: {
        type: 'direct',
        api: {
            read: Acl.RoleGetList,
            create: Acl.RoleAdd,
            update: Acl.RoleUpdate
        },
        paramOrder: 'filter|start|limit|sort',
        reader: {
            root: 'data'
        }
    }
});