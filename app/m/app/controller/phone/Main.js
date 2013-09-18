/**
 * Created with IntelliJ IDEA.
 * User: ernesto
 * Date: 4/20/13
 * Time: 1:21 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('App.controller.phone.Main', {
    extend: 'Ext.app.Controller',

    config: {
        control: {
            navigationPanel:{
                itemtap:'onNavItemTap'
            }
        },

        refs: {
            mainPanel:'phonemain',
            navigationPanel:'phonemain > list'
        }
    },

    onNavItemTap:function(panel, index, target, record){
        var me = this, text, view;
        text = record.data.text;
        view = record.data.view;

        me.getMainPanel().push(Ext.widget(view,{
            title:text
        }));
    }
});