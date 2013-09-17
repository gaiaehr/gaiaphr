
Ext.define('App.view.ux.form.field.ComboAdvance', {
    alias: 'plugin.comboadvance',
    extend: 'Ext.AbstractPlugin',

    mixins: {
        observable: 'Ext.util.Observable'
    },

    relayedEvents: [
        'cancel',
        'beforesync',
        'sync',
        'failure'
    ],

    trigger1Class: 'x-form-select-trigger',
    trigger2Class: 'x-form-update-trigger',
    trigger3Class: 'x-form-add-trigger',

    addTolltip: 'Add Item',
    windowTitle: 'Add Record',
    saveText: 'Save',
    cancelText: 'Cancel',
    maskText: 'Saving Data',
    
    form: null,
    windowConfig: null,
    
    constructor: function(config) {
        var me = this;

        me.addEvents(
            'cancel',
            'beforesync',
            'sync',
            'failure'
        );

        me.callParent(arguments);
        me.mixins.observable.constructor.call(me);
    },

    init: function(field) {
        var me = this;

        // set some global stuff
        me.field = field;
        me.store = field.getStore();

        field.setEditable(false);

        // relay plugin event to ield
        field.relayEvents(me, me.relayedEvents);

        // defaul for windowConfig
        me.windowConfig = me.windowConfig || {
            title: 'New Record',
            modal: true
        },
        // defaul for formConfig
        me.formConfig = me.formConfig || {
            width: 400,
            height: 240,
            border: false,
            html: 'Form placeholder, please add a formConfig property<br>' +
                'Exmaple:<br>' +
                '<pre>' +
                '{<br>' +
                '   ptype: "comboadd",<br>' +
                '   windowConfig: {<br>' +
                '       title: "New Record"<br>' +
                '       modal: true<br>' +
                '   }<br>' +
                '   formConfig: {<br>' +
                '       width: 600,<br>' +
                '       height: 400,<br>' +
                '       border: false,<br>' +
                '       items:[ {...},{...} ]<br>' +
                '   }<br>' +
                '}<br>' +
                '</pre>'
        };

        // add trigger
        me.field.on('beforerender', me.beforeRender, me);
    },
    
    beforeRender: function() {
        var me = this,
            id = me.field.getId();
        
        me.field.triggerConfig = {
            tag: 'div',
            cls: 'x-form-twin-triggers',
            style: 'display:flex;',
            cn: [
                {
                    tag: "img",
                    //                    style: Ext.isIE ? 'margin-left:-3;height:19px' : '',
                    src: Ext.BLANK_IMAGE_URL,
                    id: "trigger1" + id,
                    name: "trigger1" + id,
                    cls: "x-form-trigger " + me.trigger1Class
                },
                {
                    tag: "img",
                    //                    style: Ext.isIE ? 'margin-left:-3;height:19px' : '',
                    src: Ext.BLANK_IMAGE_URL,
                    id: "trigger2" + id,
                    name: "trigger2" + id,
                    cls: "x-form-trigger " + me.trigger2Class
                },
                {
                    tag: "img",
                    //                    style: Ext.isIE ? 'margin-left:-6;height:19px' : '',
                    src: Ext.BLANK_IMAGE_URL,
                    id: "trigger3" + id,
                    name: "trigger3" + id,
                    cls: "x-form-trigger " + me.trigger3Class
                }
            ]
        };
        

    },
    
        /**
     * Adds the triggers to the field
     */
    onRender: function (ct, position) {
        App.view.ux.form.field.plugin.ComboAdd.superclass.onRender.call(this, ct, position);

        var me = this,
            id = me.field.getId();
        
        me.field.triggerEl.replaceWith(me.field.triggerConfig);
        me.field.triggerEl.on('mouseup', function (e) {
            if (e.target.name == "trigger1" + id) {
                me.field.onTriggerClick();
            } else if (e.target.name == "trigger2" + id) {
                me.onTriggerUpdateClick();
            } else if (e.target.name == "trigger3" + id) {
                me.onTriggerAddClick();
            }
        }, me.field);

        var trigger1 = Ext.get("trigger1" + id);
        var trigger2 = Ext.get("trigger2" + id);
        var trigger3 = Ext.get("trigger3" + id);
        
        trigger1.addClsOnOver('x-form-trigger-over');
        trigger2.addClsOnOver('x-form-trigger-over');
        trigger3.addClsOnOver('x-form-trigger-over');
    },
    
    /**
     * Start the window
     */
    onTriggerAddClick: function () {
        var me = this;
        me.field.reset();
        me.getWindow().show();
        me.window.down('form').getForm().loadRecord(me.getNewRecord());
    },
    
    /**
     * Start the window
     */
    onTriggerUpdateClick: function () {
        var me = this;
        me.getWindow().show();
        me.window.down('form').getForm().loadRecord(me.getSelectedRecord());
    },
    
    getSelectedRecord: function() {
        return this.field.findRecordByValue(this.field.getValue());
    },
    
    getNewRecord: function() {
        return Ext.create(this.field.getStore().model);
    },
    
        /**
     * Creates a new window
     */
    getWindow: function () {
        var me = this;

        me.window = Ext.widget('window', {
            items: [ Ext.widget('form', me.formConfig) ],
            buttons: [
                {
                    text: me.cancelText,
                    scope: me,
                    handler: me.doCancelRecord
                },
                {
                    text: me.saveText,
                    scope: me,
                    handler: me.doSaveRecord
                }
            ]
        });

        return Ext.apply(me.window, me.windowConfig);
    },
    
    /**
     * Saves the record and to combobox sotore everything
     */
    doSaveRecord: function () {
        var me = this,
            panel = me.window.down('form'),
            form = panel.getForm(),
            record = form.getRecord(),
            values = form.getValues(),
            index = me.store.indexOf(record);

        record.set(values);
        if (index == -1) me.store.add(record);
        
        panel.el.mask(me.maskText);
        // fires the beforesync event and add the values to the store
        me.fireEvent('beforesync', me.store, record);
        
        me.store.sync({
            // hanlde sync success
            success: function (batch, options) {
                say('success');
                me.field.select(record);
                me.fireEvent('sync', me.store, record, batch, options);
            },
            // handle sync failure
            failure: function () {
                me.fireEvent('failure', me.store, record, batch, options);
                say('failure');
            },
            // handle all request
            callback: function () {
                panel.el.unmask();
                form.reset();
                me.window.close();
            }
        });
    },
    
    /**
     * Cancels everything
     */
    doCancelRecord: function() {
        var me = this,
            form = me.window.down('form').getForm();
        
        me.fireEvent('cancel', me, me.form, me.store);
        form.reset();
        me.window.close();
    }
    
});
