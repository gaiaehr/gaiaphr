Ext.define('App.view.admin.Roles', {
    extend: 'Ext.grid.Panel',

    requires: [
        'App.view.ux.form.field.XCombo',
        'Ext.grid.plugin.CellEditing',
        'App.store.admin.AclGrpupPermsGrid',
        'Ext.ux.DataTip'
    ],
    
    title: 'Roles / Permissions',
    action: 'adminAclGrid',
    frame: true,
    columnLines: true,
    store: Ext.create('App.store.admin.AclGrpupPermsGrid'),
    tbar: [
        {
            xtype: 'xcombo',
            emptyText: i18n('select'),
            labelWidth: 50,
            width:250,
            valueField: 'id',
            displayField: 'title',
            store: Ext.create('App.store.admin.AclGroups'),
            action: 'adminAclGrooupCombo',
            windowConfig: {
                title: i18n('add-group')
            },
            formConfig: {
                border: false,
                bodyPadding: 10,
                items: [
                    {
                        xtype: 'textfield',
                        fieldLabel: i18n('group-name'),
                        name: 'title'
                    },
                    {
                        xtype: 'checkbox',
                        fieldLabel: i18n('active'),
                        name: 'active'
                    }
                ]
            }
        },
        '-',
        '->',
        '-',
        {
            xtype: 'button',
            text: i18n('add-role'),
            iconCls: 'iconAdd',
            action: 'adminAclAddRole'
        },
        '-'
    ],
//    selModel: {
//        selType: 'cellmodel'
//    },
    features: [
        {
            ftype: 'grouping'
        }
    ],
    plugins: [
        {
            ptype: 'cellediting',
            clicksToEdit: 1
        },
        {
            ptype: 'datatip',
            tpl: i18n('click-to-edit')
        }
    ],
    columns: [
        {
            text: 'Permission',
            width: 300,
            locked: true
        }
    ],
    buttons: [
        {
            text: i18n('cancel'),
            cls: 'cancelBtn',
            action: 'adminAclCancel'
        },
        '-',
        {
            text: i18n('save'),
            cls: 'saveBtn',
            action: 'adminAclSave'
        }
    ]
    
    
});