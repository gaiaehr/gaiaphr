/**
 * Created with IntelliJ IDEA.
 * User: ernesto
 * Date: 4/4/13
 * Time: 4:30 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('App.model.admin.Confirmations',{
	extend:'Ext.data.Model',
	table:{
		name:'confirmations',
		comment:'Confirmations Requests'
	},
	fields:[
		{
			name:'id',
			type:'int'
		},
		{
			name:'appId',
			type:'int',
			comment:'appointments.id'
		},
		{
			name:'batchId',
			type:'int',
			comment:'batches.id'
		},
		{
			name:'token',
			type:'string',
            comment:'Access Token to confirm or cancel the appointment'
		},
		{
			name:'answered',
            type:'bool',
            comment:'0=still waiting for answer, 1=answer received'
		},
		{
			name:'sendStamp',
            type:'date',
            comment:'date email was send'
		},
		{
			name:'answerStamp',
            type:'date',
            comment:'date confirmation'
		},
		{
			name:'errorLogId',
            type:'string',
            comment:'logs.id'
		}
	]
});