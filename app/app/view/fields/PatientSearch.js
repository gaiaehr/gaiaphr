
Ext.define('App.view.fields.PatientSearch',{
	extend:'Ext.form.field.ComboBox',
	alias:'widget.patientsearch',
	store: Ext.create('App.store.calendar.PatientSearch'),
	displayField: 'recNum',
	typeAhead: false,
	hideTrigger:true,
	anchor: '100%',
	listConfig: {
		loadingText: 'Searching...',
		emptyText: 'No matching patient found.',
		// Custom rendering template for each item
		getInnerTpl: function() {
			return '' +
				'<div>' +
				'   <p style="font-weight:bold">{fullName} ({[values.sex[0].toUpperCase()]}) {[Ext.Date.format(values.dob, "F j, Y")]}' +
                '       <span style="float:right">#{recNum}</span>' +
                '   </p>' +
				'   <p>' +
                '       (H) {[values.home_phone != "" ? values.home_phone : "000-000-0000" ]} || ' +
                '       (C) {[values.cel_phone  != "" ? values.home_phone : "000-000-0000" ]} || ' +
                '       (W) {[values.work_phone != "" ? values.home_phone : "000-000-0000" ]} ' +
                '   </p>' +
				'</div>';
		}
	},
	pageSize: 25
});
