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
