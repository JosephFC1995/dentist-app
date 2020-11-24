<template>
  <div class="form-general">
    <a-form-model :model="form" ref="newPacient">
      <h6 class="mt-0 mb-1" :style="{ color: '#B9BABA' }">
        Datos del nuevo paciente
      </h6>
      <a-row :gutter="16">
        <a-col :span="24" :md="12">
          <a-form-model-item label="Tipo de documento">
            <a-select
              placeholder="Seleccione un tipo de documento"
              :options="tiposDocumentosArray"
              v-model="form.typeDocument"
              :allowClear="true"
              :disabled="loading"
            >
            </a-select>
          </a-form-model-item>
        </a-col>
        <a-col :span="24" :md="12">
          <a-form-model-item label="Número de documento">
            <a-input
              v-model="form.numberDocumento"
              placeholder="Número de documento"
              :disabled="loading"
            />
          </a-form-model-item>
        </a-col>
        <a-col :span="24" :md="24">
          <a-form-model-item label="Nombres">
            <a-input
              v-model="form.names"
              placeholder="Nombres"
              :disabled="loading"
            />
          </a-form-model-item>
        </a-col>
        <a-col :span="24" :md="12">
          <a-form-model-item label="Apellido paterno">
            <a-input
              v-model="form.lastNameFather"
              placeholder="Apellido paterno"
              :disabled="loading"
            />
          </a-form-model-item>
        </a-col>
        <a-col :span="24" :md="12">
          <a-form-model-item label="Apellido materno">
            <a-input
              v-model="form.lastNameMother"
              placeholder="Apellido materno"
              :disabled="loading"
            />
          </a-form-model-item>
        </a-col>
        <a-col :span="24" :md="12">
          <a-form-model-item label="Correo electrónico">
            <a-input
              v-model="form.email"
              placeholder="Correo electrónico"
              :disabled="loading"
            />
          </a-form-model-item>
        </a-col>
        <a-col :span="24" :md="12">
          <a-form-model-item label="Teléfono">
            <a-input
              v-model="form.phone"
              placeholder="Teléfono"
              :disabled="loading"
            />
          </a-form-model-item>
        </a-col>
        <a-col :span="24" :md="24" class="d-flex justify-content-between">
          <a-button
            type="primary"
            html-type="submit"
            @click="saveNewPacient"
            :loading="loading"
          >
            {{ loading ? 'Creando usuario' : 'Crear usuario' }}
          </a-button>
        </a-col>
      </a-row>
    </a-form-model>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      form: {},
      tiposDocumentosArray: [
        { value: 1, label: 'DNI' },
        { value: 2, label: 'Pasaporte' },
      ],
    }
  },
  methods: {
    saveNewPacient() {
      this.loading = true
      setTimeout(() => {
        this.loading = false
      }, 3000)
    },
  },
}
</script>

<style></style>
