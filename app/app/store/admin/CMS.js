/**
 * Created with IntelliJ IDEA.
 * User: ernesto
 * Date: 4/4/13
 * Time: 4:27 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('App.store.admin.CMS',{
	extend:'Ext.data.Store',
	model:'App.model.admin.CMS',
    groupField: 'type',
	remoteFilter:true
});