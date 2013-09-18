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

$appointmentTraMappings = array(
    // local    => foreign
    'bookNum'   => 'book_code',
    'startDate' => 'Enter_time',
    'appNum'    => 'Ap_num',
    'endDate'   => 'Elapsed_time',
    'status'    => 'ap_status',
    'notes'     => 'ap_Notes',
    'appAck'    => 'app_ack'
);
$booksTraMappings = array(
    // local    => foreign
    'id'        => 'Book_Code',
    'bookId'    => 'Book_Code',
    'bookTitle' => 'Book_name',
    'bookDesc'  => 'Doc_name'
);
$referralsTraMappings = array(
    // local    => foreign
    'id'        => 'fac_code',
    'refNum'    => 'fac_code'
);
$patientTraMappings = array(
    // local                    => foreign

//    'pt_rec_type',
//    'pt_rec_no',
//    'pt_rec_suffx',
    'lname'                     => 'pt_last_name',
    'fname'                     => 'pt_first_name',
    'mname'                     => 'pt_init_name',
//    'pt_soc_sec', ?????????
    'ss'                        => 'pt_soc_sec_sufx',
    'sex'                       => 'pt_sex',
    'marital_status'            => 'pt_civil_status',
//    'pt_spouse_last_name',
//    'pt_spouse_first_name',
//    'pt_spouse_init',
//    'pt_mother_last_name',
//    'pt_mother_first_name',
//    'pt_mother_init',
//    'pt_father_last_name',
//    'pt_father_first_name',
//    'pt_father_init',
    'dob'                   => 'pt_birth_date',
    // no
//    'pt_enter_date',
//    'pt_billing_date',
//    'pt_billing_status',
    'postal_address'        => 'pt_p_address_1',
    'postal_address_cont'   => 'pt_p_address_2',
    'postal_city'           => 'pt_p_city',
    'postal_state'          => 'pt_p_state',
    'postal_code'           => 'pt_p_zip',
    'address'               => 'pt_r_address_1',
    'address_cont'          => 'pt_r_address_2',
    'city'                  => 'pt_r_city',
    'state'                 => 'pt_r_state',
    'code'                  => 'pt_r_zip',
    'home_phone'            => 'pt_home_phone',
    'work_phone'            => 'pt_work_phone',
//    'pt_work_ext',
//    'pt_work_place',
//    'pt_work_title',

//    'pt_resp_phone',
//    'pt_resp_last_name',
//    'pt_resp_first_name',
//    'pt_resp_init',
//    'pt_responsible_relation',


//    'pt_accnt_type',
//    'pt_accnt_no',
//    'pt_accnt_sufx',
//    'pt_refering',
//    'pt_accnt_doctor',
    'religion'                  => 'pt_religion',
//    'pt_birth_place',
//    'pt_weight',
//
//    'pt_aut_last_1',
//    'pt_aut_first_1',
//    'pt_aut_init_1',
//    'pt_aut_last_2',
//    'pt_aut_first_2',
//    'pt_aut_init_2',

//    'pt_aut_doc_msg',
//    'pt_aut_pat_msg',

    'email'                     => 'pt_email' ,
    'cel_phone'                 => 'pt_cel_phone',

//    'pt_ethnic',
    'language'                  => 'pt_language',
    'race'                      => 'pt_race',
//    'pt_celsup',
//    'pt_emr_mrn',
);


$insuranceTraMappings = array(
    'order'                 => 'pi_orden',
    'type'                  => 'pi_type',
	'code'                  => 'pi_ins_code',
    'group'                 => 'pi_group',
    'cover'                 => 'pi_cover',
    'expDate'               => 'pi_exp_date',
    'subscriberLName'       => 'pi_subscriber_last_name',
    'subscriberFName'       => 'pi_subscriber_first_name',
    'subscriberMName'       => 'pi_subscriber_init',
	'subscriberSex'         => 'pi_sex',
	'subscriberSocSec'      => 'pi_soc_sec',
	'subscriberSocSecSuffix'=> 'pi_soc_sec_sufx',
	'subscriberWorkPlace'   => 'pi_work_place',
	'subscriberBirthDate'   => 'pi_birth_date',
	'subscriberAddress'     => 'pi_address_1',
	'subscriberAddressCont' => 'pi_address_2',
	'subscriberCity'        => 'pi_city',
	'subscriberState'       => 'pi_state',
	'subscriberZip'         => 'pi_zip',
    'subscriberRelation'    => 'pi_relation',
	'subscriberId'          => 'pi_id_subscriber',
	'patientId'             => 'pi_id_patient',

//  ????
//  'lastName'      => 'pi_last_name',
//  'firstName'     => 'pi_first_name',
//  'middleName'    => 'pi_init_name',
//	'accDate'       => 'pi_acc_date',
//	'condAcc'       => 'pi_cond_acc',
//	'coverDesc'     => 'pi_cover_desc',
//	'notes'         => 'pi_notes'
);
