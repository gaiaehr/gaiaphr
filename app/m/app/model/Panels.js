Ext.define('App.model.Panels', {
    extend: 'Ext.data.Model',

    config: {
        fields: [
            {name: 'text',        type: 'string'},
            {name: 'view',        type: 'string'}
        ]
    }
});
