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

Ext.define('App.controller.Settings', {
    extend: 'App.controller.Abstract',

    refs: [
        {
            ref: 'developerGrig',
            selector: 'grig[action=developerSettingsGrid]'
        }
    ],

    init: function() {
        this.control({
            'grid[action=developerSettingsGrid]': {
                render: this.onDeveloperGridRender,
                edit: this.onDeveloperGridEdit
            }
        });
    },
    
    onDeveloperGridEdit: function (editor, context) {
        context.store.sync();
    },
    
    onDeveloperGridRender: function (grid) {
        say('hello');
        grid.down('toolbar').insert(0, {
            xtype: 'button',
            text: 'Add Setting',
            iconCls:'iconAdd',
            handler: function () {
                say(grid.plugins[0]);
                grid.plugins[0].cancelEdit();
                grid.store.insert(0,{});
                grid.plugins[0].startEdit(0,0);
            }
        });
    }
});
