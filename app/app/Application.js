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

Ext.define('App.Application', {

    extend: 'Ext.app.Application',

    views: [
        'AdminArea',
        'PatientArea',
        'Request',
        'Viewport',
        'admin.Administrative',
        'admin.AppointmentBooks',
        'admin.AppointmentCalendar',
        'admin.CMS',
        'admin.CMSDetails',
        'admin.ConsentLetterDetails',
        'admin.ConsentLetters',
        'admin.EmailTemplates',
        'admin.IPAccess',
        'admin.Logs',
        'admin.NewAppointmentWindow',
        'admin.Plugins',
        'admin.Reports',
        'admin.Users',
        'fields.AppointmentBooks',
        'fields.DateTime',
        'fields.PatientSearch',
        'logon.AdminForm',
        'logon.PatientForm',
        'logon.Window',
        'patient.Calendar',
        'patient.ConsentLetters',
        'patient.Demographics',
        'patient.InformacionMedica',
        'patient.Insurance',
        'patient.InsuranceCard',
        'patient.ThankYou',
        'ux.ActivityMonitor',
        'ux.InsuranceCombo',
        'ux.NavigationTabs',
        'ux.RelationsCombo',
        'ux.SexCombo',
        'ux.StateCombo',
        'ux.WebCamWindow'
    ],

    controllers: [
        'Abstract',
        'Admin',
        'Calendar',
        'Forms',
        'Main',
        'Navigation',
        'Patient',
        'Plugins',
        'WebCam'
    ],

    stores: [
        'admin.AppointmentBooks',
        'admin.Appointments',
        'admin.CMS',
        'admin.ConsentLetters',
        'admin.ConsentSignatures',
        'admin.IPAccess',
        'admin.Logs',
        'admin.PatientClinical',
        'admin.PatientDemographics',
        'admin.PatientInsurance',
        'admin.Templates',
        'admin.Users',
        'calendar.PatientSearch',
        'WebCamCameras'
    ],

    models:[
        'admin.AppointmentBooks',
        'admin.Appointments',
        'admin.Batches',
        'admin.CMS',
        'admin.Confirmations',
        'admin.ConsentLetters',
        'admin.ConsentSignatures',
        'admin.FacultyCombo',
        'admin.GeoIps',
        'admin.InsuranceCombo',
        'admin.IPAccess',
        'admin.Logs',
        'admin.PatientClinical',
        'admin.PatientDemographics',
        'admin.PatientInsurance',
        'admin.Referring',
        'admin.Sessions',
        'admin.Templates',
        'admin.Users',
        'calendar.PatientSearch'
    ]
	
});
