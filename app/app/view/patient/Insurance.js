Ext.define("App.view.patient.Insurance", {
    extend: 'Ext.panel.Panel',
    alias: 'widget.insurance',
    autoScroll: true,
    layout:{
        type:'vbox',
        align:'stretch'
    },
    tbar:[
        '->',
        {
            icon:'resources/images/add.gif',
            text:w('add_insurance'),
            action:'addInsurance'
        }
    ]
});