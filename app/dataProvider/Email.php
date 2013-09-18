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
include_once($_SESSION['ROOT'].'/dataProvider/Logs.php');
include_once($_SESSION['ROOT'].'/dataProvider/Appointments.php');
include_once($_SESSION['ROOT'].'/dataProvider/CMS.php');
include_once($_SESSION['ROOT'].'/lib/PHPMailer/class.phpmailer.php');

class Email {

	/**
	 * @var MatchaCup
	 */
	private $t;
    /**
     * @var MatchaCup
     */
	private $a;
	/**
	 * @var array appointment data
	 */
	private $app;
	/**
	 * @var Logs
	 */
	private $log;
	/**
	 * @var PHPMailer
	 */
	private $mail;
	/**
	 * @var string
	 */
	private $smptUser = 'vela1606@gmail.com';
	/**
	 * @var string
	 */
	private $smptPassword = 'Sabado01';
	/**
	 * @var null|string
	 */
	private $tpl = null;
	/**
	 * @var array
	 */
	public $error;
    /**
     * @var CMS
     */
    public $cms;


    public $localDebug = false;


	function __construct(){
		$this->t = MatchaModel::setSenchaModel('App.model.admin.Templates');

		$this->appointment = new Appointments();
		$this->log = new Logs();
		$this->mail = new PHPMailer();
		$this->cms = new CMS();

		$this->mail->IsSMTP();                          // telling the class to use SMTP
		$this->mail->SMTPAuth   = true;                 // enable SMTP authentication
		$this->mail->SMTPSecure = 'tls';                // sets the prefix to the server
		$this->mail->Host       = 'smtp.gmail.com';     // sets GMAIL as the SMTP server
		$this->mail->Port       = 587;                  // set the SMTP port for the GMAIL server
		$this->mail->Username   = $this->smptUser;      // GMAIL username
		$this->mail->Password   = $this->smptPassword;  // GMAIL password
		$this->mail->AltBody    = 'To view the message, please use an HTML compatible email viewer!'; // optional, comment out and test
		$this->mail->SetFrom('noreply@saluspr.com', 'Clinica Salus');
	}

	public function processWelcomeEmails(){
		$newAppointments = $this->appointment->a->load(array('status'=>0))->all();
		if($this->setTplByName('welcome')){
			$this->logError("No template \"welcome\" found");
			return false;
		}
		foreach($newAppointments as $app){
			$this->sendEmailByApp($app, 'welcome', false);
		}
		return true;
	}

	public function sendEmailByApp($app, $tpl, $status = ''){
		$this->app = (array) $app;

		if($this->setTplByName($tpl)){
			$this->logError("No template \"$tpl\" found");
			return false;
		}

		if(!$this->emailIsValid()){
			$this->logError('No valid email found');
			return false;
		}

		$body = $this->parseTplBody();
		if($body === false){
			$this->logError("Unable to parse $tpl template");
			return false;
		}

		$this->mail->AddAddress($this->app['email'], $this->app['fname']);
		$this->mail->Subject = $this->tpl['tplSubject'];
		$this->mail->MsgHTML($body);



        if($this->localDebug){
            $text = <<<EOF
EMAIL: {$this->app['email']}<br>
------------------------------------------------------------<br>
SUBJECT: {$this->tpl['tplSubject']}<br>
------------------------------------------------------------<br>
BODY:<br><br>
$body
------------------------------------------------------------
EOF;
            $dir = '../dataProvider/batch/emails/';
            $file = $this->app['email'].'_'.str_replace('.','',microtime(true)).'.html';
            if(is_dir($dir) || mkdir($dir, 777)){
                $handle = fopen($dir.$file, 'w');
                fwrite($handle, $text);
                fclose($handle);

                if(!is_numeric($status) && $tpl == 'welcome'){
                    $status = '1';
                }elseif(!is_numeric($status) && $tpl == 'thankyou'){
                    $status = '2';
                }elseif(!is_numeric($status) && $tpl == 'confirmed'){
                    $status = '3';
                }elseif(!is_numeric($status) && $tpl == 'canceled'){
                    $status = '4';
                }elseif(!is_numeric($status) && $tpl == 'confirmation'){
                    $status = '8';
                }

                if(is_numeric($status)) $this->updateStatus($status);
                return $this->app;

            }else{
                $this->logError('Unable to write on '.$dir);
                return false;
            }
        }else{
            if(!$this->mail->Send()){
                $this->logError($this->mail->ErrorInfo);
                return false;
            }else{

                if(!is_numeric($status) && $tpl == 'welcome'){
                    $status = '1';
                }elseif(!is_numeric($status) && $tpl == 'thankyou'){
                    $status = '2';
                }elseif(!is_numeric($status) && $tpl == 'confirmed'){
                    $status = '3';
                }elseif(!is_numeric($status) && $tpl == 'canceled'){
                    $status = '4';
                }elseif(!is_numeric($status) && $tpl == 'confirmation'){
                    $status = '8';
                }

                if(is_numeric($status)) $this->updateStatus($status);
                return $this->app;
            }
        }


	}

    public function SendEmailByParams($params){
        $params->status = (isset($params->status) && is_numeric($params->status)) ? $params->status : '';
        return $this->sendEmailByApp($params->app, $params->tpl, $params->status);
    }

    public function processTestEmail($params){
        // set appointment globally
        $this->app = array();
        $this->app['id']    = 99999;
        $this->app['pid']   = 99999;
        $this->app['fname'] = 'Fulano';
        $this->app['mname'] = 'De';
        $this->app['lname'] = 'Tal';
        $this->app['email'] = $params->email;
        $this->app['startDate'] = '2003-04-23 00:00:00';

        if(!$this->emailIsValid()){
	        $this->logError('No valid email found');
            return array('success'=>false);
        }

	    $this->setTplByName($params->tplName);
        $body = $this->parseTplBody();

        if($body === false){
	        $this->logError('Unable to parse template');
            return array('success'=>false);
        }
        $this->mail->AddAddress($this->app['email'], $this->app['fname']);
        $this->mail->Subject = $this->tpl['tplSubject'];
        $this->mail->MsgHTML($body);
        if(!$this->mail->Send()){
	        $this->logError($this->mail->ErrorInfo);
            return array('success'=>false);
        }else{
            return array('success'=>true);
        }
    }

	private function emailIsValid(){
		$email = filter_var($this->app['email'], FILTER_VALIDATE_EMAIL);
		if($email === false) return false;
		return true;
	}

    /**
     * 9 = error, 8 = waiting
     * @param $status
     */
    private function updateStatus($status){
		if(isset($this->app['id']) && $this->app['status'] != $status){
			$this->app['status'] = $status;
			$this->appointment->a->save((object)$this->app);
		}
	}

	private function logError($logErrorMsg){
		$this->updateStatus('9');
		$appId = isset($this->app['id']) ? $this->app['id'] : '0';
		$this->error = $this->log->recordLog($appId, "Error: $logErrorMsg", 'email');
		return;
	}

	public function getTemplates($params){
		return $this->t->load($params)->all();
	}

	public function getTplByName($tplName){
		return $this->t->load(array('tplName'=>$tplName))->one();
	}

	public function setTplByName($tplName){
		if($this->tpl == null) $this->tpl = $this->t->load(array('tplName'=>$tplName))->one();
		return empty($this->tpl);
	}

	public function updateTemplates($params){
		return $this->t->save($params);
	}

	private function parseTplBody(){
        return $this->cms->parseBodyByApp($this->app,$this->tpl['tplBody']);
	}
}

//print '<pre>';
//$e = new Email();
//$e->processNewEmails();
//$e->getWelcomeTpl();
//$e->getThankYouTpl();