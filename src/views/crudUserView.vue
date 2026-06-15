<template>
  <div class="container mt-4">

    <!-- ALERTA -->
    <div v-if="alerta.mensaje" :class="`alert alert-${alerta.tipo} alert-dismissible`" role="alert">
      {{ alerta.mensaje }}
      <button type="button" class="btn-close" @click="alerta.mensaje = ''"></button>
    </div>

    <div class="d-flex justify-content-between align-items-center mb-3">
      <h3><i class="bi bi-people"></i> Gestión de Usuarios</h3>
      <button class="btn btn-success" data-bs-toggle="modal" data-bs-target="#modalCrearUsuario">
        <i class="bi bi-person-plus"></i> Agregar usuario
      </button>
    </div>

    <!-- TABLA -->
    <table class="table table-striped">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Correo</th>
          <th>Rol</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(u, i) in usuarios" :key="u.id">
          <td>{{ u.nombre }}</td>
          <td>{{ u.correo }}</td>
          <td>{{ u.rol }}</td>
          <td>
            <button class="btn btn-warning btn-sm me-1" @click="abrirEditar(i)"
              data-bs-toggle="modal" data-bs-target="#modalEditarUsuario">
              <i class="bi bi-pencil"></i> Editar
            </button>
            <button class="btn btn-danger btn-sm" @click="abrirEliminar(i)"
              data-bs-toggle="modal" data-bs-target="#modalEliminarUsuario">
              <i class="bi bi-trash"></i> Eliminar
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- MODAL CREAR -->
    <div class="modal fade" id="modalCrearUsuario" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Agregar usuario</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">
            <input v-model="nuevo.nombre" class="form-control mb-2" placeholder="Nombre" />
            <input v-model="nuevo.correo" class="form-control mb-2" placeholder="Correo" />
            <input v-model="nuevo.password" type="password" class="form-control mb-2" placeholder="Contraseña" />
            <select v-model="nuevo.rol" class="form-select">
              <option value="">Seleccionar rol...</option>
              <option value="admin">Admin</option>
              <option value="user">Usuario</option>
            </select>
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
            <button class="btn btn-success" @click="agregar" data-bs-dismiss="modal">
              <i class="bi bi-check-circle"></i> Guardar
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- MODAL EDITAR -->
    <div class="modal fade" id="modalEditarUsuario" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Editar usuario</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">
            <input v-model="editar.nombre" class="form-control mb-2" placeholder="Nombre" />
            <input v-model="editar.correo" class="form-control mb-2" placeholder="Correo" />
            <input v-model="editar.password" type="password" class="form-control mb-2" placeholder="Contraseña" />
            <select v-model="editar.rol" class="form-select">
              <option value="admin">Admin</option>
              <option value="user">Usuario</option>
            </select>
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
            <button class="btn btn-warning" @click="guardarEdicion" data-bs-dismiss="modal">
              <i class="bi bi-pencil"></i> Actualizar
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- MODAL ELIMINAR -->
    <div class="modal fade" id="modalEliminarUsuario" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Confirmar eliminación</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">
            ¿Estás seguro que deseas eliminar a <strong>{{ usuarios[indiceEliminar]?.nombre }}</strong>?
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
            <button class="btn btn-danger" @click="eliminar" data-bs-dismiss="modal">
              <i class="bi bi-trash"></i> Eliminar
            </button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import usuariosService from '../services/userService.js'

export default {
  data() {
    return {
      usuarios: [],
      nuevo: { nombre: '', correo: '', password: '', rol: '' },
      editar: { nombre: '', correo: '', password: '', rol: '' },
      indiceEditar: null,
      indiceEliminar: null,
      alerta: { mensaje: '', tipo: 'success' }
    }
  },
  created() {
    this.cargar()
  },
  methods: {
    async cargar() {
      const res = await usuariosService.getAllUsuarios()
      this.usuarios = res.data
    },
    async agregar() {
      if (this.nuevo.nombre && this.nuevo.correo) {
        await usuariosService.createUsuario(this.nuevo)
        this.cargar()
        this.mostrarAlerta('Usuario agregado correctamente.')
        this.nuevo = { nombre: '', correo: '', password: '', rol: '' }
      }
    },
    abrirEditar(i) {
      this.indiceEditar = i
      this.editar = { ...this.usuarios[i] }
    },
    async guardarEdicion() {
      const id = this.usuarios[this.indiceEditar].id
      await usuariosService.updateUsuario(id, this.editar)
      this.cargar()
      this.mostrarAlerta('Usuario actualizado correctamente.', 'warning')
    },
    abrirEliminar(i) {
      this.indiceEliminar = i
    },
    async eliminar() {
      const id = this.usuarios[this.indiceEliminar].id
      await usuariosService.deleteUsuario(id)
      this.cargar()
      this.mostrarAlerta('Usuario eliminado.', 'danger')
    },
    mostrarAlerta(mensaje, tipo = 'success') {
      this.alerta = { mensaje, tipo }
      setTimeout(() => { this.alerta.mensaje = '' }, 3000)
    }
  }
}
</script>