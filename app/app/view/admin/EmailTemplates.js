/**
 * Created with IntelliJ IDEA.
 * User: ernesto
 * Date: 4/4/13
 * Time: 2:30 PM
 * To change this template use File | Settings | File Templates.
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