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

Ext.define("App.view.patient.InformacionMedica", {
    extend:'Ext.form.Panel',
	alias:'widget.medicalhistory',
	autoScroll:true,
	defaults:{
		xtype:'fieldset',
		width:620,
		padding:10
	},
	items:[
		{
			title:'Motivo',
			items: [
				{
					xtype:'fieldcontainer',
					fieldLabel:'El motivo de su visita esta relacionado a',
					anchor:'100%',
					labelWidth:250,
					items:[
						{
							xtype:'checkbox',
							boxLabel:'Accidente de Auto',
							name:'carAccident'
						},
						{
							xtype:'checkbox',
							boxLabel:'Accidente de Trabajo',
							name:'workAccident'
						},
						{
							xtype:'checkbox',
							boxLabel:'Otro Accidente',
							name:'otherAccident'
						}
					]
				}
			]
		},
		{
			title:'Historial médico',
			defaults:{
				labelWidth: 150
			},
			items:[
				{
					xtype: 'datefield',
					fieldLabel: 'Ultimo Examen médico',
					emptyText: 'Fecha',
					format:'Y-m-d',
					name: 'lastMedicalExam'
				},
				{
					xtype:'fieldcontainer',
					layout:'anchor',
					items:[
						{
							xtype:'checkbox',
							boxLabel:'Esta actualmente bajo tratamiento médico',
							action:'checkWithExplanation',
							name:'isUnderTreatment'
						},
						{
							xtype:'textfield',
							anchor:'100%',
							emptyText:'Explique',
							hidden:true,
							name:'isUnderTreatmentNote'
						}
					]
				},
				{
					xtype:'fieldcontainer',
					layout:'anchor',
					items:[
						{
							xtype:'checkbox',
							boxLabel:'Ha sido Hospitalizado',
							action:'checkWithExplanation',
							name:'hasBeenHospitalized'
						},
						{
							xtype:'textfield',
							anchor:'100%',
							emptyText:'Explique',
							name:'hasBeenHospitalizedNote',
							hidden:true
						}
					]
				},
				{
					xtype:'fieldcontainer',
					layout:'anchor',
					items:[
						{
							xtype:'checkbox',
							boxLabel:'Padece de alguna alergia, ejemplo: Penicilina, Comida?',
							action:'checkWithExplanation',
							name:'isAllergic'
						},
						{
							xtype:'textfield',
							anchor:'100%',
							emptyText:'Explique',
							name:'isAllergicNote',
							hidden:true
						}
					]
				},
				{
					xtype:'fieldcontainer',
					layout:'anchor',
					items:[
						{
							xtype:'checkbox',
							boxLabel:'Esta embarazada? (señora)',
							action:'checkWithExplanation',
							name:'isPregnant'
						},
						{
							xtype:'textfield',
							anchor:'100%',
							emptyText:'Cuantos meses?',
							name:'isPregnantNote',
							hidden:true
						}
					]
				},
				{
					xtype:'checkboxgroup',
					fieldLabel:'Padece o ha padecido de lo siguiente?',
					labelWidth:250,
					columns: 3,
                    labelAlign:'top',
					width:581,
					vertical: true,
					defaults:{
						name:'hasSufferOf'
					},
					items:[
						{
							boxLabel:'Corazon',
							inputValue: 'Heart'
						},
						{
							boxLabel:'Glaucoma',
							inputValue: 'Glaucoma'
						},
						{
							boxLabel:'Enf. Toroide',
							inputValue: 'Toroide'
						},
						{
							boxLabel:'Alta Presion',
							inputValue: 'Hypertension'
						},
						{
							boxLabel:'Anemia',
							inputValue: 'Anemia'
						},
						{
							boxLabel:'Hepatitis',
							inputValue: 'Hepatitis'
						},
						{
							boxLabel:'Diabetes',
							inputValue: 'Diabetes Mellitus'
						},
						{
							boxLabel:'Depresión',
							inputValue: 'Depression'
						},
						{
							boxLabel:'Asma Bronquial',
							inputValue: 'Bronchial Asthma'
						},
						{
							boxLabel:'Derrame Cerebral',
							inputValue: 'Stroke'
						},
						{
							boxLabel:'Artritis',
							inputValue: 'Arthritis'
						},
						{
							boxLabel:'Asma',
							inputValue: 'Asthma'
						},
						{
							boxLabel:'Tiroides',
							inputValue: 'Thyroid'
						},
						{
							boxLabel:'Alergias',
							inputValue: 'Allergies'
						},
						{
							boxLabel:'Higado',
							inputValue: 'Liver'
						},
						{
							boxLabel:'Enf. Respiratoria',
							inputValue: 'Respiratory Disease'
						},
						{
							boxLabel:'Tuberculosis',
							inputValue: 'Tuberculosis'
						},
						{
							boxLabel:'Hematológicos',
							inputValue: 'Hematological Disorders'
						},
						{
							boxLabel:'Epilepsia',
							inputValue: 'Epilepsy'
						},
						{
							boxLabel:'Cáncer',
							inputValue: 'Cancer'
						},
						{
							boxLabel:'Riñon',
							inputValue: 'Kidney'
						},
						{
							boxLabel:'Enf. Venereas',
							inputValue: 'Venereal Diseases'
						},
						{
							boxLabel:'Fiebre Reumática',
							inputValue: 'Rheumatic Fever'
						},
						{
							boxLabel:'Soplo Cardiaco',
							inputValue: 'Heart Murmur'
						},
						{
							boxLabel:'Colesterol Alto',
							inputValue: 'High Cholesterol'
						},
						{
							boxLabel:'Ataque Cardiaco',
							inputValue: 'Heart Attack'
						}
					]
				},
				{
					xtype:'textfield',
					width:570,
					emptyText:'Otros',
					name:'hasSufferOfOther'
				}
			]
		},
		{
			xtype:'fieldset',
			title:'Medicamentos',
			layout:'hbox',
			items:[
				{
					xtype:'container',
					defaults:{
						xtype:'textfield',
						labelWidth:15,
                        width:175
					},
					padding:'0 20 0 0',
					items:[
						{
							fieldLabel:'1',
							name:'Drug1'
						},
						{
							fieldLabel:'2',
							name:'Drug2'
						},
						{
							fieldLabel:'3',
							name:'Drug3'
						},
						{
							fieldLabel:'4',
							name:'Drug4'
						},
						{
							fieldLabel:'5',
							name:'Drug5'
						}
					]
				},
				{
					xtype:'container',
					defaults:{
						xtype:'textfield',
						labelWidth:15,
                        width:175
					},
					margin:'0 20 0 0',
					items:[
						{
							fieldLabel:'6',
							name:'Drug6'
						},
						{
							fieldLabel:'7',
							name:'Drug7'
						},
						{
							fieldLabel:'8',
							name:'Drug8'
						},
						{
							fieldLabel:'9',
							name:'Drug9'
						},
						{
							fieldLabel:'10',
							name:'Drug10'
						}
					]
				},
				{
					xtype:'container',
					defaults:{
						xtype:'textfield',
						labelWidth:15,
                        width:175
					},
					items:[
						{
							fieldLabel:'11',
							name:'Drug11'
						},
						{
							fieldLabel:'12',
							name:'Drug12'
						},
						{
							fieldLabel:'13',
							name:'Drug13'
						},
						{
							fieldLabel:'14',
							name:'Drug14'
						},
						{
							fieldLabel:'15',
							name:'Drug15'
						}
					]
				}
			]
		},
		{
			xtype:'fieldset',
			title:'Habitos',
			items:[
				{
					xtype:'checkbox',
					boxLabel:'Fumar',
					name:'isSmoker'
				},
				{
					xtype:'checkbox',
					boxLabel:'Bebidas Alcohólicas',
					name:'isDrinker'
				},
				{
					xtype:'checkbox',
					boxLabel:'Drogas',
					name:'isDrugUser'
				}
			]
		},
		{
			xtype:'fieldset',
			title:'Historial Familiar',
			items:[
				{
					xtype:'fieldcontainer',
					layout:'hbox',
					items:[
						{
							xtype:'checkbox',
							boxLabel:'Diabetes',
							width:200,
							action:'checkWithExplanation',
							name:'famHistory',
							inputValue:'Diabetes'
						},
						{
							xtype:'textfield',
							emptyText:'Quien?',
							hidden:true,
							name:'famHistoryWhoDiabetes'
						}
					]
				},
				{
					xtype:'fieldcontainer',
					layout:'hbox',
					items:[
						{
							xtype:'checkbox',
							boxLabel:'Glaucoma',
							width:200,
							action:'checkWithExplanation',
							name:'famHistory',
							inputValue:'Glaucoma'
						},
						{
							xtype:'textfield',
							emptyText:'Quien?',
							hidden:true,
							name:'famHistoryWhoGlaucoma'
						}
					]
				},
				{
					xtype:'fieldcontainer',
					layout:'hbox',
					items:[
						{
							xtype:'checkbox',
							boxLabel:'Alta Presión',
							width:200,
							action:'checkWithExplanation',
							name:'famHistory',
							inputValue:'Hypertension'
						},
						{
							xtype:'textfield',
							emptyText:'Quien?',
							hidden:true,
							name:'famHistoryWhoHypertension'
						}
					]
				},
				{
					xtype:'fieldcontainer',
					layout:'hbox',
					items:[
						{
							xtype:'checkbox',
							boxLabel:'Asma',
							width:200,
							action:'checkWithExplanation',
							name:'famHistory',
							inputValue:'Asthma'
						},
						{
							xtype:'textfield',
							emptyText:'Quien?',
							hidden:true,
							name:'famHistoryWhoAsthma'
						}
					]
				},
				{
					xtype:'fieldcontainer',
					layout:'hbox',
					items:[
						{
							xtype:'checkbox',
							boxLabel:'Derrame Cerebral',
							width:200,
							action:'checkWithExplanation',
							name:'famHistory',
							inputValue:'Stroke'
						},
						{
							xtype:'textfield',
							emptyText:'Quien?',
							hidden:true,
							name:'famHistoryWhoStroke'
						}
					]
				},
				{
					xtype:'fieldcontainer',
					layout:'hbox',
					items:[
						{
							xtype:'checkbox',
							boxLabel:'Tuberculosis',
							width:200,
							action:'checkWithExplanation',
							name:'famHistory',
							inputValue:'Tuberculosis'
						},
						{
							xtype:'textfield',
							emptyText:'Quien?',
							hidden:true,
							name:'famHistoryWhoTuberculosis'
						}
					]
				},
				{
					xtype:'fieldcontainer',
					layout:'hbox',
					items:[
						{
							xtype:'checkbox',
							boxLabel:'Cáncer',
							width:200,
							action:'checkWithExplanation',
							name:'famHistory',
							inputValue:'Cancer'
						},
						{
							xtype:'textfield',
							emptyText:'Quien?',
							hidden:true,
							name:'famHistoryWhoCancer'
						}
					]
				},
				{
					xtype:'fieldcontainer',
					layout:'hbox',
					items:[
						{
							xtype:'checkbox',
							boxLabel:'Asma Bronquial',
							width:200,
							action:'checkWithExplanation',
							name:'famHistory',
							inputValue:'Bronchial Asthma'
						},
						{
							xtype:'textfield',
							emptyText:'Quien?',
							hidden:true,
							name:'famHistoryWhoBronchialAsthma'
						}
					]
				},
				{
					xtype:'fieldcontainer',
					layout:'hbox',
					items:[
						{
							xtype:'checkbox',
							boxLabel:'Desordenes Hematológicos',
							width:200,
							action:'checkWithExplanation',
							name:'famHistory',
							inputValue:'Haematological Disorders'
						},
						{
							xtype:'textfield',
							emptyText:'Quien?',
							hidden:true,
							name:'famHistoryWhoHaematologicalDisorders'
						}
					]
				},
				{
					xtype:'fieldcontainer',
					layout:'hbox',
					items:[
						{
							xtype:'checkbox',
							boxLabel:'Ataque Cardiacos',
							width:200,
							action:'checkWithExplanation',
							name:'famHistory',
							inputValue:'Heart Attack'
						},
						{
							xtype:'textfield',
							emptyText:'Quien?',
							hidden:true,
							name:'famHistoryWhoHeartAttack'
						}
					]
				},
				{
					xtype:'fieldcontainer',
					layout:'hbox',
					items:[
						{
							xtype:'checkbox',
							boxLabel:'Soplo Cardiaco',
							width:200,
							action:'checkWithExplanation',
							name:'famHistory',
							inputValue:'Heart Murmur'
						},
						{
							xtype:'textfield',
							emptyText:'Quien?',
							hidden:true,
							name:'famHistoryWhoHeartMurmur'
						}
					]
				},
				{
					xtype:'fieldcontainer',
					layout:'hbox',
					items:[
						{
							xtype:'checkbox',
							boxLabel:'Convulciones',
							width:200,
							action:'checkWithExplanation',
							name:'famHistory',
							inputValue:'Seizures'
						},
						{
							xtype:'textfield',
							emptyText:'Quien?',
							hidden:true,
							name:'famHistoryWhoSeizures'
						}
					]
				},
				{
					xtype:'fieldcontainer',
					layout:'hbox',
					items:[
						{
							xtype:'checkbox',
							boxLabel:'Infecciones de Oído',
							width:200,
							action:'checkWithExplanation',
							name:'famHistory',
							inputValue:'Otitis Media'
						},
						{
							xtype:'textfield',
							emptyText:'Quien?',
							hidden:true,
							name:'famHistoryWhoOtitisMedia'
						}
					]
				},
				{
					xtype:'fieldcontainer',
					layout:'hbox',
					items:[
						{
							xtype:'checkbox',
							boxLabel:'Sobre Peso',
							width:200,
							action:'checkWithExplanation',
							name:'famHistory',
							inputValue:'Overweight'
						},
						{
							xtype:'textfield',
							emptyText:'Quien?',
							hidden:true,
							name:'famHistoryWhoOverweight'
						}
					]
				},
				{
					xtype:'fieldcontainer',
					layout:'hbox',
					items:[
						{
							xtype:'checkbox',
							boxLabel:'Enf. Trans. Sexual',
							width:200,
							action:'checkWithExplanation',
							name:'famHistory',
							inputValue:'Sexual Transmission'
						},
						{
							xtype:'textfield',
							emptyText:'Quien?',
							hidden:true,
							name:'famHistoryWhoSexualTransmission'
						}
					]
				},
				{
					xtype:'fieldcontainer',
					layout:'hbox',
					items:[
						{
							xtype:'checkbox',
							boxLabel:'Colesteror Elevado',
							width:200,
							action:'checkWithExplanation',
							name:'famHistory',
							inputValue:'High Cholesterol'
						},
						{
							xtype:'textfield',
							emptyText:'Quien?',
							hidden:true,
							name:'famHistoryWhoHighCholesterol'
						}
					]
				},
				{
					xtype:'fieldcontainer',
					layout:'hbox',
					items:[
						{
							xtype:'checkbox',
							boxLabel:'Enf. de Toroide',
							width:200,
							action:'checkWithExplanation',
							name:'famHistory',
							inputValue:'Toroid Disease'
						},
						{
							xtype:'textfield',
							emptyText:'Quien?',
							hidden:true,
							name:'famHistoryWhoToroidDisease'
						}
					]
				},
				{
					xtype:'textfield',
					emptyText:'Otros',
					name:'famHistoryOthers',
					width:570
				}
			]
		},
		{
			xtype:'fieldset',
			title:'Terapia Fisica',
			items:[
				{
					xtype:'fieldcontainer',
					items:[
						{
							xtype:'checkbox',
							boxLabel:'Ha recibido tratamiento de Terapia Fisica en <span style="text-decoration: underline;">este año</span> en otra institución?',
							action:'checkWithExplanation',
							name:'hasReceivedPTThisYear'
						},
						{
							xtype:'textfield',
							emptyText:'Tratamiento',
							hidden:true,
							name:'hasReceivedPTThisYearTreatment'
						},
						{
							xtype:'textfield',
							emptyText:'Donde?',
							hidden:true,
							name:'hasReceivedPTThisYearWhere'
						},
						{
							xtype:'numberfield',
							emptyText:'Cuantas?',
							hidden:true,
							name:'hasReceivedPTThisYearHowMany'
						}
					]
				},
				{
					xtype:'fieldcontainer',
					items:[
						{
							xtype:'checkbox',
							boxLabel:'Ha recibido tratamiento de Terapia Fisica en el <span style="text-decoration: underline;">año anterior</span>?',
							action:'checkWithExplanation',
							name:'hasReceivedPTPastYear'
						},
						{
							xtype:'textfield',
							emptyText:'Tratamiento',
							hidden:true,
							name:'hasReceivedPTPastYearTreatment'
						},
						{
							xtype:'textfield',
							emptyText:'Donde?',
							hidden:true,
							name:'hasReceivedPTPastYearWhere'
						},
						{
							xtype:'numberfield',
							emptyText:'Cuantas?',
							hidden:true,
							name:'hasReceivedPTPastYearHowMany'
						}
					]
				}
			]
		},
		{
			xtype:'fieldset',
			title:w('additional_documents'),
			items:[
				Ext.create('Ext.ux.upload.Panel',{
					uploader: Ext.create('Ext.ux.upload.uploader.FormDataUploader', {
						url: 'dataProvider/Uploads.php',
						timeout: 120*1000,
						method:'POST'
					})
				})
			]
		}
	]
});