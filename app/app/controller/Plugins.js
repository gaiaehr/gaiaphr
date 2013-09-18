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

Ext.define('App.controller.Plugins', {
    extend: 'App.controller.Abstract',

	refs: [
        {
            ref: 'traTestBtn',
            selector: 'button[action=TRATest]'
        }
	],

	init: function() {
		var me = this;

		me.control({
			'button[action=TRAPostTest]': {
				click: me.postTest
			},
			'button[action=TRAGetTest]': {
				click: me.getTest
			}
		});

	},

    getTest:function(){
        Plugins.test({
            url:'http://127.0.0.1:8080',
            action:'getPatientData',
            method:'GET',
            request:4
        }, function(provider, response){
            say(response.result);
        });
    },

    postTest:function(){
        Plugins.test({
            url:'http://127.0.0.1:8080',
            action:'setPatientData',
            method:'POST',
            data:{
                demographics:{
                    firstName:'Fulano',
                    lastName:'De Tal',
                    dob:'2001-01-23 00:00:00'
                },
                insurance:[
                    {
                        insuranceID:1,
                        name:'SSS'
                    },
                    {
                        insuranceID:2,
                        name:'cruz Azul'
                    }
                ],
                appointment:{
                    id:23,
                    status:'confirmed'
                }
            }
        }, function(provider, response){
            say(response.result);
        });
    }

});