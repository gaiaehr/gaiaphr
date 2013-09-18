/**
 * Created with IntelliJ IDEA.
 * User: ernesto
 * Date: 4/4/13
 * Time: 2:30 PM
 * To change this template use File | Settings | File Templates.
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