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

Ext.define('App.model.admin.AppointmentBooks',{
	extend:'Ext.data.Model',
	table:{
		name:'appointmentbooks',
		comment:'Appointment Books data'
	},
	fields:[
		{
			name:'id',
			type:'int'
		},
		{
			name:'bookId',
			type:'int',
			comment:'External Integration Book ID'
		},
		{
			name:'bookTitle',
			type:'string',
            comment:'Book Title'
		},
		{
			name:'bookDesc',
			type:'string',
            comment:'Book Description'
		},
		{
			name:'active',
			type:'bool'
		}
	],
	proxy:{
		type:'direct',
		api:{
			read:Appointments.getBooks,
			create:Appointments.addBook,
			update:Appointments.updateBook,
			destroy:Appointments.deleteBooks
		},
		reader:{
			root:'books'
		}
	}
});