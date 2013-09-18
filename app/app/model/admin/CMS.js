/**
 * Created with IntelliJ IDEA.
 * User: ernesto
 * Date: 4/4/13
 * Time: 4:30 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('App.model.admin.CMS',{
	extend:'Ext.data.Model',
	table:{
		name:'content',
		comment:'CMS content'
	},
	fields:[
		{
			name:'id',
			type:'int'
		},
		{
			name:'title',
			type:'string'
		},
		{
			name:'body',
			type:'string',
			dataType:'text'
		},
		{
			name:'language',
			type:'string',
			comment:'es, en'
		},
		{
			name:'type',
			type:'string',
			comment:'welcome'
		}
	],
	proxy:{
		type:'direct',
		api:{
			read:CMS.getContent,
			update:CMS.updateContent
		},
        remoteGroup:false
	}
});