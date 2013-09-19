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

Ext.define('App.view.admin.EmailTemplates',{
	alias:'widget.emailtemplates',
	extend:'Ext.form.Panel',
	height:600,
	border:false,
    requires:[
        'App.store.admin.Templates'
    ],
	layout:{
		type:'vbox',
		align:'stretch'
	},
	defaults:{
		labelAlign:'top'
	},
	bodyPadding:5,
	items:[
		{
			xtype:'textfield',
			fieldLabel:'Subject',
			name:'tplSubject'
		},
		{
			xtype:'htmleditor',
			fieldLabel:'Body',
			name:'tplBody',
			flex:1
		}
	],
	tbar:[
		{
			xtype:'combobox',
			displayField:'tplTitle',
			valueField:'tplBody',
			forceSelection:true,
			editable:false,
			emptyText:'Select',
			action:'templatesCombo',
			store:Ext.create('App.store.admin.Templates')

		},
		'Tokens: [patientName], [patientId], [appointmentId], [appointmentDate], [providerName]'
	],
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'bottom',
            ui: 'footer',
            defaults: {
                xtype: 'button'
            },
            items: [
                {
                    xtype:'textfield',
                    action:'testEmailField',
                    emptyText:'Test Email',
                    allowBlank:false,
                    validateOnBlur:false,
                    vtype: 'email',
                    width:250
                },
                {
                    text:'Send Test Email',
                    action:'sendTestEmailBtn'
                },
                '->',
                {
                    text:'Cancel',
                    action:'templateCancel'
                },
                {
                    text:'Save',
                    action:'templateSave'
                }
            ]
        }
    ]
});