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

if(!isset($_SESSION))
{
	session_name('PatientWebPortal');
	session_start();
	session_cache_limiter('private');
}
include_once('../data/MatchaHelper.php');
include_once('../lib/Matcha/plugins/Carbon/Carbon.php');

class Logon
{
	/**
	 * @var bool|MatchaCUP
	 */
	private $u = null;
	/**
	 * @var bool|MatchaCUP
	 */
	private $a = null;
	/**
	 * @var bool|MatchaCUP
	 */
	private $p = null;
    /**
     * @var bool|MatchaCUP
     */
    private $s;
    /**
     * @var bool|MatchaCUP
     */
    private $g;
    /**
     * @var bool|MatchaCUP
     */
    private $i;
	/**
	 * @var bool
	 */
	private $isAdmin;
	/**
	 * @var array
	 */
	private $allowCountries = array(
		'PR',   // Puerto Rico
		'PRI',  // Puerto Rico
		'DO',   // Dominican Republic
		'DOM',  // Dominican Republic
		'US',   // Unite States
		'USA'   // Unite States
	);

    /**
     * ip = will check failures in the past 15 min by IP Address...
     * sessionId = will check failures by Session ID...
     * @var string ip | sid
     */
    private $control = 'sid';
    /**
     * @var int max login failures allowed
     */
    private $maxFailures = 5;
    /**
     * @var int
     */
    private $pastMinutes = 15;

    private $autoIpBanned = true;

    function __construct()
    {
        $this->s = MatchaModel::setSenchaModel('App.model.admin.Sessions');
        $this->g = MatchaModel::setSenchaModel('App.model.admin.GeoIps');
        $this->i = MatchaModel::setSenchaModel('App.model.admin.IPAccess');
    }

	private function setUserModel()
    {
		if($this->u == null) $this->u = MatchaModel::setSenchaModel('App.model.admin.Users');
	}

	private function setAppointmentModel()
    {
		if($this->a == null) $this->a = MatchaModel::setSenchaModel('App.model.admin.Appointments');
	}

	private function setPatientModel()
    {
		if($this->p == null) $this->p = MatchaModel::setSenchaModel('App.model.admin.PatientDemographics');
	}

	/**
	 * @param $params
	 * @return array
	 */
	public function getAuthorization($params)
    {

        /**
         * handy var to store the IP
         */
        $ip = $_SERVER['REMOTE_ADDR'];

        $sParams = new stdClass();
        $sParams->filter = array();
        $sParams->filter[] = new stdClass();
        $sParams->filter[0]->property = 'success';
        $sParams->filter[0]->operator = '=';
        $sParams->filter[0]->value = '0';
        $sParams->filter[] = new stdClass();
        $sParams->filter[1]->property = $this->control == 'ip' ? 'ip' : 'sid';
        $sParams->filter[1]->operator = '=';
        $sParams->filter[1]->value = $this->control == 'ip' ? $ip : session_id();
        $sParams->filter[] = new stdClass();
        $sParams->filter[2]->property = 'sDate';
        $sParams->filter[2]->operator = '>=';
        $sParams->filter[2]->value = (string) Carbon::now()->subMinutes($this->pastMinutes);
        $sParams->sort = array();
        $sParams->sort[] = new stdClass();
        $sParams->sort[0]->property = 'sDate';
        $sParams->sort[0]->direction = 'DESC';

        $sessions = $this->s->load($sParams)->limit(null, $this->maxFailures);
        $attempts = count($sessions);

        if($attempts >= $this->maxFailures)
        {
            return array(
                'success'=>false,
                'destroy'=>false,
                'error'=>'max_login_attempts_x_attempts_of_x_available_wait_x_minutes',
                'data' => array(
                    $attempts,
                    $this->maxFailures,
                    $this->pastMinutes
                )
            );
        }

        // ADMIN LOGIC
		if(isset($params->isAdmin) && $params->isAdmin)
        {
			// set isAdmin
			$this->isAdmin = true;
			// check if remote address (client) is now allow to log as admin return error
			if(!in_array($ip, $this->allowAdmin, true))
            {
				return array(
					'success'=>false,
					'destroy'=>true,
					'error'=>'your_ip_x_admin_error',
                    'data'=>array(
                        $ip
                    )
				);
			}

			// admin log logic
			$params->username = trim(str_replace(array('=',' ','\''), '', $params->username));
			$params->password = trim(str_replace(array('=',' ','\''), '', $params->password));
			$this->setUserModel();
			$user = $this->u->load(
				array(
					'username'=>$params->username,
					'password'=>$params->password,
					'active'=>1
				)
			)->one();
            $accessType = 'user';
            $success = !empty($user);
            // PATIENT LOGIC
		}
        else
        {
			// set isAdmin to false
			$this->isAdmin = false;
            /**
             * Set Authorization data array
             */
            $authData = array(
                'lname'=>$params->lname,
                'dob'=>$params->dob,
                'email'=>$params->email
            );

            /**
             * If Appointment Access
             */
            if(isset($params->appId) && $params->appId !== 0){
                $this->setAppointmentModel();
                $authData['id'] = $params->appId;
                $app = $this->a->load($authData)->one();
                $success = !empty($app);
                $accessType = 'appointment';
                if($success && $app['pid'] > 0)
                {
                    $this->setPatientModel();
                    $user = $this->p->load($app['pid'])->one();
                }
            /**
             * If Patient Access
             */
            }else{
                // check if patient exist
                $this->setPatientModel();
                $user = $this->p->load($authData)->one();
                $success = !empty($user);
                $accessType = 'patient';
            }

		}

        $_SESSION['authData']  = array('success' => $success);

        if($success && $accessType == 'appointment' && isset($app['id']))
        {
            $aid = $app['id'];
        }
        elseif($success && isset($user['id']))
        {
            $aid = $user['id'];
        }
        else
        {
            $aid = '0';
        }

        $session = new stdClass();
        $session->aid = (string) $aid;
        $session->sid = (string) session_id();
        $session->sDate = (string) Carbon::now();
        $session->accessType = (string) $accessType;
        $session->success = (int) $success;
        $session->ip = (string) $ip;

        if($success)
        {
            if(isset($user) && !empty($user)){
                $_SESSION['authData']['user'] = array(
                    'id' => $user['id'],
                    'fullname' => ($this->isAdmin ? $user['fullname'] : str_replace('  ', ' ',$user['fname'].' '.$user['mname'].' '.$user['lname'])),
                    'role' => (isset($user['role']) ? $user['role'] : '0')
                );
            }

            if(isset($app) && !empty($app)){
                $_SESSION['authData']['app'] = array(
                    'id' => $app['id'],
                    'fullname' => str_replace('  ', ' ',$app['fname'].' '.$app['mname'].' '.$app['lname']),
                    'role' => '0'
                );
            }

            $session->token = (string) $this->generateToken(microtime());
            $_SESSION['authData']['token'] = $session->token;

            $session = $this->s->save($session);
            $_SESSION['session'] = $session;
            return $_SESSION['authData'];

        }else{
            $this->s->save($session);

            if($this->autoIpBanned && $this->maxFailures == ($attempts + 1)){
                $ipParams = new stdClass();
                $ipParams->ip = $ip;
                $ipParams->access = 1; //banned
                $ipParams->type = 'auto';
                $ipParams->aDate = (string) Carbon::now()->toDateTimeString();
                $this->i->save($ipParams);
            }

            return array(
                'success' => false,
                'destroy' => false,
                'error' => 'authentication_failed_x_attempts_of_x_available',
                'data' => array(
                    ($attempts + 1),
                    $this->maxFailures
                )
            );
        }
	}

	public function setUnauthorized()
    {
        if(isset($_SESSION['session'])){
            $params = (object) $_SESSION['session'];
            $params->eDate = (string) Carbon::now();
            $this->s->save($params);
        }
		session_unset();
		session_destroy();
		return array('success' => !isset($_SESSION['authData']));
	}

	private function generateToken($token)
    {
		return sha1(MatchaUtils::__encrypt($token));
	}
}
//$l = new Logon();
//$user = new stdClass();
//$user->username = 'admin';
//$user->password = 'pass';
//
//$user->lname = 'Woo';
//$user->dob = '2013-05-21';
//$user->email = 'vela1606@gmail.com';
//$user->appId = 6;
//$user->isAdmin = false;
//
//print '<pre>';
//print_r($l->getAuthorization($user));
//print_r($l->setUnauthorized());