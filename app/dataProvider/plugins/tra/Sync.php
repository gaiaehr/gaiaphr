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
print '<pre>';
ini_set('display_errors',1);
ini_set('display_startup_errors',1);
error_reporting(-1);

include_once('../../../data/MatchaHelper.php');
include_once($_SESSION['ROOT'].'/dataProvider/plugins/tra/Sender.php');
include_once('Worker.php');

// only from local server...
if((isset($_SERVER['REMOTE_ADDR']) && ($_SERVER['REMOTE_ADDR'] == '127.0.0.1' || $_SERVER['REMOTE_ADDR'] == '::1'))){

//	print '<pre>';
    // this will be the data to be send to TRA
    $requestData = array();

    // standard filter
    $params = new stdClass();
    $params->filter = array();
    $params->filter[0] = new stdClass();
    $params->filter[0]->property = 'synced';
    $params->filter[0]->value = '0';

    // get appointments status
    $a = MatchaModel::setSenchaModel('App.model.admin.Appointments');
    $appointments = $a->load($params)->all();
    $requestData['appointments'] = array();
    if($appointments !== false){
//	    print_r($appointments);
        foreach($appointments['data'] As $app){
            $requestData['appointments'][] = TraWorker::WorkAppointment($app,false);
        }
    }

    // get patient data / demographics
    $p = MatchaModel::setSenchaModel('App.model.admin.PatientDemographics');
    $patients = $p->load($params)->all();
    $requestData['patients'] = array();
    if($patients !== false){
        foreach($patients['patients'] As $pat){
            $requestData['patients'][] = TraWorker::WorkPatient($pat,false);
        }
    }

    // get insurance
    $i = MatchaModel::setSenchaModel('App.model.admin.PatientInsurance');
    $insurances = $i->load($params)->all();
    $requestData['insurance'] = array();
    if($patients !== false){
        foreach($insurances['data'] As $ins){
            $requestData['insurance'][] = TraWorker::WorkInsurance($ins,false);
        }
    }

    // get clinical
//    $c = MatchaModel::setSenchaModel('App.model.admin.PatientClinical');


    // get documents
    $d = MatchaModel::setSenchaModel('App.model.admin.Documents');
	$documents = $d->load($params)->all();
	$requestData['documents'] = array();
	if($documents !== false){
		foreach($documents['data'] As $doc){
			$requestData['documents'][] = (array) TraWorker::WorkDocument($doc);
		}
	}

	// get legal signatures
	$s = MatchaModel::setSenchaModel('App.model.admin.ConsentSignatures');
	$l = MatchaModel::setSenchaModel('App.model.admin.ConsentLetters');
	$signatures = $s->load($params)->all();
	$requestData['signatures'] = array();
	if($documents !== false){
		include_once($_SESSION['ROOT'].'/dataProvider/PDF.php');
		foreach($signatures As $sig){

			$sig['letter'] = $l->load(
				array(
					'revision' => $sig['letterRevision'],
					'type' => $sig['letterType']
				)
			)->one();

			$patient = $p->load($sig['pid'])->one();
			$sig['recnum'] = $patient['recNum'];
			$rec = explode('-', $sig['recNum']);
			$sig['recnumtype']  = isset($rec[0]) ? $rec[0] : '';
			$sig['recnumno']    = isset($rec[1]) ? $rec[1] : '';
			$sig['recnumsuffx'] = isset($rec[2]) ? $rec[2] : '';

            $sig['title']  = $sig['letter']['title'];

			$html = "<h1>{$sig['letter']['title']}</h1>";
			$html .= "{$sig['letter']['body']}";
			if($sig['letter']['language'] == 'es'){
				$signedDate = date('Y/m/d g:ia', strtotime($sig['signedDate']));
				$html .= "<p style='font-weight:bold'>Firmado electronicamente por {$patient['fname']} {$patient['mname']} {$patient['lname']}<br>";
				$html .= "El {$signedDate} desde PC {$sig['signedHostName']} - IP {$sig['signedIp']} | {$sig['letterRevision']} | Ref.# {$sig['id']}</p>";
			}else{
				$signedDate = date('Y/m/d g:ia', strtotime($sig['signedDate']));
				$html .= "<p style='font-weight:bold'>Electronically signed by {$patient['fname']} {$patient['mname']} {$patient['lname']}<br>";
				$html .= "On {$signedDate} From PC {$sig['signedHostName']} - IP {$sig['signedIp']} | {$sig['letterRevision']} | Ref.# {$sig['id']}</p>";
			}
//			print_r($sig['letter']);
			unset($sig['letter']);
			$pdf = new PDF($html, 'temp.pdf');
			$sig['pdf'] = $pdf->output;
			$requestData['signatures'][] = $sig;
		}
	}


//	print_r('<pre>');
//	print_r($requestData);
//
//    exit;

    $sender = new TraSender();
    $response = $sender->Request('setSync', $requestData);

    if(is_string($response)){
        $response = json_decode($response, true);
	    print_r($response);
        foreach($response['results'] AS $table => $result){
            if(!empty($result['successes'])){
                foreach($result['successes'] AS $success){
                    // update patient table
                    if($table == 'patients'){
	                    $foo = TraWorker::WorkPatient($success, true);
	                    $a->sql("UPDATE `patients` SET `synced` = '1' WHERE `recNum` = '{$foo['recNum']}'");
	                    $a->exec();
                    // update patient table
                    }elseif($table == 'insurance'){
	                    $foo = TraWorker::WorkInsurance($success, true);
	                    $i->sql("UPDATE `patient_insurances` SET `synced` = '1', `orderId` = '{$foo['orderId']}' WHERE `id` = '{$foo['id']}'");
	                    $i->exec();
                    // update patient table
                    }elseif($table == 'appointments'){
	                    $foo = TraWorker::WorkAppointment($success, true);
	                    $a->sql("UPDATE `appointments` SET `synced` = '1' WHERE `appNum` = '{$foo['appNum']}'");
	                    $a->exec();
                    // update patient table
                    }elseif($table == 'documents'){
	                    $d->sql("UPDATE `patient_documents` SET `synced` = '1' WHERE `id` = '{$success['id']}'");
	                    $d->exec();
                    // update patient table
                    }elseif($table == 'signatures'){
	                    $s->sql("UPDATE `consent_signatures` SET `synced` = '1' WHERE `id` = '{$success['id']}'");
	                    $s->exec();
                    }
                }

            }
        }
    }
}