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

error_reporting(1);

if (!isset($_SESSION)) {
    session_name('PatientWebPortal');
    session_start();
    session_cache_limiter('private');
}
include_once('../data/MatchaHelper.php');
include_once('Plugins.php');
$p = new Plugins();
$keys = $p->getAllActiveKeys();
$method  = $_SERVER['REQUEST_METHOD'];
$headers = getallheaders();
$request = explode("/", substr(@$_SERVER['PATH_INFO'], 1));

$actions = array(
    'syncData',
	'syncApps'
);
//print '<pre>';
//print_r($headers);


if (!isset($headers['Secret-Key']) ||
	(isset($headers['Secret-Key']) && !in_array($headers['Secret-Key'], $keys))){
    // send secretKey error
    $return = array(
        'success' => false,
        'error' => 'Access denied'
    );
} elseif (!isset($headers['Action'])) {
    // send no action error
    $return = array(
        'success' => false,
        'error' => 'No action provided '
    );
} elseif (isset($headers['Action']) && !in_array($headers['Action'], $actions)) {
    // send invalid action error
    $return = array(
        'success' => false,
        'error' => 'Action not defined as GET or POST action',
        'header' => $headers
    );
} else {
    $return = array();
    // VALID REQUEST
    // include stuff
    include_once('../data/MatchaHelper.php');
    include_once('Mappings.php');
    include_once('Email.php');
    include_once('plugins/tra/Worker.php');
    if ($method == 'POST') {
        // get post data request
        $request = json_decode(file_get_contents("php://input"), true);
	    include_once('Appointments.php');
	    include_once('Insurance.php');
	    include_once('Faculty.php');
		// define the returns
	    $return['success'] = true;
	    $return['successes'] = array();
	    $return['failures'] = array();

	    switch ($headers['Action']) {
	        case 'syncData':
		        $a = new Appointments();
		        $f = new Faculty();
		        $i = new Insurance();
                // handle books
                foreach($request['books'] As $row){
                    $foo = TraWorker::WorkBook($row, true);
                    if($a->b->load($foo['id'])->one() === false) unset($foo['id']);
                    $foo = (array)$a->b->save((object)$foo)['books'];
                }
		        // handle insurance combo
                foreach($request['insuranceCombo'] As $row){
                    $foo = TraWorker::WorkInsuranceCombo($row, true);
                      $exist = $i->c->load(array('optionValue' => $foo['optionValue']))->one();
                    if($exist !== false){
                        $foo['id'] = $exist['id'];
                        $insCombo = $i->c->save((object)$foo);
                    }else{
                        $insCombo = $i->c->save((object)$foo);
                    }
                }
		        // handle referring combo
                foreach($request['facultyCombo'] As $row){
                    $foo = TraWorker::WorkFacultyCombo($row, true);
                      $exist = $f->f->load(array('optionValue' => $foo['optionValue']))->one();
                    if($exist !== false){
                        $foo['id'] = $exist['id'];
                        $insCombo = $f->f->save((object)$foo);
                    }else{
                        $insCombo = $f->f->save((object)$foo);
                    }
                }
				break;
            // *********************
            case 'syncApps':
                $a = new Appointments();
                $i = new Insurance();
                // handle each appointment
                foreach($request['appointments'] As $row){
                    $app =  TraWorker::WorkAppointment($row, true);
                    $patient =  TraWorker::WorkPatient($row['DAT2000'], true);
                    $exist = $a->p->load(array('recNum'=>$patient['recNum']))->one();

                    if($exist === false){
                        // new patient
	                    $patient = (array) $a->p->save((object)$patient);
                    }else{
                        // patient exist
                        $patient['id'] = $exist['id'];
                        $patient = (array) $a->p->save((object)$patient);
                    }
                    $patient = $patient['patients'];
                    $app['pid']         = $patient['id'];
                    $app['recNum']      = $patient['recNum'];
                    $app['fname']       = $patient['fname'];
                    $app['mname']       = $patient['mname'];
                    $app['lname']       = $patient['lname'];
                    $app['dob']         = $patient['dob'];
                    $app['email']       = $patient['email'];
                    $app['phone']       = $patient['cel_phone'];
                    $app['phoneType']   = 'cel';
	                $app['status']      = '0';
	                $app['synced']      = '1';

                    // handle insurances
                    foreach($row['DAT8000'] As $ins){
                        $ins =  TraWorker::WorkInsurance($ins, true);
                        $ins['pid'] = $app['pid'];
                        $oldIns = $i->i->load(array('recNum' => $ins['recNum'], 'orderId' => $ins['orderId']))->one();
                        if($oldIns === false){
                            $ins = (array) $i->addInsurance((object)$ins);
                        }else{
                            $ins['id'] = $oldIns['id'];
                            $ins = $i->updateInsurance((object)$ins);
                        }
                    }
	                // add the appointment and send email
                    $app = $a->addAppointment((object)$app)['data'];
	                $e = new Email();
	                // return success or failures appointment
                    if($e->sendEmailByApp($app, 'welcome') !== false){
                        $return['successes'][] = $app['appNum'];
                    }else{
                        $return['failures'][] = $app['appNum'];
                    }
                }
                break;
            // *********************
            default:
                // TODO: Action valid but no case found error
                $return = array(
                    'success' => true,
                    'request' => $request,
                    'headers' => $headers
                );
                break;
        }
    } elseif ($method == 'GET') {
        // get request
        $request = current(explode("/", substr(@$_SERVER['PATH_INFO'], 1)));
        $return = array(
            'success' => true,
            'request' => $request,
            'headers' => $headers
        );
    } else {
        // Handle invalid request
        $return = array(
            'success' => false,
            'error' => 'Invalid Method'
        );
    }
}
//print '<pre>';
//print_r($request);
print json_encode($return);