/**
 * Created with IntelliJ IDEA.
 * User: ernesto
 * Date: 4/4/13
 * Time: 2:30 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('App.view.admin.ConsentLetterDetails',{
	alias:'widget.consentletterdetails',
	extend:'Ext.window.Window',
	title:'Letter Details',
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
					name:'revision',
					hidden:true
				},
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
	tools:[
		{
			xtype:'button',
			text:'New Version',
			action:'consentLetterNewVersion'
		}
	],
	buttons: [
		{
			text:'Save',
			action:'consentLetterSave'
		},
		{
			text:'Cancel',
			action:'consentLetterCancel'
		}
	]
});