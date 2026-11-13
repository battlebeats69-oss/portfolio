"use strict";

// Mantiene la navegación móvil despejada tras elegir una sección.
document.querySelectorAll("#menu-principal .nav-link").forEach((enlace) => {
  enlace.addEventListener("click", () => {
    const menu = document.getElementById("menu-principal");
    if (menu && menu.classList.contains("show") && window.bootstrap) {
      window.bootstrap.Collapse.getOrCreateInstance(menu).hide();
    }
  });
});

// Si la captura remota de RuleBug no está disponible, utiliza una imagen local.
document.querySelectorAll("img[data-fallback]").forEach((imagen) => {
  imagen.addEventListener("error", () => {
    const respaldo = imagen.dataset.fallback;
    if (respaldo && !imagen.src.endsWith(respaldo)) {
      imagen.src = respaldo;
    }
  });
});

// La entrega 2 exige validación. Ya se incluye, sin backend ni recogida de datos.
const formulario = document.getElementById("formulario-contacto");
if (formulario) {
  formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();
    formulario.classList.add("was-validated");
    if (!formulario.checkValidity()) {
      formulario.querySelector(":invalid")?.focus();
      document.getElementById("estado-formulario").textContent = "Revisa los campos marcados antes de continuar.";
      return;
    }
    const datos = new FormData(formulario);
    const nombre = String(datos.get("nombre") || "").trim();
    const email = String(datos.get("email") || "").trim();
    const asunto = String(datos.get("asunto") || "").trim();
    const mensaje = String(datos.get("mensaje") || "").trim();
    const cuerpo = `Nombre: ${nombre}\nCorreo: ${email}\n\n${mensaje}`;
    const destino = `mailto:aledelaosa100@gmail.com?subject=${encodeURIComponent(asunto)}&body=${encodeURIComponent(cuerpo)}`;
    document.getElementById("estado-formulario").textContent = "Se abrirá tu aplicación de correo para revisar y enviar el mensaje.";
    window.location.href = destino;
  });
}
