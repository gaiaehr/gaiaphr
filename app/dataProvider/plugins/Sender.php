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

include_once($_SESSION['ROOT'].'/dataProvider/Plugins.php');
class Sender{
    private $server;
    private $secret;
    private $method;
    private $request = '';

    function __construct($pluginName){
        $this->setPluginData($pluginName);
    }

    public function Request($action, array $data = array()){
        $this->method = strtoupper(substr($action, 0, 3));
        $this->server = $this->server.'/'.$this->request;
        $ch = curl_init();
        if(isset($this->method) && $this->method == 'GET'){
            curl_setopt($ch, CURLOPT_HTTPGET, 1);
        }else{
            $query = (array) $data;
            $query = rawurlencode(json_encode($query));
            curl_setopt($ch, CURLOPT_POST, 1);
            curl_setopt($ch, CURLOPT_POSTFIELDS, $query);
        }

        curl_setopt($ch, CURLOPT_URL, $this->server);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
//        curl_setopt($ch, CURLOPT_TIMEOUT_MS, 1000);
        curl_setopt($ch, CURLOPT_HTTPHEADER, array(
            'Accept: application/json',
            'Content-Type: application/json',
            'Secret-Key: '. $this->secret,
            'Action: '. $action
        ));
        $response = curl_exec($ch);
        curl_close($ch);
        return $response;
    }

    private function setPluginData($plugin){
        $params = new stdClass();
        $params->filter = array();
        $params->filter[0] = new stdClass();
        $params->filter[0]->proverty = 'name';
        $params->filter[0]->vallue = $plugin;
        $p = new Plugins();
        $plugin = $p->getPlugin($params)['data'];
        $this->server = $plugin['server'];
        $this->secret = $plugin['secret'];
        return (bool) $plugin['active'];
    }
}