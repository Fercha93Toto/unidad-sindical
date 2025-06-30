document.addEventListener('DOMContentLoaded', function() {
    const resetPasswordForm = document.getElementById('resetPasswordForm');
    const finalResetResponseMessage = document.getElementById('finalResetResponseMessage');
    const resetTokenInput = document.getElementById('resetToken');

    // Obetener el token de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    if (token){
        resetTokenInput.value = token; // Poner el token en el campo oculto del formulario
    } else {
        finalResetResponseMessage.textContent = 'token de restablecimiento no encontrado en la URL.';
        finalResetResponseMessage.style.color = 'red';
        resetPasswordForm.style.display = 'none'; // Ocultar el formulario si no hay token 
        return; // Detener la ejecución si no hay token
    }
    
    if (resetPasswordForm) {
        resetPasswordForm.addEventListener('submit', async function(event) {
            event.preventDefault();

            const formData = new FormData(resetPasswordForm);


            finalResetResponseMessage.textContent = 'Restableciendo contraseña...';
            finalResetResponseMessage.style.color = '#007bff';

            try {
                const response = await fetch('./backend/request_password.php', { // Ruta a tu script PHP
                    method: 'POST',
                    body: formData
                    });

                    const data = await response.json();

                    if (data.success) {
                        finalResetResponseMessage.textContent = data.message;
                        finalResetResponseMessage.style.color = 'green';
                        // Redirigir al login despues de un restablecimiento exitoso
                        setTimeout(() => {
                            window.localStorage.href = 'ingreso.html';
                        }, 2000);
                        
                        } else {
                            finalResetResponseMessage.textContent = data.message;
                            finalResetResponseMessage.style.color = 'red';
                        }
                    } catch (error) {
                        console.error('Error:', error);
                        finalResetResponseMessage.textContent = 'Hubo un problema al conectar con el servidor.';
                        finalResetResponseMessage.style.color = "red";
                    }
                });
            }
        });
