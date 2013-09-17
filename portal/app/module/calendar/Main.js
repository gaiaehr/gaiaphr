Ext.define('App.module.calendar.Main', {
    extend: 'App.module.Module',
    

    refs:[
        {
            ref:'apointmentCalendar',
            selector:'panel[action=apointmentCalendar]'
        },
        {
            ref: 'dayView',
            selector: 'container[action=dayView]'
        }
    ],

    init: function () {
        var me = this;
        me.callParent();
      
        me.nav.addNavItem('root', {
            id: 'module.calendar.Calendar',
            text: 'Calendar',
            leaf:true
        });

        me.control({

            'datepicker[action=calendarDatePicker]': {
                select: me.onCalendarDatePickerSelect
            },

            'extensible.calendarlist[action=apointmentCalendar]': {
                select: me.onCalendarDatePickerSelect
            },

            'button[action=calendarTest10]': {
                click: function () {
                    me.test(10);
                }
            },

            'button[action=calendarTest20]': {
                click: function () {
                    me.test(20);
                }
            }
            
        });

    },
    
    onCalendarDatePickerSelect: function (dp, dt) {
        this.getApointmentCalendar().setStartDate(dt);
    },
    
    test: function (m) {
//        say(this.getDayView());
        
//        this.getDayView().ddIncrement = px;
//        this.getDayView().hourHeight = 60;

        this.getApointmentCalendar().setDayViewConfig({
            ddIncrement: m,
            minEventDisplayMinutes: m,
            hourHeight: 120
        });

    }
})

