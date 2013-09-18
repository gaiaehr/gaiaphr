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

include_once($_SESSION['ROOT'].'/data/MatchaHelper.php');
class Patients {

	/**
	 * @var MatchaCUP
	 */
	public $p;

	function __construct(){
		$this->p = MatchaModel::setSenchaModel('App.model.admin.PatientDemographics');
		$this->c = MatchaModel::setSenchaModel('App.model.admin.PatientClinical');
	}

	public function getPatients($params){
        return $this->p->load($params)->all();
	}

	public function getPatient($params){
        return $this->p->load($params)->one();
	}

	public function addPatient($params){
		return $this->p->save($params);
	}

	public function updatePatient($params){
        $patient = $this->p->save($params);
//        include_once($_SESSION['ROOT'].'/dataProvider/plugins/tra/Sender.php');
//        $t = new TraSender('tra');
//        $t->SendPatientData($patient['patients']);
		return $patient;
	}

	public function searchPatient($params){
		// if Sphinx is used
		$useSphinx = false;

		if($useSphinx){
			require ('../lib/Sphinx/sphinxapi.php');
			$cl = new SphinxClient ();
			$cl->SetServer('localhost');
			$cl->SetConnectTimeout(3);
			if(isset($params->start) && isset($params->limit)){
				$cl->SetLimits($params->start, $params->limit, 1000);
			}
			$cl->SetArrayResult(true);
			$result = $cl->Query($params->query);
		}

		if (!$useSphinx || ($result !== false || $cl->GetLastWarning())){
            return $this->p->sql("
			    SELECT *
			      FROM `patients`
			     WHERE `recNum`      LIKE '$params->query%'
			        OR `fname`       LIKE '$params->query%'
			        OR `lname`       LIKE '$params->query%'
			        OR `ss`          LIKE '$params->query%'
			        OR `home_phone`  LIKE '$params->query%'
			        OR `cel_phone`   LIKE '$params->query%'
			        OR `work_phone`  LIKE '$params->query%'
			")->all();
		}else{
			$result['patients'] = $result['matches'];
			unset($result['matches']);
            return $result;
		}
	}


	public function getPatientClinical($params){
		return $this->c->load($params)->all();
	}
	public function addPatientClinical($params){
		return $this->c->save($params);
	}
	public function updatePatientClinical($params){
		return $this->c->save($params);
	}
}

//
//$p = new Patients();
//print '<pre>';
//$q = new stdClass();
//$q->query = 'Rodri';
//print_r($p->searchPatient($q));