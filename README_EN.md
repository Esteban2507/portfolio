# Esteban Gabrielloni · Finance Automation & AI

I work in payment controls and approvals. I design workflows that apply validation rules, surface exceptions and reduce manual review in finance operations.

[Portfolio](https://esteban2507.github.io/portfolio/) · [CV](https://esteban2507.github.io/CV-Esteban/en_version.html) · [LinkedIn](https://www.linkedin.com/in/egabrielloni) · [Español](README.md)

## Featured case studies

| Case | Process and result |
| --- | --- |
| [Payment Control Automation](pages/Proyecto1.html) | Power BI, Power Query and DAX cross-check reports and flag discrepancies. I spent about 60% less time on the payment checks I had previously done by visual comparison. |
| [Invoice Reconciliation Agent](pages/agente-conciliacion-facturas-detalle.html) | A Copilot Studio agent coordinates report preparation and reconciliation. The flows record matches and exceptions for human review. |
| [Accounting Validation with VBA](pages/Proyecto3.html) | Excel and VBA apply repeatable checks when comparing reports and flag discrepancies for review. |

The finance case studies describe the workflows with conceptual diagrams. The agent case is anonymized. The project library includes additional work in data, controls and automation.

## Interactive demos

The three demos have a Spanish interface and use the visitor's API key. Running a request sends the input to the selected AI provider. Use synthetic or public data.

| Project | Details | Demo |
| --- | --- | --- |
| AI Data Explorer | [Read project details](pages/explorador-datos-detalle.html) | [Open demo](pages/explorador-datos.html) |
| Executive Report Generator | [Read project details](pages/generador-reportes-detalle.html) | [Open demo](pages/generador-reportes.html) |
| AI Invoice Auditor | [Read project details](pages/auditor-facturas-detalle.html) | [Open demo](pages/auditor-facturas.html) |

## Local development

The homepage and project pages use HTML, CSS and vanilla JavaScript. GitHub Pages serves the static files directly. The AI demos load their dependencies from a CDN.

```sh
python3 -m http.server 8000
```

Open `http://localhost:8000/` to explore the site. The guestbook under Contact saves messages in the browser with `localStorage`.

- `index.html` and `Estilo.css` define the homepage and shared styles.
- `pages/` contains the project details and demos.
- `guestbook.js` handles local guestbook entries.
- `carrusel.html` preserves the alternative project view.
- `sitemap.xml` and `robots.txt` describe the public routes for search engines.
