Ext.define("App.view.logon.Window", {
    extend: 'Ext.Window',
    alias: ['widget.logon'],
    requires: [
        'Ext.form.field.Date'
    ],
    title: w('authentication_required'),
    width: 500,
    style: 'logon-window',
    closable: false,
    draggable: false,
    closeAction: 'hide',
    border: false,
    buttons: [
        {
            text: w('reset'),
            action: 'reset'
        },
        {
            text: w('login'),
            action: 'login'
        }
    ]
});