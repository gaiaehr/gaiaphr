/**
 * Created with IntelliJ IDEA.
 * User: ernesto
 * Date: 6/25/13
 * Time: 3:54 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('App.view.ux.RelationsCombo',{
    extend:'Ext.form.field.ComboBox',
    alias:'widget.relationfield',
    emptyText: w('select'),
    displayField: 'option',
    valueField: 'value',
    queryMode: 'local',
    editable: false,
    store: Ext.create('Ext.data.Store', {
        fields: ['option', 'value'],
        data:[
            {option: w('insured'),  value: 'A'},
            {option: w('spouse'),   value: 'C'},
            {option: w('offspring'),value: 'H'},
            {option: w('mother'),   value: 'M'},
            {option: w('father'),   value: 'P'},
            {option: w('other'),    value: 'O'}
        ]
    })


});