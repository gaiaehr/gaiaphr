Ext.define('App.view.forms.MedicalHistory', {
    extend: 'Ext.form.Panel',
    xtype: 'medicalhistory',
    requires: [

    ],
    config: {

        items: [
            {
                xtype: 'fieldset',
                title: 'Medical History',
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
