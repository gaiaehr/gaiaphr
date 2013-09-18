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

if(
//    (isset($_SERVER['REMOTE_ADDR']) && ($_SERVER['REMOTE_ADDR'] == '127.0.0.1' || $_SERVER['REMOTE_ADDR'] == '::1')) &&
    (isset($_REQUEST['token']) && $_REQUEST['token'] == '123'))
{
	$debug = true;

	if($debug){
		ini_set('display_errors', 'on');
		error_reporting(E_ALL);
	}


    // check is action is set
    if(!isset($_REQUEST['action'])) die('No action provided');
    if(!is_callable('curl_init')) die('CURL not installed');

    // global includes
    include_once('../../data/MatchaHelper.php');
    require_once('../../lib/MultiRequest/Config.php');

    /**
     * set Batches Model
     */
    $b = MatchaModel::setSenchaModel('App.model.admin.Batches');
    $c = MatchaModel::setSenchaModel('App.model.admin.Confirmations');

    /**
     * start batch
     */
    $batch = new stdClass();
    $batch->action = $_REQUEST['action'];
    $batch->totalRequests = 0;
    $batch->totalErrors = 0;

    /**
     * request to run every time a request is complete
     * @param MultiRequest_Request $request
     * @param MultiRequest_Handler $handler
     */
    function doRequestComplete(MultiRequest_Request $request, MultiRequest_Handler $handler) {
        global $debug, $batch, $c;

        if($debug){
	        print '<pre>';
            debug('Request complete: ' . $request->getUrl() . ' Code: ' . $request->getCode() . ' Time: ' . $request->getTime());
            debug('request Get Content: ' . $request->getContent());
            debug('Requests in waiting queue: ' . $handler->getRequestsInQueueCount());
            debug('Active requests: ' . $handler->getActiveRequestsCount());
        }

        $content = json_decode($request->getContent(),true);

	    $params = new stdClass();
	    $params->appId = $content['data']['id'];
	    $params->answered = '0';
	    $params->batchId = $batch->id;
	    $params->sendStamp = date('Y-m-d H:i:s');

        if($content['success']){
            $params->token = $content['data']['token'];
        }else{
	        $params->errorLogId = $content['error']['id'];
	        $batch->totalErrors++;
            if($debug) debug('Error: '.$content['error']['logEntry']);
        }

	    $c->save($params);
    }

    /**
     * @param $message
     */
    function debug($message) {
        print $message . '<br />';
        flush();
    }

    /**
     * @return MultiRequest_Handler
     */
    function getBatchHandler(){
        $mrHandler = new MultiRequest_Handler();
        $mrHandler->setConnectionsLimit(CONNECTIONS_LIMIT);
        $mrHandler->onRequestComplete('doRequestComplete');
        $headers = array();
        $headers[] = 'Accept: text/xml,application/xml,application/xhtml+xml,text/html;q=0.9,text/plain;q=0.8,image/png';
        $headers[] = 'Cache-Control: no-cache';
        $headers[] = 'Connection: Keep-Alive';
        $headers[] = 'Keep-Alive: 300';
        $headers[] = 'Accept-Charset: UTF-8,Windows-1251,ISO-8859-1';
        $headers[] = 'Accept-Language: es,en-us,en';
        $headers[] = 'Pragma:';
        $mrHandler->requestsDefaults()->addHeaders($headers);
        $options = array();
        $options[CURLOPT_USERAGENT] = 'Mozilla/5.0 (Windows; U; Windows NT 6.1; en-US; rv:1.9.2.12) Gecko/20101026 Firefox/3.6.12';
        $mrHandler->requestsDefaults()->addCurlOptions($options);
        return $mrHandler;
    }

    /**
     * actions switch
     */
    switch($_REQUEST['action']){
        // handle confirmation batch
        case 'confirmation':
            // include Appointments class
            include_once('../../dataProvider/Appointments.php');
            // create new instance
            $a = new Appointments();
            // get appointments for 2 days ahead
            $apps = $a->getAppointmentsByDays(2);
            // if appointments found...
            if(!empty($apps)){
                // get MultiRequest_Handler
                $mrHandler = getBatchHandler();
                // for each appointment...
                foreach($apps as $app){
                    if($app['status'] == 2){
//                    if($app['status'] == 1 || $app['status'] == 2){
	                    $batch->totalRequests++;
	                    $app['token'] = md5(date(DATE_ATOM));
                        $args = http_build_query($app);
                        $request = new MultiRequest_Request($_SESSION['URL'].'/dataProvider/batch/ConfirmationEmail.php?'.$args);
                        $mrHandler->pushRequestToQueue($request);
                    }
                }
                $batch->startTime = date('Y-m-d H:i:s');
                $batch = (object) $b->save($batch);
                set_time_limit(7600);

	            if($debug) $startTime = time();

	            $mrHandler->start();
                $batch->stopTime = date('Y-m-d H:i:s');
                $b->save($batch);

	            if($debug) debug('Total time: ' . (time() - $startTime));

            }

            break; // end reports
        // handle reports batch
        case 'reports':

            break;
        //handle sync down with plugin
        case 'syncDown':



            break;
    }
}else{
    die('GET OUT!!!');
}