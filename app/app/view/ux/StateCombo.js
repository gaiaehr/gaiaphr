/**
 * Created with IntelliJ IDEA.
 * User: ernesto
 * Date: 6/25/13
 * Time: 3:54 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('App.view.ux.StateCombo',{
    extend:'Ext.form.field.ComboBox',
    alias:'widget.statefield',
    emptyText: w('select'),
    displayField: 'option',
    valueField: 'value',
    queryMode: 'local',
    editable: false,
    value: 'PR',
    store: Ext.create('Ext.data.Store', {
        fields: ['option', 'value'],
        data: [
            {option: 'Puerto Rico', value: 'PR'},
            {option: 'Alabama', value: 'AL'},
            {option: 'Alaska', value: 'AK'},
            {option: 'Arizona', value: 'AZ'},
            {option: 'Arkansas', value: 'AR'},
            {option: 'California', value: 'CA'},
            {option: 'Colorado', value: 'CO'},
            {option: 'Connecticut', value: 'CT'},
            {option: 'Delaware', value: 'DE'},
            {option: 'District of Columbia', value: 'DC'},
            {option: 'Florida', value: 'FL'},
            {option: 'Georgia', value: 'GA'},
            {option: 'Hawaii', value: 'HI'},
            {option: 'Idaho', value: 'ID'},
            {option: 'Illinois', value: 'IL'},
            {option: 'Indiana', value: 'IN'},
            {option: 'Iowa', value: 'IA'},
            {option: 'Kansas', value: 'KS'},
            {option: 'Kentucky', value: 'KY'},
            {option: 'Louisiana', value: 'LA'},
            {option: 'Maine', value: 'ME'},
            {option: 'Maryland', value: 'MD'},
            {option: 'Massachusetts', value: 'MA'},
            {option: 'Michigan', value: 'MI'},
            {option: 'Minnesota', value: 'MN'},
            {option: 'Mississippi', value: 'MS'},
            {option: 'Missouri', value: 'MO'},
            {option: 'Montana', value: 'MT'},
            {option: 'Nebraska', value: 'NE'},
            {option: 'Nevada', value: 'NV'},
            {option: 'New Hampshire', value: 'NH'},
            {option: 'New Jersey', value: 'NJ'},
            {option: 'New Mexico', value: 'NM'},
            {option: 'New York', value: 'NY'},
            {option: 'North Carolina', value: 'NC'},
            {option: 'North Dakota', value: 'ND'},
            {option: 'Ohio', value: 'OH'},
            {option: 'Oklahoma', value: 'OK'},
            {option: 'Oregon', value: 'OR'},
            {option: 'Pennsylvania', value: 'PA'},
            {option: 'Rhode Island', value: 'RI'},
            {option: 'South Carolina', value: 'SC'},
            {option: 'South Dakota', value: 'SD'},
            {option: 'Tennessee', value: 'TN'},
            {option: 'Texas', value: 'TX'},
            {option: 'Utah', value: 'UT'},
            {option: 'Vermont', value: 'VT'},
            {option: 'Virginia', value: 'VA'},
            {option: 'Washington', value: 'WA'},
            {option: 'West Virginia', value: 'WV'},
            {option: 'Wisconsin', value: 'WI'},
            {option: 'Wyoming', value: 'WY'}
        ]
    })


});