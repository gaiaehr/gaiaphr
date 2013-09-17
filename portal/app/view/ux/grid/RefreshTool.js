/**
 * Simply add a refresh tool to the grid
 */
Ext.define('App.view.ux.grid.RefreshTool', {
    extend: 'Ext.AbstractPlugin',
    alias: 'plugin.gridrefresh',

    requires: [
        'Ext.toolbar.Toolbar',
        'Ext.panel.Tool'
    ],
    
    init: function (grid) {

        var me = this,
            t = grid.getHeader() ||
                grid.getDockedItems('toolbar[dock="top"]')[0] ||
                grid.addDocked({ xtype: 'toolbar', dock: 'top' })[0];
       
        t.add('->',{
            xtype: 'tool',
            type: 'refresh',
            callback: me.doRefresh,
            scope: me
        });
        
    },
    
    doRefresh: function () {
        this.cmp.store.load();
    }
});

