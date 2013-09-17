Ext.define('App.controller.Acl', {
    extend: 'App.controller.Abstract',

    refs: [
        {
            ref: 'adminAclGrooupCombo',
            selector: 'combobox[action=adminAclGrooupCombo]'
        },
        {
            ref: 'adminAclGrid',
            selector: 'grid[action=adminAclGrid]'
        }
    ],

    init: function() {
        this.control({
            'grid[action=adminAclGrid]': {
                beforeedit: this.beforeCellEdit
            },
            'combobox[action=adminAclGrooupCombo]': {
                select: this.adminAclGridReconfigure
            },
            'button[action=adminAclAddRole]': {
                click: this.doAddRole
            },
            'button[action=adminAclSave]': {
                click: this.doSaveAcl
            },
            'button[action=adminAclCancel]': {
                click: this.doCancelAcl
            }
        });
    },
    
    doSaveAcl: function () {
        var me = this,
            store = this.getAdminAclGrid().getStore();

        store.sync({
            callback: function(response) {
                me.flyMsg(i18n('success'), i18n('record-saved'));
            }
        });
    },
    
    doCancelAcl: function () {
        this.getAdminAclGrid().getStore().rejectChanges();
    },

    beforeCellEdit: function (editor, e) {
        return e.field != 'title';
    },
    
    adminAclGridReconfigure: function () {
        var me = this,
            cmb = me.getAdminAclGrooupCombo(),
            groupId = cmb.getValue(),
            grid = me.getAdminAclGrid(),
            fields = [
                {
                    name: 'id',
                    type: 'int'
                },
                {
                    name: 'title',
                    type: 'string'
                },
                {
                    name: 'groupId',
                    type: 'int'
                },
                {
                    name: 'category',
                    type: 'string'
                }
            ], columns, store, model;

        // add mask to view while we get the data and grid configurations
        grid.view.el.mask('Loading');
        // Ext.direct method to get grid configuration and data
        Acl.GetGroupPemrsList(groupId, function (response) {
            // new columns
            columns = response.columns;
            // set model fields mergin default fields and role fileds
            me.getModel('App.model.admin.AclGrpupPermsGrid').setFields(fields.concat(response.fields));
            // add raw data to the store
            grid.store.loadRawData(response.data);
            // add the checkbox editor and renderer to role fields
            for (var i = 0; i < columns.length; i++) {
                columns[i].editor = { xtype: "checkbox" };
                columns[i].renderer = window.boolRenderer;
            }

            columns.push({
                flex: 1
            });
            
            // reconfigure grid
            grid.reconfigure(null, columns);
            // remove grid view mask
            grid.view.el.unmask();
        });       
    },
    
    
    doAddRole: function () {
        var me = this,
            record = Ext.create('App.model.admin.AclRoles', {
                groupId: me.getAdminAclGrooupCombo().getValue()
            });
          
        me.getRoleWindow().show();
        me.roleWindow.down('form').getForm().loadRecord(record);
    },
    
    doSaveRole: function() {
        var me = this,
            panel = me.roleWindow.down('form'),
            form = panel.getForm(),
            record = form.getRecord(),
            values = form.getValues();
        
        panel.el.mask(i18n('be-right-back'));
        record.set(values);
        record.save({
            callback: function (rec) {
                me.adminAclGridReconfigure();
                panel.el.unmask();
                me.roleWindow.close();
            }
        });
    },
    
    doCancelRole: function () {
        this.roleWindow.close();
    },
    
    getRoleWindow: function () {
        var me = this;
        
        me.roleWindow = Ext.widget('window', {
            title: i18n('new-role'),
            items: [
                {
                    xtype: 'form',
                    border: false,
                    bodyPadding: 10,
                    items: [
                        {
                            xtype: 'textfield',
                            fieldLabel: i18n('role-name'),
                            name: 'title'
                        },
                        {
                            xtype: 'checkbox',
                            fieldLabel: i18n('active'),
                            name: 'active'
                        }
                    ]
                }
            ],
            buttons: [
                {
                    text: i18n('cancel'),
                    cls: 'cancelBtn',
                    scope: me,
                    handler: me.doCancelRole,
                    action: 'adminAclRoleCancel'
                },
                {
                    text: i18n('save'),
                    cls: 'saveBtn',
                    scope: me,
                    handler: me.doSaveRole,
                    action: 'adminAclRoleSave'
                }
            ]
        });

        return me.roleWindow;
    }
});
