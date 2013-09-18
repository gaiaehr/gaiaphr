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
class Appointments {

	/**
	 * @var bool|MatchaCUP
	 */
	public  $a;
	/**
	 * @var bool|MatchaCUP
	 */
    public $b;
	/**
	 * @var bool|MatchaCUP
	 */
    public $p;

	function __construct(){
		$this->a = MatchaModel::setSenchaModel('App.model.admin.Appointments');
		$this->b = MatchaModel::setSenchaModel('App.model.admin.AppointmentBooks');
		$this->p = MatchaModel::setSenchaModel('App.model.admin.PatientDemographics');
	}
	// appointments
	public function getAppointments($params){
		return $this->a->load($params)->all();
	}

	public function getAppointment($params){
		return $this->a->load($params)->one();
	}

	public function addAppointment($params){
		return $this->a->save($params);
	}

	public function updateAppointment($params){
		return $this->a->save($params);
	}

	public function deleteAppointment($params){
		return $this->a->destroy($params);
	}

	public function getAppointmentsByDays($days = '0'){
		include_once($_SESSION['ROOT'].'/lib/Matcha/plugins/Carbon/Carbon.php');
		$dt = Carbon::now();
		$dt->addDays($days);
		$params = new stdClass();
		$params->filter = array();
		$params->filter[0] = new stdClass();
		$params->filter[0]->property = 'startDate';
		$params->filter[0]->operator = '>=';
		$params->filter[0]->value = (string) $dt->startOfDay();
		$params->filter[1] = new stdClass();
		$params->filter[1]->property = 'startDate';
		$params->filter[1]->operator = '<=';
		$params->filter[1]->value = (string) $dt->endOfDay();
		$results = $this->a->load($params)->all();
		return $results['data'];
	}

	// books
	public function getBooks($params){
		return $this->b->load($params)->all();
	}

	public function addBook($params){
		return $this->b->save($params);
	}

	public function updateBook($params){
		return $this->b->save($params);
	}

	public function deleteBooks($params){
		return $this->b->destroy($params);
	}

	public function getBookNameByAppointmentId($id){
		$app = $this->a->load($id)->one();
		$book = $this->b->load($app['bookId'])->one();
		return $book['bookTitle'];
	}
}