/**
 * Created with IntelliJ IDEA.
 * User: ernesto
 * Date: 6/25/13
 * Time: 3:54 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('App.view.ux.SexCombo',{
    extend:'Ext.form.field.ComboBox',
    alias:'widget.sexfield',
    emptyText: w('select'),
    displayField: 'option',
    valueField: 'value',
    queryMode: 'local',
    editable: false,
    store: Ext.create('Ext.data.Store', {
        fields: ['option', 'value'],
        data: [
            {option: w('male'), value: 'M'},
            {option: w('female'), value: 'F'}
        ]
    })


});