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

Ext.define('App.model.admin.Appointments', {
    extend: 'Ext.data.Model',
    table: {
        name: 'appointments',
        comment: 'appointment data'
    },
    fields: [
        {
            name: 'id',
            type: 'int'
        },
        {
            name: 'pid',
            type: 'int'
        },
        {
            name: 'appNum',
            type: 'string',
            comment:'External Appointment Number/ID'
        },
        {
            name: 'appAck',
            type: 'string',
            comment: 'External Appointment Acknowledgment'
        },
        {
            name: 'recNum',
            type: 'string',
            comment:'External Record Number/ Patient ID'
        },
        {
            name: 'bookNum',
            type: 'string',
            comment: 'External book code/number'
        },
        {
            name: 'startDate',
            type: 'date',
            dateFormat: 'Y-m-d H:i:s'
        },
        {
            name: 'endDate',
            type: 'date',
            dateFormat: 'Y-m-d H:i:s'
        },
        {
            name: 'fname',
            type: 'string'
        },
        {
            name: 'mname',
            type: 'string'
        },
        {
            name: 'lname',
            type: 'string'
        },
        {
            name: 'dob',
            type: 'date',
            dataType: 'date',
            dateFormat: 'Y-m-d'
        },
        {
            name: 'email',
            type: 'string'
        },
        {
            name: 'phone',
            type: 'string'
        },
        {
            name: 'phoneType',
            type: 'string'
        },
        {
            name: 'status',
            type: 'int',
            defaultValue: '0',
            comment: '0=precessing,1=pending,2=completed,3=confirmed,4=canceled,8=waiting,9=error'
        },
        {
            name: 'bookId',
            type: 'int',
            comment: 'appointmentbooks.id'
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
            name: 'notes',
            type: 'string'
        },
        {
            name: 'isAllDay',
            type: 'bool'
        },
        {
            name: 'reminder',
            type: 'string'
        },
        {
            name: 'rrule',
            type: 'string'
        },
        {
            name: 'duration',
            defaultValue: -1, // the standard int default of 0 is actually a valid duration
            type: 'int'
        },
        {
            name: 'origid',
            type: 'string'
        },
        {
            name: 'ristart',
            type: 'date',
            dateFormat: 'Y-m-d H:i:s'
        },
        {
            name: 'redit',
            type: 'string'
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
    proxy: {
        type: 'direct',
        api: {
            read: Appointments.getAppointments,
            create: Appointments.addAppointment,
            update: Appointments.updateAppointment,
            destroy: Appointments.deleteAppointment
        },
        reader: {
            root: 'data'
        }
    }
});