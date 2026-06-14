import productosService from '../services/productosService.js'
<template>
  <div class="container mt-4">

    <!-- ALERTA -->
    <div v-if="alerta.mensaje" :class="`alert alert-${alerta.tipo} alert-dismissible`" role="alert">
      {{ alerta.mensaje }}
      <button type="button" class="btn-close" @click="alerta.mensaje = ''"></button>
    </div>

    <div class="d-flex justify-content-between align-items-center mb-3">
      <h3>Gestión de Productos</h3>
      <!-- Botón abrir modal crear -->
      <button class="btn btn-success" data-bs-toggle="modal" data-bs-target="#modalCrear">
        <i class="bi bi-plus-circle"></i> Agregar producto
      </button>
    </div>

    <!-- TABLA -->
    <table class="table table-striped">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Precio</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(p, i) in productos" :key="i">
          <td>{{ p.nombre }}</td>
          <td>{{ p.precio }}</td>
          <td>
            <!-- Botón editar -->
            <button class="btn btn-warning btn-sm me-1" @click="abrirEditar(i)"
              data-bs-toggle="modal" data-bs-target="#modalEditar">
              <i class="bi bi-pencil"></i> Editar
            </button>
            <!-- Botón eliminar -->
            <button class="btn btn-danger btn-sm" @click="abrirEliminar(i)"
              data-bs-toggle="modal" data-bs-target="#modalEliminar">
              <i class="bi bi-trash"></i> Eliminar
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- MODAL CREAR -->
    <div class="modal fade" id="modalCrear" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Agregar producto</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">
            <input v-model="nuevo.nombre" class="form-control mb-2" placeholder="Nombre" />
            <input v-model="nuevo.precio" type="number" class="form-control mb-2" placeholder="Precio" />
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
    <div class="modal fade" id="modalEditar" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Editar producto</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">
            <input v-model="editar.nombre" class="form-control mb-2" placeholder="Nombre" />
            <input v-model="editar.precio" type="number" class="form-control mb-2" placeholder="Precio" />
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
    <div class="modal fade" id="modalEliminar" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Confirmar eliminación</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">
            ¿Estás seguro que deseas eliminar <strong>{{ productos[indiceEliminar]?.nombre }}</strong>?
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
export default {
  data() {
    return {
      productos: [],
      nuevo: { nombre: '', precio: '' },
      editar: { nombre: '', precio: '' },
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
  const res = await productosService.getAllProducts()
  this.productos = res.data
  },
async agregar() {
  if (this.nuevo.nombre && this.nuevo.precio) {
    await productosService.createProduct(this.nuevo)
    this.cargar()
    this.mostrarAlerta('Producto agregado correctamente.')
    this.nuevo = { nombre: '', precio: '' }
    }
  },
async guardarEdicion() {
  const id = this.productos[this.indiceEditar].id
  await productosService.updateProduct(id, this.editar)
  this.cargar()
  this.mostrarAlerta('Producto actualizado correctamente.', 'warning')
  },
  async eliminar() {
    const id = this.productos[this.indiceEliminar].id
    await productosService.deleteProduct(id)
    this.cargar()
    this.mostrarAlerta('Producto eliminado.', 'danger')
    }
  }
}
</script>