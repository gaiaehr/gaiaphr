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

Ext.define('App.model.admin.Templates',{
	extend:'Ext.data.Model',
	table:{
		name:'templates',
		comment:'Email Templates'
	},
	fields:[
		{
			name:'id',
			type:'int'
		},
		{
			name:'tplTitle',
			type:'string',
			comment:'Template Title'
		},
		{
			name:'tplName',
			type:'string',
			comment:'Template unique name'
		},
		{
			name:'tplSubject',
			type:'string',
			comment:'Email Subject'
		},
		{
			name:'tplBody',
			type:'string',
			dataType:'TEXT',
			comment:'Email HTML Body'
		},
		{
			name:'tplLang',
			type:'string',
			comment:'Template Language'
		}
	],
	proxy:{
		type:'direct',
		api:{
			read:Email.getTemplates,
			update:Email.updateTemplates
		}
	}
});