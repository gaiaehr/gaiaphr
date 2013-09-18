/**
 * Created with IntelliJ IDEA.
 * User: ernesto
 * Date: 4/4/13
 * Time: 2:30 PM
 * To change this template use File | Settings | File Templates.
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