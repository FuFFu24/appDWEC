<?php

$entrada = fopen('php://input','r'); //Lee la información en “bruto” de la petición http recibida

$datos = fgets($entrada);

$datos = json_decode($datos,true);

switch ($datos['alumno']){

	case 'Juan Félix Mateos':

		switch ($datos['materia']){

			case 'Matemáticas':

				echo '{"calificacion":7.5}';

				break;

			case 'Lenguaje':

				echo '{"calificacion":9.5}';

				break;

		}

		break;

	case 'Ana Irene Palma':

		switch ($datos['materia']){

			case 'Matemáticas':

				echo '{"calificacion":8.5}';

				break;

			case 'Lenguaje':

				echo '{"calificacion":7.5}';

				break;

		}

		break;

}

?>