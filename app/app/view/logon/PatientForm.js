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

Ext.define('App.view.logon.PatientForm',{
	extend:'Ext.form.Panel',
	alias:'widget.logonpatientform',
	bodyPadding:10,
	api: {
		submit: Logon.getAuthorization
	},
	border:false,
    bodyBorder:false,
	items:[
		{
			xtype:'textfield',
			fieldLabel:w('lastname'),
			emptyText:w('bothLastNames'),
			anchor:'100%',
			labelWidth:250,
            value:'Rodriguez',
			name:'lname'
		},
		{
			xtype:'datefield',
			fieldLabel:w('dob'),
			emptyText:'yyyy-mm-dd',
			anchor:'100%',
			labelWidth:250,
			format:'Y-m-d',
            value:'1978-01-23',
			name:'dob'
		},
		{
			xtype:'textfield',
			fieldLabel:w('email'),
			emptyText:'fulano@gmail.com',
			anchor:'100%',
			labelWidth:250,
            value:'vela1606@gmail.com',
			name:'email'
		}
	]
});