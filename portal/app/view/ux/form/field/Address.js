Ext.define('App.view.ux.form.field.Address', {
    extend: 'Ext.form.FieldContainer',
    alias: 'widget.addressfield',
    
    addressName:null,
    addressContName:null,
    cityName:null,
    stateName:null,
    zipcodeName:null,

    layout: 'anchor',
    fieldLabel: 'Address',
    margin: 0,
    defaults: { margin: '5 0', anchor: '100%' },
    
    initComponent: function() {

        this.items = [
            {
                xtype: 'textfield',
                name: this.addressNamem,
                margin: 0
            },
            {
                xtype: 'textfield',
                name: this.addressContName,
                emptyText: 'Cont. (optional)'
            },
            {
                xtype: 'fieldcontainer',
                layout: 'hbox',
                margin: 0,
                items: [
                    {
                        xtype: 'textfield',
                        name: this.cityName,
                        emptyText: 'City',
                        flex: 2
                    },
                    {
                        xtype: 'textfield',
                        name: this.stateName,
                        emptyText: 'State',
                        flex: 1
                    },
                    {
                        xtype: 'textfield',
                        name: this.zipcodeName,
                        emptyText: 'Zip Code',
                        width: 100
                    }
                ]
            }
        ];

        this.callParent();
    }
    
});