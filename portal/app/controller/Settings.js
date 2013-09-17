Ext.define('App.controller.Settings', {
    extend: 'App.controller.Abstract',

    refs: [
        {
            ref: 'developerGrig',
            selector: 'grig[action=developerSettingsGrid]'
        }
    ],

    init: function() {
        this.control({
            'grid[action=developerSettingsGrid]': {
                render: this.onDeveloperGridRender,
                edit: this.onDeveloperGridEdit
            }
        });
    },
    
    onDeveloperGridEdit: function (editor, context) {
        context.store.sync();
    },
    
    onDeveloperGridRender: function (grid) {
        say('hello');
        grid.down('toolbar').insert(0, {
            xtype: 'button',
            text: 'Add Setting',
            iconCls:'iconAdd',
            handler: function () {
                say(grid.plugins[0]);
                grid.plugins[0].cancelEdit();
                grid.store.insert(0,{});
                grid.plugins[0].startEdit(0,0);
            }
        });
    }
});
