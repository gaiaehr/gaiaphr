/**
 * Created with IntelliJ IDEA.
 * User: ernesto
 * Date: 4/19/13
 * Time: 10:14 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('App.controller.Forms', {
    extend: 'Ext.app.Controller',

    config: {

        control: {
            saveBtn: {
                tap: 'doSave'
            },
            resetBtn: {
                tap: 'doReset'
            }
        },

        refs: {
            saveBtn: 'button[action=save]',
            resetBtn: 'button[action=reset]'
        }
    },

    doSave:function(){

    },

    doReset:function(btn){
        btn.up('formpanel').reset();
    }

});