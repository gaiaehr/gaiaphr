/**
 * Created with IntelliJ IDEA.
 * User: ernesto
 * Date: 4/4/13
 * Time: 4:30 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('App.model.admin.Users',{
	extend:'Ext.data.Model',
	table:{
		name:'users',
		comment:'Users'
	},
	fields:[
		{
			name:'id',
			type:'int'
		},
		{
			name:'fullname',
			type:'string',
            comment:'Full Name'
		},
		{
			name:'username',
			type:'string',
			comment:'Username'
		},
		{
			name:'password',
			type:'string',
			dataType:'blob',
			encrypt:true,
			comment:'Password'
		},
		{
			name:'role',
			type:'string',
			comment:'1 = Admin, 2 = User'
		},
		{
			name:'active',
			type:'bool'
		}
	],
	proxy:{
		type:'direct',
		api:{
			read:Users.getUsers,
			create:Users.addUser,
			update:Users.updateUser
		},
		reader: {
			type: 'json',
			root: 'users'
		}
	}
});