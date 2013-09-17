Ext.define('App.module.calendar.Calendar', {
    extend: 'Ext.panel.Panel',

    requires: [
        'Extensible.calendar.CalendarPanel',
        'Extensible.calendar.gadget.CalendarListPanel',
        'Extensible.calendar.data.MemoryCalendarStore',
        'Extensible.calendar.data.MemoryEventStore',
        'Extensible.example.calendar.data.Events',
        'Extensible.example.calendar.data.Calendars'
    ],

    title: 'Calendar',
    closable: true,
    layout: 'border',
    items: [
        {
            region: 'center',
            layout: 'border',
            items: [
                {
                    region: 'west',
                    width: 179,
                    border: false,
                    items: [
                        {
                            xtype: 'datepicker',
                            action:'calendarDatePicker'
                        },
                        {
                            xtype: 'combobox',
                            emptyText: 'Select Book',
                            margin:2,
                            width: 174,
                            queryMode: 'local',
                            displayField: 'option',
                            valueField: 'value',
                            store: Ext.create('Ext.data.Store', {
                                fields: ['option', 'value', 'time'],
                                data : [
                                    {option:'Book 1', value:'1', time:'10'},
                                    {option:'Book 2', value:'2', time:'20'},
                                    {option:'Book 3', value:'3', time:'30'}
                                ]
                            })
                        },
                        {
                            xtype: 'combobox',
                            emptyText: 'Select Procedure',
                            margin:'0 2 2 2',
                            width: 174,
                            queryMode: 'local',
                            displayField: 'option',
                            valueField: 'value',
                            store: Ext.create('Ext.data.Store', {
                                fields: ['option', 'value', 'time'],
                                data: [
                                    { option: 'Procedure 1', value: '1', time: '10' },
                                    { option: 'Procedure 2', value: '2', time: '20' },
                                    { option: 'Procedure 3', value: '3', time: '30' }
                                ]
                            })
                        },
                        {
                            xtype: 'extensible.calendarlist',
                            title: 'Zones',
                            store: this.calendarStore = Ext.create('Extensible.calendar.data.MemoryCalendarStore', {
                                data: Ext.create('Extensible.example.calendar.data.Calendars')
                            }),
                            border: false,
                            width: 178
                        }
                    ]
                },
                {
                    xtype: 'extensible.calendarpanel',
                    action:'apointmentCalendar',
                    eventStore: Ext.create('Extensible.calendar.data.MemoryEventStore', {
                        data: Ext.create('Extensible.example.calendar.data.Events'),
                        autoMsg: false
                    }),
                    calendarStore: this.calendarStore,
                    border: false,
                    region: 'center',
                    activeItem: 0, // day view
                    recurrence:true,
                    viewConfig: {
                    //enableFx: false,
                    //ddIncrement: 10, //only applies to DayView and subclasses, but convenient to put it here
                    viewStartHour: 7,
                    viewEndHour: 22,
                    //minEventDisplayMinutes: 15
                        showTime: false
                    },
                    
                    dayViewCfg: {
                        ddIncrement: 15,
                        minEventDisplayMinutes: 15,
                        hourHeight: 100
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
                    },

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
                }
            ]
        }
    ]
});