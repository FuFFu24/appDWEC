<?php
$provincias= array();
$provincias["galicia"]="<option>La Coruña</option><option>Lugo</option><option>Pontevedra</option><option>Orense</option>";
$provincias["extremadura"]="<option>Badajoz</option><option>Caceres</option>";
$provincias["madrid"]="<option>Madrid</option>";
$provincias["asturias"]="<option>Asturias</option>";
$provincias["cantabria"]="<option>Santander</option>";
$provincias["pais_vasco"]="<option>Vizcaya</option><option>Guipuzcoa</option><option>Alava</option>";
$comunidad=$_REQUEST["comunidad"];
echo $provincias[$comunidad];
?>