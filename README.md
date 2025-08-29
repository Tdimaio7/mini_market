# mini_market
Instrucciones de Vibes Test
REQUERIMIENTO – TEST RÁPIDO “MINI-MARKET”
------------------------------------------------------------
0) Resumen
------------------------------------------------------------
El objetivo es realizar una prueba rápida (24 horas) en un repositorio, usando el stack TypeScript + Next.js + Express.js + MongoDB opcional. 
El reto simula la creación de un mini marketplace con un backend simple, frontend en Next.js y un algoritmo utilitario. 
Se busca evaluar APIs, consumo de JSON, UI con maquetación simple, uso de control de versiones (Git) y claridad en la documentación.

------------------------------------------------------------
1) Objetivos
------------------------------------------------------------
1. Implementar una API con Express (TS) que devuelva productos (listado y detalle).
2. Implementar páginas en Next.js (TS): /products (lista) y /products/[id] (detalle).
3. Crear un algoritmo utilitario en TS para obtener los productos más baratos disponibles.
4. Maquetar UI básica según mock textual (cards y detalle).
5. Usar Git y compartirnos el repositorio para la Evaluación.
6. Documentar decisiones y pendientes en un README propio.
7. Opcional: persistencia en MongoDB y/o tests unitarios.

------------------------------------------------------------
2) Estructura de Repositorio sugerida
------------------------------------------------------------
/api
  ├─ src/
  │   ├─ index.ts
  │   ├─ products.router.ts
  │   ├─ data/products.json
  │   └─ types.ts
  ├─ package.json
  └─ tsconfig.json

/web
  ├─ app/
  │   ├─ products/page.tsx
  │   └─ products/[id]/page.tsx
  ├─ lib/api.ts
  ├─ components/ProductCard.tsx
  ├─ package.json
  └─ tsconfig.json

/shared
  └─ types.ts

README.md (este archivo con instrucciones)

------------------------------------------------------------
3) API – Express + TS
------------------------------------------------------------
Endpoints requeridos:
- GET /api/products?search=&sort=price|name&order=asc|desc&page=1&limit=10&available=true|false
- GET /api/products/:id

JSON de ejemplo (products.json):
[
  { "id": "p1", "name": "Guantes GN102", "price": 59.9, "isAvailable": true, "category": "gloves", "image": "/img/gn102.jpg" },
  { "id": "p2", "name": "Casco CS433",  "price": 79.9, "isAvailable": false, "category": "headgear", "image": "/img/cs433.jpg" },
  { "id": "p3", "name": "Bolsa AC990",   "price": 24.5, "isAvailable": true, "category": "bag", "image": "/img/ac990.jpg" }
]

------------------------------------------------------------
4) Web – Next.js + TS
------------------------------------------------------------
Páginas requeridas:
- /products: lista con buscador, sort, filtro por disponibilidad, paginación.
- /products/[id]: detalle con imagen, precio, estado (en stock/sin stock).

Mock UI:
- Card: imagen (200x200), nombre (16px, semibold), precio (14px), badge “En stock” (verde) o “Sin stock” (gris).
- Lista: grid responsive min 250px, gap 16px.
- Detalle: imagen grande, título 20px, precio 18px, botón “Agregar a favoritos” (sin lógica real).

------------------------------------------------------------
5) Algoritmo utilitario
------------------------------------------------------------
Función getTopCheapestAvailable(products, top=3) que:
- Filtra productos con stock disponible.
- Ordena por precio ascendente.
- Devuelve los N más baratos (default 3).

------------------------------------------------------------
6) Git-flow mínimo
------------------------------------------------------------
- Crear rama feature/api → implementar API → PR a main.
- Crear rama feature/web → implementar frontend → PR a main.
- Mensajes claros: feat(api): list & detail, feat(web): products page, chore: readme decisions.

------------------------------------------------------------
7) Scripts sugeridos
------------------------------------------------------------
API:
cd api
npm i
npm run dev   # arranca en :3001

WEB:
cd web
npm i
npm run dev   # arranca en :3000

Variables:
NEXT_PUBLIC_API_BASE=http://localhost:3001

------------------------------------------------------------
8) Opcional (Mongo)
------------------------------------------------------------
- Crear seed.ts para cargar products.json en colección “products”.
- Router Express puede leer desde Mongo en lugar de JSON.

------------------------------------------------------------
9) Criterios de Evaluación (100 pts)
------------------------------------------------------------
- API funcional (25)
- Web funcional (25)
- TS & Calidad (15)
- Algoritmo util (10)
- Git-flow (10)
- UX/UI básica (10)
- README/documentación (5)
- Bonus: Mongo, tests, extras (+5)

------------------------------------------------------------
10) Entregables
------------------------------------------------------------
- API funcional en carpeta /api
- Web funcional en carpeta /web
- Tipos en carpeta /shared
- README propio (candidato) con instrucciones, decisiones y pendientes
- Commits en Git con historia clara

------------------------------------------------------------
11) Notas finales
------------------------------------------------------------
- Priorizar API → Web → Algoritmo → Opcional Mongo.
- Si no alcanza el tiempo, documentar lo pendiente en README.
- Valoramos criterio, comunicación y velocidad (MVP mindset).

---
Decisiones de Implementación

Backend (API)
- Uso de Express + TypeScript para tipado seguro y escalabilidad.
- Endpoints implementados:
  - `GET /api/products`: listado con filtros (`search`, `sort`, `order`, `available`, `page`, `limit`).
  - `GET /api/products/:id`: detalle individual.
- Datos iniciales desde JSON (`products.json`), con opción de persistencia en MongoDB mediante `seed.ts`.
- Tipos definidos en `/shared/types.ts` para mantener coherencia entre backend y frontend.
- Control de errores básico implementado para consultas inválidas y productos no encontrados.

Frontend (Next.js)
- Uso de Next.js 13 App Router + TypeScript para páginas dinámicas y SSR.
- Páginas principales:
  - `/products`: grid responsive, buscador, filtros, paginación.
  - `/products/[id]`: detalle de producto con imagen grande, precio, stock y botón de acción.
- Componentes reutilizables:
  - `ProductCard.tsx` con imagen, nombre, precio y badge de stock.
- Estilos con Tailwind CSS, siguiendo las especificaciones de mock textual:
  - Cards con sombra, hover y layout responsive.
  - Badge de stock: verde para disponible, gris para no disponible.
  - Botón de acción: azul con hover.
- Se decidió usar **fetchProductById** y `getTopCheapestAvailable` como utilitarios para mantener lógica de negocio separada.

Algoritmo utilitario
- Función `getTopCheapestAvailable(products, top=3)` implementada:
  - Filtra productos con `isAvailable=true`.
  - Ordena por precio ascendente.
  - Devuelve los N más baratos (por defecto 3).
- Ubicación: `/shared/utils.ts` para reutilización en backend o frontend.

Git & Git-flow
- Flujo de trabajo:
  - Rama `feature/api` → desarrollo API → PR a `main`.
  - Rama `feature/web` → desarrollo frontend → PR a `main`.
- Mensajes de commit claros:
  - `feat(api): list & detail`
  - `feat(web): products page`

Variables y scripts
- Variables de entorno:
NEXT_PUBLIC_API_BASE=http://localhost:3001
MONGO_URI=mongodb://127.0.0.1:27017/mini_market

yaml
Copiar código
- Scripts:
  - API: `npm run dev` (puerto 3001)
  - WEB: `npm run dev` (puerto 3000)
---
Pendientes / Mejoras futuras
- Implementar tests unitarios para API y utilitarios.
- Mejoras en UX/UI: animaciones, filtros avanzados, paginación interactiva.
  
---
Criterios cumplidos
- API funcional con listado y detalle.
- Web funcional con páginas `/products` y `/products/[id]`.
- Tipos compartidos en `/shared/types.ts`.
- Algoritmo utilitario implementado.
- Git-flow con commits claros y ramas organizadas.
- UI básica y responsive respetando mock textual.
  
---
Bonus
- Seed para MongoDB (`seed.ts`) incluido.
- Código listo para extensiones futuras y escalabilidad.
