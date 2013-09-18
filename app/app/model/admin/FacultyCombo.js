/**
 * Created with IntelliJ IDEA.
 * User: ernesto
 * Date: 4/4/13
 * Time: 4:30 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('App.model.admin.FacultyCombo',{
	extend:'Ext.data.Model',
	table:{
		name:'facultycombo',
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
			type:'string',
			len:15
		}
	],
	proxy:{
		type:'direct',
		api:{
			read:Faculty.getComboData
		},
		reader:{
			root:'data'
		}
	}
});