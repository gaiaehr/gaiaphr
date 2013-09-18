/**
 * Created with IntelliJ IDEA.
 * User: ernesto
 * Date: 4/4/13
 * Time: 4:30 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('App.model.admin.ConsentSignatures',{
	extend:'Ext.data.Model',
	table:{
		name:'consent_signatures',
		comment:'Consent Signatures'
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
			name:'letterType',
			type:'string'
		},
		{
			name:'letterRevision',
            len:10,
			type:'string'
		},
		{
			name:'signed',
			type:'bool'
		},
		{
			name:'signedIp',
			type:'string'
		},
		{
			name:'signedHostName',
			type:'string'
		},
		{
			name:'signedUserName',
			type:'string',
			comment:'$_SERVER REMOTE_USER variable'
		},
		{
			name:'signedDate',
			type:'date',
			dateFormat:'Y-m-d H:i:s'
		},
		{
			name:'synced',
			type:'bool',
			defaultValue:0,
			comment:'0 = dirty / not synced'
		}

	],
	proxy:{
		type:'direct',
		api:{
			read:Consents.getSignatures,
			create:Consents.addSignature
		}
	}
});