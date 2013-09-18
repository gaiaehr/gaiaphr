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

Ext.define('App.model.admin.ConsentLetters',{
	extend:'Ext.data.Model',
	table:{
		name:'consent_letters',
		comment:'Consent Letters'
	},
	fields:[
		{
			name:'id',
			type:'int'
		},
		{
			name:'type',
			type:'string',
			comment:'Letter Type'
		},
		{
			name:'title',
			type:'string',
			comment:'Letter Title'
		},
		{
			name:'body',
			type:'string',
			len:6000,
			comment:'Letter Body'
		},
		{
			name:'revision',
			type:'string',
            len:10,
			comment:'Revision Number'
		},
		{
			name:'language',
			type:'string',
			comment:'Language en=english / es=spanish'
		},
		{
			name:'createUid',
			type:'int',
			comment:'Create User ID'
		},
		{
			name:'updateUid',
			type:'int',
			comment:'Update User ID'
		},
		{
			name:'createDate',
			type:'date',
			dateFormat:'Y-m-d H:i:s',
			comment:'Date created'
		},
		{
			name:'updateDate',
			type:'date',
			dateFormat:'Y-m-d H:i:s',
			comment:'Date Updated'
		},
		{
			name:'active',
			type:'bool',
			comment:'Active'
		}
	],
	proxy:{
		type:'direct',
		api:{
			read:Consents.getLetters,
			create:Consents.addLetter,
			update:Consents.updateLetter
		},
		remoteGroup:false,
		reader:{
			root:'letters'
		}
	}
});