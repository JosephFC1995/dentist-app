<template>
  <div class="form-general">
    <a-form-model :model="form" ref="newPacient">
      <a-row :gutter="16">
        <!-- Tipo -->
        <a-col :span="24" :md="6">
          <a-form-model-item label="Tipo">
            <a-select placeholder="Seleccione un tipo" :options="tipoArray" v-model="form.type" :disabled="loading"> </a-select>
          </a-form-model-item>
        </a-col>
        <!-- Asunto -->
        <a-col :span="24" :md="24">
          <a-form-model-item label="Asunto" class="with-button">
            <a-input v-model="form.subject" placeholder="Asunto" :disabled="loading" :maxLength="3" />
          </a-form-model-item>
        </a-col>
        <!-- Contenido -->
        <a-col :span="24" :md="24">
          <a-form-model-item label="Contenido">
            <a-textarea v-model="form.content" :rows="3" :disabled="loading" />
          </a-form-model-item>
        </a-col>

        <a-col :span="24" class="d-flex justify-content-end">
          <a-button type="primary" html-type="submit">
            <span> <i class="uil uil-upload mr-1"></i> Subir imagen </span>
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
      tipoArray: [
        { value: 1, label: 'Receta' },
        { value: 2, label: 'Interconsulta' },
        { value: 3, label: 'Derivaciones' },
        { value: 4, label: 'Mensaje' },
        { value: 5, label: 'Descanso médico' },
        { value: 6, label: 'Otro' },
      ],
      vertical: {
        display: 'block',
        height: '30px',
        lineHeight: '30px',
        marginLeft: '10px',
        marginBottom: '10px',
      },
      horizontal: {
        height: '30px',
        lineHeight: '30px',
        marginLeft: '0',
        marginRight: '10px',
        marginBottom: '7px',
      },
    }
  },
  methods: {},
  watch: {},
}
</script>

<style></style>
