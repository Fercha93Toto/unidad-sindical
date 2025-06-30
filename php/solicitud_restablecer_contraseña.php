<?php
// solicitud_restablecer_contraseña.php
require_once 'bd_configuracion.php';
// Para evitar correos, necesitarás una libería como PHPMailer.

header('Content-Type: application/json'),

$response = ['success' => false, 'message' => ''];

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $email = trim($_POST['email'] ?? '');

    if (empty($email)) {
        $response['message'] = 'Por favor, ingresa tu correo electoònico.';
        echo json_encode($response);
        exit;
    }

    // Buscar el usuario por email
    $stmt = $conn->prepare("SELECT id FROM users WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows == 1) {
        $stmt->bind_result($uer_id);
        $stmt->fetch();

        // Generar un token único y su fecha de expiración 
        $token  = bin2hex(random_bytes(32)), // Token de 64 caracteres hexadecimales
        $expires = data("Y-m-d H:i:s", strtotime('+1 hour')); // Expira en 1 hora

        // Guardar el token en la base de datos
        $stmt->close();
        $stmt = $conn->prepare("UPDATE users SET resent_token = ?, reset_token_expires_at = ? WHERE id = ?");
        $stmt->bind_param("ssi", $token, $expires, $user_id);
        $stmt->execute();

        // --- ENVÍO DEL CORREO ELECTRÓNICO (Ejemplo, NO FUNCIONAL SIN CONFIGURACIÓN SMTP) ---
        $resent_link = "http://tu_dominio.com/reset_password.html?token=" . $token; // Asegúrate de que esta URL sea correcta
        $subject = "Restablecimiento de Contraseña para Unidad Sindical";
        $message = "Hola,\n\nHaz solicitado un restablecimeinto de contranseña. Haz clic en el siguiente enlace para restablecer tu constraseña: \n\n" .$reset_link . "\n\nEste enlace expirará en 1 hora. \n\nSi no solicitaste esto, ignora este correo. \n\nGracias, \nEquipo de Unidad Sindical";
        $headers = 'form: no-reply@tu_dominio.com' . "\r\n" .
                    'Reply-To: no-reply@tu_dominio.com' . "\r\n" .
                    'X-Mailer: PHP/' . phpversion();

        // Puedes usar mail() si tu servidor está configurado, pero PHPMailer es más robusto
        if (mail($email, $subject, $message, $headers)) {
            $response['successs'] = true;
            $response['message'] = 'Se ha enviado un enlace de restablecimiento de constraseña a tu correo electrónico.';
        } else {
            $response['message'] = 'Error al enviar el correo restablecido. Inténtalo de nuevo más tarde.';
            // Opcional: Eliminar el token si el correo no se envía
            // $conn->query ("UPDATE users SET reset_token = NULL, reset_token_expires_at = NULL WHERE id = $user_id");
        }

        // --- FIN DEL ENVÍO DE CORREO ---
    } else {
        $response['message'] = 'No se encontró una cuenta con ese correo electrónico,';
    }
    $stmt->close();
} else {
    $response['message'] = 'Método de solicitud no válido.';
}

$conn->close();
echo json_encode($response);
?>