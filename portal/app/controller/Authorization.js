Ext.define('App.controller.Authorization', {
    extend: 'App.controller.Abstract',
    requires: [
        'App.view.ux.ActivityMonitor'
    ],

    refs: [
        {
            ref: 'viewport',
            selector: 'viewport'
        },
        {
            ref: 'loginWindow',
            selector: 'loginwindow'
        },
        {
            ref: 'appMain',
            selector: 'appMain'
        },
        {
            ref: 'userButton',
            selector: 'splitbutton[action=userbutton]'
        }
    ],

    init: function() {
        var me = this;

        me.control({
            'button[action=loginReset]': {
                click: me.doLoginReset
            },
            'button[action=login]': {
                click: me.doLogin
            },
            'menuitem[action=userbutton]': {
                click: me.doLogout
            },
            'menuitem[action=logout]': {
                click: me.doLogout
            },
            'loginwindow > form > textfield': {
                specialkey: me.onEnter
            }
        });

        // create and show login window
        Ext.create('App.view.login.Window').show();

        // show error is any
//        if (window.AppError.toLowerCase() == 'true') {
//            Ext.Msg.show({
//                title: 'Opps!',
//                msg: i18n(window.AppMessage),
//                buttons: Ext.Msg.OK,
//                icon: Ext.Msg.ERROR
//            });
//        }
        
        // activiti monitor settings
        App.view.ux.ActivityMonitor.init({
            verbose: true,
            interval: (1000 * 60 * 1),      // checks every minute
            maxInactive: (1000 * 60 * 5),   // start logout after 5 minutes
            isInactive: function() {
                me.startAutoLogout();
            }
        });
    },

    onEnter: function(field, e) {
        if (e.getKey() == e.ENTER) {
            this.doLogin();
        }
    },

    doLoginReset: function() {
        this.getLoginWindow().down('form').getForm().reset();
    },

    doLogin: function() {
        var me = this,
            // this is the form panel
            panel = me.getLoginWindow().down('form'),
            // this is the form basic
            form = panel.getForm(),
            name;
        panel.el.mask("Please Wait...");

	    Authorization.Login(form.getValues(), function(provider, response){
			var result = response.result;
		    if(result.success){
			    // here is where the application main panel gets render if doesnt exist...
			    if (!me.getAppMain()) me.getViewport().add(Ext.create('App.view.layout.Main'));
			    // set user info for later user
			    me.user = result.user;
			    // get the title and name for User button and login mesage
			    name = result.user.title + ' ' + result.user.namelast;
			    me.flyMsg('Sweet!', 'Welcome...' + name);
			    me.getUserButton().setText(name);
			    // reset the login window and un mask the form
			    panel.el.unmask();
			    form.reset();
			    // hide login and show main app
			    me.getLoginWindow().hide();
			    me.getAppMain().show();
			    // start activity monitor
			    App.view.ux.ActivityMonitor.start();
			    // destroy the auto logout message if exist
			    if (me.autoLogoutMsg) me.autoLogoutMsg.destroy();
			    delete me.autoLogoutMsg;
			    // fire logoin event
			    me.getApplication().fireEvent('login', me.getApplication(), result.user);
		    }

            // login error message
            me.flyMsg('Oops!', 'Username or Password incorrect', true);
            panel.el.unmask();
            form.reset();

        });
    },

    // logout method
    doLogout: function(force) {
        var me = this;

        if (force === true) {
            // force logout (no confirmation mesaage)
            Authorization.Logout(function(provider, response) {
                // logout message
                // me.flyMsg('Sweet!', 'Successfully Logged Out!');
                
                // close all the windows opened
                me.closeAllOpenedWindow();
                // hide login window and hide application
                me.getLoginWindow().show();
                me.getAppMain().hide();

                // stop activity monitor 
                App.view.ux.ActivityMonitor.stop();
                // fire logoout event
                me.getApplication().fireEvent('logout', me.getApplication());
            });
        } else {
            // show confirmation window
            Ext.Msg.show({
                title: 'Please Confirm...',
                msg: 'Are you sure want to logout?',
                icon: Ext.MessageBox.QUESTION,
                buttons: Ext.Msg.YESNO,
                fn: function(btn) {
                    if (btn == 'yes') {
                        // if yes just call this method and force it to logut
                        me.doLogout(true);
                    }
                }
            });
        }
    },

    // start the auto logout process
    startAutoLogout: function() {
        var me = this;
        // create the logout window
        me.logoutCounterWindow = Ext.create('Ext.Container', {
            floating: true,
            cls: 'logout-counter',
            html: 'Logging Out in...',
            seconds: 10,  // count down start timer in seconds
            modal: true
        }).show();
        // add mouser move and keydown events
        me.getViewport().el.on('mousemove', me.stopAutoLogout, me);
        me.getViewport().el.on('keydown', me.stopAutoLogout, me);
        // start countdown...
        if (!me.LogoutTask)
            me.LogoutTask = new Ext.util.TaskRunner();
        if (!me.LogoutTaskTimer) {
            me.LogoutTaskTimer = me.LogoutTask.start({
                scope: me,
                run: me.logoutCounDown,
                interval: 1000
            });
        } else {
            me.LogoutTask.start(me.LogoutTaskTimer);
        }
        // fire startautologout event
        me.getApplication().fireEvent('startautologout', me.getApplication());
    },

    // stops the auto logout process
    stopAutoLogout: function() {
        var me = this;
        // stop the logout time/task
        me.LogoutTask.stop(me.LogoutTaskTimer);
        // destroy the logout window and delete the reference to it
        me.logoutCounterWindow.destroy();
        delete me.logoutCounterWindow;
        // remove mouser move and keydown events
        me.getViewport().el.un('mousemove', me.stopAutoLogout, me);
        me.getViewport().el.un('keydown', me.stopAutoLogout, me);
        // start the activity monitor again
        App.view.ux.ActivityMonitor.start();
        // fire startautologout event
        me.getApplication().fireEvent('stopautologout', me.getApplication());
    },
    
    // count down method
    logoutCounDown: function() {
        var me = this, sec = me.logoutCounterWindow.seconds - 1;
        if (sec <= 0) {
            // do logout...
            me.doLogout(true);
            me.stopAutoLogout();
            me.autoLogoutMsg = me.flyMsg('Info', 'Automatically Logged out due to lack of ativity', true, true);
            return;
        } else if (sec <= 1) {
            // when one secound left, set Bye Bye message
            me.logoutCounterWindow.update('Logging Out... Bye! Bye!');
        } else {
            // keep counting down
            me.logoutCounterWindow.update('Logging Out in ' + sec + ' seconds...');
        }
        me.logoutCounterWindow.seconds = sec;
    },
    
    closeAllOpenedWindow: function () {
        var windows = Ext.ComponentQuery.query('window{isVisible()}');
        for (var i = 0; i < windows.length; i++) {
            say(windows[i].close());
        }       
    }
 
});
