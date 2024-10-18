// Escuchar el evento de clic en el botón de "Log in"
document.getElementById('login-toggle').addEventListener('click', function() {
    const signupForm = document.getElementById('signup-form');
    const loginForm = document.getElementById('login-form');

    // Ocultar el formulario de registro
    signupForm.classList.remove('active');
    signupForm.classList.add('hidden');

    // Mostrar el formulario de inicio de sesión
    setTimeout(() => {
        loginForm.classList.add('active');
        loginForm.classList.remove('hidden');
    }, 500); // Tiempo de la animación
});

// Escuchar el evento de clic en el botón de "Sign up"
document.getElementById('signup-toggle').addEventListener('click', function() {
    const signupForm = document.getElementById('signup-form');
    const loginForm = document.getElementById('login-form');

    // Ocultar el formulario de inicio de sesión
    loginForm.classList.remove('active');
    loginForm.classList.add('hidden');

    // Mostrar el formulario de registro
    setTimeout(() => {
        signupForm.classList.add('active');
        signupForm.classList.remove('hidden');
    }, 500); // Tiempo de la animación
});
