Ext.define('App.store.Panels', {
    alias: 'store.Panels',
    extend: 'Ext.data.TreeStore',
    requires: ['App.model.Panels'],

    config: {
        model: 'App.model.Panels',
        root: {
            text: 'Home',
            items: [
                {
                    text: 'Paciente',
                    view:'demographics',
                    leaf: true

                },
                {
                    text: 'Historial Medico',
                    view:'medicalhistory',
                    leaf: true

                },
                {
                    text: 'Consentimiento',
                    view:'commitments',
                    leaf: true

                },
                {
                    text: 'Compromiso',
                    view:'consents',
                    leaf: true

                }
            ]
        },
        defaultRootProperty: 'items'
    }
});
