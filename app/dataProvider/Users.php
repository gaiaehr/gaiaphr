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

class Users {

    private $u;

	function __construct(){
		$this->u = MatchaModel::setSenchaModel('App.model.admin.Users');
	}

	public function getUsers($params){
		return $this->u->load($params)->all();
	}

	public function addUser($params){
		return $this->u->save($params);
	}

	public function updateUser($params){
		return $this->u->save($params);
	}

}
//print '<pre>';
//$u = new Users();
//$u->getUsers('');