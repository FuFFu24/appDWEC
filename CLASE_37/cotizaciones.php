<?php
	//header("Content-type: text/xml");
	$empresa = $_POST['empresa'];
	$valor = rand(10,100)/10;
	echo '<?xml version="1.0" encoding="UTF-8" ?>'; 
	echo "<cotizacion>";
	echo "<empresa>".$empresa."</empresa>";
	echo "<valor>".$valor."</valor>";
	echo "</cotizacion>";
?>