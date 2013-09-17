Ext.define('App.controller.Main', {
    extend: 'App.controller.Abstract',

    refs: [
        {
            ref: 'loginWindow',
            selector: 'loginwindow'
        }
    ],

    init: function () {
      
        this.control({
            
            'viewport': {
                resize: this.onViewportResize
            },
            
            'appMain': {
                render: this.onAppRender
            },

            'button[action=serverTest]': {
                click: this.onServerTest
            }
        });
    },


    onServerTest: function () {
        var me = this;

        Test.Message('It Worked!', function (result) {
            me.flyMsg('Sweet!', result);
        });

    },

    onViewportResize: function (viewport) {
        this.getLoginWindow().alignTo(viewport.el, 'c-c');

    },
    
    onAppRender: function (main) {
        this.getModules();
        this.startCron();
    },
    
    getModules: function (main) {
        var me = this;
        
        Modules.GetActiveModules(function (response) {
            var modules = response.data;

            for (var i = 0; i < modules.length; i++) {
                App.app.addController('App.module.' + modules[i].name + '.Main');
//                Ext.create();

            }

        });
    }
});
