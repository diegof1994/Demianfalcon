# Demian Borello Falcón · El Cambio de Raíz

Sitio de campaña presidencial 2027 — Movimiento Nuevo Paradigma.

**Stack:** React 19 + TypeScript · Vite · Tailwind CSS 4 · Framer Motion · Lucide React

## Desarrollo

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # genera /dist
```

## Dónde se edita el contenido

Todo el contenido está separado del diseño, en `src/data/`:

| Archivo | Contenido |
|---|---|
| `campaign.ts` | Candidato, movimiento, slogan, mail, redes, frases, menú |
| `plan.ts` | Ideas fuerza, 11 pilares, vías, paquete Día Uno, cronograma, indicadores y riesgos |
| `tokeniza.ts` | Sección Argentina Tokeniza y Convocatoria Nacional (kit de emergencia) |
| `federal.ts` | Las 24 jurisdicciones del mapa |

Colores y tipografías: `src/index.css` (bloque `@theme`).
Imágenes: `public/img/`. PDF del plan: `public/plan-maestro-de-gobierno.pdf`.

## Deploy

Render (Static Site): build `npm ci && npm run build`, publish `dist`. Cada push a `main` redespliega solo.
