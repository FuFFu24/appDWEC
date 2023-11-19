<?php
 $nombre = $_REQUEST["nombre"];
 $apellidos = $_REQUEST["apellidos"];
 $DNI = $_REQUEST["DNI"];
 $edad = $_REQUEST["edad"];
 $antiguedad = $_REQUEST["antiguedad"];
 $puesto = $_REQUEST["puesto"];
 $open = fopen("./empleados.json","r");
 $texto = fread($open, filesize("./empleado.json"));
 $texto = str_replace("]",',{"DNI":"'. $DNI . '","nombre":"'.$nombre.'","apellidos":"'. $apellidos . '","edad":'. $edad . ',"antiguedad":'. $antiguedad . ',"puesto":"'. $puesto . '"}',$texto); 
 $texto = $texto . "]";
 fclose($open);
 $open = fopen("./empleados.json","w+"); 
 fwrite($open, $texto);
 fclose($open);
 echo "OK";
?>
