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

Ext.define('App.model.admin.PatientInsurance',{
	extend:'Ext.data.Model',
	table:{
		name:'patient_insurances',
		comment:'patients Insurance data'
	},
	fields:[
		{
			name:'id',
			type:'int'
		},
		{
			name:'pid',
			type:'int'
		},
        {
			name:'recNum',
			type:'string'
		},
        {
			name:'patFName',
			type:'string',
	        comment:'patient card first name'
		},
        {
			name:'patMName',
			type:'string',
	        comment:'patient card initial / middle name'
		},
        {
			name:'patLName',
			type:'string',
	        comment:'patient card last name'
		},
        {
			name:'orderId',
			type:'string',
            comment:'this id is unique within this patient'
		},
		{
			name:'insType',
			type:'string'
		},
		{
			name:'insCode',
			type:'string'
		},
		{
			name:'insGroup',
			type:'string'
		},
		{
			name:'insCover',
			type:'string'
		},
		{
			name:'insExpDate',
			type:'date',
            dataType:'date',
            dateFormat:'Y-m-d'
		},
		{
			name:'subscriberLName',
			type:'string'
		},
		{
			name:'subscriberFName',
			type:'string'
		},
		{
			name:'subscriberMName',
			type:'string'
		},
		{
			name:'subscriberSex',
			type:'string'
		},
		{
			name:'subscriberWorkPlace',
			type:'string'
		},
		{
			name:'subscriberBirthDate',
            type:'date',
            dataType:'date',
            dateFormat:'Y-m-d'
		},
		{
			name:'subscriberAddress',
			type:'string'
		},
		{
			name:'subscriberAddressCont',
			type:'string'
		},
		{
			name:'subscriberCity',
			type:'string'
		},
		{
			name:'subscriberState',
			type:'string'
		},
		{
			name:'subscriberZip',
			type:'string'
		},
		{
			name:'subscriberRelation',
			type:'string'
		},
		{
			name:'subscriberId',
			type:'string'
		},
		{
			name:'patientId',
			type:'string'
		},
		{
			name:'insImage',
            dataType:'text',
			type:'string'
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
	proxy:{
		type:'direct',
		api:{
			read:Insurance.getInsurances,
			create:Insurance.addInsurance,
			update:Insurance.updateInsurance
		},
		reader:{
			root:'data'
		}
	}
});