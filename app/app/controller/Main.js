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

Ext.define('App.controller.Main', {
    extend: 'App.controller.Abstract',

	refs: [
		{
			ref: 'viewport',
			selector: 'appview'
		},
		{
			ref: 'logo',
			selector: 'logon > image'
		},
		{
			ref: 'adminArea',
			selector: 'adminarea'
		},
		{
			ref: 'patientArea',
			selector: 'patientarea'
		},
		{
			ref: 'resetBtn',
			selector: 'button[action=reset]'
		},
		{
			ref: 'loginBtn',
			selector: 'button[action=login]'
		},
		{
			ref: 'logoutBtn',
			selector: 'button[action=logout]'
		},
		{
			ref: 'welcomeText',
			selector: 'tbtext[action=welcomeText]'
		},
		{
			ref: 'chatAdmin',
			selector: 'uxiframe[action=chatadmin]'
		}
	],

	init: function() {
		var me = this;
		/**
		 * url params array
		 * @type {Array}
		 */
		me.urlParams = Ext.Object.fromQueryString(location.search);
		say(me.urlParams);
        /**
         * if admin
         * @type {boolean}
         */
        App.isAdmin = typeof me.urlParams.admin == 'undefined' ? false : eval(me.urlParams.admin);
		/**
		 * language
		 * @type {string}
		 */
		App.lang = typeof me.urlParams.lang == 'undefined' ? 'es' : me.urlParams.lang;
		/**
		 * language
		 * @type {string}
		 */
		App.partner = typeof me.urlParams.partner == 'undefined' ? 'salus' : me.urlParams.partner;
		/**
		 * appointment ID
		 * @type {int}
		 */
		App.appId = typeof me.urlParams.app == 'undefined' ? 0 : me.urlParams.app;
		/**
		 * action = logon,confirm,cancel
		 * @type {string}
		 */
		App.action = typeof me.urlParams.action == 'undefined' ? 'logon' : me.urlParams.action;


		// START DEBUG INFO! ////////////////////////////////////////////
		// START DEBUG INFO! ////////////////////////////////////////////
		// START DEBUG INFO! ////////////////////////////////////////////

		say('isAdmin? '+ App.isAdmin);
		say('lang? '+ App.lang);
		say('partner? '+ App.partner);
		say('appId? '+ App.appId);
		say('action? '+ App.action);

		// END DEBUG INFO! //////////////////////////////////////////////
		// END DEBUG INFO! //////////////////////////////////////////////
		// END DEBUG INFO! //////////////////////////////////////////////

		if(App.action == 'logon'){

		}

		me.control({
			'appview': {
				afterrender: me.onAppAfterRender
			},
			'request': {
				afterrender: me.onRequestPanelRender
			},
			'button[action=reset]': {
				click: me.onLogonFormReset
			},
			'button[action=login]': {
				click: me.onLogon
			},
			'button[action=logout]': {
				click: me.onLogout
			}
		});

		App.view.ux.ActivityMonitor.init({
			interval: 10000,
//			maxInactive: 5000,
			maxInactive: (1000 * 60 * 2),
			verbose: true,
			isInactive: function(){
				me.startAutoLogout();
			}
		});

        window.onresize = function() {
            me.doAlignLogon();
        }

	},

	onRequestPanelRender:function(panel){
		panel.el.mask(w('validatingWaitMsg'));
	},

	renderRequestPanel:function(){
		var me = this,
			panel = me.getViewport().add(Ext.widget('request')),
            params = {},
            tpl;

		Requests.answerRequest(me.urlParams, function(provider, response){

			if(response.result.success){
				// return thank you HTML
				panel.setTitle(w('thankyou'));
				panel.update(response.result.msg);

                if(response.result.app.status == '3'){
                    tpl = 'confirmed';
                }else if(response.result.app.status == '4'){
                    tpl = 'canceled';
                }

                params = {
                    app: response.result.app,
                    tpl: tpl
                };

                Email.SendEmailByParams(params,function(provider, response){
                    say('Email sent...');
                });

			}else{
				panel.setTitle(w(response.result.error));
				panel.update(response.result.msg);
			}

			panel.el.unmask();
		})

	},

	onLogonFormReset:function(btn){
        var panel = btn.up('form') ? btn.up('form') : btn.up('panel').down('form');
        panel.getForm().reset();
	},

	onLogon:function(btn){
		var me = this,
            panel = btn.up('form') ? btn.up('form') : btn.up('panel').down('form'),
			form = panel.getForm(),
			values = form.getValues(),
			chatAdmin,
			src,
            fullname,
            error;

		values.isAdmin = App.isAdmin;
		values.appId = App.appId;
		me.logon.el.mask('Un momento, Autenticando...');

//		if(values.dob) values.dob = values.dob + ' 00:00:00'

		Logon.getAuthorization(values, function(provider, response){
			if(response.result.success){
				me.logon.el.unmask();
				me.logon.hide();

				App.authData = response.result;

				if(me.area){
					me.area.show();
				}else{
					me.area = me.getViewport().add(App.isAdmin ? Ext.widget('adminarea') : Ext.widget('patientarea'));
				}

				// Admin specific.... stuff
				if(App.isAdmin){
					chatAdmin = me.getChatAdmin();
					src = Ext.String.format('lib/Mibew/operator/login.php?login={0}&password={1}', values.username, values.password);
					if(chatAdmin.rendered){
						me.getChatAdmin().load(src);
					}else{
						me.getChatAdmin().src = src;
					}

				// Patient specific.... stuff
				}else{
					me.getController('Patient').loadPatient(App.authData);
				}
				// set welcome text
                fullname = (typeof response.result.user != 'undefined' ? response.result.user.fullname : response.result.app.fullname);
				me.getWelcomeText().setText(w('welcome') + ', ' + fullname);
				// start activity monitor
				me.startActivityMonitor();
			}else{
				me.logon.el.unmask();

                error = w(response.result.error);

                if(typeof response.result.data != 'undefined'){
                    var data = response.result.data,
                        len = data.length;
                    say(data);
                    if(len == 1){
                        say('uno');
                        error = Ext.String.format(error, data[0]);
                    }else if(len == 2){
                        say('dos');
                        error = Ext.String.format(error, data[0], data[1]);
                    }else if(len == 3){
                        say('tres');
                        error = Ext.String.format(error, data[0], data[1], data[2]);
                    }
                }

				me.flyMsg(w('sorry'), error, true);

				if(response.result.destroy){
					me.logon.destroy();
					me.getViewport().destroy();
					delete me.logon;
				}
			}
		});
	},

	onLogout:function(){
		var me = this;
		Ext.Msg.show({
			title:'Confirme',
			msg: 'Esta seguro que quiere salir?',
			buttons: Ext.Msg.YESNO,
			icon: Ext.Msg.QUESTION,
			fn:function(b){
				if(b == 'yes') me.doLogout();
			}
		});
	},

	doLogout:function(){
		var me = this,
			windows = Ext.ComponentQuery.query('window[rendered=true]');
		for(var i=0; i < windows.length; i++){
			if(!windows[i].hidden)windows[i].hide();
		}
        me.getViewport().el.unmask();
        me.getViewport().el.mask(w('logging_out'));

        Logon.setUnauthorized(function(){
            me.getViewport().el.unmask();
            me.logon.show();
            if(App.isAdmin){
                if(me.getChatAdmin().rendered) me.getChatAdmin().load('lib/Mibew/operator/logout.php');
                me.getAdminArea().hide();
            }else{
                me.getPatientArea().hide();
            }
        });
	},

	cancelAutoLogout: function(){
		var me = this;
		me.getViewport().el.unmask();
		me.LogoutTask.stop(me.LogoutTaskTimer);
		me.logoutWarinigWindow.destroy();
		delete me.logoutWarinigWindow;
		App.view.ux.ActivityMonitor.start();
	},

	startAutoLogout: function(){
		var me = this;
		me.logoutWarinigWindow = Ext.create('Ext.Container', {
			floating: true,
			cls: 'logout-warning-window',
			html: w('logging_out_in'),
			seconds: 10
		}).show();

		me.getViewport().el.mask();

		if(!me.LogoutTask)
			me.LogoutTask = new Ext.util.TaskRunner();
		if(!me.LogoutTaskTimer){
			me.LogoutTaskTimer = me.LogoutTask.start({
				scope: me,
				run: me.logoutCounter,
				interval: 1000
			});
		}else{
			me.LogoutTask.start(me.LogoutTaskTimer);
		}
	},

	logoutCounter: function(){
		var me = this, sec = me.logoutWarinigWindow.seconds - 1;
		if(sec <= 0){
			me.logoutWarinigWindow.update('Logging Out... Bye! Bye!');
			me.LogoutTask.stop(me.LogoutTaskTimer);
			me.logoutWarinigWindow.destroy();
			delete me.logoutWarinigWindow;
			me.doLogout();
		}else{
			me.logoutWarinigWindow.update('Logging Out in ' + sec + 'sec');
			me.logoutWarinigWindow.seconds = sec;
		}
	},

	startActivityMonitor:function(){
		App.view.ux.ActivityMonitor.start();
	},

    onAppAfterRender:function(view){
        var me = this,
	        contentMain = Ext.get('content-main');

		if(App.isAdmin){
//			var sidePanel = Ext.get('content-side'),
//				topPanel = Ext.get('pre-content'),
//				styles = {
//					visibility:'hidden',
//					display:'none',
//					height:0,
//					width:0,
//					margin:0,
//					padding:0
//				};
//			sidePanel.setStyle(styles);
//			topPanel.setStyle(styles);
//			view.setWidth(960);
		}else{
			say(view);
//			view.setWidth(650);
			view.addCls('mainAppContainer');
		}

        if(App.action == 'logon'){
            var items = [{
                xtype: App.isAdmin ? 'logonadminform' : 'logonpatientform'
            }];

//            if(App.partner != 'salus') items.splice(0,0,{
//                xtype:'image',
//                src:'resources/images/logos/'+ App.partner +'.png',
//                margin:'20 112',
//                height:50,
//                width:260
//            });

            me.logon = me.getViewport().add(
                Ext.create('App.view.logon.Window', {
                    items: items
                })
            );
            me.logon.show();

        }else if(App.action != 'logon'){
            me.renderRequestPanel();
		}

        contentMain.removeCls('app-mask');
        Ext.get('app-mask-msg').destroy();

	},

    doAlignLogon:function(){
	    say(this.logon);
		if(this.logon) this.logon.alignTo(this.getViewport(), 'c-c', [0,30]);
	}
});