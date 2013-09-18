/**
 * Created with IntelliJ IDEA.
 * User: ernesto
 * Date: 4/4/13
 * Time: 2:30 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('App.view.admin.AppointmentBooks',{
	alias:'widget.appointmentbooks',
	extend:'Ext.grid.Panel',
    requires:[
        'App.store.admin.AppointmentBooks'
    ],
	store: this.abStore = Ext.create('App.store.admin.AppointmentBooks'),
	columns:[
		{
			text:'Book Name/Title',
			dataIndex:'bookTitle',
            width:150,
            editor:{
                xtype:'textfield'
            }
		},
		{
			text:'Book Description',
			dataIndex:'bookDesc',
            flex:1,
            editor:{
                xtype:'textfield'
            }
		},
		{
			text:'Active',
			dataIndex:'active',
			width:75,
            renderer:function(v){
                if(v){
                    return '<img src="resources/images/yes.gif">'
                }else{
                    return '<img src="resources/images/no.gif">'
                }
            },
            editor:{
                xtype:'checkbox'
            }
		}
	],
    plugins:[
	    {
		    ptype:'rowediting',
		    clicksToMoveEditor: 2,
		    autoCancel: false
	    }
    ],
    tbar: Ext.create('Ext.PagingToolbar', {
        store: this.abStore,
        displayInfo: true,
        displayMsg: 'Displaying Books {0} - {1} of {2}',
        emptyMsg: 'No Books to display',
        items:[
            '-',
            {
                xtype:'button',
                text:'New Book',
                icon:'resources/images/add.gif',
                action:'newGridRecord'
            },
            '-'
        ]
    })
});