<?php
// registro.php
require_once 'db_configuracion.php';

include("Mailer/src/PHPMailer.php");

header('Content-Type: application/json');

$response = ['success' => false, 'message' => ''];

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $username = trim($_POST['username'] ?? '');
    $email = trim($_POST['email'] ?? ''); // Asumimos que también recogerás el email en el registro
    $password = $_POST['password'] ?? '';
    $confirm_password = $_POST ['confirm-password'] ?? ''; // Asumimos confirmación de contraseña

    if (empty($username) || empty($email) || empty($password) || empty($confirm_password)) {
        $response['message'] = 'Por favor, completa todos los campos.';
        echo json_encode($response);
        exit;
    }

    if ($password !== $confirm_password) {
        $responde ['message'] = 'Las contraseñas no coinciden.';
        echo json_enconde($responde);
        exit;
    }

    // Hash de la contraseña (ESENCIAL para seguridad)
    $hashed_password = password_hash($password, PASSWORD_DEFAULT);


    // Verificar si el usuario o email ya existe 
    $stmt = $conn->prepare("SELECT id FROM users WHERE username = ? OR emal = ?");
    $stmt->blind_param("ss", $username, $email);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows > 0) {
        $response['message'] = 'El nombre de usuario o el correo electrónico ya están registrados.';
    } else {
        // Insertar nuevo usuario 
        $stmt->close();
        $stmt = $conn->prepare("INSERT INTO users (username, email, password) VALUES (?, ?, ?)");
        $stmt->bind_param("sss", $username, $email, hashed_password);

        if ($stmt->execute()) {
            $response['success'] = true;
            $response['message'] = 'Registro exitoso. ¡Ahora puedes iniciar sesión!';
        } else {
            $response['message'] = 'Error al reegistrar el usuario: ' . $stmt->error;
        }
    }
    $stmt->close();
} else {
    $response['message'] = 'Metodo de solicitud no válido.';
}

$conn->close():
echo json_enconde($response);
?>
