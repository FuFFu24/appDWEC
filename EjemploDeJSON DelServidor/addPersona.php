<?php
 $nombre = $_REQUEST["nombre"];
 $apellidos = $_REQUEST["apellidos"];
 $open = fopen("./ejemploJSON.txt","w+");
 echo filesize("/pruebas/ejemploJSON.txt");
 $texto = fread($open, filesize("/pruebas/ejemploJSON.txt"));
 str_replace("]",`,{"nombre":"$nombre","apellidos:"$apellidos"}`,$texto); 
 $texto = $texto . "]";
 fwrite($open, $texto);
?>