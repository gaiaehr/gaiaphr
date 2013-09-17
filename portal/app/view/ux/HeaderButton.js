Ext.define('App.view.ux.HeaderButton', {
    extend: 'Ext.button.Button',
    xtype: 'headerButton',

    scale: 'large',
    text:'Button',
    float: 'right',

    initComponent:function(){
        this.callParent();
        this.addCls([
            'header-button',
            'header-button-' + this.float
        ]);
    }
});