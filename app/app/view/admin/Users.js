/**
 * Created with IntelliJ IDEA.
 * User: ernesto
 * Date: 4/4/13
 * Time: 2:30 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('App.view.admin.Users',{
	alias:'widget.users',
	extend:'Ext.grid.Panel',
    requires:[
        'App.store.admin.Users'
    ],
	store: this.uStore = Ext.create('App.store.admin.Users'),
	columns:[
		{
			text:'Full Name',
			dataIndex:'fullname',
            flex:1,
            editor:{
                xtype:'textfield'
            }
		},
        {
            text:'Username',
            dataIndex:'username',
            width:150,
            editor:{
                xtype:'textfield'
            }
        },
		{
			text:'Password',
			dataIndex:'password',
			width:150,
            renderer:function(v){
                return App.app.getController('Admin').rendererPassword(v);
            },
            editor:{
                xtype:'textfield',
                inputType:'password'
            }
		},
		{
			text:'Role',
			dataIndex:'role',
			width:150,
            renderer:function(v){
                if(v === '1'){
                    return 'Admin'
                }else{
                    return 'User'
                }
            },
            editor:{
                xtype:'combobox',
                queryMode: 'local',
                displayField: 'title',
                valueField: 'value',
                store:Ext.create('Ext.data.Store', {
                    fields: ['title', 'value'],
                    data : [
                        {'title':'Admin', 'value':'1'},
                        {'title':'User', 'value':'2'}
                    ]
                })
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
        store: this.uStore,
        displayInfo: true,
        displayMsg: 'Displaying Users {0} - {1} of {2}',
        emptyMsg: 'No Users to display',
        items:[
            '-',
            {
                xtype:'button',
                text:'New User',
                icon:'resources/images/add.gif',
                action:'newGridRecord'
            },
            '-'
        ]
    })
});