/**
 * Created with IntelliJ IDEA.
 * User: ernesto
 * Date: 5/21/13
 * Time: 9:47 AM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('App.model.calendar.PatientSearch', {
    extend: 'App.model.admin.PatientDemographics',

    proxy:{
        type:'direct',
        api:{
            read:Patients.searchPatient
        },
        reader:{
            root:'patients'
        }
    }
});