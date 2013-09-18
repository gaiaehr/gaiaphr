/**
 * Created with IntelliJ IDEA.
 * User: ernesto
 * Date: 4/4/13
 * Time: 4:27 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('App.store.admin.ConsentLetters',{
	extend:'Ext.data.Store',
	model:'App.model.admin.ConsentLetters',
    groupField: 'type',
    remoteFilter:true,
    sorters:[
        {
            property:'revision',
            direction:'ASC'
        },
        {
            property:'title',
            direction:'ASC'
        }
    ]
});