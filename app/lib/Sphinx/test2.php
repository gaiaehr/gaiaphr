<?php

require ('sphinxapi.php');
$cl = new SphinxClient ();
$cl->SetServer('localhost');
$cl->SetConnectTimeout(5);
$cl->SetMatchMode(SPH_MATCH_ANY);
$cl->SetLimits(0, 25, 1000);
$cl->SetArrayResult(true);
$result = $cl->Query('Ernesto');

if ($result === false ){
	echo "Query failed: " . $cl->GetLastError() . ".\n";
}else{
	if($cl->GetLastWarning()){
		echo "WARNING: ".$cl->GetLastWarning();
	}
	if(!empty($result["matches"])){
		foreach ( $result["matches"] as $doc => $docinfo ) {
			echo "$doc\n";
		}
		print '<pre>';
		var_dump( $result );
	}
}

