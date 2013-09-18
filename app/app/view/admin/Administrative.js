/**
 * Created with IntelliJ IDEA.
 * User: ernesto
 * Date: 4/4/13
 * Time: 2:30 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('App.view.admin.Administrative',{
	alias:'widget.administrative',
	extend:'Ext.tab.Panel',
	padding:'5 0',
	defaults:{
		minHeight:500
	},
	items:[
		{
			title:'Email Templates',
			xtype:'emailtemplates'
		},
		{
			title:'Consent Letters',
			xtype:'consentgrid'
		},
		{
			title:'Appointment Books',
			xtype:'appointmentbooks'
		},
		{
			title:'Users',
			xtype:'users'
		},
		{
			title:'IP Access List',
			xtype:'ipaccess'
		},
		{
			title:'CMS',
			xtype:'cmsgrid'
		},,
		{
			title:'Plugins',
			xtype:'pluginspanel'
		},
		{
			title:'Logs',
			xtype:'logs'
		}

	]

});