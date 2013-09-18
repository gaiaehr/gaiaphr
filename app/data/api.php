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

include_once('config.php');
function getREMOTING_API($API)
{
    $actions = array();
    foreach ($API as $aname => &$a) {
        $methods = array();
        foreach ($a['methods'] as $mname => &$m) {
            if (isset($m['len'])) {
                $md = array(
                    'name' => $mname,
                    'len' => $m['len']
                );
            } else {
                $md = array(
                    'name' => $mname,
                    'params' => $m['params']
                );
            }
            if (isset($m['formHandler']) && $m['formHandler']) {
                $md['formHandler'] = true;
            }
            $methods[] = $md;
        }
        $actions[$aname] = $methods;
    }

    return json_encode(array(
        'url' => 'data/router.php',
        'type' => 'remoting',
        'actions' => $actions
    ));
}


header('Content-Type: text/javascript');
echo 'Ext.ns("App.data");';
echo 'App.data = [];';
echo 'App.data.push(' . getREMOTING_API($API) . ');';
echo 'for(var x = 0; x < App.data.length; x++){Ext.direct.Manager.addProvider(App.data[x]);}';