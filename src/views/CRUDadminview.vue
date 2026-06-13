<template>
  <div class="container mt-5">

    <!-- LOGIN -->
    <div v-if="!autenticado" class="row justify-content-center">
      <div class="col-md-4">
        <h4 class="mb-3">Acceso Administrador</h4>

        <div v-if="errorLogin" class="alert alert-danger">
          Credenciales incorrectas o no eres administrador.
        </div>

        <div class="mb-2">
          <label>Correo</label>
          <input v-model="email" type="email" class="form-control" />
        </div>
        <div class="mb-3">
          <label>Contraseña</label>
          <input v-model="password" type="password" class="form-control" />
        </div>
        <button class="btn btn-primary w-100" @click="loginAdmin">Ingresar</button>
      </div>
    </div>

    <!-- PANEL CRUD -->
    <div v-else>
      <div class="d-flex justify-content-between mb-4">
        <h4>Panel de Administración</h4>
        <button class="btn btn-outline-danger btn-sm" @click="cerrarSesion">Cerrar sesión</button>
      </div>

      <!-- FORMULARIO -->
      <div class="card p-3 mb-4">
        <h6>{{ modoEdicion ? 'Editar producto' : 'Agregar producto' }}</h6>

        <div class="row g-2">
          <div class="col-md-3">
            <input v-model="form.nombre" class="form-control" placeholder="Nombre" />
          </div>
          <div class="col-md-3">
            <input v-model="form.categoria" class="form-control" placeholder="Categoría" />
          </div>
          <div class="col-md-3">
            <input v-model.number="form.precio" type="number" class="form-control" placeholder="Precio" />
          </div>
          <div class="col-md-3">
            <input v-model.number="form.stock" type="number" class="form-control" placeholder="Stock" />
          </div>
        </div>

        <div class="mt-2 d-flex gap-2">
          <button class="btn btn-success btn-sm" @click="guardar">
            {{ modoEdicion ? 'Actualizar' : 'Agregar' }}
          </button>
          <button v-if="modoEdicion" class="btn btn-secondary btn-sm" @click="cancelar">
            Cancelar
          </button>
        </div>
      </div>

      <!-- TABLA -->
      <table class="table table-bordered">
        <thead class="table-light">
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Categoría</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="p in productos" :key="p.id">
            <td>{{ p.id }}</td>
            <td>{{ p.nombre }}</td>
            <td>{{ p.categoria }}</td>
            <td>{{ p.precio }}</td>
            <td>{{ p.stock }}</td>
            <td>
              <button class="btn btn-warning btn-sm me-1" @click="editar(p)">Editar</button>
              <button class="btn btn-danger btn-sm" @click="eliminar(p.id)">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import usuarios from '../data/users.json'
import productosData from '../data/Product.json'

// Auth
const autenticado = ref(false)
const email = ref('')
const password = ref('')
const errorLogin = ref(false)

function loginAdmin() {
  const user = usuarios.find(
    u => u.email === email.value && u.password === password.value && u.rol === 'admin'
  )
  if (user) {
    autenticado.value = true
    errorLogin.value = false
  } else {
    errorLogin.value = true
  }
}

function cerrarSesion() {
  autenticado.value = false
  email.value = ''
  password.value = ''
}

// Productos
const productos = ref(JSON.parse(JSON.stringify(productosData)))
const modoEdicion = ref(false)
const idEditando = ref(null)
const form = ref({ nombre: '', categoria: '', precio: 0, stock: 0 })

function guardar() {
  if (!form.value.nombre || !form.value.categoria) return

  if (modoEdicion.value) {
    const idx = productos.value.findIndex(p => p.id === idEditando.value)
    productos.value[idx] = { id: idEditando.value, ...form.value }
    modoEdicion.value = false
    idEditando.value = null
  } else {
    const nuevoId = productos.value.length + 1
    productos.value.push({ id: nuevoId, ...form.value })
  }

  form.value = { nombre: '', categoria: '', precio: 0, stock: 0 }
}

function editar(p) {
  modoEdicion.value = true
  idEditando.value = p.id
  form.value = { nombre: p.nombre, categoria: p.categoria, precio: p.precio, stock: p.stock }
}

function cancelar() {
  modoEdicion.value = false
  idEditando.value = null
  form.value = { nombre: '', categoria: '', precio: 0, stock: 0 }
}

function eliminar(id) {
  productos.value = productos.value.filter(p => p.id !== id)
}
</script>