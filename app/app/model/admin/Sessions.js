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

Ext.define('App.model.admin.Sessions',{
	extend:'Ext.data.Model',
	table:{
		name:'sessions',
		comment:'PHP Authorization Sessions LOG'
	},
	fields:[
		{
			name:'id',
			type:'int'
		},
		{
			name:'aid',
			type:'string',
            comment:'Access ID = User ID | Patient ID | Appointment ID'
		},
		{
			name:'sid',
			type:'string',
			comment:'PHP Session ID'
		},
		{
			name:'sDate',
            type:'date',
			comment:'Session start date and time'
		},
        {
            name:'eDate',
            type:'date',
            comment:'Session end date and time'
        },
        {
            name:'accessType',
            type:'string',
            comment:'user | patient | appointment'
        },
        {
            name:'success',
            type:'bool',
            comment:'1 pass, 0 fail'
        },
		{
			name:'token',
			type:'string',
            comment:'Authorization Token'
		},
		{
			name:'ip',
			type:'string',
            comment:'remote IP address'
		}
	]
});