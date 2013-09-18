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

Ext.define('App.model.admin.Confirmations',{
	extend:'Ext.data.Model',
	table:{
		name:'confirmations',
		comment:'Confirmations Requests'
	},
	fields:[
		{
			name:'id',
			type:'int'
		},
		{
			name:'appId',
			type:'int',
			comment:'appointments.id'
		},
		{
			name:'batchId',
			type:'int',
			comment:'batches.id'
		},
		{
			name:'token',
			type:'string',
            comment:'Access Token to confirm or cancel the appointment'
		},
		{
			name:'answered',
            type:'bool',
            comment:'0=still waiting for answer, 1=answer received'
		},
		{
			name:'sendStamp',
            type:'date',
            comment:'date email was send'
		},
		{
			name:'answerStamp',
            type:'date',
            comment:'date confirmation'
		},
		{
			name:'errorLogId',
            type:'string',
            comment:'logs.id'
		}
	]
});