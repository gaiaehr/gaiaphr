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

Ext.define('App.controller.Navigation', {
    extend: 'Ext.app.Controller',

	refs: [
		{
			ref: 'navigation',
			selector: 'navigationtabs'
		},
		{
			ref: 'mainTabPanel',
			selector: 'container[action=mainTabPanel]'
		},
		{
			ref: 'mainTabPanels',
			selector: 'container[action=mainTabPanel] > panel'
		},
		{
			ref: 'nextBtn',
			selector: 'button[action=next]'
		},
		{
			ref: 'backBtn',
			selector: 'button[action=back]'
		},
		{
			ref: 'finalizedBtn',
			selector: 'button[action=finalized]'
		}
	],

	init: function() {
		var me = this;

		me.control({
			'navigationtabs > button': {
				toggle: me.navBtnPress
			},
			'container[action=mainTabPanel] > panel': {
				beforehide: me.validatePanel
			},
			'button[action=next]': {
				click: me.goNext
			},
			'button[action=back]': {
				click: me.goBack
			},
			'button[action=finalized]': {
				click: me.onFinalized
			}
		});

		// get Patient controller
		me.patient = me.getController('Patient');

	},

	navBtnPress:function(btn, pressed){
		var me = this,
			layout = me.getMainTabPanel().getLayout();

		if(pressed){
			layout.setActiveItem(btn.action);
		}
	},

	validatePanel:function(panel){
		var isPanelValid;

		if(panel.form){
			isPanelValid = panel.getForm().isValid();
		}else{
			isPanelValid = true;
		}
		Ext.getBody().el.scroll('up',2000, true);
		return isPanelValid;
	},

	goNext:function(btn){
		var me = this,
			tapPanel = me.getMainTabPanel(),
			layout = tapPanel.getLayout(),
			activePanel = layout.getActiveItem(),
			activePanelIndex = tapPanel.items.items.indexOf(activePanel),
			currNav = me.getNavigation().getComponent(activePanelIndex),
			nextNav = me.getNavigation().getComponent(activePanelIndex + 1);

        btn.disable();
        btn.setIcon('resources/images/blue-loading.gif');
        btn.setText(w('saving')+'...');

		me.patient.patientFormSave(
			me.getMainTabPanel().getComponent(currNav.action),
			function(success){

                btn.enable();
                btn.setIcon('');
                btn.setText(w('next'));

				if(success){
					currNav.addCls('happyBackground');
					currNav.removeCls('sadBackground');

					layout.setActiveItem(nextNav.action);

					currNav.enable();
					currNav.toggle(false, true);
					nextNav.toggle(true, true);
					me.getBackBtn().setVisible(layout.getPrev());
					me.getNextBtn().setVisible(layout.getNext() && activePanelIndex != 3);
					me.getFinalizedBtn().setVisible(!layout.getNext() || activePanelIndex ==3);

					if(activePanelIndex == 0) me.patient.loadInsurance();
					if(activePanelIndex == 1) me.patient.loadClinical();
					if(activePanelIndex == 2) me.patient.loadSignatures();
//					if(activePanelIndex == 2) me.patient.loadAppointments();

				}else{
					currNav.addCls('sadBackground');
					currNav.removeCls('happyBackground');
				}
			}
		);
	},

	setNavValid:function(valid){
		say('valid?'+valid);
		var me = this,
			tapPanel = me.getMainTabPanel(),
			layout = tapPanel.getLayout(),
			activePanel = layout.getActiveItem(),
			activePanelIndex = tapPanel.items.items.indexOf(activePanel),
			currNav = me.getNavigation().getComponent(activePanelIndex);

		if(valid){
			currNav.addCls('happyBackground');
			currNav.removeCls('sadBackground');
		}else{
			currNav.addCls('sadBackground');
			currNav.removeCls('happyBackground');
		}
	},

	onFinalized:function(){
		var me = this,
			tapPanel = me.getMainTabPanel(),
			layout = tapPanel.getLayout();

		me.patient.loadThankYou();
		me.setNavValid(true);
		layout.setActiveItem(4);

		me.getBackBtn().setVisible(false);
		me.getNextBtn().setVisible(false);
		me.getFinalizedBtn().setVisible(false);
	},

	goBack:function(){
		var me = this,
			tapPanel = me.getMainTabPanel(),
			layout = tapPanel.getLayout(),
			activePanel = layout.getActiveItem(),
			activePanelIndex = tapPanel.items.items.indexOf(activePanel),
			navBtn = me.getNavigation().getComponent(activePanelIndex - 1);

		navBtn.toggle(true);
		me.getBackBtn().setVisible(layout.getPrev());
		me.getNextBtn().setVisible(layout.getNext());
	}

});