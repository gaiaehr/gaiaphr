/**
 * Created with IntelliJ IDEA.
 * User: ernesto
 * Date: 4/4/13
 * Time: 1:49 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('App.view.PatientArea',{
	extend:'Ext.panel.Panel',
	alias:'widget.patientarea',
	requires:[
		'Ext.tab.Panel',
		'Ext.form.Panel'
	],
	layout:{
		type:'vbox',
		align:'stretch'
	},
	action:'main',
	border:false,
	bodyBorder:false,
	header:{
        title:'Pre-Admición del Paciente',
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
	items:[
		{
			xtype:'navigationtabs',
			border:false
		},
		{
			xtype: 'container',
            action:'mainTabPanel',
			cls:'patientTabPanel',
			border:false,
			bodyBorder:false,
			defaults:{
				border:false,
				bodyBorder:false,
				bodyPadding:'10 0'
			},
			plain:true,
			layout:'card',
			items:[
				{
					xtype:'demographics'
				},
				{
					xtype:'insurance'
				},
				{
					xtype:'medicalhistory'
				},
				{
					xtype:'consentletters'
				},
				{
					xtype: 'patientcalendar'
				},
				{
					xtype: 'thankyou'
				}
			]
		}
	],
	bbar:[
		{
			text:w('back'),
			minWidth:100,
			hidden:true,
			action:'back'
		},
		'->',
		{
			text:w('next'),
			minWidth:100,
			action:'next'
		},
		{
			text:w('finalize'),
			minWidth:100,
			hidden:true,
			action:'finalized'
		}
	]
});