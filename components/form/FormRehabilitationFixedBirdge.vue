<template>
  <div class="form-general">
    <a-form-model :model="form" ref="form">
      <a-row :gutter="16">
        <!-- Pieza dentaria -->
        <a-col :span="24" :md="12">
          <a-form-model-item label="Pieza dentaria">
            <a-input v-model="form.dental_piece" :disabled="loading" />
          </a-form-model-item>
        </a-col>
        <!-- Movilidad -->
        <a-col :span="24" :md="12">
          <a-form-model-item label="Movilidad">
            <a-input v-model="form.mobility" :disabled="loading" />
          </a-form-model-item>
        </a-col>
        <!-- Relación corona - raiz -->
        <a-col :span="24" :md="24">
          <a-form-model-item label="Relación corona - raiz">
            <a-select
              placeholder="Seleccione una opción"
              :options="relacionArray"
              v-model="form.relation_corone"
              :allowClear="true"
              :disabled="loading"
            >
            </a-select>
          </a-form-model-item>
        </a-col>
        <!-- Arquitectura del pilar -->
        <a-col :span="24" :md="24">
          <a-form-model-item label="Arquitectura del pilar">
            <a-select
              placeholder="Seleccione una opción"
              :options="arquitecturaArray"
              v-model="form.pillar"
              :allowClear="true"
              :disabled="loading"
            >
            </a-select>
          </a-form-model-item>
        </a-col>
        <!-- Migraciones -->
        <a-col :span="24" :md="24">
          <a-form-model-item label="Migraciones">
            <a-select
              placeholder="Seleccione una opción"
              :options="migracionesArray"
              v-model="form.migrations"
              :allowClear="true"
              :disabled="loading"
            >
            </a-select>
          </a-form-model-item>
        </a-col>
        <a-col :span="24">
          <a-button type="primary" html-type="submit" @click="submit" :loading="loading"> Guardar </a-button>
        </a-col>
      </a-row>
    </a-form-model>
  </div>
</template>

<script>
export default {
  props: {
    form: {
      type: Object,
      default: {},
    },
    newData: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      loading: false,
      relacionArray: [
        { value: 1, label: 'Favorable' },
        { value: 2, label: 'Desfavorable' },
      ],
      arquitecturaArray: [
        { value: 1, label: 'Favorable' },
        { value: 2, label: 'Desfavorable' },
      ],
      migracionesArray: [
        {
          value: 1,
          label: 'Si',
        },
        {
          label: 'No',
          value: 2,
        },
      ],
    }
  },
  methods: {
    submit() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          this.loading = true
          let response = false
          if (!this.newData) {
            response = await this.$axios.$put(`/rehabilitation_table_fixed/${this.form.id}`, this.form).catch((errors) => {
              this.loading = false
            })
          } else {
            response = await this.$axios.$post(`/rehabilitation_table_fixed`, this.form).catch((errors) => {
              this.loading = false
            })
          }
          this.loading = false
          this.$message.success(response.message)
          if (response.success) {
            this.$emit('close')
            this.$emit('reload')
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
  },
}
</script>

<style></style>
