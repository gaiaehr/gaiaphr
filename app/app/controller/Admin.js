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

Ext.define('App.controller.Admin', {
    extend: 'Ext.app.Controller',
	refs: [
		{
			ref: 'appointmentGrid',
			selector: 'reports'
		},
		{
			ref: 'newAppointmentWindow',
			selector: 'newappointmentwindow'
		},
		{
			ref: 'newAppointmentForm',
			selector: 'newappointmentwindow > form[action=appointmentForm]'
		},
		{
			ref: 'newAppointmentSearch',
			selector: 'combobox[action=newAppointmentSearch]'
		},
		{
			ref: 'appointmentWindow',
			selector: 'appointmentwindow'
		},
		{
			ref: 'appointmentFilterCombo',
			selector: 'combobox[action=appointmentFilterCombo]'
		},
		{
			ref: 'appointmentStatusCombo',
			selector: 'combobox[action=appointmentStatusCombo]'
		},

		{
			ref: 'appointmentFilterStartDate',
			selector: 'textfield[action=appointmentFilterStartDate]'
		},
		{
			ref: 'appointmentFilterStopDate',
			selector: 'textfield[action=appointmentFilterStopDate]'
		},
		// consents
		{
			ref: 'consentLetterGrid',
			selector: 'consentgrid'
		},
		{
			ref: 'consentLetterWindow',
			selector: 'consentletterdetails'
		},
		{
			ref: 'consentLetterDetailForm',
			selector: 'consentletterdetails > form'
		},
		{
			ref: 'consentLetterNewVersionBtn',
			selector: 'button[action=consentLetterNewVersion]'
		},
		{
			ref: 'consentLetterSaveBtn',
			selector: 'button[action=consentLetterSave]'
		},
		{
			ref: 'consentLetterCancelBtn',
			selector: 'button[action=consentLetterCancel]'
		},
        // emails
		{
			ref: 'templatesForm',
			selector: 'emailtemplates'
		},
		{
			ref: 'templatesCombo',
			selector: 'combobox[action=templatesCombo]'
		},
		{
			ref: 'testEmailField',
			selector: 'textfield[action=testEmailField]'
		},
        // users
        {
            ref: 'userGrid',
            selector: 'users'
        },
        // CMS
        {
            ref: 'cmsGrid',
            selector: 'cmsgrid'
        },
        {
            ref: 'cmsWindow',
            selector: 'cmsdetails'
        }
	],

	init: function() {
		var me = this;

		me.Main = App.app.getController('Main');

		me.defaultReport = 1;
		me.statusFilter = 'all';
		me.timeFilter = 'all';

		Ext.override(Ext.data.proxy.Server, {
			// remoteGroup default to true
			remoteGroup: true,
			encodeFilters: function(filters) {
				var min = [],
					length = filters.length,
					i = 0;

				for (; i < length; i++) {
					min[i] = {
						property: filters[i].property,
						operator: filters[i].operator,
						value   : filters[i].value
					};
				}
				return this.applyEncoding(min);
			},
			getParams: function(operation) {
				var me = this,
					params = {},
					isDef = Ext.isDefined,
					groupers = operation.groupers,
					sorters = operation.sorters,
					filters = operation.filters,
					page = operation.page,
					start = operation.start,
					limit = operation.limit,
					simpleSortMode = me.simpleSortMode,
					simpleGroupMode = me.simpleGroupMode,
					pageParam = me.pageParam,
					startParam = me.startParam,
					limitParam = me.limitParam,
					groupParam = me.groupParam,
					groupDirectionParam = me.groupDirectionParam,
					sortParam = me.sortParam,
					filterParam = me.filterParam,
					directionParam = me.directionParam,
					hasGroups, index;

				if (pageParam && isDef(page)) {
					params[pageParam] = page;
				}

				if (startParam && isDef(start)) {
					params[startParam] = start;
				}

				if (limitParam && isDef(limit)) {
					params[limitParam] = limit;
				}

				// me.remoteGroup added at the end to force remoteGroupe property
				hasGroups = groupParam && groupers && groupers.length > 0 && me.remoteGroup;
				if (hasGroups) {
					// Grouper is a subclass of sorter, so we can just use the sorter method
					if (simpleGroupMode) {
						params[groupParam] = groupers[0].property;
						params[groupDirectionParam] = groupers[0].direction || 'ASC';
					} else {
						params[groupParam] = me.encodeSorters(groupers);
					}
				}

				if (sortParam && sorters && sorters.length > 0) {
					if (simpleSortMode) {
						index = 0;
						// Group will be included in sorters, so grab the next one
						if (sorters.length > 1 && hasGroups) {
							index = 1;
						}
						params[sortParam] = sorters[index].property;
						params[directionParam] = sorters[index].direction;
					} else {
						params[sortParam] = me.encodeSorters(sorters);
					}

				}

				if (filterParam && filters && filters.length > 0) {
					params[filterParam] = me.encodeFilters(filters);
				}

				return params;
			}
		});

		me.control({
			'reports': {
				render: me.getAppointments,
				itemdblclick: me.showAppointmentDetails
			},

			// new appointments
//			'button[action=newAppointment]': {
//				click: me.onNewAppointment
//			},
//			'button[action=newAppointmentCancel]': {
//				click: me.onNewAppointmentCancel
//			},
//			'button[action=newAppointmentSave]': {
//				click: me.onNewAppointmentSave
//			},
//			'combobox[action=newAppointmentSearch]': {
//				select: me.onNewAppointmentSearchSelect
//			},

            // appointments
			'button[action=appointmentWindowSave]': {
				click: me.onAppointmentWindowSave
			},
			'button[action=appointmentWindowCancel]': {
				click: me.onAppointmentWindowClose
			},
            'combobox[action=appointmentStatusCombo]': {
                select: me.appointmentStatusComboSelect
            },
            'combobox[action=appointmentFilterCombo]': {
                select: me.appointmentFilterComboSelect
            },
			'datefield[action=appointmentFilterStartDate]': {
				select: me.onAppointmentFilterStartDate
			},
			'datefield[action=appointmentFilterStopDate]': {
				select: me.onAppointmentFilterStopDate
			},
			// appointment books
			'appointmentbooks':{
				canceledit: me.onGridCancelEdit,
				edit: me.onGridRecordEdit,
				show: me.onGridShow
			},
			// templates
			'button[action=templateCancel]': {
				click: me.onTemplateCancel
			},
			'button[action=templateSave]': {
				click: me.onTemplateSave
			},
			'combobox[action=templatesCombo]': {
				select: me.onTemplateComboSelect
			},
			'textfield[action=testEmailField]': {
				click: me.onEmailTestClick
			},
			'button[action=sendTestEmailBtn]': {
				click: me.onEmailTestClick
			},
            // Users
			'users': {
				canceledit: me.onGridCancelEdit,
				edit: me.onGridRecordEdit,
				show: me.onGridShow
			},
			// Logs
			'logs': {
				show: me.onLogsShow
			},
			// Consents Letter
			'consentgrid': {
				itemdblclick: me.onConsentLetterGridDblClick,
				show: me.onConsentLetterGridShow
			},
			'button[action=consentLetterNewVersion]': {
				click: me.onConsentLetterNewVersion
			},
			'button[action=consentLetterSave]': {
				click: me.onConsentLetterSave
			},
			'button[action=consentLetterCancel]': {
				click: me.onConsentLetterCancel
			},
			// CMS
			'cmsgrid': {
				show: me.onCMSGridShow,
				itemdblclick: me.onCMSGridItemClick
			},
			'button[action=cmsSave]': {
				click: me.onCmsSave
			},
			'button[action=cmsCancel]': {
				click: me.onCmsCancel
			},

			// generic grid record add
			'button[action=newGridRecord]': {
				click: me.onNewGridRecord
			}
		});
	},

	onCmsSave:function(){
		var me = this,
			form = me.cmswindow.down('form').getForm(),
			values = form.getValues(),
			record = form.getRecord();

		record.set(values);
		record.store.sync({
			callback:function(){
				me.cmswindow.close();
				form.reset();
				me.flyMsg('Good!','Record Saved');
			}
		});
	},

	onCmsCancel:function(){
		var me = this,
			form = me.cmswindow.down('form').getForm();

		me.cmswindow.close();
		form.getRecord().store.rejectChanges();
		form.reset();
	},

	onCMSGridItemClick:function(view, record){
		var me = this;
		if(me.cmswindow){
			me.cmswindow.show();
		}else{
			me.cmswindow = Ext.widget('cmsdetails').show();
		}
		me.cmswindow.down('form').getForm().loadRecord(record);
	},

	onCMSGridShow:function(view){
		view.store.load();
	},

	onConsentLetterNewVersion:function(btn){
		var me = this;
		me.getConsentLetterDetailForm().getForm().newRevision = true;
		btn.disable();
	},

	onConsentLetterGridShow:function(view){
		if(!view.store.isLoaded){
			view.store.load();
			view.store.isLoaded = true;
		}
	},

	onConsentLetterGridDblClick:function(view, record){
		var form;

		if(this.consentLetterDetailWindow){
			this.consentLetterDetailWindow.show();
		}else{
			this.consentLetterDetailWindow = Ext.widget('consentletterdetails').show();
		}

		this.getConsentLetterNewVersionBtn().enable();
		form = this.getConsentLetterDetailForm().getForm();
		form.newRevision = false;
		form.loadRecord(record);
	},

	onConsentLetterSave:function(){
		var me = this,
			form = me.getConsentLetterDetailForm().getForm(),
			values = form.getValues(),
			record = form.getRecord(),
			newData = Ext.clone(record.data),
			newRec;

		record.set({active:0});
		delete newData.id;

		if(form.newRevision){
			values.revision++;
			values.revision = Math.floor(values.revision);
		}else{
			values.revision = record.data.revision + 0.01;
			values.revision = values.revision.toFixed(2);
		}

		newRec = record.store.add(newData);
		newRec[0].set(values);

		record.store.sync({
			success:function(){
				me.flyMsg('Sweet!', 'Latter Saved');
			},
			failure:function(){
				me.flyMsg('Ohhh, Wait!', 'Unable to Save Record', true);
			}
		});

		form.reset();
		me.getConsentLetterWindow().close();
	},

	onConsentLetterCancel:function(){
		var me = this,
			window = me.getConsentLetterWindow(),
			form = me.getConsentLetterDetailForm().getForm(),
			record = form.getRecord();

		record.store.rejectChanges();
		form.reset();
		window.close();
	},

    /**
     *
     * @param view
     */
	onLogsShow:function(view){
		view.store.load();
	},
    /**
     *
     * @param view
     */
	onGridShow:function(view){
		view.store.load();
	},
    /**
     *
     * @param editor
     * @param context
     */
    onGridRecordEdit:function(editor, context){
        var me = this;
		context.store.sync({
			success:function(){
                me.flyMsg('Sweet!','Record saved in database');
			},
			failure:function(){
                me.flyMsg('Opps!','Record could not be saved in database', true);
			}
		});
	},
    /**
     *
     * @param editor
     * @param context
     */
    onGridCancelEdit:function(editor, context){
		context.store.rejectChanges();
	},
    /**
     *
     */
    onNewGridRecord:function(btn){
        var grid = btn.up('grid'),
            store = grid.getStore(),
	        model = store.model.create();

        grid.editingPlugin.cancelEdit();
        store.add(model);
        grid.editingPlugin.startEdit(model, 0);
    },
    /**
     *
     */
    onEmailTestClick:function(){
        var me = this,
            field = me.getTestEmailField(),
            form = me.getTemplatesForm(),
            record = form.getForm().getRecord(),
            params = {};

        if(typeof record != 'undefined'){
            if(field.isValid()){
                params.tplName = record.data.tplName;
                params.email = field.getValue();
                form.el.mask('Sending Test Email, Please Wait...');
                Email.processTestEmail(params, function(provider, response){
                    if(response.result.success){
                        me.flyMsg('Sweet!','Test Email Sent');
                    }else{
                        me.flyMsg('Opps!',response.result.error, true);
                    }
                    form.el.unmask();
                });
            }else{
                me.flyMsg('Opps!','Test valid email required', true);
            }
        }else{
            me.flyMsg('Opps!','Please select the email template to be used', true);
        }
    },
    /**
     *
     */
	onTemplateCancel:function(){
        var me = this;
        me.getTemplatesCombo().reset();
        me.getTemplatesForm().getForm().reset();
	},
    /**
     *
     */
	onTemplateSave:function(){
		var me = this,
            panel = me.getTemplatesForm(),
			form = panel.getForm(),
			record = form.getRecord(),
			values = form.getValues();


        panel.el.mask('Saving Data...');
		record.set(values);
		record.save({
			callback:function(a,b){
                me.flyMsg('Sweet!','Template Saved');
                panel.el.unmask();
			}
		});
	},
    /**
     *
     * @param cmb
     * @param records
     */
	onTemplateComboSelect:function(cmb, records){
		var me = this,
			form = me.getTemplatesForm().getForm();
		form.loadRecord(records[0]);
	},
    /**
     *
     * @param view
     */
	getAppointments:function(view){
		this.onAppointmentGridFilter();
	},
    /**
     *
     * @param view
     * @param record
     * @param item
     * @param e
     */
	showAppointmentDetails:function(view, record, item, e){
		var me = this;
		if(typeof me.appointmentWindow == 'undefined'){
			me.appointmentWindow = Ext.widget('appointmentwindow').show(item);
		}else{
			me.appointmentWindow.show(item)
		}
	},
    /**
     *
     * @param cmb
     * @param records
     */
	appointmentStatusComboSelect:function(cmb, records){
        var me = this;
        me.statusFilter = records[0].data.name;
        me.onAppointmentGridFilter();
	},
    /**
     *
     * @param cmb
     * @param records
     */
	appointmentFilterComboSelect:function(cmb, records){
		var me = this, date;
		date = Ext.Date.add(new Date(), Ext.Date.DAY, records[0].data.name);
		me.getAppointmentFilterStartDate().setValue(date);
		me.getAppointmentFilterStopDate().setValue(date);
        me.onAppointmentGridFilter();
	},
    /**
     *
     * @param field
     * @param value
     */
    onAppointmentFilterStartDate:function(field, value){
        var me = this,
            stopDate = me.getAppointmentFilterStopDate().getValue();
        if(value > stopDate) me.getAppointmentFilterStopDate().setValue(value);
        me.onAppointmentGridFilter();
    },
    /**
     *
     * @param field
     * @param value
     */
    onAppointmentFilterStopDate:function(field, value){
        var me = this,
            startDate = me.getAppointmentFilterStartDate().getValue();
        if(value < startDate) me.getAppointmentFilterStartDate().setValue(value);
        me.onAppointmentGridFilter();
    },
    /**
     *
     */
    onAppointmentGridFilter:function(){
		var me = this,
			store = me.getAppointmentGrid().getStore(),
			dateStart = me.getAppointmentFilterStartDate().getValue(),
			dateStop = me.getAppointmentFilterStopDate().getValue(),
			filter = [];

		store.clearFilter(true);

		if(me.statusFilter != 'all'){
			filter.push({
				property: 'status',
				operator:'=',
				value: me.statusFilter
			});
		}

		if(dateStart != ''){
			filter.push({
				property: 'startDate',
				operator:'>=',
				value: Ext.Date.format(dateStart, 'Y-m-d') + ' 00:00:00'
			});
		}

		if(dateStop != ''){
			filter.push({
				property: 'startDate',
				operator:'<=',
				value: Ext.Date.format(dateStop, 'Y-m-d') + ' 23:59:59'
			});
		}

		store.addFilter(filter);
	},
    /**
     *
     * @param btn
     */
    onNewAppointment:function(btn){
		var me = this,
			aRecord = Ext.create('App.model.admin.Appointments');
		if(typeof me.newAppointWindow == 'undefined'){
			me.newAppointWindow = Ext.widget('newappointmentwindow').show(btn.el);
		}else{
			me.newAppointWindow.show(btn.el)
		}
		me.getNewAppointmentForm().getForm().loadRecord(aRecord);
	},
    /**
     *
     */
	onNewAppointmentSave:function(){
		var me = this,
			form = me.getNewAppointmentForm().getForm(),
			values = form.getValues(),
			store = me.getAppointmentGrid().getStore(),
			record = form.getRecord();

//	    values.dob = values.dob + ' 00:00:00'

		record.set(values);
		store.add(record);
		store.sync();

		form.reset();
		me.getNewAppointmentWindow().close();
		me.Main.flyMsg('Entendido!','La nueva cita ha sido creada.');
	},
    /**
     *
     */
	onNewAppointmentCancel:function(){
        var me = this;
        me.Main.flyMsg('Entendido!','La nueva cita ha sido cancelada.');
        me.getNewAppointmentForm().getForm().reset();
        me.getNewAppointmentWindow().close();
	},
    /**
     *
     */
	onAppointmentWindowSave:function(){
		this.getAppointmentWindow().close();
	},
    /**
     *
     */
	onAppointmentWindowClose:function(){
		this.getAppointmentWindow().close();
	},
	/**
	 *
	 * @param cmb
     * @param records
	 */
	onNewAppointmentSearchSelect:function(cmb, records){
		var form = cmb.up('form').getForm(),
			data = Ext.clone(records[0].data),
			values = {};

		values.pid   = data.id
		values.fname = data.fname
		values.mname = data.mname
		values.lname = data.lname
		values.dob   = data.dob
		values.email = data.email
		form.setValues(values);
	},
    /**
     *
     * @param v
     * @returns {string}
     */
    rendererPassword:function(v){
        var str = '';
        for(var i= 0; i < v.length; i++){
            str = str + '&#149;';
        }
        return str;
    },
    /**
     *
     * @param title
     * @param format
     * @param error
     */
    flyMsg: function(title, format, error){
        var msgBgCls = (error === true) ? 'msg-red' : 'msg-green';

        if(!this.msgCt){
            this.msgCt = Ext.core.DomHelper.insertFirst(document.body, {
                id: 'msg-div'
            }, true);
        }

        this.msgCt.alignTo(document, 't-t');
        var s = Ext.String.format.apply(String, Array.prototype.slice.call(arguments, 1)),
            m = Ext.core.DomHelper.append(this.msgCt, {
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