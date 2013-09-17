Ext.define('App.Application', {
    name: 'App',

    extend: 'Ext.app.Application',

    paths: {
        'Ext': 'ext/src',
        'App': 'app'
    },

    controllers: [
        'Abstract',
        'Main',
        'Authorization',
        'Navigation',
        'Settings',
        'User',
        'Acl'
    ],
    
    // Add just overrides components
    // and Ext.direct.*
    views: [
        'Ext.direct.*',
        'Ext.form.field.Checkbox'
    ],

   
    init: function () {
        // overrides...
        Ext.override(Ext.form.field.Checkbox, {
            inputValue: '1',
            uncheckedValue: '0'
        });
        
        // Ext.direct stuff...
        Ext.direct.Manager.addProvider(Ext.app.REMOTING_API);
        Ext.direct.Manager.on('exception', function(error) {
            // error.where is present in Debug mode or if Ext.Direct.Mvc is configured with debug="true" in web.config.
            // error object can also contain any addition information that can help you with debugging. Check out BasicController.TestException.
            if (Ext.isDefined(error.where)) {
                // Detailed error message for developer
                console.error(Ext.util.Format.format('{0}\n{1}', error.message, error.where));
                Ext.Msg.show({
                    title: 'Error occured',
                    msg: Ext.util.Format.format('Exception was thrown from {0}.{1}.<br/>Check the console for details.', error.action, error.method),
                    icon: Ext.MessageBox.ERROR,
                    buttons: Ext.Msg.OK
                });
            } else {
                // User friendly message for end user
                Ext.Msg.show({
                    title: 'Error occured',
                    msg: 'Unable to process request. Please try again later.',
                    icon: Ext.MessageBox.ERROR,
                    buttons: Ext.Msg.OK
                });
            }
        });

        // application global events
        this.addEvents(
            // after success login
            'login',
            // after success logout
            'logout',
            // after auto logout start
            'startautologout',
            // after auto logout stops
            'stopautologout',
            // navigation store loaded
            'navload',
            // navigation selection change
            'navselectionchange',
            // before a navigation item gets added
            'beforenaviteminsert',
            // after a navigation item is added
            'naviteminsert',
            // center panel taps active
            'centerpaneltapactive',
            // center panel taps render
            'centerpaneltabrender',
            // center panel taps show
            'centerpaneltabshow',
            // center panel taps close
            'centerpaneltabclose'
        );

    },
    
    addController: function (name) {
        var ctrl = this.getController(name);
//        ctrl.init(this);
//        ctrl.onLaunch(this);
        return ctrl;
    }
});
