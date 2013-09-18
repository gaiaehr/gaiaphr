/**
 * Created with IntelliJ IDEA.
 * User: ernesto
 * Date: 4/4/13
 * Time: 4:30 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('App.model.admin.ConsentLetters',{
	extend:'Ext.data.Model',
	table:{
		name:'consent_letters',
		comment:'Consent Letters'
	},
	fields:[
		{
			name:'id',
			type:'int'
		},
		{
			name:'type',
			type:'string',
			comment:'Letter Type'
		},
		{
			name:'title',
			type:'string',
			comment:'Letter Title'
		},
		{
			name:'body',
			type:'string',
			len:6000,
			comment:'Letter Body'
		},
		{
			name:'revision',
			type:'string',
            len:10,
			comment:'Revision Number'
		},
		{
			name:'language',
			type:'string',
			comment:'Language en=english / es=spanish'
		},
		{
			name:'createUid',
			type:'int',
			comment:'Create User ID'
		},
		{
			name:'updateUid',
			type:'int',
			comment:'Update User ID'
		},
		{
			name:'createDate',
			type:'date',
			dateFormat:'Y-m-d H:i:s',
			comment:'Date created'
		},
		{
			name:'updateDate',
			type:'date',
			dateFormat:'Y-m-d H:i:s',
			comment:'Date Updated'
		},
		{
			name:'active',
			type:'bool',
			comment:'Active'
		}
	],
	proxy:{
		type:'direct',
		api:{
			read:Consents.getLetters,
			create:Consents.addLetter,
			update:Consents.updateLetter
		},
		remoteGroup:false,
		reader:{
			root:'letters'
		}
	}
});