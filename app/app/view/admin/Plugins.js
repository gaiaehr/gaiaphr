/**
 * Created with IntelliJ IDEA.
 * User: ernesto
 * Date: 4/4/13
 * Time: 2:30 PM
 * To change this template use File | Settings | File Templates.
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