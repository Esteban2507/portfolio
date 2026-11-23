# Esteban Gabrielloni · Finance Automation & AI

Trabajo en controles y aprobaciones de pagos. Diseño flujos que aplican reglas de validación, señalan excepciones y reducen la revisión manual en procesos financieros.

[Portfolio](https://esteban2507.github.io/portfolio/) · [CV](https://esteban2507.github.io/CV-Esteban/) · [LinkedIn](https://www.linkedin.com/in/egabrielloni) · [English](README_EN.md)

## Casos destacados

| Caso | Proceso y resultado |
| --- | --- |
| [Control de pagos](pages/Proyecto1.html) | Power BI, Power Query y DAX cruzan reportes y señalan diferencias. Las verificaciones que antes hacía de forma visual me llevaron aproximadamente un 60% menos de tiempo. |
| [Agente de conciliación de facturas](pages/agente-conciliacion-facturas-detalle.html) | Un agente de Copilot Studio coordina la preparación de reportes y la conciliación. Los flujos registran las coincidencias y las excepciones para revisión humana. |
| [Validación contable con VBA](pages/Proyecto3.html) | Excel y VBA aplican verificaciones repetibles al cruce de reportes y marcan diferencias para revisión. |

Las fichas financieras describen el proceso con diagramas conceptuales. El agente es un caso de estudio anonimizado. La biblioteca de proyectos contiene otras fichas de datos, controles y automatización.

## Demos interactivas

Las tres demos tienen interfaz en español y usan una clave API del visitante. Al ejecutar una consulta, la información que ingreses se envía al proveedor de IA que elijas. Usá datos sintéticos o públicos.

| Proyecto | Ficha | Demo |
| --- | --- | --- |
| Explorador de Datos con IA | [Ficha](pages/explorador-datos-detalle.html) | [Abrir demo](pages/explorador-datos.html) |
| Generador de Reportes Ejecutivos | [Ficha](pages/generador-reportes-detalle.html) | [Abrir demo](pages/generador-reportes.html) |
| Auditor de Facturas con IA | [Ficha](pages/auditor-facturas-detalle.html) | [Abrir demo](pages/auditor-facturas.html) |

## Desarrollo local

La portada y las fichas usan HTML, CSS y JavaScript nativo. GitHub Pages sirve los archivos estáticos directamente. Las demos de IA cargan sus dependencias desde una CDN.

```sh
python3 -m http.server 8000
```

Abrí `http://localhost:8000/` para recorrer el sitio. El libro de firmas de Contact guarda los mensajes en el navegador con `localStorage`.

- `index.html` y `Estilo.css` definen la portada y sus estilos compartidos.
- `pages/` contiene las fichas de proyectos y las demos.
- `guestbook.js` administra el libro de firmas local.
- `carrusel.html` conserva la vista alternativa de proyectos.
- `sitemap.xml` y `robots.txt` definen las rutas públicas para buscadores.
