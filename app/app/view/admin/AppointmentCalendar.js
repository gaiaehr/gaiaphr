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

//@define Extensible.calendar.CalendarPanel
Ext.define('App.view.admin.AppointmentCalendar', {
    alias: 'widget.appointmentcalendar',
    extend: 'Extensible.calendar.CalendarPanel',
    title: 'Calendar',
//    eventStore: Ext.create('Extensible.calendar.data.MemoryEventStore', {
//        // defined in ../data/Events.js
//        data: Ext.create('Extensible.example.calendar.data.Events')
//    }),
//    calendarStore: Ext.create('Extensible.calendar.data.MemoryCalendarStore', {
//        // defined in ../data/Calendars.js
//        data: Ext.create('Extensible.example.calendar.data.Calendars')
//    }),
    eventStore: Ext.create('Extensible.calendar.data.EventStore'),
    calendarStore: this.calendarStore = Ext.create('Extensible.calendar.data.MemoryCalendarStore'),
    height: 680,
    // this is a good idea since we are in a TabPanel and we don't want
    // the user switching tabs on us while we are editing an event:
    editModal: true,
    id:'app-calendar',
    activeItem: 0, // month view
    startDay: 0,

    tbar:[
        {
            xtype: 'extensible.calendarcombo',
            store: this.calendarStore,
            editable: false,
            emptyText: 'Book',
            hideLabel: true,
            action: 'calendarBookCombo'
        }
    ],

    // Any generic view options that should be applied to all sub views:
    viewConfig: {
        //enableFx: false,
//        ddIncrement: 10, //only applies to DayView and subclasses, but convenient to put it here
        viewStartHour: 7,
        viewEndHour: 21,
        minEventDisplayMinutes: 10,
        showTime: true
    },

    // View options specific to a certain view (if the same options exist in viewConfig
    // they will be overridden by the view-specific config):
    monthViewCfg: {
        showHeader: true,
        showWeekLinks: true,
        showWeekNumbers: true
    },

    multiWeekViewCfg: {
        //weekCount: 3
    }

    // Some optional CalendarPanel configs to experiment with:
    //readOnly: true,
    //showDayView: false,
    //showMultiDayView: true,
    //showWeekView: false,
    //showMultiWeekView: false,
    //showMonthView: false,
    //showNavBar: false,
    //showTodayText: false,
    //showTime: false,
    //editModal: true,
    //enableEditDetails: false,
    //title: 'My Calendar', // the header of the calendar, could be a subtitle for the app

});