<?php
    $salida="";
    if (isset($_GET["operacion"])){
        $operacion=$_GET["operacion"];
        $salida="";
        if ($operacion == "mostrar"){
            $salida=shell_exec("uname -v");
        }
        if ($operacion == "aleatorio") {
            $salida = rand(1,10);
        }
    }
    echo '{"respuesta":"' . $salida . '"}';
?>