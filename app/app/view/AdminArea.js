/**
 * Created with IntelliJ IDEA.
 * User: ernesto
 * Date: 4/4/13
 * Time: 1:49 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('App.view.AdminArea',{
	extend:'Ext.tab.Panel',
	alias:'widget.adminarea',
    header:{
        title:'Salus Portal Admin Area',
        cls:'noTitleBgHeader'
    },
	tools:[
		{
			xtype:'tbtext',
			text:'Welcome',
			margin:'0 10',
			action:'welcomeText'
		},
		{
			xtype:'button',
			text:'Logout',
			action:'logout',
			cls:'redBtn'
		}
	],
	cls:'noTitleBgHeader',
	plain:true,
	border:false,
	bodyBorder:false,
	defaults:{
		border:false,
		bodyBorder:false
	},
	items:[
        {
            xtype: 'appointmentcalendar',
            title:'Appointments',
            action:'appointmentCalendar'
        },
		{
			title: 'Reports',
			xtype:'reports'
		},
		{
			title: 'Chat Admin',
			xtype:'uxiframe',
			action:'chatadmin',
			height:500
		},
		{
			title: 'Adminstrative',
			xtype:'administrative'
		}
	]
});