<?php
/**
 * Matcha::connect
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

use Carbon\Carbon;

class MatchaUtils extends Matcha
{
    /**
     * function t($times = NULL):
     * Method to product TAB characters
     * @param null $times
     * @return string
     */
    static public function t($times = NULL)
    {
        $tabs = '';
        for ($i = 1; $i <= $times; $i++) $tabs .= chr(9);
        return $tabs;
    }

    /**
     * function Carbon():
     * Method to enable the use of Carbon class Plugin
     * @return Carbon\Carbon
     */
    static public function Carbon()
    {
        require_once('plugins/Carbon/Carbon.php');
        return new Carbon();
    }

    /**
     * function BrowserOS():
     * Method to enable the use of BrowserDetect class Plugin
     * The class will also detect the client operating system.
     * @return Browser
     */
    static public function BrowserOS()
    {
        require_once('plugins/BrowserDetect/Browser.php');
        return new Browser();
    }

    /**
     * function ChromePHP():
     * Method to enable the use of ChromePHP class Plugin
     * This class is used by MatchaErrorHandler, but you can use it
     * to send console messages to Chrome Web Browser.
     * @return mixed
     */
    static public function ChromePHP()
    {
//        require_once('plugins/ChromePHP/ChromePhp.php');
//        return ChromePhp()->getInstance();
    }

    /**
     * function FirePHP():
     * Method to enable the use of FirePHP class Plugin
     * This class is used by MatchaErrorHandler, but you can use it
     * to send console messages to (Firefox Browser) FirePHP Plugin
     * @return FirePHP
     */
    static public function FirePHP()
    {
        require_once('plugins/FirePHPCore-0.3.2/FirePHP.class.php');
        return new FirePHP();
    }

    /**
     * function __recursiveArraySearch($needle,$haystack):
     * An recursive array search method
     */
    static public function __recursiveArraySearch($needle,$haystack)
    {
        foreach($haystack as $key=>$value)
        {
            $current_key=$key;
            if($needle===$value OR (is_array($value) && MatchaUtils::__recursiveArraySearch($needle,$value) !== false)) return $current_key;
        }
        return false;
    }

	static public function __objectToArray($obj) {
		$_arr = is_object($obj) ? get_object_vars($obj) : $obj;
		$arr = array();
		foreach ($_arr as $key => $val) {
			$val = (is_array($val) || is_object($val)) ? self::__objectToArray($val) : $val;
			$arr[$key] = $val;
		}
		return $arr;
	}

	/**
	 * convert Array to Object recursively
	 * @param array $array
	 * @param stdClass $parent
	 * @return stdClass
	 */
	static public function __arrayToObject(array $array, stdClass $parent = NULL)
	{
		if ($parent === null) $parent = new stdClass;
		foreach ($array as $key => $val){
			if (is_array($val)){
				$parent->$key = self::__arrayToObject($val, new stdClass);
			}else{
				$parent->$key = $val;
			}
		}
		return $parent;
	}

	static public function __encrypt($text){
		$iv_size = mcrypt_get_iv_size(MCRYPT_RIJNDAEL_256, MCRYPT_MODE_ECB);
		$iv = mcrypt_create_iv($iv_size, MCRYPT_RAND);
		$cryptText = mcrypt_encrypt(MCRYPT_RIJNDAEL_256, Matcha::$__secretKey, $text, MCRYPT_MODE_ECB, $iv);
		return $cryptText;
	}

	static public function __decrypt($text){
		$iv_size = mcrypt_get_iv_size(MCRYPT_RIJNDAEL_256, MCRYPT_MODE_ECB);
		$iv = mcrypt_create_iv($iv_size, MCRYPT_RAND);
		$deCryptText = mcrypt_decrypt(MCRYPT_RIJNDAEL_256, Matcha::$__secretKey, $text, MCRYPT_MODE_ECB, $iv);
		return trim($deCryptText);
	}
}
//print $pass = MatchaUtils::__encrypt("pass");
//print '<br>';
//print MatchaUtils::__decrypt($pass);