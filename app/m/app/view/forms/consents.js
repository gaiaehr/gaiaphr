Ext.define('App.view.forms.Consents', {
    extend: 'Ext.form.Panel',
    xtype: 'consents',
    requires: [

    ],
    config: {

        items: [
            {
                xtype: 'fieldset',
                title: 'Consentimientos',
                items:[
                    {
                        xtype: 'textfield',
                        name: 'fname',
                        label: 'Nombre'
                    },
                    {
                        xtype: 'textfield',
                        name: 'mname',
                        label: 'Sugundo'
                    },
                    {
                        xtype: 'textfield',
                        name: 'lname',
                        label: 'Apellidos'
                    }
                ]
            },
            {
                xtype : 'toolbar',
                docked: 'bottom',
                items:[
                    {
                        text: 'Reset',
                        action:'reset'
                    },
                    {
                        xtype: 'spacer'
                    },
                    {
                        text: 'Save',
                        action:'save',
                        ui: 'confirm'
                    }
                ]
            }
        ]
    }
});
