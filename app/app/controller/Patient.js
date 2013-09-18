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

Ext.define('App.controller.Patient', {
    extend: 'Ext.app.Controller',

	refs: [
        {
            ref: 'mainTabPanel',
            selector: 'container[action=mainTabPanel]'
        },
		{
			ref: 'demographics',
			selector: 'demographics'
		},
		{
			ref: 'insurance',
			selector: 'insurance'
		},
		{
			ref: 'medicalHistory',
			selector: 'medicalhistory'
		},
		{
			ref: 'consentLetters',
			selector: 'consentletters'
		},
		{
			ref: 'thankYou',
			selector: 'thankyou'
		},

		{
			ref: 'uploadGrid',
			selector: 'panel[action=upload]'
		},

		{
			ref: 'minorContainer',
			selector: 'container[action=minor]'
		},
		{
			ref: 'spouseContainer',
			selector: 'fieldcontainer[action=spouse]'
		}
	],

	init: function() {
		var me = this;

		me.appointment = false;

		me.control({
			'medicalhistory': {
				show: me.loadClinical
			},
			'button[action=addInsurance]': {
				click: me.doAddInsurance
			},
			'datefield[action=dob]': {
				select: me.onDobSelect,
				change: me.onDobChange
			},
			'combobox[action=maritalStatus]': {
				select: me.onMaritalStatusSelect,
				change: me.onMaritalStatusChange
			}
		});

		me.navigation = me.getController('Navigation');
        me.insuranceStore = Ext.create('App.store.admin.PatientInsurance');
        me.lettersStore = Ext.create('App.store.admin.ConsentLetters',{
            groupField: false,
            remoteFilter:false,
            sorters:false
        });
        me.signaturesStore = Ext.create('App.store.admin.ConsentSignatures');
        me.cmsStore = Ext.create('App.store.admin.CMS');
	},

	onDobChange:function(cmb, v){
		this.setDob(v);
	},
	onMaritalStatusChange:function(cmb, v){
		this.setMaritalStatus(v);
	},

	onDobSelect:function(cmb, date){
		this.setDob(date);
	},

	onMaritalStatusSelect:function(cmb, records){
		this.setMaritalStatus(records[0].data.value);
	},

	setDob:function(date){
		var dt = Ext.Date.add(date, Ext.Date.YEAR, 21),
			today = new Date();
		this.getMinorContainer().setVisible(dt > today);
		this.getMinorContainer().setDisabled(!dt <= today);
	},

	setMaritalStatus:function(value){
		this.getSpouseContainer().setVisible(value == 'Casado');
		this.getSpouseContainer().setDisabled(value != 'Casado');
	},

    loadInsurance:function(){
        var me = this;

        me.getInsurance().removeAll();
        me.insuranceStore.load({
            filters:[
                {
                    property:'pid',
                    value:me.getDemographics().getForm().getRecord().data.id
                }
            ],
            callback:function(records){
                for(var i=0; i < records.length; i++){
                    var ins = me.getInsurance().add({
                        xtype:'insurancecard'
                    });
                    ins.getForm().loadRecord(records[i]);
                    var fieldsToDisable = [
                        'insCode',
                        'insCover',
                        'insGroup',
                        'subscriberRelation',
                        'subscriberFName',
                        'subscriberMName',
                        'subscriberLName',
                        'subscriberBirthDate',
                        'subscriberSex',
                        'subscriberWorkPlace'
                    ];
                    var form = ins.getForm();
                    for(var k=0; k < fieldsToDisable.length; k++){
                        form.findField(fieldsToDisable[k]).disable();
                    }
                    ins.query('fieldcontainer[action=fullname]')[0].disable();
                }
            }
        });
    },

    doAddInsurance:function(btn){

        var me = this,
	        newRec = me.insuranceStore.add({
		        pid:me.patient.id,
		        recNum:me.patient.recNum,
		        insType:'T'

	        })[0],
	        newIns = btn.up('panel').insert(0,{
            xtype:'insurancecard',
            title:w('new_insurance'),
            tools:[
                {
                    type:'close',
                    handler:function(){
                        Ext.create('Ext.fx.Animator', {
                            target:newIns.el,
                            duration: 1000, // 10 seconds
                            keyframes: {
                                100: {
                                    height: 0,
                                    width: 0,
                                    backgroundColor: 'FF0000'
                                }
                            },
                            listeners:{
                                afteranimate:function(){
	                                me.insuranceStore.remove(newRec);
                                    newIns.destroy();
                                }
                            }
                        });
//
                    }
                }
            ]
        });

        var height = newIns.getHeight();
        Ext.create('Ext.fx.Animator', {
            target:newIns.el,
            duration: 1000, // 10 seconds
            keyframes: {
                0: {
                    height: 0,
                    backgroundColor: '99FF99'
                },
                20: {
                    backgroundColor: '99FF99'
                },
                100: {
                    height: height,
                    backgroundColor: 'FFFFFF'
                }
            }
        });
	    newIns.getForm().loadRecord(newRec);
    },

	loadPatient:function(data){

        say(data);

        var me = this,
            demographics = me.getDemographics().getForm(),
	        isNew = typeof data.user == 'undefined',
	        isApp = typeof data.app != 'undefined',
            newData = {};

		me.setLoadMask(true);

        say('isApp = '+isApp);
        say('isNew = '+isNew);
        say('data.app.id = '+ (isApp ? data.app.id : 'N/A'));
        say('data.user.id = '+ (!isNew ? data.user.id : 'N/A'));

		if(isNew && isApp){
			say('Creating new patient from appointment('+data.app.id+')...');
            App.model.admin.Appointments.load(data.app.id, {
                failure: function(record, operation) {
                    //do something if the load failed
	                me.setLoadMask(false);
                },
                success: function(record, operation) {
	                me.appointment = record;
	                newData = Ext.clone(record.data);

                    if(newData.phoneType == 'cel'){
                        newData.cel_phone = newData.phone
                    }else if(newData.phoneType == 'home'){
                        newData.home_phone = newData.phone
                    }else if(newData.phoneType == 'cel'){
                        newData.work_phone = newData.phone
                    }

                    delete newData.id;
                    delete newData.phone;
                    delete newData.phoneType;

                    demographics.loadRecord(Ext.create('App.model.admin.PatientDemographics', newData));
	                me.setLoadMask(false);
                }
            });
		}else{

			if(isApp){
				say('Loading Patient appointment('+data.app.id+')...');
				App.model.admin.Appointments.load(data.app.id, {
					success: function(record, operation) {
						me.appointment = record;
					}
				});
			}
			say('Loading Patient ('+data.user.id+')...');
            App.model.admin.PatientDemographics.load(data.user.id, {
                failure: function(record, operation) {
	                me.setLoadMask(false);
                },
                success: function(record, operation) {
                    var panel = me.getDemographics();
                    demographics.loadRecord(record);

                    if(record.data.photoId != '')       panel.query('image[action=photoIdImage]')[0].setSrc(record.data.photoId);
//                    if(record.data.insured_img != '')   panel.query('image[action=insuranceImgOne]')[0].setSrc(record.data.insured_img);
//                    if(record.data.insured_img_2 != '') panel.query('image[action=insuranceImgTwo]')[0].setSrc(record.data.insured_img_2);
	                me.setLoadMask(false);
                }
            });
		}

		if(!me.lettersLoaded){
			me.lettersStore.load({
				filters:[
					{
						property:'language',
						value:'es'
					},
					{
						property:'active',
						value:1
					}
				],
				callback:function(records){
					me.loadPatientLetters(records);
				}
			});
			me.lettersLoaded = true;
		}
	},

	loadClinical:function(){
		var me = this,
            demographics = me.getDemographics().getForm(),
			hist = me.getMedicalHistory(),
			histForm = hist.getForm(),
			record;

		me.setLoadMask(true);
		if(demographics.getRecord()){
			record = demographics.getRecord();

			if(record.data.patientclinical_id == 0){
				histForm.loadRecord(Ext.create('App.model.admin.PatientClinical',{pid:record.data.id}));
                me.setLoadMask(false);
			}else{
				record.getPatientClinical(function(record){
                    if(!record.dirty){
	                    histForm.loadRecord(record);
                        me.setLoadMask(false);
                    }
				});
			}

			if(typeof me.upLoadParams == 'undefined'){
				me.upLoadParams = true;
				say(me.getUploadGrid().uploader.url = 'dataProvider/Uploads.php?pid='+me.patient.id+'&recNum='+me.patient.recNum);
//				say(me.getUploadGrid().uploader.setParams({
//					pid: me.patient.id
//				}));


//				say(me.getUploadGrid());
//				me.getUploadGrid().uploader.getParams();
			}


//			var upload = me.getUploadGrid();
//			upload.setUploadUrl('dataProvider/Uploads.php?pid=' + me.patient.id + '&recNum' +  me.patient.recNum);
//			if(typeof me.uploadGrid == 'undefined'){
//				me.uploadGrid = hist.add(
//					Ext.create('Ext.ux.upload.Panel', {
//						uploadUrl: 'dataProvider/Uploads.php?hello=hehehe'
//					})
//				);
//			}
		}
	},

	loadSignatures:function(){
		var me = this,
			store = me.signaturesStore,
			form = me.getConsentLetters().getForm(),
			letters = me.getConsentLetters().items.items,
			notSignedLetters = ['Divulgacion','Pago','Puntualidad'],
			field,
			letter,
			foundIndex,
			signature,
			errors = [],
			i;

		me.setLoadMask(true);

		store.load({
			filters:[
				{
					property:'pid',
					value:me.getDemographics().getForm().getRecord().data.id
				},
				{
					property:'signed',
					value:1
				}
			],
			sorters:[
				{
					property:'id',
					direction:'DESC'
				}
			],
			callback:function(records){

				for(i=0; i < letters.length; i++){
					letter = letters[i];
					field = form.findField(letter.letterData.type);

					foundIndex = store.findBy(function(record){
						var recFound = record.data.signed && record.data.letterType == letter.letterData.type && record.data.letterRevision == letter.letterData.revision;
						if(recFound) signature = record.data;
						return recFound;
					});

					if(foundIndex >= 0){
						letter.previouslySigned = true;
						field.setValue(true);
						field.setBoxLabel('Firmado en '+Ext.Date.format(signature.signedDate,'F j, Y, g:i a')+ ' Rev.'+signature.letterRevision+' (IP '+signature.signedIp+')');
						field.disable();
						letter.doLayout();
						Ext.Array.remove(notSignedLetters, letter.letterData.type);
					}else{
						letter.previouslySigned = false;
						if(typeof signature != 'undefined') errors.push('Hemos encontrado cambios en <span style="font-weight:bold">"'+letter.title+'</span>".');
					}
				}

				for(i=0; i < notSignedLetters.length; i++){
					letter = me.getConsentLetters().query('panel[action='+notSignedLetters[i]+']')[0];
					letter.previouslySigned = false;
					field = form.findField(notSignedLetters[i]);
					field.setValue(false);
					field.enable();
					field.setBoxLabel(field.initialConfig.boxLabel);
					letter.doLayout();
				}

				if(errors.length > 0){
					me.navigation.setNavValid(false);
					Ext.Function.defer(function(){
						me.flyMsg('Disculpe!', '<p>'+errors.join('<br>')+'</p>',true);
					}, 500);
				}else{
					//me.navigation.setNavValid(true);
				}

				me.setLoadMask(false);

			}
		})

	},

    loadAppointments:function(panel){
        var me = this,
            store = panel.store;
//        panel.store;
    },

	loadPatientLetters:function(records){
		var me = this,
			panel;
		for(var i=0; i < records.length; i++){
			panel = me.getConsentLetters().query('panel[action='+records[i].data.type+']')[0];
			panel.setTitle(records[i].data.title + ' (Rev.'+records[i].data.revision+')');
			panel.letterData = records[i].data;
			panel.insert(0,{
				xtype:'container',
				html:records[i].data.body
			});
		}
	},

	loadThankYou:function(){
		var me = this, params = {};
		me.setLoadMask(true);

        say(me.appointment);

        if(me.appointment !== false){
			me.appointment.set({status:2});
            say(me.appointment);



            if(me.appointment.dirty){
                me.appointment.save({
                    success:function(record){
                        me.loadTankYouCMS('thankyou', function(){
                            params = {
                                app: record.data,
                                tpl:'thankyou'
                            };

                            Email.SendEmailByParams(params,function(provider, response){
                                say('Email sent...');
                            });
                        });
                    }
                });
            }else{
                me.loadTankYouCMS('thankyou', function(){
                    params = {
                        app: me.appointment.data,
                        tpl:'thankyou'
                    };
                    Email.SendEmailByParams(params,function(provider, response){
                        say('Email sent...');
                    });
                });
            }
		}else{
            me.loadTankYouCMS('demo_update_thankyou');
        }
	},

    loadTankYouCMS:function(type, callback){
        var me = this;
        me.cmsStore.load({
            filters:[
                {
                    property:'type',
                    value:type
                },
                {
                    property:'language',
                    value:App.lang
                }
            ],
            callback:function(records){
                me.setLoadMask(false);
                me.getThankYou().update(records[0].data.body);

                if(typeof callback == 'function') callback(true);
            }
        })
    },

	patientFormSave:function(form, success){
		var me = this,
            requests,
            rec,
			errors = [],
			errorMsg,
			i, k;

		// if success is not a function set empty function
		if(typeof success != 'function') success = Ext.emptyFn;

        // if form is a panel get basic form
        if(form.xtype == 'insurance'){
            var forms = form.query('form');
            for(k=0; k < forms.length; k++){
                errors.concat(me.getFormErrors(forms[k].getForm()));
            }
        }else{
            if(form.isPanel) form = form.getForm();
            // get forms errors
            errors = me.getFormErrors(form);
        }

		// errors found... handle the errors (show error messages)
		if(errors.length > 0){
			// scroll up
			Ext.getBody().el.scroll('up',2000, true);
			// build error message
			errorMsg = '<p>';
			for(i=0; i < errors.length; i++){
				errorMsg = errorMsg + (i > 0 ? '<br>':'') + errors[i].error + ': ' + errors[i].fieldLabel;
			}
			errorMsg = errorMsg+'</p>';

			Ext.Function.defer(function(){
				me.flyMsg('Wait!', errorMsg, true);
			}, 500);


			// callback success false
			success(false);
		// no errors found... save records
		}else{
            if(form.xtype == 'insurance'){
                requests = [];
                for(k=0; k < forms.length; k++){
                    form = forms[k].getForm();
                    rec = forms[k].getForm().getRecord();
                    values = form.getValues();
                    values.synced = 0;
                    rec.set(values);
                    if(Object.keys(rec.getChanges()).length !== 0){
                        requests.push(rec);
                    }
                }

                if (requests.length !== 0) {
                    for (k = 0; k < requests.length; k++) {
                        if(k == 0){
                            requests[k].save({
                                callback: function(){
                                    success(true);
                                }
                            });
                        }else{
                            requests[k].save();
                        }
                    }
                } else {
                    success(true);
                }

                // TODO return true

            }else if(form.owner.xtype != 'consentletters'){
				var record = form.getRecord(),
					values = form.getValues();
	            values.synced = 0;
				record.set(values);
				record.save({
					success:function(records, operation){
						say('data saved...');
						if(form.owner.xtype == 'demographics'){
							if(me.appointment !== false && me.appointment.data.pid == 0){
								me.appointment.set({pid:records.data.id});
								me.appointment.save();
							}
						}

						if(form.owner.xtype == 'medicalhistory'){
							var demoRec = me.getDemographics().getForm().getRecord();
							if(demoRec.data.patientclinical_id == 0){
								demoRec.setPatientClinical(records.data.id);
								demoRec.save();
							}
						}
						me.patient = records.data;
						// callback success true
						success(true);
					},
					failure:function(records, operation){
						// callback success false
						success(false);
					}
				});


			}else{
				say('saving consent letters...');
				var letters =  me.getConsentLetters().items.items,
					needToSync = false;

				for(i=0; i < letters.length; i++){
					if(!letters[i].previouslySigned){
						me.signaturesStore.add({
							pid:me.getPatientId(),
							signed:true,
							letterType:letters[i].letterData.type,
							letterRevision:letters[i].letterData.revision
						});
						needToSync = true;
					}
				}
				if(needToSync){
					me.signaturesStore.sync({
						callback:function(batch, options){
							// callback success true
							success(true);
						}
					})
				}else{
					success(true);
				}

			}
		}
	},

    getFormErrors:function(form){
        var errors = [];
        if(!form.isValid()){
            // get fields error
            var fields = form.getFields().items;

            for(var k=0; k < fields.length; k++){
                // if error found... push it to errors array
                if(fields[k].isFormField && !fields[k].isValid() && fields[k].isVisible()){
                    errors.push({
                        title:fields[k].fieldLabel,
                        error:fields[k].getErrors()[0]
                    });
                }
            }
        }
        return errors;
    },

	setLoadMask:function(mask){
		if(mask){
            this.getMainTabPanel().el.mask(w('loading_data')+'...');
		}else{
            this.getMainTabPanel().el.unmask();
		}
	},

	getPatientId:function(){
		return this.getDemographics().getForm().getRecord().data.id;
	},

	flyMsg: function(title, format, error){
		var msgBgCls = (error === true) ? 'msg-red' : 'msg-green';

		if(!this.msgCt){
			this.msgCt = Ext.core.DomHelper.insertFirst(document.body, {
				id: 'msg-div'
			}, true);
		}

		this.msgCt.alignTo(document, 't-t');
		var s = Ext.String.format.apply(String, Array.prototype.slice.call(arguments, 1)), m = Ext.core.DomHelper.append(this.msgCt, {
			html: '<div class="flyMsg ' + msgBgCls + '"><h3>' + title + '</h3><p>' + s + '</p></div>'
		}, true);

        Ext.create('Ext.fx.Animator', {
            target:m,
            duration:5000,
            keyframes:{
                0:{
                    opacity: 0
                },
                20:{
                    opacity: 1
                },
                80:{
                    opacity: 1
                },
                100:{
                    opacity: 0,
                    height:0
                }
            },
            listeners:{
                afteranimate:function(){
                    m.destroy();
                }
            }

        });
	}


});