# SuperheroesApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.0.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.


## Creación de la app Paso a Paso

### proyecto y versión

Instalación de la última versión LTS de angular con el cli

```bash
npm install -g @angular/cli@15.0.0
```

### Creación del proyecto

```bash
ng new superheroes-app
```
Elegí css y routing, puedo desarrollar con cualquiera de esos preprocesadores, pero me voy a centrar exclusivamente en lo que pide la prueba.

### Añadir angular material

```bash
ng add @angular/material
```

### Comprobación

```bash
ng serve --open
```
modificamos los scripts en el package.json para que se ejecuten comandos más genéricos y adaptados a cualquier proyecto.

instalamos una librería que nos ayuda para borrado de carpetas en windows sin problemas de permisos.

```bash
npm install --save-dev rimraf
```


### Creación de la estructura del proyecto

Si fuese un proyecto más grande que no tuviera solo superheroes, sino otras entidades, y usando la arquitectura hexagonal por capas, esta podría ser la estuctura general de ese proyecto:

- **src/**
  - **app/**
    - **core/**
      - **models/**
        - `superhero.model.ts` (Modelos de superhéroes)
      - **services/**
        - `superhero.service.ts` (Servicios para superhéroes)
      - **guards/**
        - `auth.guard.ts` (Guardia de autenticación)
      - `core.module.ts` (Módulo principal de la aplicación)
    - **shared/**
      - **components/**
        - `superhero-list.component.ts` (Componente de lista de superhéroes)
        - `superhero-detail.component.ts` (Componente de detalles de superhéroes)
      - **modules/**
        - `shared.module.ts` (Módulo compartido)
      - **pipes/**
        - `capitalize.pipe.ts` (Tubería para capitalizar texto)
      - **directives/**
        - `highlight.directive.ts` (Directiva de resaltado)
      - **interceptors/**
        - `http.interceptor.ts` (Interceptor HTTP para manejo de solicitudes)
    - **features/**
      - **superheroes/**
        - **components/**
          - `superhero-create.component.ts` (Componente para crear superhéroes)
          - `superhero-edit.component.ts` (Componente para editar superhéroes)
        - **services/**
          - `superhero-api.service.ts` (Servicio de API para superhéroes)
        - **store/**
          - `superhero.actions.ts` (Acciones de superhéroes para NgRx)
          - `superhero.reducer.ts` (Reducer de superhéroes para NgRx)
        - `superheroes.module.ts` (Módulo de superhéroes)
    - **app.component.ts** (Componente raíz de la aplicación)
    - **app.module.ts** (Módulo principal de la aplicación)
    - **app-routing.module.ts** (Enrutamiento de la aplicación)
  - **assets/**
    - **images/**
      - `superman.jpg` (Imágenes de superhéroes)
      - `batman.jpg`
    - `fonts/` (Fuentes personalizadas, si las hay)
  - **environments/**
    - `environment.ts` (Configuración de entorno)
    - `environment.prod.ts` (Configuración de entorno para producción)
- **angular.json** (Archivo de configuración de Angular CLI)
- **tsconfig.json** (Archivo de configuración de TypeScript)
- **package.json** (Archivo de dependencias del proyecto)
- **README.md** (Documentación del proyecto)

Pero he elegido otra más simple o genérica para esta app

![imagen estructura](docs/screenshots/Screenshot_2_estructure.png)


  ### variables de entorno para angular

  En angular tenemos dos tipos de construcciones el 'build' y el 'serve', dado que quien se encarga de conectarse a las difernetes bases de datos, es el BACKEND, no necesitamos tres entornos para desarrollar, de todas formas vamos a ver cómo se haría esto:

    ```Files
    ./environments/environment.ts       // ambiente local y de testing, es el ambiente por defecto
    ./environments/environment.dev.ts   // para desarrollo practicamente son iguales no hay diferencias y podemos usarlos indiferentemente (solo es para ver como se pueden implementar maás de dos ambientes, ya que en angular por defecto solo hay dos 'development' y 'production')
    ./environments/environment.prod.ts  // production
    ```

    Los ficheros tiene  un aspecto como este:

    ```typescript
    // ./environments/environment.ts
    export const environment = {
      production: false,
      API_URL: 'http://localhost:3000/api',
      CONTROL: "TESTING DEFAULT LOCAL MODE"
    }
  ```

  Lo único que cambiarán son los valores de las variables.

  ¿Cómo se usa?, simple, cuando vayas a usar una de estas variables por ejemplo una API_KEY, La defines en todos los ficheros de environment y la llamas de esta manera en tu código

  ```typescript 
  // code.axample.ts
  import { environment } from 'src/environments/environment';  // siempre llamarás a ese, solo que el fichero angular.json se encargará de sustituir unos valores por otros gracias a la configuración proporcionada
  ```

  ```json
  // angular.json
  "build": { ...
    "configurations": {
            "production": {
              ...
              "fileReplacements": [
                {
                  "replace": "src/environments/environment.ts",
                  "with": "src/environments/environment.prod.ts"
                }
              ]
            },
            "development": {
              "fileReplacements": [
                {
                  "replace": "src/environments/environment.ts",
                  "with": "src/environments/environment.dev.ts"
                }
              ]
            }

  // ...
  ```

## Dockerization

Después de crear un dockerfile sencillo usando nginx:

> **Nota:** debes tener docker desktop instalado en sistemas windows, o docker en sistemas linux

```bash
# Crea la imagen de Docker
docker build --no-cache --progress=plain -t ng-app-superheroes-image .

# Lanza el contenedor
docker run -d -it -p 4200:4200 ng-app-superheroes-image
```

dirigirse al navegador: http://localhost:80

## Crear la estructura de carpetas de la app

```bash
# el módulo de superheroes
ng generate module superheroes --routing

# el componente por defecto en el path http://localhost:4200/superheroes
ng generate component superheroes/components/superheroes-list
ng generate component superheroes/components/superheroes-list/superheroes-list-item

# componente para un superheroe
ng g c superheroes/components/superheroe-detail

# servicio para los superheroes
ng g s superheroes/services/superheroes

# crear el modelo de superheroes
touch src/app/superheroes/models/superheroes.model.ts

```
De esta web creando un superheroe en json podemos extraer su interface

[json-to-typescript](https://transform.tools/json-to-typescript)

a partir de este json

```json
{
  "id": 1,
  "nombre": "Superman",
  "alias": "Clark Kent",
  "poderes": ["Super fuerza", "Volar", "Visión de calor"],
  "enemigos": ["Lex Luthor", "Doomsday"],
  "ciudad": "Metropolis",
  "imagen": "url_de_la_imagen.jpg"
}
```

obtenemos este typescript

```typescript
  id: number;
  nombre: string;
  alias: string;
  poderes: string[];
  enemigos: string[];
  ciudad: string;
  imagen: string;
```

```bash
# crear un para de componentes para la ruta
ng g c componets/register
ng g c componets/login

# crear servicios basicos de authenticacion
ng g s services/authentication

# crear unas interfaces de formularios para login resgiter y para JWT
ng g i interfaces auth
ng g i interfaces user

# instalar una libreria de jwt para angular
npm install -S @auth0/angular-jwt

# crear un guard de authenticacion para rutas
ng g guard guards/auth
```

He implementado varias cosas en el registro de usuarios, como un custom validation y una async validation

También he implementado la parte de authenticación con jwt gracias a @auth0 y contorlo la escritura y borrado del access_token en el localStorage. Puedo utilizar elk guard en las rutas que sean necesarias, el guard comprueba si existe el token en el local storage y este no está expirado, si hacemos logout se borra.

Para poder probar el guard he creado una ruta llamada 'user-is-authenticated', con un componente simple. si no estamos logueados no se podrá acceder a esta ruta.

Lo suyo es crear otros guards como por ejemplo:
  1. **UserIsUserGuard:** que compruebe que el usuario que accede a una ruta es el usuario que corresponde, así nadie podrá entrar en nuestro perfil
  2. **AdminGuard:** que ese usuario que está intentando acceder a esa ruta privada de administración tiene un role de 'admin'

hemos añadido un toast o sweetalert, en concreto es de angularMaterial, para mensajes al usuario y aumentar así la experiencia del mismo

Antes de meternos en más jaleo, voy a proponer git flow, antes debo subir la la task01_scafolding y task02_auth

```bash
# subir el codigo antes de implementar git flow
git branch -M main
git status
git add .
git commit -m "task02_auth: authentication, register, login, jwt, guard, interceptor, ..."
git push

# empezar git flow y configurarlo
git flow init

# comenzar una nueva feature
git flow feature start task03_superheroes
```

Vamos a la parte de los superheroes

Hemos creado una comunicación de padre a hijo con los componentes superheroes-list.component y sph-list-item-iamge.component, en concreto el padre conocedor de todos los superhérores, le pasará el nombre de la imagen y el hijo lo recibirá para poder construirla dentro de la etiqueta <img> también controla que si no se le envía nombre ninguno, porque no exista, pondrá una imagen por defecto

Hemos metido una paginación usando el módulo paginator de angular material, pero se va a hacer difícil, paginar datos mockeados, y tiene más trabajo que hacerlo con los datos que nos llegarían ya paginados desde el backend. Lo dejaré para el final, no quiero invertir más de 16-20h en esta prueba, y ha habido partes como la de docker, que tenía un poco oxidada que me consumió bastante tiempo.

También usamos una tabla para mostrar los datos que nos llegan, usando MatTableModule

Ahora para poder darle un mejor estilo sin cambiar de angular material usaré flexLayout, que nos proporciona una manera simple de posicionar objetos en la vista sin demasiado esfuerzo solo con directivas y sin usar css.

```bash
npm install @angular/flex-layout@latest --save
```

importamos su módulo a nivel genérico, dentro del MaterialModule

```typescript
import { FlexLayoutModule } from ‘@angular/flex-layout’;
@NgModule({
    declarations: [ ... ],
    imports: [ ..., FlexLayoutModule ],
})
export class MaterialModule { }
```

y lo usamos en las vistas, para centrar tablas, limitar su tamaño, e cambiarlo en dispositivos más pequeños

```html
<div fxLayout="row" fxLayoutAlign="center">
  <div *ngIf="dataSource" fxLayout="column" fxFlex.lg="80" fxFlex.xs="100">
```

Hemos creado el cRUD de superheroes y hemos añadido ventanas de confirmación para cancelar una edición o un borrado de un superheroe.

LLegados a este punto me falta el crear superheroe, y el filterByname, los servicos están resuletos.

Recapitulemos: Sabiendo que trabajo media joranada de 5h de lunes a Jueves, para Golden Race, pude invertir en la prueba las siguientes horas:

  - Lunes       0h
  - Martes      5h  Empiezo
  - Miercoles   0h  (estuve de vieaje en Córdoba)
  - Jueves      5h
  - Viernes     10h Como no trabajo para GR, le dediqué más tiempo

No he temrinado la prueba, tampoco me dijeron que tiempo tenía, en la rama que se muestra en git hub, mi ultima feature era:

  - feature/task03_superheroes

Mañana sábado le aplicaré un par de horas más y lo dejaré así:

  - feature/task04_refactoring
  

