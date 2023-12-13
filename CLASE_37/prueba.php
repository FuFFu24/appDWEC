<?php
if (isset($_GET["nombre"])) {
    $primeraLetra=substr(strtolower($_GET["nombre"]),0,1);
    if (preg_match("/^[aeiou]$/",$primeraLetra)){
        echo '{"estado":"OK"}';
    } else {
        echo '{"estado":"MAL"}';
    }
} else {
    echo '{"estado":"Faltan parametros"}';
}
?>