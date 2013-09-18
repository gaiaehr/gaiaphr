/**
 * Created with IntelliJ IDEA.
 * User: ernesto
 * Date: 4/4/13
 * Time: 2:30 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('App.view.admin.CMS',{
	alias:'widget.cmsgrid',
	extend:'Ext.grid.Panel',
	requires:[
		'App.store.admin.CMS'
	],
	store: this.store = Ext.create('App.store.admin.CMS'),
	columns:[
		{
			text:'Title',
			dataIndex:'title',
			flex:1
		},
		{
			text:'Language',
			dataIndex:'language',
			width:100,
			renderer:function(v){
				if(v == 'en'){
					return 'English';
				}else if(v == 'es'){
					return 'Español';
				}else{
					return v;
				}
			}
		}
	],
    features: [
        {
            ftype:'grouping',
            groupHeaderTpl: 'Content Type: {name}'
        }
    ]
});