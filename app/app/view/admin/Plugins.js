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

Ext.define('App.view.admin.Plugins',{
	alias:'widget.pluginspanel',
	extend:'Ext.form.Panel',
	border:false,
	bodyPadding:5,
	items:[
		{
            xtype:'fieldset',
            title: 'TRA sync',
            defaults: {
                xtype:'textfield',
                anchor: '60%'
            },
            checkboxName:'TRA_enable',
            checkboxToggle: true,
            collapsed: true,
            layout: 'anchor',
            padding:15,
            items :[
                {
                    fieldLabel: 'TRA Server IP',
                    name: 'TRA_ip'
                },
                {
                    fieldLabel: 'TRA Secret Key',
                    name: 'TRA_key'
                },
                {
                    xtype:'button',
                    text:'TRA POST Request TEST',
                    action:'TRAPostTest'
                },
                {
                    xtype:'button',
                    text:'TRA GET Request TEST',
                    margin:'5 0 0 0',
                    action:'TRAGetTest'
                }
            ]
		}
	],
	buttons:[
		{
			text:'Save',
            action:'savePlugins'

		}
	]
});