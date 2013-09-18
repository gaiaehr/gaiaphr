/**
 * Created with IntelliJ IDEA.
 * User: ernesto
 * Date: 4/4/13
 * Time: 2:30 PM
 * To change this template use File | Settings | File Templates.
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