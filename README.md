## 🦸‍♂️ SuperheroesApp – Descripción del Proyecto

**SuperheroesApp** es una aplicación web construida con **Angular 15** cuyo objetivo es gestionar una colección de superhéroes. Esta app sirve como ejemplo completo de arquitectura modular en Angular, integrando buenas prácticas como la organización por capas, autenticación JWT, uso de Angular Material, y despliegue en contenedores Docker.

### 🧱 Características Principales

* **Arquitectura modular y escalable**, con separación por funcionalidades (`features`) y capas (`core`, `shared`).
* **Sistema de autenticación** usando `JWT` gracias a la librería `@auth0/angular-jwt`, incluyendo:

  * Registro y login.
  * Guards para proteger rutas privadas.
  * Validaciones síncronas y asíncronas en los formularios.
* **Manejo de entorno** mediante los archivos de configuración `environment.*.ts` con valores distintos para `dev`, `test` y `prod`.
* **Interfaz de usuario** moderna y responsiva con **Angular Material**, incluyendo:

  * Diálogos (`MatDialog`), alertas (`SnackBar`) y paginación (`MatPaginator`).
* **Comunicaciones entre componentes** (padre-hijo) para gestión y visualización dinámica de superhéroes.
* **Gestión de estado** con `NgRx` (store, actions, reducers).
* **Soporte completo para testing** con `Karma` y pruebas end-to-end.
* **Preparado para producción con Docker** usando una imagen con `nginx`.

### 🗂️ Estructura del Proyecto

El proyecto sigue una estructura limpia y bien separada:

```
src/
├── app/
│   ├── core/           # Servicios, guards, interceptores, modelos centrales
│   ├── shared/         # Componentes y pipes reutilizables
│   ├── features/
│   │   └── superheroes/   # Módulo principal de la app (lista, detalle, etc.)
│   ├── components/     # Registro, login, headers, etc.
│   ├── services/       # Servicios de autenticación
│   ├── interfaces/     # Interfaces de usuario y JWT
│   ├── app-routing.module.ts
│   └── app.module.ts
├── environments/
│   ├── environment.ts
│   ├── environment.dev.ts
│   └── environment.prod.ts
```

### 🔐 Autenticación y Seguridad

* Login y registro con validaciones personalizadas.
* Guard `AuthGuard` para proteger rutas privadas.
* Gestión de tokens JWT en `localStorage` con expiración.
* Ejemplo implementado: ruta `/user-is-authenticated`.

Se sugiere extender con:

* `AdminGuard` para rutas administrativas.
* `UserIsUserGuard` para proteger el perfil del usuario autenticado.

### 🛠️ Desarrollo y Scripts

* Servidor de desarrollo: `npm start` o `ng serve`.
* Construcción para producción: `ng build`.
* Tests unitarios: `ng test`.
* Tests E2E: `ng e2e`.
* Scripts personalizados con `rimraf` para compatibilidad con Windows.

### 🐳 Docker Ready

El proyecto puede desplegarse usando Docker:

```bash
docker build --no-cache -t ng-app-superheroes-image .
docker run -d -p 4200:4200 ng-app-superheroes-image
```

### 🧪 Pruebas y Experiencia de Usuario

* Interfaz amigable con `Material Design`.
* Componente reutilizable de toast para feedback del usuario.
* Comunicación eficiente entre componentes.
* Imagen por defecto si no hay avatar del superhéroe.

### 🧬 Git Flow

El flujo de trabajo está versionado usando `git flow`, asegurando ramas limpias por cada funcionalidad (`feature/taskXX_nombre`).


