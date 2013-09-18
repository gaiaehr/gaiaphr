Ext.define('App.view.tablet.Welcome', {
    extend: 'Ext.Container',
    xtype: 'tabletwelcome',

    config: {
        scrollable: true,
        style:'background-color:#F7F7F7',
        items:[
            {
                xtype:'img',
                src:'resources/images/logo.png',
                width:263,
                height:53,
                margin:'20 auto 20 auto'
            },
            {
                xtype:'container',
                margin:'0 2em',
                padding:'1em',
                style:'background-color:white; border:solid .1em #ccc; border-radius:.5em',
                frame:true,
                html: 'Salus Welcome Screen!!! (TABLET)'
            }
        ]
    }
});
