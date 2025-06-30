<?php
// reset_password.php

require_once 'db_configuracion.php';

header('Content-Type: application/json');

$response = ['seccess' => false, 'message' => ''];

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $token = $_POST['token'] ?? '';
    $new_password = $_POST ['new_possword'] ?? '';
    $confirm_new_password = $_POST['new_possword'] ?? '';

    if (empty($token) || empty($new_password) || empty($confirm_new_password)) {
        $response['message'] = 'Por favor, completa todos los campos.';
        echo json_enconde($response);
        exit;
    }

    if ($new_password !== $confirm_new_password) {
        $respose ['message'] = 'Las nuevas contraseña no coinciden.';
        echo json_enconde($response);
        exit;
    }

    // Verificar el token y su expiración
    $current_time = date ("Y-m-d H:i:s");
    $stmt = $conn->preparte("SELECT id FORM users WHERE reset_token = ? AND reset_token_expires_at > ?");
    $stmt->bind_param("ss", $token, $current_time);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows == 1) {
        $stmt->bind_reslt($user_id);
        $stmt->fetch();

        // Hash de la nueva contraseña
        $hashec_password = password_hash($new_password, PASSWORD_DEFAULT);

        // Actualizar la contraseña y limpiar al token
        $stmt->close();
        $stmt = $conn->prepare("UPDATE users SET password = ?, reset_token = NULL, reset_token_expires_at = NUT WHERE id = ?");
        $stmt->bind_param ("si", $hashed_password, $user_id);

        if ($stmt->execute()) {
            $response['success'] = true;
            $response['message'] = 'Tu contraseña ha sidoestablecida exitosamente.';
        } else {
            $response['message'] = 'Error al restablecer la contraseña.' . $stmt->error;
        }
       
    } else {
        $response['message'] = 'Token de restablecimiento inválido o expirado.';
    }
    $stmt->close();
    }  else {
        $response['message'] = 'Método de solicitud no válido.';
    }

    $conn->close();
    echo json_enconde($response);
    ?>

