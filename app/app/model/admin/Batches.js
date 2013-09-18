/**
 * Created with IntelliJ IDEA.
 * User: ernesto
 * Date: 4/4/13
 * Time: 4:30 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('App.model.admin.Batches',{
	extend:'Ext.data.Model',
	table:{
		name:'batches',
		comment:'Batches Data'
	},
	fields:[
		{
			name:'id',
			type:'int'
		},
		{
			name:'action',
			type:'string',
			comment:'confirmation,reports'
		},
		{
			name:'startTime',
			type:'date',
            comment:'Batch Start Time'
		},
		{
			name:'stopTime',
            type:'date',
            comment:'Batch Stop Time'
		},
		{
			name:'totalRequests',
            type:'int',
            comment:'Total Batch Requests'
		},
		{
			name:'totalErrors',
            type:'int',
            comment:'Total Batch Requests Errors'
		}
	]
});