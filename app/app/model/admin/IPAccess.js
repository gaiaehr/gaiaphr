/**
 * Created with IntelliJ IDEA.
 * User: ernesto
 * Date: 4/4/13
 * Time: 4:30 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('App.model.admin.IPAccess',{
	extend:'Ext.data.Model',
	table:{
		name:'ip_access',
		comment:'Baned / Allow IP list'
	},
	fields:[
		{
			name:'id',
			type:'int'
		},
		{
			name:'ip',
			type:'string',
            comment:'IP'
		},
		{
			name:'access',
			type:'int',
			comment:'0 = not controlled, 1= banned/not allow, 2 = white listed/allow'
		},
		{
			name:'type',
			type:'string',
			comment:'auto | manual'
		},
		{
			name:'note',
			type:'string',
			comment:'Notes'
		},
		{
			name:'aDate',
			type:'date',
			comment:'Added Date'
		}
	],

    proxy:{
        type:'direct',
        api:{
            read:IPAccess.getIPs,
            create:IPAccess.addIP,
            update:IPAccess.updateIP
        },
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});