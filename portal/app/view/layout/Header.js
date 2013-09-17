Ext.define('App.view.layout.Header', {
    extend: 'Ext.container.Container',
    requires:[
        'Ext.Img',
        'App.view.ux.HeaderButton',
        'App.view.ux.HeaderSplitButton'
    ],

    region: 'north',
    xtype: 'appHeader',
    height: 50,
    margin:'0 0 3 0',
    items: [
        {
            xtype: 'image',
            src: 'resources/TRANextGenLogo.png',
            style:'float:left;margin-right:5px',
            height: 50,
            width: 200
        },                
        {
            xtype: 'headerButton',
            text:'Calendar Test 20',
            'float': 'left',
            action:'calendarTest20'
        },
        {
            xtype: 'headerButton',
            text: 'Calendar Test 10',
            'float': 'left',
            action:'calendarTest10'
        },
        {
            xtype: 'headerSplitButton',
            'float': 'right',
            text: 'User',
            action: 'userbutton',
            menu: [
                {
                    text: 'Settings'
                },
                {
                    text: 'Logout',
                    action: 'logout',
                    cls: 'logout'
                }
            ]
        },

        {
            xtype: 'headerButton',
            'float': 'right',
            text: 'Test Server',
            action: 'serverTest'
        }
    ]
});