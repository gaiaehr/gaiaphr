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

Ext.define('App.model.admin.PatientDemographics',{
	extend:'Ext.data.Model',
	table:{
		name:'patients',
		comment:'patients data'
	},
	fields:[
		{
			name:'id',
			type:'int'
		},
		{
			name:'recNum',
			type:'string',
            convert: function (v, record) {
                // if recNum is '' then use the record ID
                return v == '' ? record.data.id : v;
            }
		},
		{
			name:'fname',
			type:'string'
		},
		{
			name:'mname',
			type:'string'
		},
		{
			name:'lname',
			type:'string'
		},
		{
			name:'photoId',
            dataType:'text',
			type:'string'
		},
        {
            name: 'fullName',
            type: 'string',
            store: false,
            convert: function (v, record) {
                return record.data.lname + ', ' + record.data.fname + ' ' + record.data.mname;
            }
        },
		{
			name:'spouse_fname',
			type:'string'
		},
		{
			name:'spouse_mname',
			type:'string'
		},
		{
			name:'spouse_lname',
			type:'string'
		},
		{
			name:'mother_fname',
			type:'string'
		},
		{
			name:'mother_mname',
			type:'string'
		},
		{
			name:'mother_lname',
			type:'string'
		},
		{
			name:'father_fname',
			type:'string'
		},
		{
			name:'father_mname',
			type:'string'
		},
		{
			name:'father_lname',
			type:'string'
		},
		{
			name:'custodian_relation',
			type:'string'
		},
		{
			name:'custodian_fname',
			type:'string'
		},
		{
			name:'custodian_mname',
			type:'string'
		},
		{
			name:'custodian_lname',
			type:'string'
		},
		{
			name:'custodian_phone',
			type:'string'
		},
		{
			name:'birth_place',
			type:'string'
		},
		{
			name:'dob',
			type:'date',
            dataType:'date',
            dateFormat:'Y-m-d'
		},
		{
			name:'sex',
			type:'string'
		},
		{
			name:'marital_status',
			type:'string'
		},
		{
			name:'ss',
			type:'string'
		},
		{
			name:'language',
			type:'string'
		},
		{
			name:'religion',
			type:'string'
		},
		{
			name:'ethnicity',
			type:'string'
		},
		{
			name:'race',
			type:'string'
		},
		{
			name:'postal_address',
			type:'string'
		},
		{
			name:'postal_address_cont',
			type:'string'
		},
		{
			name:'postal_city',
			type:'string'
		},
		{
			name:'postal_state',
			type:'string'
		},
		{
			name:'postal_code',
			type:'string'
		},
		{
			name:'address',
			type:'string'
		},
		{
			name:'address_cont',
			type:'string'
		},
		{
			name:'city',
			type:'string'
		},
		{
			name:'state',
			type:'string'
		},
		{
			name:'code',
			type:'string'
		},
		{
			name:'email',
			type:'string'
		},
		{
			name:'emer_contact',
			type:'string'
		},
		{
			name:'emer_phone',
			type:'string'
		},
		{
			name:'home_phone',
			type:'string'
		},
		{
			name:'cel_phone',
			type:'string'
		},
		{
			name:'work_phone',
			type:'string'
		},
		{
			name:'work_phone_ext',
			type:'string'
		},
		{
			name:'college',
			type:'string'
		},
		{
			name:'blood_type',
			type:'string'
		},
		{
			name:'donor',
			type:'string'
		},
        {
            name:'occupation',
            type:'string'
        },
        {
            name:'employer_name',
            type:'string'
        },
        {
            name:'employer_address',
            type:'string'
        },
        {
            name:'employer_address_cont',
            type:'string'
        },
        {
            name:'employer_city',
            type:'string'
        },
        {
            name:'employer_state',
            type:'string'
        },
        {
            name:'employer_code',
            type:'string'
        },
        {
            name:'referring',
            type:'string'
        },
        {
            name:'authorized_fname',
            type:'string'
        },
        {
            name:'authorized_mname',
            type:'string'
        },
        {
            name:'authorized_lname',
            type:'string'
        },
        {
            name:'authorized_2_fname',
            type:'string'
        },
        {
            name:'authorized_2_mname',
            type:'string'
        },
        {
            name:'authorized_2_lname',
            type:'string'
        },
        {
            name:'authorized_send_doc',
            type:'bool'
        },
        {
            name:'authorized_send_pat',
	        type:'bool'
        },
        {
            name:'patientclinical_id',
            type:'int',
	        comment:'patient_clinical.id'
        },
        {
            name:'synced',
            type:'bool',
            defaultValue:0,
	        comment:'0 = dirty / not synced'
        },
        {
            name:'lastUpdate',
            type:'date',
            dataType:'TIMESTAMP'
        }

	],
	associations: [
		{
			type: 'hasOne',
			model: 'App.model.admin.PatientClinical',
			foreignKey: 'patientclinical_id',
			getterName:'getPatientClinical',
			setterName:'setPatientClinical'
		}
	],
	proxy:{
		type:'direct',
		api:{
			read:Patients.getPatients,
			create:Patients.addPatient,
			update:Patients.updatePatient
		},
		reader:{
			root:'patients'
		}
	}
});