/**
 * Created with IntelliJ IDEA.
 * User: ernesto
 * Date: 4/4/13
 * Time: 4:30 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('App.model.admin.GeoIps',{
	extend:'Ext.data.Model',
	table:{
		name:'geo_ip',
		comment:'IPs Country codes'
	},
	fields:[
		{
			name:'id',
			type:'int'
		},
		{
			name:'ip_start',
			type:'string'
		},
		{
			name:'ip_end',
			type:'string'
		},
		{
			name:'ip_start_num',
			type:'int',
            len:15
		},
		{
			name:'ip_end_num',
			type:'int',
            len:15
		},
        {
            name:'country',
            type:'string'
        },
		{
			name:'country_code',
			type:'string'
		}
	]
});