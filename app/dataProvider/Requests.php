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

include_once('../data/MatchaHelper.php');
include_once('../dataProvider/CMS.php');
include_once('../dataProvider/Appointments.php');
include_once('../lib/Matcha/plugins/Carbon/Carbon.php');

class Requests {

	/**
	 * @var bool|MatchaCUP
	 */
	private $c;
	/**
	 * @var int
	 */
	private $timePrior = 24;

	function __construct(){
		$this->c = MatchaModel::setSenchaModel('App.model.admin.Confirmations');
	}

	/**
	 * @param $appId
	 * @param $token
	 * @return bool|MatchaCUP
	 */
	public function getRequest($appId, $token){
		// start request
		$request = new stdClass();
		$request->filter = array();

		$request->filter[0] = new stdClass();
		$request->filter[0]->property = 'appId';
		$request->filter[0]->value = $appId;

		$request->filter[1] = new stdClass();
		$request->filter[1]->property = 'token';
		$request->filter[1]->value = $token;

		return $this->c->load($request)->one();
	}

	public function updateRequest($params){
		return $this->c->save($params);
	}

	/**
	 * @param $params
	 * $params->appId appointment ID
	 * $params->token security token
	 * $params->action confirm | cancel
	 * $params->lang es | en
	 * @return mixed
	 */
	public function answerRequest($params){

		// get the appointment status value based on $params->action
		// return error if action is not confirm | cancel
		if($params->action == 'confirm'){
			$status = '3';
			$cmsType = 'confirmed';

		}elseif($params->action == 'cancel'){
			$status = '4';
			$cmsType = 'cancelled';
		}else{
			return array('success' => false, 'error'=>'error_request_invalid_status', 'msg' => $this->getMsg(null, 'error'));
		}

		// get request info
		$request = $this->getRequest($params->app, $params->token);

		// if request is false... return error
		if(!$request) return array('success' => false, 'error'=>'error_request_not_found', 'msg' => $this->getMsg(null, 'error'));

		// get appointment data
		$appointments = new Appointments();
		$app = $appointments->getAppointment($params->app);

		// if appointment data not found return error
		if(!$app) return array('success' => false, 'error'=>'error_appointment_not_found', 'msg' => $this->getMsg(null, 'error'));

		// if answered return error
		if($request['answered'] === '1') return array('success' => false, 'error'=>'error_request_answered', 'msg' => $this->getMsg($app, 'app_error'));

		// if status is same
		if($app['status'] === $status) return array('success' => false, 'error'=>'error_request_same_status', 'msg' => $this->getMsg($app, 'app_error'));

		// if less than 24 hour
		$now = New Carbon('America/Puerto_Rico');
		$appDate = New Carbon($app['startDate']);
		$now->addHours($this->timePrior);
		if($now->timestamp >= $appDate->timestamp) return array('success' => false, 'error'=>'error_request_less_than', 'msg' => $this->getMsg($app, 'app_error'));

		// everything looks OK!
		$app['status'] = $status;
		$app = $appointments->updateAppointment((object)$app);

		if(!$app['data']) return array('success' => false, 'error'=>'error_app_data_update', 'msg' => $this->getMsg($app, 'app_error'));

		// update request
		$request['answered'] = 1;
		$request['answerStamp'] = date('Y-m-d H:i:s');
		$this->updateRequest((object)$request);

		return array('success' => true, 'app' => $app['data'], 'msg' => $this->getMsg($app, $cmsType)) ;
	}

	private function getMsg($app = null, $type = 'error', $lang = 'es'){
		$cms = new CMS();
		$msg = $cms->c->load(array('type'=>$type,'language'=>$lang))->one();
		return $cms->parseBodyByApp($app, $msg['body']);
	}

}

//print '<pre>';
//$e = new Requests();
//$params = new stdClass();
//$params->app = 1;
//$params->token = 'f6fa6af8ac6b11d15ad9139b8c37a0ec';
//$params->action = 'cancel';
//print_r($e->answerRequest($params));
