Ext.define('App.view.ux.HeaderSplitButton', {
    extend: 'Ext.button.Split',
    xtype: 'headerSplitButton',

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