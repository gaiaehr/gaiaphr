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
class Referring {

	/**
	 * @var bool|MatchaCUP
	 */
	public  $r;

	function __construct(){
		$this->r = MatchaModel::setSenchaModel('App.model.admin.Referring');
	}
	// appointments
	public function getReferring($params){
		return $this->r->load($params)->all();
	}

	public function addReferring($params){
		return $this->r->save($params);
	}

	public function updateReferring($params){
		return $this->r->save($params);
	}

	public function deleteReferring($params){
		return $this->r->destroy($params);
	}
}