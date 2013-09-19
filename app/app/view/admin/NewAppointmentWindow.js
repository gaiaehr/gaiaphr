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

Ext.define('App.view.admin.NewAppointmentWindow',{
	extend:'Ext.window.Window',
	alias:'widget.newappointmentwindow',
	title:'Nuevo Paciente/Cita',
	closeAction:'hide',
	modal:true,
	layout: {
		type:'vbox',
		padding:'5',
		pack:'center',
		align:'center'
	},
	items:[
		{
			xtype:'form',
			action:'appointmentForm',
			defaults:{
				xtype:'textfield',
				labelWidth:150,
				width:600
			},
			border:false,
			frame:false,
			bodyPadding:10,
			items:[
				{
					name:'pid',
					hidden:true
				},
				{
					xtype:'patientsearch',
					fieldLabel:'Nombre',
					displayField:'fname',
					name:'fname',
					action:'newAppointmentSearch'
				},
				{
					fieldLabel:'Inicial',
					name:'mname'
				},
				{
					xtype:'patientsearch',
					fieldLabel:'Apellido(s)',
					displayField:'lname',
					name:'lname',
					action:'newAppointmentSearch'
				},
				{
					xtype:'datefield',
					fieldLabel:'Fecha de Nacimiento',
					format:'Y-m-d',
					name:'dob'
				},
				{
					fieldLabel:'Correo Electronico',
					name:'email'
				},
				{
					xtype:'appointmentbookscombo',
					name:'bookId'
				},
				{
					xtype:'datetimefield',
					fieldLabel:'Fecha de Cita',
					name:'startDate'
				}
			]
		}
	],
	buttons:[
		{
			text:'Cacel',
			action:'newAppointmentCancel'
		},
		{
			text:'Save',
			action:'newAppointmentSave'
		}
	]
});