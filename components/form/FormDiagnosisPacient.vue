<template>
  <div class="form-general">
    <a-form-model :model="form" ref="newPacient">
      <a-row :gutter="16">
        <!-- DiagnosticoPresuntivo -->
        <a-col :span="24" :md="12">
          <a-form-model-item label="DiagnosticoPresuntivo">
            <a-textarea
              v-model="form.diagnosisPresunt"
              :rows="3"
              :disabled="loading"
            />
          </a-form-model-item>
        </a-col>
        <!-- Diagnostico definitivo -->
        <a-col :span="24" :md="12">
          <a-form-model-item label="Diagnostico definitivo">
            <a-textarea
              v-model="form.diagnosisDefine"
              :rows="3"
              :disabled="loading"
            />
          </a-form-model-item>
        </a-col>
        <!-- Pronóstico -->
        <a-col :span="24" :md="12">
          <a-form-model-item label="Pronóstico">
            <a-textarea
              v-model="form.prognosis"
              :rows="3"
              :disabled="loading"
            />
          </a-form-model-item>
        </a-col>
        <!-- Plan de tratamiento -->
        <a-col :span="24" :md="12">
          <a-form-model-item label="Plan de tratamiento">
            <a-textarea
              v-model="form.treatmentPlan"
              :rows="3"
              :disabled="loading"
            />
          </a-form-model-item>
        </a-col>
        <!-- Tratamiento / Recomendaciones -->
        <a-col :span="24" :md="12">
          <a-form-model-item label="Tratamiento / Recomendaciones">
            <a-textarea
              v-model="form.tratmentRecommendations"
              :rows="3"
              :disabled="loading"
            />
          </a-form-model-item>
        </a-col>
        <!-- Control y evolución -->
        <a-col :span="24" :md="12">
          <a-form-model-item label="Control y evolución">
            <a-textarea
              v-model="form.controlEvolution"
              :rows="3"
              :disabled="loading"
            />
          </a-form-model-item>
        </a-col>
        <!-- Cien -->
        <a-col :span="24" :md="12">
          <a-form-model-item
            label="Cien 10 (Tiene que ir con código de acceso)"
          >
            <a-select
              placeholder="Seleccione un código"
              :options="codigos100Array"
              v-model="form.code100"
              :allowClear="true"
              :disabled="loading"
            >
            </a-select>
          </a-form-model-item>
        </a-col>
        <!-- Fecha de alta -->
        <a-col :span="24" :md="12">
          <a-form-model-item label="Fecha de alta">
            <a-date-picker
              v-model="form.dischargeDate"
              :disabled-date="disabledDate"
              placeholder="Seleccione una fecha de alta"
              :disabled="loading"
            />
          </a-form-model-item>
        </a-col>
        <a-col :span="24" class="d-flex justify-content-end">
          <a-button
            type="primary"
            html-type="submit"
            @click="() => $emit('close')"
          >
            Guardar
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
      codigos100Array: [
        { value: 1, label: 'A' },
        { value: 2, label: 'B' },
      ],
    }
  },
  methods: {
    disabledDate(current) {
      return current && current <= this.$moment().startOf('day')
    },
  },
}
</script>

<style></style>
