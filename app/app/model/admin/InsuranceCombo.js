/**
 * Created with IntelliJ IDEA.
 * User: ernesto
 * Date: 4/4/13
 * Time: 4:30 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('App.model.admin.InsuranceCombo',{
	extend:'Ext.data.Model',
	table:{
		name:'insurancecombo',
		comment:'Insurance Combo data'
	},
	fields:[
		{
			name:'id',
			type:'int'
		},
		{
			name:'optionTitle',
			type:'string'
		},
		{
			name:'optionValue',
			type:'string'
		}
	],
	proxy:{
		type:'direct',
		api:{
			read:Insurance.getComboData
		},
		reader:{
			root:'data'
		}
	}
});