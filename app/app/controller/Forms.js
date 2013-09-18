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

Ext.define('App.controller.Forms', {
    extend: 'Ext.app.Controller',

	refs: [
		{
			ref: 'mainForm',
			selector: 'form[action=main]'
		}
	],

	init: function() {
		var me = this;

		me.control({
			'formcheckbox[action=main]': {
				change: me.onMainFormSave
			},
			'button[action=save]': {
				click: me.onMainFormSave
			},
			'checkbox[action=checkWithExplanation]': {
				change: me.onCheckWithExplanationClicked
			}
		});

	},

	onMainFormSave:function(){
		var me = this,
			panel = me.getMainForm(),
			form = panel.getForm();

		panel.el.mask('Guardando la data');

		form.submit({
			url:'data/patientSave.php',
			success:function(){
				panel.el.unmask();
				me.flyMsg('Exito','Data ha sido grabada');
			},
			failure: function(form, action) {
				panel.el.unmask();
				switch (action.failureType){
					case Ext.form.action.Action.CLIENT_INVALID:
						me.flyMsg('Fracaso','Form fields may not be submitted with invalid values', true);
						break;
					case Ext.form.action.Action.CONNECT_FAILURE:
						me.flyMsg('Fracaso','Ajax communication failed', true);
						break;
					case Ext.form.action.Action.SERVER_INVALID:
						me.flyMsg('Fracaso',action.result.msg, true);
				}
			}
		});
	},

	onCheckWithExplanationClicked:function(check, value){
		var textFields = check.up('fieldcontainer').query('textfield');
		for(var i=0; i < textFields.length; i++){
			textFields[i].setVisible(value);
		}
	},

	flyMsg: function(title, format, error){
		var msgBgCls = (error === true) ? 'msg-red' : 'msg-green';

		if(!this.msgCt){
			this.msgCt = Ext.core.DomHelper.insertFirst(document.body, {
				id: 'msg-div'
			}, true);
		}

		this.msgCt.alignTo(document, 't-t');
		var s = Ext.String.format.apply(String, Array.prototype.slice.call(arguments, 1)), m = Ext.core.DomHelper.append(this.msgCt, {
			html: '<div class="flyMsg ' + msgBgCls + '"><h3>' + title + '</h3><p>' + s + '</p></div>'
		}, true);

        Ext.create('Ext.fx.Animator', {
            target:m,
            duration:5000,
            keyframes:{
                0:{
                    opacity: 0
                },
                20:{
                    opacity: 1
                },
                80:{
                    opacity: 1
                },
                100:{
                    opacity: 0,
                    height:0
                }
            },
            listeners:{
                afteranimate:function(){
                    m.destroy();
                }
            }

        });
	}


});