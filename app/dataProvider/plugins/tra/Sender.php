<?php
/**
 * Created by IntelliJ IDEA.
 * User: ernesto
 * Date: 6/23/13
 * Time: 4:53 PM
 * To change this template use File | Settings | File Templates.
 */
if (!isset($_SESSION)){
    session_name('PatientWebPortal');
    session_start();
    session_cache_limiter('private');
}
include_once($_SESSION['ROOT'].'/data/MatchaHelper.php');
include_once($_SESSION['ROOT'].'/dataProvider/plugins/Sender.php');
include_once('Worker.php');
class TraSender extends Sender{

    function __construct(){
        parent::__construct('tra');
    }

    function SendPatientByPid($pid){
        include_once($_SESSION['ROOT'].'/dataProvider/Patients.php');
        $p = new Patients();
        $params = new stdClass();
        $params->filter = array();
        $params->filter[0] = new stdClass();
        $params->filter[0]->property = 'id';
        $params->filter[0]->value = $pid;
        $data = $p->getPatient($params)['patients'];
        $this->Request('setPatientData',TraWorker::WorkPatient($data, false));
    }

    function SendPatientData($data){
        $this->Request('setPatientData',TraWorker::WorkPatient($data, false));
    }

    function SendInsuranceData($data){
//        print_r($data);
        $this->Request('setInsuranceData',TraWorker::WorkInsurance($data, false));
    }
}
//$t = new TraSender('tra');
//$t->SendPatientByPid('20');
