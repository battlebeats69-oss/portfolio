# Portfolio profesional — Alejandro de la Osa Ollé

Portfolio personal realizado para **UD6 — Entrega 1**, sobre Bootstrap 5.3. Contiene presentación, habilidades, diez proyectos publicados en RuleBug, trayectoria y contacto. Las cuatro herramientas aparecen primero; los otros seis proyectos se abren a demanda.

## Web publicada y repositorio

- **GitHub Pages:** https://battlebeats69-oss.github.io/portfolio/  
- **GitHub:** https://github.com/battlebeats69-oss/portfolio
- **Librería de proyectos RuleBug:** https://rulebug.es/libreria

## Tecnologías

- HTML5 semántico y accesible.
- Bootstrap **5.3.6** por CDN (rejilla, utilidades, navbar, cards, badges y formulario).
- Bootstrap Icons por CDN.
- CSS propio en `css/estilos.css` (sin estilos en línea), con tipografías Syne y DM Sans.
- JavaScript en `js/main.js` (navbar, fundido suave entre secciones, desplegable de proyectos, respaldo de imágenes y contacto por `mailto:`).
- Retrato local `img/alejandro-de-la-osa.webp` e imágenes SVG de respaldo para capturas.

## Estructura del proyecto

```text
portfolio/
├── index.html
├── css/
│   └── estilos.css
├── js/
│   └── main.js
├── img/
│   ├── alejandro-de-la-osa.webp
│   ├── avatar.svg
│   ├── favicon.svg
│   └── [9 imágenes de respaldo].svg
├── docs/
│   ├── cv.pdf
│   ├── proyectos/
│   │   └── [6 fichas técnicas].md
│   └── evidencias/
│       └── README.md
└── README.md
```

Las capturas externas dependen de `rulebug.es`; los SVG locales sirven de respaldo.

## Proyectos y código fuente

Los diez proyectos mostrados figuran en la librería pública de RuleBug. Cada tarjeta enlaza una demo. **No se ha supuesto que su código sea abierto:** las seis fichas técnicas locales existentes siguen en `docs/proyectos/`, sin presentar el código privado de producción como público.

## Paleta de marca

| Uso | Color |
| --- | --- |
| Fondo general | `#12141B` |
| Fondo de secciones | `#171A22` |
| Paneles | `#242832` |
| Texto principal | `#F7F4F1` |
| Marca | `#B42339` |
| Acento sobre fondo oscuro | `#FFAAA1` |

Relaciones calculadas por la fórmula WCAG (son valores orientativos; confirma todas las combinaciones con WebAIM en UD7):

| Texto | Fondo | Contraste |
| --- | --- | ---: |
| `#F7F4F1` | `#171A22` | **15,87:1** |
| `#C8CBD4` | `#171A22` | **10,73:1** |
| `#FFAAA1` | `#171A22` | **9,54:1** |
| `#F7F4F1` | `#242832` | **13,45:1** |
| `#FFAAA1` | `#242832` | **8,08:1** |

Las pruebas de Lighthouse, WAVE y los validadores CSS no están registradas en `docs/evidencias/`.

## Uso de IA

ChatGPT intervino en el estilo, efectos y funciones decorativas de JavaScript. Esta versión no supera el límite aproximado del 10 % de uso de IA de la tarea.
