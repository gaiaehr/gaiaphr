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

Ext.define('App.view.patient.Calendar', {
    alias: 'widget.patientcalendar',
    extend: 'Extensible.calendar.CalendarPanel',
    title: 'Appointments',
    eventStore: Ext.create('Extensible.calendar.data.EventStore'),
    height: 500,
    editModal: true,
    id:'patient-calendar',
    activeItem: 3, // month view
    startDay: 0,

    viewConfig: {
        viewStartHour: 7,
        viewEndHour: 21,
        minEventDisplayMinutes: 15,
        showTime: false
    },

    monthViewCfg: {
        showHeader: true,
        showWeekLinks: true,
        showWeekNumbers: true
    },

    multiWeekViewCfg: {
        //weekCount: 3
    },

    // Some optional CalendarPanel configs to experiment with:
    readOnly: true
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