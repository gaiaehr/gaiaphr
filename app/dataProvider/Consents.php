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
class Consents {

	/**
	 * @var MatchaCUP
	 */
	private $c;
	/**
	 * @var MatchaCUP
	 */
	private $s;

	function __construct(){
		$this->c = MatchaModel::setSenchaModel('App.model.admin.ConsentLetters');
		$this->s = MatchaModel::setSenchaModel('App.model.admin.ConsentSignatures');
	}

	/**
	 * @param $params
	 * @return array
	 */
	public function getLetters($params){
//        print_r($params);
		return $this->c->load($params)->all();
	}

	/**
	 * @param $params
	 * @return array
	 */
	public function addLetter($params){
		return $this->c->save($params);
	}

	/**
	 * @param $params
	 * @return array
	 */
	public function updateLetter($params){
		return $this->c->save($params);
	}

	/**
	 * @param $params
	 * @return array
	 */
	public function getSignatures($params){
		return $this->s->load($params)->all();
	}

	/**
	 * @param $params
	 * @return array
	 */
	public function getSignature($params){
		return $this->s->load($params)->one();
	}

	/**
	 * @param $params
	 * @return array
	 */
	public function addSignature($params){
		if(is_array($params)){
			foreach($params as $param){
				$param->signedDate =  date('Y-m-d H:i:s');
				$param->signedIp = $_SERVER['REMOTE_ADDR'];
				$param->signedHostName =  gethostname();
				$param->signedUserName = $_SERVER['REMOTE_USER'];

			}
		}else{
			$params->signedDate =  date('Y-m-d H:i:s');
			$params->signedIp = $_SERVER['REMOTE_ADDR'];
			$params->signedHostName =  gethostname();
		}

		return $this->s->save($params);
	}


}

//
//$C = new Consents();
//print '<pre>';
//$params = new stdClass();
//
//$params->filter = array();
//
//$filter = new stdClass();
//$filter->property = 'active';
//$filter->value = '1';
//$params->filter[] = $filter;
//
//$filter = new stdClass();
//$filter->property = 'language';
//$filter->value = 'es';
//$params->filter[] = $filter;
//
//$params->limit = 25;
//$params->page = 1;
//$params->start = 0;
//
//$params->sort = array();
//$filter = new stdClass();
//$filter->direction = 'ASC';
//$filter->property = 'type';
//$params->sort[] = $filter;
//
//
//print_r($C->getLetters($params));