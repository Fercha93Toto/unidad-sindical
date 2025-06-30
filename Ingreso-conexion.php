<?php
// login.php
require_once 'db_configuracion.php';


header('Content-Type: application/json');
session_start(); // Inicia la sesión para almacenar el estado del usuario

$response = ['success' => false, 'message' => ''];

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $username = trim($_POST['username'] ?? '');
    $password = $_POST['password'] ?? '';

    if (empty($username) || empty($password)) {
        $response['message'] = 'Por favor, ingresa tu nombre de usuario y contraseña';
        echo json_encode($response);
        $conn->close(); Cerrar la conección antes de salir
        exit;
    }

    // Buscar el usuario por nombre de usuario
    $stmt = $conn->prepare("SELECT id, username, password FROM users Where username = ?");
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows == 1) {
        $stmt->bind_result($id, $db_username, $hashed_password);
        $stmt->fetch();

        // Verificar la contraseña
        if (password_verify($password, $hashed_password)) {
            //Contraseña correcta, iniciar sesión
            $_SESSION['user_id'] = $id;
            $_SESSION['username'] = $db_username;
            $response['success'] = true;
            $response['message'] = 'Inicio de sesión exitoso. Redirigiendo...';
            } else {
                $response['message'] = 'Contraseña incorrecta.';
            }
        } else {
            $response['message'] = 'Nombre de usuario no encontrado.';
        }
        $stmt->close();
    } else {
        $response['message'] = 'Método de solicitud no valido.';
    }
    
$conn->close();
echo json_encode($response);
?>