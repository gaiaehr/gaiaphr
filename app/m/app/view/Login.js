Ext.define('App.view.Login', {
    extend: 'Ext.form.Panel',
    xtype: 'login',
    requires: [
        'Ext.Img',
        'Ext.TitleBar',
        'Ext.form.FieldSet',
        'Ext.field.DatePicker',
        'Ext.field.Email'
    ],
    config: {
        items:[
            {
                xtype:'img',
                src:'resources/images/logo.png',
                width:263,
                height:53,
                margin:'20 auto 20 auto'
            },
            {
                xtype: 'fieldset',
                instructions: 'Bienvenido a SALUS',
                items:[
                    {
                        xtype: 'textfield',
                        name: 'lname',
                        label: 'Apellido(s)'
                    },
                    {
                        xtype: 'datepickerfield',
                        name: 'dob',
                        label: 'Fecha de <br>Nacimiento'
                    },
                    {
                        xtype: 'emailfield',
                        name: 'email',
                        label: 'Email'
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
                        text: 'Login',
                        action:'login',
                        ui: 'confirm'
                    }
                ]
            }
        ]
    }
});
