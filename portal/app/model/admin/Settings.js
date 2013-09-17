Ext.define('App.model.admin.Settings', {
    extend: 'Ext.data.Model',
    fields: [
        {
            name: 'id',
            type:'int'
        },
        {
            name: 'title',
            type: 'string'
        },
        {
            name: 'settingkey',
            type: 'string'
        },
        {
            name: 'settingvalue',
            type: 'string'
        },
        {
            name: 'category',
            type: 'string'
        },
        {
            name: 'notes',
            type: 'string'
        }
    ],
    proxy: {
        type: 'direct',
        api: {
            read: Settings.GetList,
            create: Settings.Add,
            update: Settings.Update
        },
        paramOrder: 'filter|start|limit|order',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});