<?php

header("Access-Control-Allow-Origin: *");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {

	exit;

}

$ext = strtolower(substr(strrchr($_FILES['avatar']['name'], "."), 1));

if (array_search($ext,array('jpg','gif','png'))  === false){

	exit; //Evitar que se suban otros archivos.

}

$target_path = "./";

$target_path = $target_path . $_FILES['avatar']['name'];	

if (move_uploaded_file($_FILES['avatar']['tmp_name'], $target_path)) {

	echo utf8_encode($_FILES['avatar']['name']);

} 

?>