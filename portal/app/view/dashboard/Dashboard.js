Ext.define('App.view.dashboard.Dashboard', {
    extend: 'App.view.dashboard.PortalPanel',
    title: 'Dashboard',
    requires:[
        'App.view.dashboard.PortalPanel',
        'App.view.dashboard.PortalColumn',
        'App.view.dashboard.GridPortlet',
        'App.view.dashboard.ChartPortlet'
    ],
    items: [{
        id: 'col-1',
        items: [{
            id: 'portlet-1',
            title: 'Grid Portlet',
//            tools: this.getTools(),
            items: Ext.create('App.view.dashboard.GridPortlet')
//            listeners: {
//                'close': Ext.bind(this.onPortletClose, this)
//            }
        }, {
            id: 'portlet-2',
            title: 'Portlet 2',
//            tools: this.getTools(),
            html: '<div class="portlet-content">Hello World!</div>',
//            listeners: {
//                'close': Ext.bind(this.onPortletClose, this)
//            }
        }]
    }, {
        id: 'col-2',
        items: [{
            id: 'portlet-3',
            title: 'Portlet 3',
//            tools: this.getTools(),
            html: '<div class="portlet-content">Hello World!</div>'
//            listeners: {
//                'close': Ext.bind(this.onPortletClose, this)
//            }
        }]
    }, {
        id: 'col-3',
        items: [{
            id: 'portlet-4',
            title: 'Stock Portlet',
//            tools: this.getTools(),
            items: Ext.create('App.view.dashboard.ChartPortlet')
//            listeners: {
//                'close': Ext.bind(this.onPortletClose, this)
//            }
        }]
    }]
    
});