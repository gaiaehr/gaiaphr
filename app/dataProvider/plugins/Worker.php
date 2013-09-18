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

class Worker{

    protected static function mapper($data = array(), $mappings = array(), $incoming = true){
        $newData = array();
        foreach($mappings As $m => $v){
            if(!$incoming){
                $newData[$v] = isset($data[$m]) ? trim($data[$m]) : '';
            }else{
                $newData[$m] = isset($data[$v]) ? trim($data[$v]) : '';
            }
        }
        return $newData;
    }

	protected static function formatDate($date, $time = false){
//		if(preg_match('((\d{4})-(\d{2})-(\d{2})|((\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})))', $date)){
//			return $date;
//		}else{
			return $time ? date('Y-m-d H:i:s', strtotime($date)) : date('Y-m-d', strtotime($date));
//		}
	}

}