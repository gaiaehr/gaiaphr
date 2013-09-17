Ext.define('App.view.admin.Users', {
    extend: 'Ext.grid.Panel',
    requires:[
        'App.view.ux.grid.RowFormEditing',
        'App.view.ux.grid.RefreshTool',
        'Ext.ux.SlidingPager',
        'App.view.ux.form.field.Address'
    ],
    title: 'Users',
    action: 'usersGrid',
    closable: true,
    store: store = Ext.create('App.store.admin.Users'),
    plugins: [
        {
            ptype: 'rowformediting',
            addBtnText: 'Add User',
            addBtnIconCls: 'iconAdd',
            clicksToEdit: 1,
            items: [
                {
                    xtype: 'container',
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    defaults: {
                        margin: 10,
                        flex:1
                    },
                    items: [
                        {
                            xtype: 'container',
                            layout: 'anchor',
                            defaults: {
                                labelWidth: 60,
                                margin:'5 0'
                            },
                            items: [
                                {
                                    xtype: 'fieldcontainer',
                                    layout: 'hbox',
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            fieldLabel: 'Username',
                                            labelWidth: 60,
                                            width: 218,
                                            margin: '0 10 0 0',
                                            name: 'username'
                                        },
                                        {
                                            xtype: 'textfield',
                                            fieldLabel: 'Password',
                                            labelWidth: 60,
                                            flex: 1,
                                            action: 'password',
                                            name: 'password'
                                        },
                                        {
                                            xtype: 'button',
                                            text: 'Change Password',
                                            action: 'changePassword',
                                            hidden: true
                                        }
                                    ]
                                },
                                {
                                    xtype: 'fieldcontainer',
                                    fieldLabel:'Name',
                                    layout: 'hbox',
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            name: 'namefirst',
                                            width: 100
                                        },
                                        {
                                            xtype: 'textfield',
                                            name: 'namemiddle',
                                            width: 50
                                        },
                                        {
                                            xtype: 'textfield',
                                            name: 'namelast',
                                            flex:1
                                        }
                                    ]
                                },
                                {
                                    xtype: 'addressfield',
                                    addressName:'address',
                                    addressContName: 'addressCont',
                                    cityName: 'city',
                                    stateName: 'state',
                                    zipcodeName: 'zipcode',
                                },
                                {
                                    xtype: 'checkbox',
                                    fieldLabel: 'Active?',
                                    name: 'active'
                                }
                            ]
                        },
                        {
                            xtype: 'fieldset',
                            title: 'Options',
                            layout: 'anchor',
                            defaults: {
                                labelWidth: 80,
                                margin: '5 0'
                            },
                            items: [
                               {
                                   xtype: 'textfield',
                                   fieldLabel: 'Username'
                               },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'First Name'
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Middle Name'
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Last Name'
                                },
                                {
                                    xtype: 'checkbox',
                                    fieldLabel: 'Active?'
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        { 
            ptype: 'gridrefresh'
        }
    ],
    columns: [
        {
            text: 'ID',
            dataIndex: 'id',
            width: '30'
        },
        {
            text: 'Username',
            dataIndex:'username',
            width: 150
        },
        {
            text: 'Name',
            dataIndex:'fullname',
            flex: 1
        },
        {
            text: 'Active',
            dataIndex: 'active',
            width: 50,
            renderer: boolRenderer
        }
    ],
    bbar: {
        xtype: 'pagingtoolbar',
        pageSize: 10,
        store: store,
        displayInfo: true,
        plugins: Ext.create('Ext.ux.SlidingPager')
    }
});