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

Ext.define('App.controller.Calendar', {
    extend: 'App.controller.Abstract',

	refs: [
        {
            ref:'calendar',
            selector:'appointmentcalendar'
        },
        {
            ref:'patientCalendar',
            selector:'patientcalendar'
        },
        {
            ref:'bookCombo',
            selector:'combobox[action=calendarBookCombo]'
        },
        {
            ref:'eventEditWindow',
            selector:'window[action=eventeditwindow]'
        }
	],

	init: function() {
		var me = this;

        me.control({
            'combobox[action=calendarBookCombo]':{
                select: me.calendarComboSelect
            },
            'patientsearch':{
                select: me.calendarPatientSearchSelect
            },
            'patientcalendar':{
//                viewchange:function(p, vw, dateInfo){
//                    if(dateInfo){
//                        me.startDate = Ext.Date.format(dateInfo.viewStart, 'Y-m-d H:i:s');
//                        me.endDate = Ext.Date.format(dateInfo.viewEnd, 'Y-m-d H:i:s');
//                        me.filterCalendarStore(p);
//                    }
//                },
                show:me.filterCalendarStore
            },
            'appointmentcalendar':{
                render:function(cal){
                    cal.eventStore.on('write', me.onStoreWrite, me);
                },
                'eventclick': {
                    fn: function(vw, rec, el){
//                        this.clearMsg();
                    },
                    scope: this
                },
                'eventover': function(vw, rec, el){
                    //console.log('Entered evt rec='+rec.data[Extensible.calendar.data.EventMappings.Title.name]', view='+ vw.id +', el='+el.id);
                },
                'eventout': function(vw, rec, el){
                    //console.log('Leaving evt rec='+rec.data[Extensible.calendar.data.EventMappings.Title.name]+', view='+ vw.id +', el='+el.id);
                },
                'eventadd':function(cp, rec){
                    this.flyMsg('Appointment added');
                },
                'eventupdate': function(cp, rec){
                    this.flyMsg('Appointment updated');
                },
                'eventcancel': {
                    fn: function(cp, rec){
                        // edit canceled
                    },
                    scope: this
                },
                'viewchange': {
                    fn: function(p, vw, dateInfo){
                        if(dateInfo){
                            me.startDate = Ext.Date.format(dateInfo.viewStart, 'Y-m-d H:i:s');
                            me.endDate = Ext.Date.format(dateInfo.viewEnd, 'Y-m-d H:i:s');
                            me.filterCalendarStore(p);
    //                        this.updateTitle(dateInfo.viewStart, dateInfo.viewEnd);
                        }
                    },
                    scope: this
                },
                'dayclick': {
                    fn: function(vw, dt, ad, el){
    //                    this.clearMsg();
                    },
                    scope: this
                },
                'rangeselect': {
                    fn: function(vw, dates, onComplete){
    //                    this.clearMsg();
                    },
                    scope: this
                },
                'eventcopy': {
                    fn: function(vw, rec){
                        this.onEventCopyOrMove(rec, 'copy');
                    },
                    scope: this
                },
                'eventmove': {
                    fn: function(vw, rec){
                        this.onEventCopyOrMove(rec, 'move');
                    },
                    scope: this
                },
                'eventresize': {
                    fn: function(vw, rec){
                        rec.commit();
                        this.flyMsg('Event '+ rec.data[Extensible.calendar.data.EventMappings.Title.name] +' was updated');
                    },
                    scope: this
                },
                'eventdelete': {
                    fn: function(win, rec){
                        this.eventStore.remove(rec);
                        this.flyMsg('Event '+ rec.data[Extensible.calendar.data.EventMappings.Title.name] +' was deleted');
                    },
                    scope: this
                },
                'initdrag': {
                    fn: function(vw){
                        // do something when drag starts
                    },
                    scope: this
                }
            },
            'window[action=eventeditwindow]':{
                hide:function(win){
                    var resendCheckbox = win.down('#' + win.id + '-resend-notification'),
                        form = win.down('form').getForm(),
                        app = form.getRecord();

                    if(!form.isDirty()){
                        if(resendCheckbox.value){
                            Email.SendEmailByParams({app:app.raw,tpl:'welcome',status:'1'},function(provider, response){
                                me.flyMsg('Sweet!', 'Email sent...');
                            });
                        }
                    }
                }
            }
        })
	},

    onStoreWrite:function(store, operation){
        var me = this,
            win = me.getEventEditWindow(),
            resendCheckbox = win.down('#' + win.id + '-resend-notification'),
            form = win.down('form').getForm(),
            app = operation.response.result.data;

        say(operation);

        if(operation.action == 'create' || resendCheckbox.value){
            Email.SendEmailByParams({app:app,tpl:'welcome',status:'1'},function(provider, response){
                me.flyMsg('Sweet!', 'Email sent...');
                operation.records[0].set({status:'1'});
                operation.records[0].commit();
            });
        }
    },

    calendarPatientSearchSelect:function(cmb, records){
        var data = Ext.clone(records[0].data),
            form = cmb.up('form').getForm(),
            mappedData = {};

        say('Getting Record');
        say(form.getRecord());

        mappedData.Pid        = data.id;
        mappedData.FirstName  = data.fname;
        mappedData.MiddleName = data.mname;
        mappedData.LastName   = data.lname;
        mappedData.DOB        = data.dob;
        mappedData.Email      = data.email;

        form.setValues(mappedData);
    },

    calendarComboSelect:function(){
        this.filterCalendarStore(this.getCalendar());
    },

    filterCalendarStore:function(panel){
        say(panel.action);

        var me = this,
            store = panel.store,
            pid = 0,
            filters = [];

        if(me.getController('Patient').appointment){
            pid = me.getController('Patient').appointment.data.pid;
        }

        if(me.startDate){
            filters.push({
                property: 'startDate',
                operator: '>=',
                value   : me.startDate
            });
        }

        if(me.endDate){
            filters.push({
                property: 'endDate',
                operator: '<=',
                value   : me.endDate
            });
        }

        if(me.getBookCombo()){
            filters.push({
                property: 'bookId',
                operator: '=',
                value   : me.getBookCombo().getValue()
            });
        }

        if(panel.xtype == 'patientcalendar' && pid !== 0){
            filters.push({
                property: 'pid',
                operator: '=',
                value   : pid
            });
        }

        store.clearFilter(true);
        store.addFilter(filters);

        say(panel);
        say(store);

    },

    onEventCopyOrMove: function(rec, mode) {

        var mappings = Extensible.calendar.data.EventMappings,
            time = rec.data[mappings.IsAllDay.name] ? '' : ' \\a\\t g:i a',
            action = mode === 'copy' ? 'copied' : 'moved';
        rec.commit();
//        this.flyMsg('Event '+ rec.data[mappings.Title.name] +' was ' + action + ' to '+ Ext.Date.format(rec.data[mappings.StartDate.name], ('F jS'+time)));
    }

});