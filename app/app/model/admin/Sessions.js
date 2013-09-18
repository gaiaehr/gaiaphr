/**
 * Created with IntelliJ IDEA.
 * User: ernesto
 * Date: 4/4/13
 * Time: 4:30 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('App.model.admin.Sessions',{
	extend:'Ext.data.Model',
	table:{
		name:'sessions',
		comment:'PHP Authorization Sessions LOG'
	},
	fields:[
		{
			name:'id',
			type:'int'
		},
		{
			name:'aid',
			type:'string',
            comment:'Access ID = User ID | Patient ID | Appointment ID'
		},
		{
			name:'sid',
			type:'string',
			comment:'PHP Session ID'
		},
		{
			name:'sDate',
            type:'date',
			comment:'Session start date and time'
		},
        {
            name:'eDate',
            type:'date',
            comment:'Session end date and time'
        },
        {
            name:'accessType',
            type:'string',
            comment:'user | patient | appointment'
        },
        {
            name:'success',
            type:'bool',
            comment:'1 pass, 0 fail'
        },
		{
			name:'token',
			type:'string',
            comment:'Authorization Token'
		},
		{
			name:'ip',
			type:'string',
            comment:'remote IP address'
		}
	]
});