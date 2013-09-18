<?php
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

$API = array(

    'Faculty' => array(
        'methods' => array(
            'getComboData' => array(
                'len' => 1
            )
        )
    ),
	/**
	 * Plugins methods
	 */
    'Referring' => array(
        'methods' => array(
            'getReferring' => array(
                'len' => 1
            ),
            'addReferring' => array(
                'len' => 1
            ),
            'updateReferring' => array(
                'len' => 1
            ),
            'deleteReferring' => array(
                'len' => 1
            )
        )
    ),
    /**
     * Plugins methods
     */
    'Insurance' => array(
        'methods' => array(
            'getInsurances' => array(
                'len' => 1
            ),
            'getInsurance' => array(
                'len' => 1
            ),
            'addInsurance' => array(
                'len' => 1
            ),
            'updateInsurance' => array(
                'len' => 1
            ),
	        'getComboData' => array(
		        'len' => 1
	        )
        )
    ),
    /**
     * Plugins methods
     */
    'Plugins' => array(
        'methods' => array(
            'getPlugins' => array(
                'len' => 1
            ),
            'addPlugin' => array(
                'len' => 1
            ),
            'updatePlugin' => array(
                'len' => 1
            ),
            'deletePlugin' => array(
                'len' => 1
            )
        )
    ),
    /**
     * Email methods
     */
    'Requests' => array(
        'methods' => array(
            'answerRequest' => array(
                'len' => 1
            )
        )
    ),
    /**
     * Email methods
     */
    'Email' => array(
        'methods' => array(
            'getTemplates' => array(
                'len' => 1
            ),
            'updateTemplates' => array(
                'len' => 1
            ),
            'processTestEmail' => array(
                'len' => 1
            ),
            'SendEmailByParams' => array(
                'len' => 1
            )
        )
    ),
    /**
     * Users methods
     */
    'Users' => array(
        'methods' => array(
            'getUsers' => array(
                'len' => 1
            ),
            'addUser' => array(
                'len' => 1
            ),
            'updateUser' => array(
                'len' => 1
            )
        )
    ),
    /**
     * Logs methods
     */
    'Logs' => array(
        'methods' => array(
            'getLogs' => array(
                'len' => 1
            )
        )
    ),
    /**
     * Logon methods
     */
    'Logon' => array(
        'methods' => array(
            'getAuthorization' => array(
                'len' => 1
            ),
            'setUnauthorized' => array(
                'len' => 0
            )
        )
    ),
	/**
	 * Patient methods
	 */
	'Patients' => array(
        'methods' => array(
            'getPatients' => array(
                'len' => 1
            ),
            'addPatient' => array(
                'len' => 1
            ),
            'updatePatient' => array(
                'len' => 1
            ),
            'getPatientClinical' => array(
                'len' => 1
            ),
            'addPatientClinical' => array(
                'len' => 1
            ),
            'updatePatientClinical' => array(
                'len' => 1
            ),
            'searchPatient' => array(
                'len' => 1
            )
        )
    ),
	/**
	 * Reports methods
	 */
    'Appointments' => array(
        'methods' => array(
	        // appointments
            'getAppointments' => array(
                'len' => 1
            ),
            'addAppointment' => array(
                'len' => 1
            ),
            'updateAppointment' => array(
                'len' => 1
            ),
            'deleteAppointment' => array(
                'len' => 1
            ),
	        // books
            'getBooks' => array(
                'len' => 1
            ),
            'addBook' => array(
                'len' => 1
            ),
            'updateBook' => array(
                'len' => 1
            ),
            'deleteBooks' => array(
                'len' => 1
            )
        )
    ),
	/**
	 * Consents methods
	 */
    'Consents' => array(
        'methods' => array(
	        // letters
            'getLetters' => array(
                'len' => 1
            ),
            'addLetter' => array(
                'len' => 1
            ),
            'updateLetter' => array(
                'len' => 1
            ),
			// signature
            'getSignatures' => array(
                'len' => 1
            ),
            'getSignature' => array(
                'len' => 1
            ),
            'addSignature' => array(
                'len' => 1
            )
        )
    ),
	/**
	 * CMS methods
	 */
    'CMS' => array(
        'methods' => array(
            'getContent' => array(
                'len' => 1
            ),
            'updateContent' => array(
                'len' => 1
            )
        )
    ),
	/**
	 * IPs methods
	 */
    'IPAccess' => array(
        'methods' => array(
            'getIPs' => array(
                'len' => 1
            ),
            'getIP' => array(
                'len' => 1
            ),
            'addIP' => array(
                'len' => 1
            ),
            'updateIP' => array(
                'len' => 1
            )
        )
    )
);
