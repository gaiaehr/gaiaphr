/**
 * Created with IntelliJ IDEA.
 * User: ernesto
 * Date: 6/25/13
 * Time: 3:54 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('App.view.ux.InsuranceCombo',{
    extend:'Ext.form.field.ComboBox',
    alias:'widget.insurancecombo',
    emptyText: w('insurance'),
    displayField: 'optionTitle',
    valueField: 'optionValue',
//    queryMode: 'local',
    editable: false,
    store: Ext.create('Ext.data.Store', {
	    model: 'App.model.admin.InsuranceCombo',
        autoLoad: false
    })


});