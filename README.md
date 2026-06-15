# 🛒 TechNova - Aplicación Web SPA
 
Aplicación web de comercio electrónico desarrollada con **Vue.js 3**, **Bootstrap 5** y **MockAPI**, como proyecto final del curso de Desarrollo de Aplicaciones Web.
 
---
 
## 👥 Integrantes
 
| Nombre | Rol |
|---|---|
| Maryi Ospino | crud usuarios y api usuarios |
| Anderson García | crud productos y api productos |
 
---
 
## 📌 Descripción
 
TechNova es una Single Page Application (SPA) que permite gestionar un catálogo de productos tecnológicos. Incluye autenticación de usuarios, rutas protegidas, y un panel de administración con operaciones CRUD completas para productos y usuarios, todo conectado a una API REST simulada con MockAPI.
 
---
 
## 🚀 Funcionalidades
 
- ✅ Login con validación contra MockAPI
- ✅ Sesión guardada en `sessionStorage`
- ✅ Redirección según rol (admin / usuario)
- ✅ Navigation Guards para proteger rutas
- ✅ Cerrar sesión
- ✅ CRUD de Productos con modales y alertas
- ✅ CRUD de Usuarios con modales y alertas
- ✅ Catálogo de productos para usuarios
- ✅ Carrito de compras
- ✅ Diseño responsivo con Bootstrap 5
- ✅ Íconos con Bootstrap Icons
---
 
## 🛠️ Tecnologías Utilizadas
 
| Tecnología | Versión |
|---|---|
| Vue.js | 3 |
| Vue Router | 4 |
| Bootstrap | 5 |
| Bootstrap Icons | 1.x |
| Axios | 1.x |
| MockAPI | - |
| Git / GitHub | - |
 
---
 
## 📁 Estructura del Proyecto
 
```
src/
├── assets/
│   └── styles.css
├── components/
│   ├── Navbar.vue
│   ├── Footer.vue
│   ├── ProductCard.vue
│   └── Sidebar.vue
├── views/
│   ├── loginView.vue
│   ├── DashboardView.vue
│   ├── ProductView.vue
│   ├── CRUDproductview.vue
│   └── crudUserView.vue
├── router/
│   └── index.js
├── services/
│   ├── productService.js
│   └── userService.js
├── App.vue
└── main.js
```
 
---
 
## 🔐 Credenciales de Prueba
 
| Correo | Contraseña | Rol |
|---|---|---|
| maryi@technova.com | maryi | admin |
| anderson@technova.com | 5678 | admin |
| user1@technova.com | 1234 | user |
| user2@technova.com | abcd | user |
 
---
 
## 🌐 APIs MockAPI
 
| Recurso | URL |
|---|---|
| Usuarios | `https://6a2efe11c9776ca6c0c53234.mockapi.io/user` |
| Productos | `https://6a2efbcdc9776ca6c0c52eef.mockapi.io/Producto` |
 
---
 
## ▶️ Cómo ejecutar el proyecto
 
```bash
# Clonar el repositorio
git clone https://github.com/maryi192593/examen-final-des-app-web.git
# Entrar al proyecto
cd segundo-parcial-des-app-web
 
# Instalar dependencias
npm install
 
# Ejecutar en modo desarrollo
npm run serve
```
 
---
 
## 📄 Flujo de la Aplicación
 
1. El usuario ingresa al login en `/login`
2. Se validan las credenciales contra MockAPI
3. Si es **admin** → redirige a `/admin/productos`
4. Si es **usuario** → redirige a `/dashboard`
5. Las rutas `/admin/productos` y `/admin/usuarios` están protegidas por navigation guards
6. El admin puede crear, editar y eliminar productos y usuarios
7. El usuario normal puede ver el catálogo y agregar productos al carrito
---
 
## 📋 Repositorio
 
🔗 (https://github.com/maryi192593/examen-final-des-app-web.git)
