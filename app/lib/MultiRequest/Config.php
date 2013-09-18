<?php

define('ROOT_DIR', dirname(dirname(__FILE__)));
define('DOWNLOADS_DIR', dirname(__FILE__) . DIRECTORY_SEPARATOR . 'downloads');
define('CONNECTIONS_LIMIT', 50);

function autoloadClasses($class) {
	$filePath = ROOT_DIR . DIRECTORY_SEPARATOR . str_replace('_', DIRECTORY_SEPARATOR, $class) . '.php';
	if(is_file($filePath)) {
		return require_once ($filePath);
	}
	$filePath = str_replace('_', DIRECTORY_SEPARATOR, $class) . '.php';
	if(is_file($filePath)) {
		return require_once ($filePath);
	}
    return false;
}
spl_autoload_register('autoloadClasses');