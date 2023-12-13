<?php
    $salida="";
    if (isset($_GET["operacion"])){
        $operacion=$_GET["operacion"];
        $salida="";
        if ($operacion == "mostrar"){
            $salida='$("div").show()';
        }
        if ($operacion == "ocultar") {
            $salida = '$("div").hide()';
        }
    }
    echo $salida;
?>