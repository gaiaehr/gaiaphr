/**
 * Created with IntelliJ IDEA.
 * User: ernesto
 * Date: 4/19/13
 * Time: 10:14 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('App.controller.Login', {
    extend: 'Ext.app.Controller',

    config: {

        refs: {
            login: 'login',
            loginBtn: 'button[action=login]',
            logoutBtn: 'button[action=logout]'
        },

        control: {
            loginBtn: {
                tap: 'doLogin'
            },
            logoutBtn: {
                tap: 'onLogout'
            }
        }
    },

    doLogin:function(){
        var me = this;
        me.getLogin().hide();
        if(me.mainview){
            me.mainview.show()
        }else{
            me.mainview = Ext.os.is.Phone ? Ext.widget('phonemain') : Ext.widget('tabletmain');
            Ext.Viewport.add(me.mainview);
            console.log(me.mainview.show());
        }
	    Ext.Msg.alert('Warning!', 'A team of highly trained monkeys are still working in here, watch your step! :-)');
    },

    doLogout:function(){
        var me = this;
        me.mainview.hide();
        me.getLogin().show();
    },

    onLogout:function(){
        var me = this;
        Ext.Msg.confirm("PLease Confirm", "Are you sure you want to logout?", function(btn){
            if(btn == 'yes'){
                me.doLogout();
            }
        });
    }

});