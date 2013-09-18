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

class Logs {

	function __construct(){
		$this->l = MatchaModel::setSenchaModel('App.model.admin.Logs');
	}

	public function getLogs($params){
		return $this->l->load($params)->all();
	}

	public function recordLog($appId, $entry, $type = 'system'){
		$log = new stdClass();
		$log->appId = $appId;
		$log->userId = '1'; //TODO
		$log->logType = $type;
		$log->logDate = date('Y-m-d H:i:s');
		$log->logEntry = $entry;
		return $this->l->save($log);
	}
}
