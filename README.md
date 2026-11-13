# Portfolio profesional — Alejandro de la Osa Ollé

Portfolio personal realizado para **UD6 — Entrega 1**, sobre Bootstrap 5.3. Contiene presentación, habilidades, seis proyectos reales publicados en RuleBug, trayectoria y contacto.

## Web publicada y repositorio

- **GitHub Pages:** https://XXXX12300.github.io/portfolio/  
  *(La URL funcionará cuando subas estos archivos al repositorio público `portfolio` y actives GitHub Pages.)*
- **Repositorio:** https://github.com/XXXX12300/portfolio
- **Librería de proyectos RuleBug:** https://rulebug.es/libreria

## Tecnologías

- HTML5 semántico y accesible.
- Bootstrap **5.3.6** por CDN (rejilla, utilidades, navbar, cards, badges y formulario).
- Bootstrap Icons por CDN.
- CSS propio en `css/estilos.css` (sin estilos en línea).
- JavaScript en `js/main.js` (navbar, respaldo de imágenes y contacto por `mailto:`).
- Imágenes SVG locales para identidad y respaldo de capturas.

## Estructura del proyecto

```text
portfolio/
├── index.html
├── css/
│   └── estilos.css
├── js/
│   └── main.js
├── img/
│   ├── avatar.svg
│   ├── favicon.svg
│   └── [6 imágenes de respaldo].svg
├── docs/
│   ├── cv.pdf
│   ├── proyectos/
│   │   └── [6 fichas técnicas].md
│   └── evidencias/
│       └── README.md
└── README.md
```

Las **capturas reales** de las tarjetas se obtienen de los recursos gráficos publicados en `rulebug.es`. Si alguna no carga, se sustituye automáticamente por una ilustración SVG local. Para la **entrega 2** conviene descargar las capturas autorizadas, convertirlas a WebP optimizado (menos de 300 KB) y guardarlas en `img/` para eliminar la dependencia externa.

## Proyectos y código fuente

Los seis proyectos mostrados figuran en la librería pública de RuleBug. Sus demos están enlazadas de forma individual. **No se ha supuesto que su código sea abierto:** los enlaces de GitHub de cada tarjeta apuntan a una **ficha técnica pública de este mismo repositorio**, no al código privado de producción. Si más adelante compartes un repositorio público específico, cambia el enlace de la tarjeta correspondiente.

## Cómo publicarlo en GitHub Pages

1. Crea en tu cuenta `XXXX12300` un repositorio público llamado **`portfolio`**.
2. Sube **el contenido de esta carpeta** a la raíz del repositorio: `index.html` debe verse directamente en la portada de GitHub.
3. Entra en **Settings → Pages → Build and deployment**.
4. En **Source**, selecciona **Deploy from a branch**; en **Branch**, selecciona `main` y `/ (root)`; guarda.
5. Comprueba que abre `https://XXXX12300.github.io/portfolio/` y que las imágenes, enlaces y el PDF funcionan.
6. Abre la pestaña **Commits**, entra en el último commit antes de la fecha límite y copia su URL para la entrega UD6.

## Controles de calidad

- Comprobar 375, 768 y 1200 px en Chrome DevTools.
- Pasar HTML por https://validator.w3.org/ .
- Para la UD7: validar CSS, usar Lighthouse en modo móvil, WAVE y WebAIM Contrast Checker.
- **No se declaran como superadas pruebas online que no se han ejecutado**. Añade capturas en `docs/evidencias/` después de verificarlas.
- Formulario: usa validación nativa/Bootstrap y abre el gestor de correo; no usa servidor, base de datos ni almacena datos.

## Paleta de marca

| Uso | Color |
| --- | --- |
| Fondo oscuro | `#11151D` |
| Fondo claro | `#FFFFFF` |
| Fondo secundario | `#F5F6F8` |
| Texto oscuro | `#18202B` |
| Marca y enlaces claros sobre fondo claro | `#B42339` |
| Acento sobre fondo oscuro | `#FF9D93` |

Relaciones calculadas por la fórmula WCAG (son valores orientativos; confirma todas las combinaciones con WebAIM en UD7):

| Texto | Fondo | Contraste |
| --- | --- | ---: |
| `#B42339` | `#FFFFFF` | **6,48:1** |
| `#A82035` | `#FFFFFF` | **7,18:1** |
| `#545E6B` | `#F5F6F8` | **6,09:1** |
| `#FF9D93` | `#11151D` | **9,14:1** |
| `#C7CED9` | `#11151D` | **11,54:1** |

**Pendiente para UD7:** verificar y registrar la totalidad de combinaciones con WebAIM y adjuntar capturas reales de calidad.

## Información que conviene revisar

- El botón de **LinkedIn** lleva a un directorio de búsqueda, porque no se ha confirmado un enlace al perfil personal exacto. Sustitúyelo cuando lo tengas.
- El CV PDF contiene datos profesionales conocidos, sin teléfono ni dirección personal; revísalo antes de utilizarlo en candidaturas.
- La fecha de última actualización se indica de forma explícita en el footer; cámbiala al modificar el contenido.

## Uso de IA

Se utilizó ChatGPT como apoyo para redactar, organizar, generar y revisar una primera versión de HTML, CSS, JavaScript y documentación. La persona autora es responsable de verificar sus datos, comprender el código, revisarlo, probarlo y validar el resultado final antes de la entrega.
