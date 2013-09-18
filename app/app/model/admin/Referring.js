/**
 * Created with IntelliJ IDEA.
 * User: ernesto
 * Date: 4/4/13
 * Time: 4:30 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('App.model.admin.Referring',{
	extend:'Ext.data.Model',
	table:{
		name:'referring',
		comment:'Referring Doctors'
	},
	fields:[
		{
			name:'id',
			type:'int'
		},
		{
			name:'refNum',
			type:'External Integration ID'
		},
		{
			name:'fullName',
			type:'int',
			comment:'Full Name'
		},
		{
			name:'active',
			type:'bool'
		}
	],
	proxy:{
		type:'direct',
		api:{
			read:Referring.getReferring,
			create:Referring.addReferring,
			update:Referring.updateReferring,
			destroy:Referring.deleteReferring
		},
		reader:{
			root:'data'
		}
	}
});