/**
 * GaiaPHR (Patient Health Records)
 * Copyright (C) 2013 Certun, inc.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

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