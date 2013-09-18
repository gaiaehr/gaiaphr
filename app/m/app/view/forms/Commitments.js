Ext.define('App.view.forms.Commitments', {
    extend: 'Ext.form.Panel',
    xtype: 'commitments',
    requires: [

    ],
    config: {

        items: [
            {
                xtype: 'fieldset',
                title: 'Compromisos',
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
