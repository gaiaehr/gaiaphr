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

if (!isset($_SESSION)){
	session_name('PatientWebPortal');
	session_start();
	session_cache_limiter('private');
}

// session defaults
$_SESSION['lang'] = 'es';
$_SESSION['ROOT'] = str_replace('\\','/',dirname(dirname(__FILE__)));
$_SESSION['URL'] = 'http://'.$_SERVER['HTTP_HOST'].'/'.basename($_SESSION['ROOT']);

// set Puerto Rico Timezone
date_default_timezone_set('America/Puerto_Rico');
// include Matcha Lib
include_once($_SESSION['ROOT'].'/lib/Matcha/Matcha.php');
// set database connection
Matcha::connect(array(
	'host' => 'localhost',
	'name' => 'saluswebdb',
	'user' => 'saluswebdb',
	'pass' => 'pass',
	'app' => $_SESSION['ROOT'].'/app'
));
