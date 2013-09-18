<?php
/**
 * Created by IntelliJ IDEA.
 * User: ernesto
 * Date: 6/23/13
 * Time: 4:53 PM
 * To change this template use File | Settings | File Templates.
 */
include_once($_SESSION['ROOT'].'/dataProvider/plugins/Worker.php');
class TraWorker extends Worker{

    public static function WorkAppointment(array $data, $incoming){
        $map = array(
            // local    => foreign
            'bookNum'   => 'bookcode',
            'startDate' => 'entertime',
            'appNum'    => 'apnum',
            'endDate'   => 'elapsedtime',
            'status'    => 'apstatus',
            'notes'     => 'apnotes',
            'appAck'    => 'appack'
        );
        $mappedData = parent::mapper($data, $map, $incoming);

        if($incoming){
            $mappedData['startDate'] = parent::formatDate($mappedData['startDate'], true);
            $mappedData['endDate'] = parent::formatDate($mappedData['endDate'], true);
            $mappedData['status'] =  (bool) $mappedData['status'];
        }

        return $mappedData;
    }

    public static function WorkPatient(array $data, $incoming){
        $map = array(
            // local                => foreign
            'lname'                 => 'ptlastname',
            'fname'                 => 'ptfirstname',
            'mname'                 => 'ptinitname',
            'sex'                   => 'ptsex',
            'marital_status'        => 'ptcivilstatus',
            'spouse_lname'          => 'ptspouselastname',
	        'spouse_fname'          => 'ptspousefirstname',
	        'spouse_mname'          => 'ptspouseinit',
	        'mother_lname'          => 'ptmotherlastname',
	        'mother_fname'          => 'ptmotherfirstname',
	        'mother_mname'          => 'ptmotherinit',
	        'father_lname'          => 'ptfatherlastname',
	        'father_fname'          => 'ptfatherfirstname',
	        'father_mname'          => 'ptfatherinit',
            'dob'                   => 'ptbirthdate',
            'postal_address'        => 'ptpaddress1',
            'postal_address_cont'   => 'ptpaddress2',
            'postal_city'           => 'ptpcity',
            'postal_state'          => 'ptpstate',
            'postal_code'           => 'ptpzip',
            'address'               => 'ptraddress1',
            'address_cont'          => 'ptraddress2',
            'city'                  => 'ptrcity',
            'state'                 => 'ptrstate',
            'code'                  => 'ptrzip',
            'home_phone'            => 'pthomephone',
            'work_phone'            => 'ptworkphone',
            'work_phone_ext'        => 'ptworkext',
            'employer_name'         => 'ptworkplace',
            'occupation'            => 'ptworktitle',

            'custodian_lname'       => 'ptresplastname',
            'custodian_fname'       => 'ptrespfirstname',
            'custodian_mname'       => 'ptrespinit',
            'custodian_relation'    => 'ptresponsiblerelation',
	        'custodian_phone'       => 'ptrespphone',

        //    'pt_accnt_type',
        //    'pt_accnt_no',
        //    'pt_accnt_sufx',
        //    'pt_accnt_doctor',

            'referring'             => 'ptrefering',
	        'ethnicity'             => 'ptethnic',
            'religion'              => 'ptreligion',
            'birth_place'           => 'ptbirthplace',
            'authorized_fname'      => 'ptautlast1',
	        'authorized_mname'      => 'ptautfirst1',
	        'authorized_lname'      => 'ptautinit1',
	        'authorized_2_fname'    => 'ptautlast2',
	        'authorized_2_mname'    => 'ptautfirst2',
	        'authorized_2_lname'    => 'ptautinit2',
            'authorized_send_doc'   => 'ptautdocmsg',
            'authorized_send_pat'   => 'ptautpatmsg',
            'email'                 => 'ptemail' ,
            'cel_phone'             => 'ptcelphone',
            'language'              => 'ptlanguage',
            'race'                  => 'ptrace',
            'photoId'               => 'ptphotoid'
        );
        $mappedData = parent::mapper($data, $map, $incoming);
        if($incoming){
            // work record number
            $mappedData['recNum'] = $data['ptrectype'].'-'.$data['ptrecno'].'-'.$data['ptrecsuffx'];
            $mappedData['dob'] = parent::formatDate($data['ptbirthdate']);

	        $mappedData['authorized_send_doc'] =$data['ptautdocmsg'] == 'Y' ? '1' : '0';
	        $mappedData['authorized_send_pat'] =$data['ptautpatmsg'] == 'Y' ? '1' : '0';

        }else{
            // work record number
            $rec = explode('-', $data['recNum']);
            $mappedData['ptrectype']  = isset($rec[0]) ? $rec[0] : '';
            $mappedData['ptrecno']    = isset($rec[1]) ? $rec[1] : '';
            $mappedData['ptrecsuffx'] = isset($rec[2]) ? $rec[2] : '';

            $mappedData['ptautdocmsg'] = $mappedData['ptautdocmsg'] == '1' ? 'Y' : 'N';
            $mappedData['ptautpatmsg'] = $mappedData['ptautpatmsg'] == '1' ? 'Y' : 'N';
        }

        return $mappedData;
    }

    public static function WorkInsurance(array $data, $incoming){
        $map = array(
            'id'                    => 'id',
            'patFName'              => 'pifirstname',
            'patLName'              => 'pilastname',
            'patMName'              => 'piinitname',
            'orderId'               => 'piorden',
            'insType'               => 'pitype',
            'insCode'               => 'piinscode',
            'insGroup'              => 'pigroup',
            'insCover'              => 'picover',
            'insExpDate'            => 'piexpdate',
            'subscriberLName'       => 'pisubscriberlastname',
            'subscriberFName'       => 'pisubscriberfirstname',
            'subscriberMName'       => 'pisubscriberinit',
            'subscriberSex'         => 'pisex',
            'subscriberWorkPlace'   => 'piworkplace',
            'subscriberBirthDate'   => 'pibirthdate',
            'subscriberAddress'     => 'piaddress1',
            'subscriberAddressCont' => 'piaddress2',
            'subscriberCity'        => 'picity',
            'subscriberState'       => 'pistate',
            'subscriberZip'         => 'pizip',
            'subscriberRelation'    => 'pirelation',
            'subscriberId'          => 'piidsubscriber',
            'patientId'             => 'piidpatient',
            'insImage'              => 'piimage'

        );

        $mappedData = parent::mapper($data, $map, $incoming);
        if($incoming){
            $mappedData['recNum'] = $data['pipattype'].'-'.$data['pipatno'].'-'.$data['pipatsufx'];
            $mappedData['insExpDate'] = parent::formatDate($mappedData['insExpDate']);
            $mappedData['subscriberBirthDate'] = parent::formatDate($mappedData['subscriberBirthDate']);
        }else{
            $rec = explode('-', $data['recNum']);
            $mappedData['pipattype']  = isset($rec[0]) ? $rec[0] : '';
            $mappedData['pipatno']    = isset($rec[1]) ? $rec[1] : '';
            $mappedData['pipatsufx'] = isset($rec[2]) ? $rec[2] : '';
        }

        return $mappedData;
    }

    public static function WorkBook(array $data, $incoming){
        $map = array(
            // local    => foreign
            'id'        => 'bookcode',
            'bookId'    => 'bookcode',
            'bookTitle' => 'bookname',
            'bookDesc'  => 'docname'
        );
        return parent::mapper($data, $map, $incoming);
    }

    public static function WorkInsuranceCombo(array $data, $incoming){
        $map = array(
            // local    => foreign
            'optionValue'    => 'inscode',
            'optionTitle'    => 'insname',
        );
        return parent::mapper($data, $map, $incoming);
    }

    public static function WorkFacultyCombo(array $data, $incoming){
        $map = array(
            // local    => foreign
            'optionValue'    => 'faccode',
            'optionTitle'    => 'facfullname', // ya no llega asi!!!!!!!!????
        );
        return parent::mapper($data, $map, $incoming);
    }

	public static function WorkDocument($data){
		$rec = explode('-', $data['recNum']);
		$data['scanrectype']  = isset($rec[0]) ? $rec[0] : '';
		$data['scanrecno']    = isset($rec[1]) ? $rec[1] : '';
		$data['scanrecsufix'] = isset($rec[2]) ? $rec[2] : '';
		return $data;
	}
}