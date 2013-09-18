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
class Plugins {

    private $server;
    private $secret;
    private $action;
    private $method;
    private $request = '';

    /**
     * @var MatchaCUP|bool
     */
    public $x;

    function __construct(){
        $this->x = MatchaModel::setSenchaModel('App.model.admin.Plugins');
    }

    public function getPlugins($params){
        return $this->x->load($params)->all();
    }

    public function getPlugin($params){
        return $this->x->load($params)->one();
    }

    public function addPlugin($params){
        return $this->x->save($params);
    }

    public function updatePlugin($params){
        return $this->x->save($params);
    }

    public function deletePlugin($params){
        return $this->x->destroy($params);
    }

    public function getAllActiveKeys(){
        $keys = array();
        $params = new stdClass();
        $params->filter = array();
        $params->filter[0] = new stdClass();
        $params->filter[0]->proverty = 'active';
        $params->filter[0]->vallue = '1';
        foreach($this->getPlugins($params)['data'] As $plugin){
            $keys[] = $plugin['secret'];
        }
        return $keys;
    }

}

//print '<pre>';
//print 'Sending request...<br>';
//$e = new Plugins();
//$data = array('hello'=>'world');
//print_r(json_decode($e->RequestByPlugin('tra', 'setPatientData', $data), true));
//print '<br>Done!';