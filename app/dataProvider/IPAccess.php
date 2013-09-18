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

class IPAccess {

    private $i;

	function __construct(){
		$this->i = MatchaModel::setSenchaModel('App.model.admin.IPAccess');
	}

	public function getIPs($params){
		return $this->i->load($params)->all();
	}

	public function getIP($params){
		return $this->i->load($params)->one();
	}

	public function addIP($params){
		return $this->i->save($params);
	}

	public function updateIP($params){
		return $this->i->save($params);
	}

}
//print '<pre>';
//$u = new Users();
//$u->getUsers('');