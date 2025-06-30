<?php
// db_config.php

define('DB_SERVER', 'localhost'); // Usualmente 'localhost'
define('DB_USERNAME', 'root');   // Tu usuario de la base de datos
define('DB_PASSWORD', '');       // Tu contraseña de la base de datos (vacío si no tienes)
define('DB_NAME', 'sindical_db'); // El nombre de la base de datos que creaste

// Intentar conexión a la base de datos
$conn = new mysqli(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);

// Verificar conexión
if ($conn->connect_error) {
    die("ERROR: No se pudo conectar a la base de datos. " . $conn->connect_error);
}
?>