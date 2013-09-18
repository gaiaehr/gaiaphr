/*
 * A simple reusable store that loads static calendar field definitions into memory
 * and can be bound to the CalendarCombo widget and used for calendar color selection.
 */
Ext.define('Extensible.calendar.data.MemoryCalendarStore', {
    extend: 'Ext.data.Store',
    model: 'Extensible.calendar.data.CalendarModel',

    requires: [
        'Ext.data.proxy.Memory',
        'Ext.data.reader.Json',
        'Ext.data.writer.Json',
        'Extensible.calendar.data.CalendarModel',
        'Extensible.calendar.data.CalendarMappings'
    ],

    proxy:{
        type:'direct',
        api:{
            read:Appointments.getBooks
        },
        noCache: false,
        reader: {
            type: 'json',
            root: 'books'
        },

        writer: {
            type: 'json'
        }
    },
    remoteFilter:true,
    filters:[
        {
            property:'active',
            value:1,
            operator:'='
        }
    ],
    autoLoad:false,

//    autoLoad: true,

    initComponent: function() {
        this.sorters = this.sorters || [{
            property: Extensible.calendar.data.CalendarMappings.Title.name,
            direction: 'ASC'
        }];

        this.idProperty = this.idProperty || Extensible.calendar.data.CalendarMappings.CalendarId.name || 'id';

        this.fields = Extensible.calendar.data.CalendarModel.prototype.fields.getRange();

        this.callParent(arguments);
    }
});