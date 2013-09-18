/**
 * Created with IntelliJ IDEA.
 * User: ernesto
 * Date: 4/4/13
 * Time: 2:16 PM
 * To change this template use File | Settings | File Templates.
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