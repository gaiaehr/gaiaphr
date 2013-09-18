/**
 * Created with IntelliJ IDEA.
 * User: ernesto
 * Date: 4/4/13
 * Time: 2:16 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('App.view.logon.AdminForm',{
	extend:'Ext.form.Panel',
	alias:'widget.logonadminform',
	bodyPadding:10,
	api: {
		submit: Logon.getAuthorization
	},
	border:false,
    bodyBorder:false,
	items:[
		{
			xtype:'textfield',
			fieldLabel:'Nombre de usuario',
			emptyText:'username',
			anchor:'100%',
			labelWidth:250,
			name:'username',
			value:'admin'
		},
		{
			xtype:'textfield',
			fieldLabel:'Contraseña',
			inputType: 'password',
			emptyText:'password',
			anchor:'100%',
			labelWidth:250,
			name:'password',
			value:'pass'
		}
	]
});