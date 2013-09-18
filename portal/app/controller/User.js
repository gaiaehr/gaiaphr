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

Ext.define('App.controller.User', {
    extend: 'App.controller.Abstract',

    refs: [
        {
            ref: 'passwordTextField',
            selector: 'textfield[action=password]'
        },
        {
            ref: 'changePasswordBtn',
            selector: 'button[action=changePassword]'
        }
    ],

    init: function() {
        this.control({
            'grid[action=usersGrid]': {
                beforeedit: this.onBeforeEdit
            },
            'button[action=changePassword]': {
                click: this.onChangePassword
            }
        });
    },
    
    onBeforeEdit: function (editor, context) {
        var newRec = context.record.data.id === 0;
        this.getPasswordTextField().setVisible(newRec);
        this.getPasswordTextField().setDisabled(!newRec);
        this.getChangePasswordBtn().setVisible(!newRec);
        this.getChangePasswordBtn().uid = context.record.data.id;
    },
    
    onChangePassword: function (btn) {
        this.getChangePasswordForm(btn.up('form').getForm().getRecord());
    },
    
    getChangePasswordForm: function (record) {
        var sameUser = record.data.id == this.getController('Authorization').user.id,
            form = Ext.widget('form', {
                bodyPadding: 10,
                border: false,
                defaults: {
                    xtype: 'textfield',
                    inputType: 'password',
                    labelWidth:120
                },
                items: [
                    {
                        fieldLabel: 'New Passowrd',
                        name: 'newPassword'
                    },
                    {
                        fieldLabel: 'Confirm Passowrd',
                        name: 'confirmPassword'
                    }
                ]
            });

        if (sameUser) form.insert(0, {
            fieldLabel: 'Old Passowrd',
            name: 'oldPassword'
        });

        var win = Ext.widget('window', {
            title: 'Change Password',
            modal: true,
            items: [ form ],
            buttons: [
                {
                    text: 'Cancel'
                },
                '-',
                {
                    text: 'Save'
                }
            ]
        });
        
        form.getForm().loadRecord(record);
        win.show();

    }
});
