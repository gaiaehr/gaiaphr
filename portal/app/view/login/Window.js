Ext.define('App.view.login.Window', {
    extend: 'Ext.window.Window',
    requires: [
        'Ext.Img',
        'Ext.form.Panel',
        'Ext.form.action.DirectSubmit'
    ],

    alias: 'widget.loginwindow',
    action: 'loginwindow',
    title: i18n('please-login') + '...',
    bodyStyle: 'background-color:white',
    draggable: false,
    closable:false,
    items: [
        {
            xtype: 'image',
            src: 'resources/images/logon_header.png',
            margin:3,
            width: 496,
            height:124
        },
        {
            xtype: 'form',
            border: false,
            padding: '5 10',
            action:'login',
//            api: {
//                submit: Authorization.Login
//            },
            defaults: {
                xtype: 'textfield',
                anchor: '100%',
                labelWidth: 330
            },
            items: [
                {
                    
                    fieldLabel: i18n('username'),
                    name: 'username',
                    value:'admin'
                },
                {
                    fieldLabel: i18n('password'),
                    name: 'password',
                    inputType: 'password',
                    value:'pass'
                }
            ]
        }
    ],
    buttons: [
        {
            text: i18n('reset'),
            action: 'loginReset'
        },
        {
            text: i18n('login'),
            action:'login'
        }
    ]

})