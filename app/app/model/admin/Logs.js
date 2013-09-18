/**
 * Created with IntelliJ IDEA.
 * User: ernesto
 * Date: 4/4/13
 * Time: 4:30 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('App.model.admin.Logs',{
	extend:'Ext.data.Model',
	table:{
		name:'logs',
		comment:'Logs'
	},
	fields:[
		{
			name:'id',
			type:'int'
		},
		{
			name:'userId',
			type:'int',
			comment:'User ID'
		},
		{
			name:'appId',
			type:'string',
			comment:'Appointment ID'
		},
		{
			name:'logDate',
			type:'date',
			dateFormat:'Y-m-d H:i:s'
		},
		{
			name:'logEntry',
			type:'string'
		},
		{
			name:'logType',
			type:'string'
		}
	],
	proxy:{
		type:'direct',
		api:{
			read:Logs.getLogs
		},
		reader: {
			type: 'json',
			root: 'logs'
		}
	}
});