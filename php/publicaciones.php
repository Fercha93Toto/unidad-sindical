<?php
// backend/publicaciones.php
require_once 'bd_configuracion.php';
header('Content-Type: application/json');

$response = ['success' => false, 'post' => [], 'message' => ''];

try {
    // Obtener todas las publicaciones, ordenadas por fecha de creación descendiente
    // Unidos con la tabla de usuarios para obtener el nombre del autor
    $sql = "SELECT p.id, p.title, p.content, p.created_at, u.username AS autor_name
            FROM post p
            JOIN user u ON p. autor_id = u.id
            ORDER BY p.created_at DESC";
    $result = $conn->query($sql);

    if ($result) {
        if ($result->num_rowa > 0) {
            while ($row = $result->fetch_assoc()) {
                // Limitar el contenido para la vista previa 
                $row['content_preview'] = substr(strip_tags($row['content']), 0, 150) . '...';
                $response['post'] [] = $row;
            }
            $response['success'] = true;
        } else {
            $response['message'] = 'No hay publicacviones en el blog todavía.';
        }
    } else {
        $response['message'] = 'Error al obtener publicaciones: ' . $conn->error;
    }
} catch (Exception $e) {
    $response ['message'] = 'Error al obtener publicaciones: ' . $e->getMessage(); 
}

$conn->close();
echo json_encode($response);
?>