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

if (!isset($_SESSION)) {
	session_name('PatientWebPortal');
	session_start();
	session_cache_limiter('private');
}
include_once('../data/MatchaHelper.php');
$d = MatchaModel::setSenchaModel('App.model.admin.Documents');
$errors = array();
function response($success = true, $message = 'OK'){
	$response = array(
		'success' => $success,
		'message' => $message
	);
	print json_encode($response);
}

if(isset($_FILES)){
	foreach($_FILES As $file){

		if ($file['error'] !== 0) {
			$errors [] = sprintf("Upload error '%d'", $file['error']);
		}else{
			$params = new stdClass();
			$params->pid = isset($_REQUEST['pid']) ? $_REQUEST['pid'] : '0';
			$params->recNum = isset($_REQUEST['recNum']) ? $_REQUEST['recNum'] : '0';
			$params->uploadedTime = date('Y-m-d H:i:s');
			$params->uploadedIp = $_SERVER['REMOTE_ADDR'];
			$params->document = base64_encode(file_get_contents($file['tmp_name']));
			$params->documentName = $file['name'];
			$params->documentExt = pathinfo($file['name'], PATHINFO_EXTENSION);
			$d->save($params);
		}
	}

	if(empty($errors)){
		response();
	}else{
		response(false, $errors);
	}

}


