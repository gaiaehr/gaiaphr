/**
 * Created with IntelliJ IDEA.
 * User: ernesto
 * Date: 4/4/13
 * Time: 2:30 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('App.view.admin.Reports',{
	alias:'widget.reports',
	extend:'Ext.grid.Panel',
    requires:[
        'App.store.admin.Appointments'
    ],
	store: this.aStore = Ext.create('App.store.admin.Appointments'),
	columns:[
		{
			text:'Date',
			xtype:'datecolumn',
			format:'l j F, Y, g:i a',
			dataIndex:'startDate',
			width:250
		},
		{
			text:'Patient Name',
			dataIndex:'fullName',
			getSortParam: function() {
				return 'fname';
			},
			flex:1
		},
		{
			text:'Status',
			dataIndex:'status',
			width:150,
			renderer:function(v){
				if(v === 0){
					return '<span style="color:#808080">Processing</span>';
				}else if(v === 1){
					return '<span style="color:#ff9c34">Pending</span>';
				}else if(v === 2){
					return '<span style="color:blue">Completed</span>';
				}else if(v === 3){
					return '<span style="color:green">Confirmed</span>';
				}else if(v === 4){
					return '<span style="color:#805604">Canceled</span>';
				}else if(v === 8){
					return '<span style="color:#2a2a2a">Waiting Confirmation</span>';
				}else if(v === 9){
					return '<span style="color:red">Error</span>';
				}else{
					return v;
				}
			}
		}
	],
	tbar:[
		{
//			text:'Crear Cita',
//			icon:'resources/images/add.gif',
//			action:'newAppointment'
            xtype:'tbtext',
            text:'Filter By'

		},
		'-',
		{
			xtype:'combobox',
			displayField:'title',
			valueField:'name',
			forceSelection:true,
			editable:false,
			value:'all',
			width:150,
			action:'appointmentStatusCombo',
			store:Ext.create('Ext.data.Store', {
				fields:['title', 'name'],
				data:[
					{'title':'All',                 'name':'all'},
					{'title':'Processing',          'name':0},
					{'title':'Pending',             'name':1},
					{'title':'Completed',           'name':2},
					{'title':'Confirmed',           'name':3},
					{'title':'Waiting Confirmation','name':8},
					{'title':'Error',               'name':9}
				]
			})
		},
		'-',
		{
			xtype:'appointmentbookscombo',
			hideLabel:true,
			action:'appointmentBooksCombo'
		},
		'-',
		'From',
		{
			xtype:'datefield',
			format:'Y-m-d',
			width:105,
			value: new Date(),
			editable:false,
			action:'appointmentFilterStartDate'
		},
		'To',
		{
			xtype:'datefield',
			format:'Y-m-d',
			width:105,
			value: new Date(),
			editable:false,
			action:'appointmentFilterStopDate'
		},
		'Or',
		{
			xtype:'combobox',
			displayField:'title',
			valueField:'name',
			forceSelection:true,
			editable:false,
			value:0,
			width:90,
			action:'appointmentFilterCombo',
			store:Ext.create('Ext.data.Store', {
				fields:['title', 'name'],
				data:[
					{'title':'Today', 'name':0},
					{'title':'+1 Day', 'name':1},
					{'title':'+2 Days', 'name':2},
					{'title':'+3 Days', 'name':3},
					{'title':'+4 Days', 'name':4},
					{'title':'+5 Days', 'name':5}
				]
			})
		},
		'-'
	],
    bbar: Ext.create('Ext.PagingToolbar', {
        store: this.aStore,
        displayInfo: true,
        displayMsg: 'Displaying topics {0} - {1} of {2}',
        emptyMsg: 'No Appointments to display'
    })
});