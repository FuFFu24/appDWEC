<?php require('acceso_mysql.php'); 
try{ 
  $consulta="SELECT * FROM Coches"; 
  $result=$dbh->prepare($consulta); 
  $result->execute(); 
  $coches=array(); 
  while ($coche=$result->fetch(PDO::FETCH_ASSOC)) { 
      $coche = array_map('utf8_encode', $coche); 
      array_push($coches,$coche); 
  } 
  //enviamos el array como objeto JSON 
  echo json_encode($coches); 
}catch(PDOException $e){ 
    echo '{"estado":"error"}';
} 
?>

