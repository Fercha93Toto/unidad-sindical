<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Unidad Sindical</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" integrity="sha512-Fo3rlrZj/k7ujTnHg4CGR2D7kSs0V4LLanw2qksKfRzC/w1q8a97yB/bX2N1C2i5l12qCg9YwW4tP2Fp3jQ==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script> <link rel="stylesheet" href="./style/ingreso.css">
    <link rel="stylesheet" href="./style/ingreso.css">

    <link href="./img/Logo.png" rel="icon">

</head>
<body>
   

    <section class="login-container">
        <a class="link" href="index.html">
            <div class="logo-container">
                <img src="./img/Logo.png" alt="logo" class="logo">
            </div>
        </a>
        <h2>UNIDAD SINDICAL</h2>
        <form id="loginForm" class="login-form" action="Ingreso-conexion.php" method="post">
            <div class="input-group">
                <label for="username">Nombre del usuario</label>
                <input type="text" id="username" name="username" placeholder="Ingresa tu nombre de usuario" required>
            </div>

            <div class="input-group">
                <label for="password">Contraseña</label>
                <input type="password" id="password" name="password" placeholder="Ingresa tu contraseña" required>
                <img class="input-icons lock" src="./img/eye.png" alt="user">
            </div>

            <button type="submit" class="btn btn-danger mb-4">Iniciar sesión</button>  
                <div id="loginResponseMessage" class="message"></div> 

            <div id="responseMessage" class="message"></div>

                <div class="forgot-password">
                    <a href="#" id="forgotPasswordLink">¿Olvido su contraseña?</a>
                </div>
                <div class="register">
                    <a href="registro.html">Registrarse</a>
                </div>
            </form>
        </section>

        <div class="modal fade" id="resetPasswordModal" tabindex="-1" aria-labelladby="resetPasswordModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="resetPasswordModalLabel">Restablecer Contraseña</h5>
                        <button type="buttom" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form id="requestResetForm">
                            <div class="mb-3">
                                <label for="resetEmail" class="form-label">Correo Electrónico</label>
                                <input type="email" class="form-control" id="resetEmail" name="email" placeholder="Ingresa tu correo electrónico" required> 
                            </div>



                            <div id="resetResponseMessage" class="message">
                            <buttom type="submit" class="btn btn-danger">Enviar enlace de restablecimiento</buttom>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>

    </main>

        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
        <script src="./js/ingreso.js"></script>






</body>
</html>