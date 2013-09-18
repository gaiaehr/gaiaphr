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
class CMS {

    public $c;

	function __construct(){
		$this->c = MatchaModel::setSenchaModel('App.model.admin.CMS');
	}

	public function getContent($params){
		return $this->c->load($params)->all();
	}

	public function updateContent($params){
		return $this->c->save($params);
	}

	public function parseBodyByApp($app = null, $body = ''){
		include_once($_SESSION['ROOT'].'/dataProvider/Appointments.php');
		$appointments = new Appointments();

		if(is_object($app)) $app = (array) $app;

		if(isset($app['id']) && $body != ''){
			setlocale(LC_ALL, 'es');
			$name = $app['fname'].' '.$app['mname'].' '.$app['lname'];
			$name = str_replace('  ', ' ', $name);
			$token = isset($app['token']) ? $app['token'] : md5(date(DATE_ATOM));
            $contact = $this->c->load(11)->one();
			$search = array(
				'[appointmentId]',
				'[appointmentDate]',
				'[patientName]',
				'[patientId]',
				'[bookName]',
				'[URL]',
				'[token]',
				'[contactInfo]'
			);

            $pid = isset($app['pid']) ? $app['pid'] : 'N/A';

			$replace = array(
				$app['id'],
				date('l, j F Y - g:i:s A, ', strtotime($app['startDate'])),
				$name,
                $pid,
				$appointments->getBookNameByAppointmentId($app['id']),
				$_SESSION['URL'],
				$token,
                $contact['body']
			);

			return str_replace($search, $replace, $body);
		}
		return $body;
	}

}
//print '<pre>';
//$c = new CMS();
//$c->getContent('');