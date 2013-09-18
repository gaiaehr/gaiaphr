Ext.define('App.view.forms.Demographics', {
    extend: 'Ext.form.Panel',
    xtype: 'demographics',
    requires: [

    ],
    config: {

        items: [
            {
                xtype: 'fieldset',
                title: 'About You',
                instructions: 'Tell us all about yourself',
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
