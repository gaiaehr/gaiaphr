<?php
/**
 * Created by IntelliJ IDEA.
 * User: ernesto
 * Date: 9/17/13
 * Time: 6:50 PM
 * To change this template use File | Settings | File Templates.
 */

class Authorization {

	/**
	 * @param $params
	 * @return array
	 */
	public function Login($params){

		$user = array(
			'id' => 1,
			'title' => 'Mr.',
			'namefirst' => 'FirstName',
			'namemiddle' => 'MiddleName',
			'namelast' => 'LastNameName',
			'token' => 'rtyhjkmnvcxswepkjhgfdfghjklvbnjkoiuy',
		);

		return array('success' => true, 'user' => $user);
	}

	/**
	 * @return array
	 */
	public function Logout(){

		return array('success' => true);
	}


}