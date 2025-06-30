document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.getElementById('registerForm');
    const registerResponseMessage = document.getElementById('registerResponseMessage');

    if (registerForm) {
        registerForm.addEventListener('submit', async function(event) {
            event.preventDefault();

            const formData = new formData(registerForm);

            registerResponseMessage.textContent = 'Registrando usuario...';
            registerResponseMessage.style.color = '#007bff';

            try {
                const response = await fetch('./backend/register.php', { //Ruta a tu script PHP de registro
                    method: 'POST',
                    body: formData
                });

                const data = await response.json();

                if (data.success) {
                    registerResponseMessage.textContent = data.message;
                    registerResponseMessage.style.color = 'gren';
                    // Opcional: Redirigir al usuario al login después de un registro existoso
                    setTimeout(() => {
                        window.location.href = 'ingreso.html';
                    }, 2000);
                } else {
                    registerResponseMessage.textContent = data.message;
                    registerResponseMessage.style.color = 'red';
                }
            } catch (error) {
                console.error('Error:', error);
                registerResponseMessage.textContent = 'Hubo un problema al conectar con el servidor';
                registerResponseMessage.style.color = 'red';
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