# PinApp challenge - Gestión de Clientes

Aplicación web desarrollada con Angular como parte del desafío técnico para PinApp.

## Demo

[Aplicación](https://pinappchallengeb.web.app/auth)

## Repositorio

[https://github.com/belenamiune/pinApp](https://github.com/belenamiune/pinApp)

---

## Tecnologías

- **Angular 15**
- **Firebase Firestore** — almacenamiento de datos en tiempo real
- **Firebase Authentication** — autenticación con email y contraseña
- **Firebase Hosting** — deploy de la aplicación
- **Angular Material** — componentes de UI
- **AngularFire 7** — integración de Firebase con Angular

---

## Funcionalidades

### Autenticación
- Registro e inicio de sesión con email y contraseña (Firebase Auth)
- Rutas protegidas con AuthGuard

### Formulario de creación de cliente
- Campos: nombre, apellido, edad y fecha de nacimiento
- Validaciones avanzadas (campos requeridos, longitud, formato, solo letras)
- Pipe personalizado `customDate` para formatear la fecha en formato DD/MM/YYYY

### Lista de clientes
- Visualización en tiempo real desde Firestore
- Búsqueda por nombre, apellido o edad
- Ordenamiento por columna (ascendente/descendente)
- Eliminación de clientes

### Análisis de datos
- Promedio de edad de todos los clientes registrados
- Desviación estándar de las edades

---

## ¿Cómo correr el proyecto localmente?

### Requisitos previos
- Node.js 16+
- Angular CLI 15
- Cuenta de Firebase

### Instalación

```bash
# Clonar el repositorio
git clone https://github.com/belenamiune/pinApp.git
cd pinApp

# Instalar dependencias
npm install

# Correr en modo desarrollo
ng serve
```

Luego: [http://localhost:4200](http://localhost:4200) en el navegador.


---

## Deploy

```bash
# Build de producción
ng build

# Deploy a Firebase Hosting
firebase deploy
```

---

## Autor

Desarrollado por **María Belén Amiune** para el desafío técnico de **PinApp**.