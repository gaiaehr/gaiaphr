/**
 * Created with IntelliJ IDEA.
 * User: ernesto
 * Date: 4/4/13
 * Time: 2:30 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('App.view.admin.ConsentLetters',{
	alias:'widget.consentgrid',
	extend:'Ext.grid.Panel',
	requires:[
		'App.store.admin.ConsentLetters'
	],
	store: this.store = Ext.create('App.store.admin.ConsentLetters',{
		remoteGroup:false
	}),
	columns:[
		{
			text:'Title',
			dataIndex:'title',
			flex:1
		},
		{
			text:'Language',
			dataIndex:'language',
			width:100,
			renderer:function(v){
				if(v == 'en'){
					return 'English'
				}else if(v == 'es'){
					return 'Español'
				}else{
					return v
				}
			}
		},
		{
			text:'Revision',
			dataIndex:'revision',
			width:100
		},
		{
			text:'Active',
			dataIndex:'active',
			width:60,
			renderer:function(v){
				if(v){
					return '<img src="resources/images/yes.gif">'
				}else{
					return '<img src="resources/images/no.gif">'
				}
			}
		}
	],
	features: [
		{
			ftype:'grouping',
			groupHeaderTpl: 'Letter Type: {name}'
		}
	],
	tbar: Ext.create('Ext.PagingToolbar', {
		store: this.store,
		displayInfo: true,
		displayMsg: 'Displaying Letters {0} - {1} of {2}',
		emptyMsg: 'No Logs to display'
	})
});