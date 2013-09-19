/**
 * GaiaPHR (Patient Health Records)
 * Copyright (C) 2013 Certun, inc.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
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