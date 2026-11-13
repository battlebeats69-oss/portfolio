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

// Los proyectos adicionales se abren sin impedir el acceso si JavaScript falla.
const botonProyectos = document.getElementById("toggle-proyectos");
const panelProyectos = document.getElementById("mas-proyectos");
if (botonProyectos && panelProyectos) {
  panelProyectos.inert = true;
  panelProyectos.setAttribute("aria-hidden", "true");
  document.documentElement.classList.add("js");
  botonProyectos.addEventListener("click", () => {
    const abierto = botonProyectos.getAttribute("aria-expanded") !== "true";
    botonProyectos.setAttribute("aria-expanded", String(abierto));
    botonProyectos.querySelector("span").textContent = abierto ? "Ocultar proyectos" : "Ver otros 6 proyectos";
    panelProyectos.classList.toggle("is-open", abierto);
    panelProyectos.inert = !abierto;
    panelProyectos.setAttribute("aria-hidden", String(!abierto));
  });
}

// Los naipes responden al puntero con una inclinación suave.
const permiteCartas3D = window.matchMedia("(pointer: fine) and (prefers-reduced-motion: no-preference)");
const cartas3D = [...document.querySelectorAll(".playing-card")];
const enderezarCarta = (carta) => {
  carta.style.setProperty("--tilt-x", "0deg");
  carta.style.setProperty("--tilt-y", "0deg");
  carta.style.setProperty("--glint-x", "50%");
  carta.style.setProperty("--glint-y", "0%");
};
cartas3D.forEach((carta) => {
  carta.addEventListener("pointermove", (evento) => {
    if (!permiteCartas3D.matches) return;
    const caja = carta.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (evento.clientX - caja.left) / caja.width));
    const y = Math.max(0, Math.min(1, (evento.clientY - caja.top) / caja.height));
    carta.style.setProperty("--tilt-x", `${((.5 - y) * 6).toFixed(2)}deg`);
    carta.style.setProperty("--tilt-y", `${((x - .5) * 6).toFixed(2)}deg`);
    carta.style.setProperty("--glint-x", `${Math.round(x * 100)}%`);
    carta.style.setProperty("--glint-y", `${Math.round(y * 100)}%`);
  }, { passive: true });
  carta.addEventListener("pointerleave", () => enderezarCarta(carta));
  carta.addEventListener("pointercancel", () => enderezarCarta(carta));
});
permiteCartas3D.addEventListener("change", () => cartas3D.forEach(enderezarCarta));

// El modal de Bootstrap amplía el naipe elegido sin duplicar su contenido a mano.
const modalNaipes = document.getElementById("modal-naipes");
modalNaipes?.addEventListener("show.bs.modal", (evento) => {
  const carta = evento.relatedTarget?.closest(".playing-card");
  if (!carta) return;
  const copia = carta.cloneNode(true);
  copia.querySelector(".playing-card-open")?.remove();
  copia.style.removeProperty("--tilt-x");
  copia.style.removeProperty("--tilt-y");
  document.getElementById("modal-naipes-detalle").replaceChildren(copia);
  document.getElementById("modal-naipes-titulo").textContent = carta.querySelector("h3").textContent;
});

// Cada grupo visible participa en el cambio de escena; los títulos usan nodos reales.
const escenas = [
  { id: "inicio", origen: ".scroll-cue", piezas: ".eyebrow, .hero-title, .hero-lead, .hero-description, .hero-section .btn, .hero-links, .hero-art, .hero-caption, .scroll-cue" },
  { id: "sobre-mi", origen: ".metric-label", piezas: ".section-kicker, .section-heading, .about-intro, .body-muted, .metric" },
  { id: "habilidades", origen: ".extra-skill strong", piezas: ".section-kicker, .section-heading, .row.align-items-end .body-muted, .playing-card, .extra-skill" },
  { id: "proyectos", origen: ".project-grid-tools .project-tile:last-child .card-title", piezas: ".row.align-items-end .section-kicker, .section-heading, .row.align-items-end .text-link, .container > .body-muted, .project-card, .more-projects-control" },
  { id: "trayectoria", origen: ".timeline-item h4", piezas: ".section-kicker, .section-heading, .section-column-heading, .timeline-item, .note-line" },
  { id: "contacto", piezas: ".section-kicker, .section-heading, .col-lg-5 > .body-muted, .contact-method, .contact-form-wrap" }
].map(({ id, origen, piezas }) => {
  const seccion = document.getElementById(id);
  if (!seccion) return null;
  const titulos = origen ? seccion.querySelectorAll(origen) : [];
  return { seccion, origen: titulos[titulos.length - 1], piezas: [...seccion.querySelectorAll(piezas)] };
}).filter(Boolean);

if (escenas.length > 1) {
  const movimientoReducido = window.matchMedia("(prefers-reduced-motion: reduce)");
  let activo = null;
  let pendienteEscena = false;
  const limitar = (valor, minimo, maximo) => Math.min(maximo, Math.max(minimo, valor));
  const suavizar = (inicio, fin, valor) => {
    const t = limitar((valor - inicio) / (fin - inicio), 0, 1);
    return t * t * (3 - 2 * t);
  };
  const geometria = (pieza) => {
    const caja = pieza.getBoundingClientRect();
    return { x: caja.left + scrollX, y: caja.top + scrollY, ancho: caja.width, alto: caja.height };
  };
  const limpiar = (pieza) => {
    pieza.style.transform = "";
    pieza.style.opacity = "";
    pieza.style.transformOrigin = "";
    pieza.style.willChange = "";
  };
  const restaurarEscena = () => {
    if (!activo) return;
    activo.anterior.piezas.forEach(limpiar);
    activo.siguiente.piezas.forEach(limpiar);
    limpiar(activo.origen);
    limpiar(activo.destino);
    activo.anterior.seccion.classList.remove("scene-transitioning");
    activo.siguiente.seccion.classList.remove("scene-transitioning");
    activo = null;
  };
  const animarGrupo = (pieza, avance, entra) => {
    pieza.style.transform = `translate3d(0, ${(entra ? 14 * (1 - avance) : -14 * avance)}px, 0) scale(${entra ? .98 + .02 * avance : 1 - .02 * avance})`;
    pieza.style.opacity = String(entra ? avance : 1 - avance);
    pieza.style.willChange = "transform, opacity";
  };
  const animarTitulo = (pieza, desde, hasta, progreso, entra) => {
    const avance = suavizar(0, 1, progreso);
    const escalaDestino = limitar(Math.sqrt((hasta.ancho * hasta.alto) / Math.max(1, desde.ancho * desde.alto)), .98, 1.02);
    const escala = entra ? 1 / escalaDestino + (1 - 1 / escalaDestino) * avance : 1 + (escalaDestino - 1) * avance;
    const factor = entra ? avance - 1 : avance;
    pieza.style.transformOrigin = "top left";
    pieza.style.transform = `translate3d(${limitar(hasta.x - desde.x, -24, 24) * factor}px, ${limitar(hasta.y - desde.y, -24, 24) * factor}px, 0) scale(${escala})`;
    pieza.style.opacity = String(entra ? progreso : 1 - progreso);
    pieza.style.willChange = "transform, opacity";
  };

  const dibujarEscena = () => {
    pendienteEscena = false;
    if (movimientoReducido.matches) { restaurarEscena(); return; }
    const alto = innerHeight;
    const indice = escenas.findIndex(({ seccion }, i) => i > 0 && seccion.getBoundingClientRect().top < alto * .78 && seccion.getBoundingClientRect().top > alto * .22);
    if (indice < 1) { restaurarEscena(); return; }
    const anterior = escenas[indice - 1];
    const siguiente = escenas[indice];
    if (anterior.seccion.contains(document.activeElement) || siguiente.seccion.contains(document.activeElement)) { restaurarEscena(); return; }
    if (activo?.indice !== indice) {
      restaurarEscena();
      const ultimoProyectoVisible = anterior.seccion.id === "proyectos"
        ? [...anterior.seccion.querySelectorAll(".project-card")].filter((carta) => getComputedStyle(carta).visibility !== "hidden").at(-1)
        : null;
      const origen = ultimoProyectoVisible?.querySelector(".card-title") || anterior.origen;
      const destino = siguiente.seccion.querySelector(".section-heading");
      if (!origen || !destino) return;
      activo = { indice, anterior, siguiente, origen, destino, desde: geometria(origen), hasta: geometria(destino) };
      anterior.seccion.classList.add("scene-transitioning");
      siguiente.seccion.classList.add("scene-transitioning");
    }
    const borde = siguiente.seccion.getBoundingClientRect().top;
    const progreso = limitar((alto * .78 - borde) / (alto * .56), 0, 1);
    anterior.piezas.filter((pieza) => getComputedStyle(pieza).visibility !== "hidden").forEach((pieza, i) => {
      if (pieza === activo.origen || pieza.contains(activo.origen)) return;
      animarGrupo(pieza, suavizar(i * .008, 1 + i * .008, progreso), false);
    });
    siguiente.piezas.filter((pieza) => getComputedStyle(pieza).visibility !== "hidden").forEach((pieza, i) => {
      if (pieza === activo.destino) return;
      animarGrupo(pieza, suavizar(i * .008, 1 + i * .008, progreso), true);
    });
    animarTitulo(activo.origen, activo.desde, activo.hasta, progreso, false);
    animarTitulo(activo.destino, activo.desde, activo.hasta, progreso, true);
  };
  const pedirEscena = () => {
    if (pendienteEscena) return;
    pendienteEscena = true;
    requestAnimationFrame(dibujarEscena);
  };
  addEventListener("scroll", pedirEscena, { passive: true });
  addEventListener("resize", () => { restaurarEscena(); pedirEscena(); }, { passive: true });
  movimientoReducido.addEventListener("change", pedirEscena);
  pedirEscena();
}

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
