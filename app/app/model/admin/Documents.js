/**
 * Created with IntelliJ IDEA.
 * User: ernesto
 * Date: 4/4/13
 * Time: 4:30 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('App.model.admin.Documents',{
	extend:'Ext.data.Model',
	table:{
		name:'patient_documents',
		comment:'Uploaded Documents'
	},
	fields:[
		{
			name:'id',
			type:'int'
		},
		{
			name:'pid',
			type:'int'
		},
		{
			name:'recNum',
			type:'string'
		},
		{
			name:'uploadedTime',
			type:'date'
		},
		{
			name:'uploadedIp',
            type:'string'
		},
		{
			name:'document',
            type:'string',
			dataType:'longtext'
		},
		{
			name:'documentName',
            type:'string'
		},
		{
			name:'documentExt',
            type:'string'
		},
		{
			name:'synced',
            type:'bool',
			defaultValue:0
		}
	],
	proxy:{
		reader:{
			root:'data'
		}
	}
});