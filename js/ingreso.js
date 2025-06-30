document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const responseMessage = document.getElementById('responseMessage');
    const forgotPasswordLink = document.getElementById('forgotPasswordLink');
    const resetPasswordModal = new bootstrap.Modal(document.getElementById('resetPasswordModal')); // Instancia del modal
    const requestResetForm = document.getElementById('requestResetForm');
    const resetResponseMessage = document.getElementById('resetResponseMessage');

    // Manejo del formulario de inicio de sesión
    if (loginForm) {
        loginForm.addEventListener('submit', async function(event) {
            event.preventDefault(); // Evita el envío tradicional del formulario

            const formData = new FormData(loginForm); // Recoge los datos del formulario

            responseMessage.textContent = 'Iniciando sesión...';
            responseMessage.style.color = '#007bff'; // Color de carga

            try {
                const response = await fetch('./backend/login.php', { // Ruta a tu script PHP de login
                    method: 'POST',
                    body: formData
                });

                const data = await response.json(); // Espera la respuesta JSON del servidor

                if (data.success) {
                    responseMessage.textContent = data.message;
                    responseMessage.style.color = 'green';
                    // Redirigir al usuario después de un inicio de sesión exitoso
                    setTimeout(() => {
                        window.location.href = 'dashboard.html'; // O la página a la que quieres redirigir
                    }, 1500);
                } else {
                    responseMessage.textContent = data.message;
                    responseMessage.style.color = 'red';
                }
            } catch (error) {
                console.error('Error:', error);
                responseMessage.textContent = 'Hubo un problema al conectar con el servidor.';
                responseMessage.style.color = 'red';
            }
        });
    }

    // Manejo del enlace "¿olvidaste tu contraseña?"
    if (forgotPasswordLink) {
        forgotPasswordLink.addEventListener('click', function(event) {
            event.preventDefault();
            resetPasswordModal.show(); // Muestra el modal de restablecimiento
        });
    }

    // Manejo del formulario de solicitud de restablecimiento de contraseña dentro del modal
    if (requestResetForm) {
        requestResetForm.addEventListener('submit', async function(event) {
            event.preventDefault();

            const formData = new FormData(requestResetForm);

            resetResponseMessage.textContent = 'Enviando solicitud...';
            resetResponseMessage.style.color = '#007bff';

            try {
                const response = await fetch('./backend/request_password_reset.php', { // Ruta a tu script PHP
                    method: 'POST',
                    body: formData
                });

                const data = await response.json();

                if (data.success) {
                    resetResponseMessage.textContent = data.message;
                    resetResponseMessage.style.color = 'green';
                    // Opcional: cerrar el modal después de un tiempo
                    setTimeout(() => {
                        resetPasswordModal.hide();
                    }, 3000);
                } else {
                    resetResponseMessage.textContent = data.message;
                    resetResponseMessage.style.color = 'red';
                }
            } catch (error) {
                console.error('Error:', error);
                resetResponseMessage.textContent = 'Hubo un problema al conectar con el servidor.';
                resetResponseMessage.style.color = 'red';
            }
        });
    }
});

lockBtn = document.querySelectorAll('.lock');
passwordInput = document.getElementById('password');
confirmPasswordInput = document.getElementById('confirm-password');

lockBtn.forEach(lock => {
    lock.addEventListener('click', () => {
        lock.classList.toggle('lock');
        if (!lock.classList.contains('lock')) {
            lockBtn.forEach(lockk => {
                lockk.style.opacity = '1';  
            })
            passwordInput.type = 'text';
            confirmPasswordInput.type = 'text';
        } else {
            lockBtn.forEach(lockk => {
                lockk.style.opacity = '1';
            })
            passwordInput.type = 'password';
            confirmPasswordInput.type = 'password';
        }
    })
});