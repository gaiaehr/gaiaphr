/**
 * Created with IntelliJ IDEA.
 * User: ernesto
 * Date: 4/4/13
 * Time: 4:30 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('App.model.admin.Plugins', {
    extend: 'Ext.data.Model',
    table: {
        name: 'plugins',
        comment: 'Plugins Data'
    },
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
            name: 'name',
            type: 'string',
            comment: 'unique name'
        },
        {
            name: 'server',
            type: 'string',
            comment: 'server and port'
        },
        {
            name: 'secret',
            type: 'string',
            comment: 'Secret Key'
        },
        {
            name: 'active',
            type: 'bool'
        }
    ],
    proxy: {
        type: 'direct',
        api: {
            read: Plugins.getPlugins,
            create: Plugins.addPlugin,
            update: Plugins.updatePlugin,
            destroy: Plugins.deletePlugin
        },
        reader: {
            root: 'data'
        }
    }
});