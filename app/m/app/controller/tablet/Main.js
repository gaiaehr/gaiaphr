/**
 * Created with IntelliJ IDEA.
 * User: ernesto
 * Date: 4/20/13
 * Time: 1:21 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('App.controller.tablet.Main', {
    extend: 'Ext.app.Controller',

    config: {
        control: {
            navigationPanel: {
                itemtap: 'onNavItemTap'
            },
            homeBtn:{
                tap:'onHomeTap'
            }
        },

        refs: {
            mainPanel: 'tabletmain',
            titlePanel: 'tabletnavigationbar',
            navigationPanel: 'tabletnestedlist',
            welcome:'tabletwelcome',
            homeBtn: 'button[action=home]'
        }
    },

    onNavItemTap: function(panel, list, index, target, record){
        var me = this, text, view;

        text = record.data.text;
        view = record.data.view;

        if(typeof me[view] == 'undefined') me[view] = me.getMainPanel().add(Ext.widget(view));

        me.getMainPanel().setActiveItem(me[view]);
        me.getTitlePanel().setTitle(text);
        me.getHomeBtn().show();

    },

    onHomeTap:function(btn){
        var me = this;
        btn.hide();
        me.getMainPanel().setActiveItem(me.getWelcome());
        me.getNavigationPanel().getActiveItem().deselectAll();
        me.getTitlePanel().setTitle('Home');
    }
});