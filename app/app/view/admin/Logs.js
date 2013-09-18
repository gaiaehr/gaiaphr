/**
 * Created with IntelliJ IDEA.
 * User: ernesto
 * Date: 4/4/13
 * Time: 2:30 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('App.view.admin.Logs',{
	alias:'widget.logs',
	extend:'Ext.grid.Panel',
    requires:[
        'App.store.admin.Logs'
    ],
	store: this.store = Ext.create('App.store.admin.Logs'),
	columns:[
		{
			text:'Date',
			xtype:'datecolumn',
			format:'l j F, Y, g:i a',
			dataIndex:'logDate',
			width:220
		},
		{
			text:'Entry',
			dataIndex:'logEntry',
			flex:1
		},
		{
			text:'Type',
			dataIndex:'logType',
			width:120
		}
	],
    tbar: Ext.create('Ext.PagingToolbar', {
        store: this.store,
        displayInfo: true,
        displayMsg: 'Displaying topics {0} - {1} of {2}',
        emptyMsg: 'No Logs to display'
    })
});