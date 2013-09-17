Ext.define('App.module.Module', {
    extend: 'App.controller.Abstract',

    init: function() {
        this.main = this.getController('Main');
        this.auth = this.getController('Authorization');
        this.nav  = this.getController('Navigation');
    }
})

