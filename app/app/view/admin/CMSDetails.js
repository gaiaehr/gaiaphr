/**
 * Created with IntelliJ IDEA.
 * User: ernesto
 * Date: 4/4/13
 * Time: 2:30 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('App.view.admin.CMSDetails',{
	alias:'widget.cmsdetails',
	extend:'Ext.window.Window',
	title:'Content Details',
	closeAction:'hide',
	modal:true,
	items:[
		{
			xtype:'form',
			bodyPadding:10,
			width:800,
			defaults:{
				xtype:'textfield'
			},
			items:[
				{
					anchor:'100%',
					name:'title'
				},
				{
					xtype:'htmleditor',
					anchor:'100%',
					height:350,
					name:'body'
				}
			]
		}
	],
	buttons: [
		{
			text:'Save',
			action:'cmsSave'
		},
		{
			text:'Cancel',
			action:'cmsCancel'
		}
	]
});