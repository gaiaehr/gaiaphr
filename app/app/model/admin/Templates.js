/**
 * Created with IntelliJ IDEA.
 * User: ernesto
 * Date: 4/4/13
 * Time: 4:30 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('App.model.admin.Templates',{
	extend:'Ext.data.Model',
	table:{
		name:'templates',
		comment:'Email Templates'
	},
	fields:[
		{
			name:'id',
			type:'int'
		},
		{
			name:'tplTitle',
			type:'string',
			comment:'Template Title'
		},
		{
			name:'tplName',
			type:'string',
			comment:'Template unique name'
		},
		{
			name:'tplSubject',
			type:'string',
			comment:'Email Subject'
		},
		{
			name:'tplBody',
			type:'string',
			dataType:'TEXT',
			comment:'Email HTML Body'
		},
		{
			name:'tplLang',
			type:'string',
			comment:'Template Language'
		}
	],
	proxy:{
		type:'direct',
		api:{
			read:Email.getTemplates,
			update:Email.updateTemplates
		}
	}
});