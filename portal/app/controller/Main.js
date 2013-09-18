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
