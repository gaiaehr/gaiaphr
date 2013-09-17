Ext.define('App.controller.Navigation', {
    extend: 'App.controller.Abstract',

    refs: [
        {
            ref: 'mainNavigation',
            selector: 'treepanel[action=mainnavigation]'
        }
    ],

    init: function() {
        this.control({
            'treepanel[action=mainnavigation]': {
                selectionchange: this.onSelectionChange,
                render: this.addTreeStoreListener
            },
            'appCenter > panel': {
                activate: this.onTabActive,
                close: this.onTabClose,
                render: this.onTabRender,
                show: this.onTabShow
            }
        });
    },
    
    addTreeStoreListener: function (tree) {
        var me = this;
        tree.store.on('load', function (store, node, records, successful, eOpts) {
            me.getApplication().fireEvent('navload', store, node, records, successful, eOpts);
            tree.getSelectionModel().select(node.childNodes[0]);
        });
    },

    onSelectionChange: function (nav, selected, eOpts) {
        if (!selected[0].data.leaf) return false;
        this.getApplication().fireEvent('navselectionchange', nav, selected, eOpts);
        var me = this,
            c = me.getCenter(),
            t = 'App.' + selected[0].data.id, 
            ref = me.getNavRefByClass(t);

        if (typeof me[ref] == 'undefined') {
            this.getCenter().el.mask('Loading...');
            Ext.Function.defer(function() {
                me[ref] = c.add(Ext.create(t));
                return c.setActiveTab(me[ref]);
            }, 100);
        } else {
            if (me[ref].isDestroyed) me[ref].render();
            return c.setActiveTab(me[ref]);
        }
        return false;
    },
    
    onTabActive: function (tab, eOpts) {
        var me = this,
            nav = me.getNavigation(),
            nodeId = me.getNodeIdByClass(tab.$className),
            sm = nav.getSelectionModel(),
            node = nav.store.getNodeById(nodeId);
        this.getApplication().fireEvent('centerpaneltabactive', tab,  eOpts);
        sm.select(node);
    },
    
    onTabRender: function (tab,  eOpts) {
        this.getApplication().fireEvent('centerpaneltabrender', tab,  eOpts);
        this.getCenter().el.unmask();
    },
    
    onTabShow: function (tab, eOpts) {
        this.getApplication().fireEvent('centerpaneltabshow', tab,  eOpts);
        this.getCenter().el.unmask();
    },
    
    onTabClose: function (tab, eOpts) {
        this.getApplication().fireEvent('centerpaneltabclose', tab, eOpts);
        delete this[this.getNavRefByClass(tab.$className)];
    },

    addNavItem: function (parentId, node) {
        var me = this,
            parent,
            addedItems = [];
        
        if (parentId == 'root' || parentId == null) {
            parent = me.getNavigation().store.getRootNode();
        }
        else {
            parent = me.getNavigation().store.getNodeById(parentId);
        }

        var firstChildNode = parent.findChildBy(function (n) {
            return n.hasChildNodes();
        });
        
        this.getApplication().fireEvent('beforenaviteminsert', parent, node);
        
        if (Ext.isArray(node)) {
            for (var i = 0; i < node.length; i++)
                addedItems.push(parent.insertBefore(node[i], firstChildNode));
        }
        else {
            addedItems.push(parent.insertBefore(node, firstChildNode));
        }
        
        this.getApplication().fireEvent('naviteminsert', parent, addedItems);

    },
    
    getNavRefByClass: function(cls) {
        return 'Nav_' + cls.replace(/\./g, '_');
    },
    
    getClassByNavRef: function(ref) {
        return ref.replace(/_/g, '.').replace('Nav.', '');
    },
    
    getNodeIdByClass: function(cls) {
        return cls.replace(/App\./g, '');
    }
    
    
});
