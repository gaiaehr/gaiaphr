Ext.define("App.view.patient.ConsentLetters", {
    extend: 'Ext.form.Panel',
	alias:'widget.consentletters',
	autoScroll:true,
	defaults:{
		xtype:'panel',
		width:620,
		margin:'0 0 10 0',
		bodyPadding:10,
		previouslySigned:false
	},
    items:[
        {
            action:'Divulgacion',
	        items: [
		        {
			        xtype: 'checkboxgroup',
			        allowBlank:false,
			        margin:'10 0 0 0',
			        width:'100%',
			        style:'border:1px solid #ccc',
			        items:[
				        {
					        xtype:'checkbox',
					        name:'Divulgacion',
					        boxLabel:'Yo certifico que he suministrado información correcta relacionada a mi plan de servicios de salud.'
				        }
			        ]
		        }
	        ]
        },
        {
            action:'Puntualidad',
	        items: [
		        {
                    xtype: 'checkboxgroup',
                    allowBlank:false,
			        margin:'10 0 0 0',
			        width:'100%',
			        style:'border:1px solid #ccc',
                    items:[
                        {
                            xtype:'checkbox',
	                        name:'Puntualidad',
                            boxLabel:'Yo acepto los términos  condiciones establecidos por Salus para mantener el sistema de citas actual.'
                        }
                    ]
		        }
            ]
        },
        {
            action:'Pago',
	        items: [
		        {
                    xtype: 'checkboxgroup',
                    allowBlank:false,
			        margin:'10 0 0 0',
			        width:'100%',
			        style:'border:1px solid #ccc',
                    items:[
                        {
                            xtype:'checkbox',
	                        name:'Pago',
                            boxLabel:'Yo certifico que he suministrado información correcta relacionada a mi plan de servicios de salud.'
                        }
                    ]
		        }
            ]
        }
    ]
});