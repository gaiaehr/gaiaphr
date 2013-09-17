Ext.define('App.model.admin.Users', {
    extend: 'Ext.data.Model',
    fields: [
        {
            name: 'id',
            type:'int'
        },
        {
            name: 'username',
            type: 'string'
        },
        {
            name: 'password',
            type: 'string'
        },
        {
            name: 'title',
            type: 'string'
        },
        {
            name: 'namefirst',
            type: 'string'
        },
        {
            name: 'namemiddle',
            type: 'string'
        },
        {
            name: 'namelast',
            type: 'string'
        },
        {
            name: 'fullname',
            type: 'string',
            convert: function(v, record) {
                return record.data.title + ' ' + record.data.namefirst + ' ' + record.data.namemiddle + ' ' + record.data.namelast;
            }
        },
        {
            name: 'active',
            type: 'bool'
        }
    ],
    proxy: {
        type: 'direct',
        api: {
            read: User.GetList,
            create: User.Add,
            update: User.Update
        },
        paramOrder: 'start|limit',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});