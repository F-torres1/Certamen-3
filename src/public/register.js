// Elemento para mostrar errores
const mensajeError = document.getElementsByClassName("error")[0];

// Agregar evento al formulario de registro
document.getElementById("register-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    
    // Capturar datos del formulario
    const user = e.target.user.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    // Validar campos
    if (!user || !email || !password) {
        mensajeError.textContent = "Todos los campos son obligatorios";
        mensajeError.classList.remove("escondido");
        return;
    }

    // Enviar solicitud al servidor
    try {
        const res = await fetch("/api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ user, email, password })
        });

        if (!res.ok) {
            mensajeError.textContent = "Error en el registro. Por favor, intenta nuevamente.";
            mensajeError.classList.remove("escondido");
            return;
        }

        const resJson = await res.json();

        if (resJson.redirect) {
            window.location.href = resJson.redirect;
        }
    } catch (error) {
        mensajeError.textContent = "Ocurrió un error. Por favor, intenta nuevamente.";
        mensajeError.classList.remove("escondido");
    }
});
