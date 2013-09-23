<?
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

include_once('../app/lib/XMLutils/XML2Array.php');

$ServerIP = $_SERVER['REMOTE_ADDR'];

$xml_post = file_get_contents('php://input');

// If we receive data, save it.
if ($xml_post)
{
    // Step:1 - Convert the XML to an Array
    $PatientXML = XML2Array::createArray($xml_post);

    // Step:2 - Parse the array

    // Step:3 - Save the data into the data base

}