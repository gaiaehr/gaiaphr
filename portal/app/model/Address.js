Ext.define('App.model.Address', {
    extend: 'Ext.data.Model',
    fields: [
        {
            name: 'id',
            type:'int'
        },
        {
            name: 'ownerid',
            type: 'int'
        },
        {
            name: 'ownertype',
            type: 'string'
        },
        {
            name: 'address',
            type: 'string'
        },
        {
            name: 'addresscont',
            type: 'string'
        },
        {
            name: 'city',
            type: 'string'
        },
        {
            name: 'state',
            type: 'string'
        },
        {
            name: 'country',
            type: 'string'
        },
        {
            name: 'zipcode',
            type: 'string'
        },
        {
            name: 'active',
            type: 'bool'
        }
    ],
    proxy: {
        type: 'direct',
        api: {
            read: Address.GetList,
            create: Address.Add,
            update: Address.Update
        },
        paramOrder: 'filter|start|limit|sort',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});