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

if($_SERVER['REMOTE_ADDR'] == '127.0.0.1' || $_SERVER['REMOTE_ADDR'] == '::1' || $_SERVER['REMOTE_ADDR'] == '50.7.48.82'){
    include_once('../../data/MatchaHelper.php');
    include_once('../Email.php');
    $Email = new Email();
    $email = $Email->sendEmailByApp($_REQUEST, 'confirmation');

	if($email !== false){
        print json_encode(array('success'=>true, 'data'=>$_REQUEST));
    }else{
        print json_encode(array('success'=>false, 'data'=>$_REQUEST, 'error'=> (array) $Email->error));
    }
}
