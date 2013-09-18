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

Ext.define('App.model.admin.ConsentSignatures',{
	extend:'Ext.data.Model',
	table:{
		name:'consent_signatures',
		comment:'Consent Signatures'
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
			name:'letterType',
			type:'string'
		},
		{
			name:'letterRevision',
            len:10,
			type:'string'
		},
		{
			name:'signed',
			type:'bool'
		},
		{
			name:'signedIp',
			type:'string'
		},
		{
			name:'signedHostName',
			type:'string'
		},
		{
			name:'signedUserName',
			type:'string',
			comment:'$_SERVER REMOTE_USER variable'
		},
		{
			name:'signedDate',
			type:'date',
			dateFormat:'Y-m-d H:i:s'
		},
		{
			name:'synced',
			type:'bool',
			defaultValue:0,
			comment:'0 = dirty / not synced'
		}

	],
	proxy:{
		type:'direct',
		api:{
			read:Consents.getSignatures,
			create:Consents.addSignature
		}
	}
});