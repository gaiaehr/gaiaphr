
Ext.define('App.view.fields.AppointmentBooks',{
	extend:'Ext.form.field.ComboBox',
	alias:'widget.appointmentbookscombo',
	fieldLabel:'Libro de Cita',
	displayField:'bookTitle',
	valueField:'id',
	store:Ext.create('App.store.admin.AppointmentBooks',{
		filters:[
			{
				property:'active',
				value:1
			}
		]
	})
});
