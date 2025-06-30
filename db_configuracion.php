<?php
// db_configuracion.php

define('DB_SERVER', 'localhost'); // Usualmente localhost
define('DB_USERNAME', 'root'); // Tu usuario de la base de datos
define('DB_PASSWORD', ''); // Tu contraseña de la base de datos (vacio si no tienes)
define('BD_NAME', 'sindical_db'); // El nombre de la base de datos que creaste 

// Intentar conexión a la base de datos
$conn = new mysqli('localhost', 'root', '', 'sindical_db');

// Verificar conexión
if ($conn->connect_error) {
    die("ERROR: No se pudo conectar a la base de datos . " . $conn->connect_error);
}

// Establecer el conjunto de caracteres a UTF-8 para evitar porblemas con tildes y ñ
$conn->set_charset("uft8mb4")
?>