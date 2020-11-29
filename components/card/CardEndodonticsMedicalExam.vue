<template>
  <div class="card-info-pacient-odontogram">
    <a-card :title="false" :bordered="false">
      <a-row :gutter="16" type="flex" justify="space-between">
        <a-col :span="24" :md="6" class="with-button">
          <a-form-model-item class="with-button">
            <a-date-picker
              v-model="odontogram.date"
              :disabled-date="disabledDate"
              placeholder="Seleccione una fecha"
              :showToday="false"
            />
          </a-form-model-item>
        </a-col>
        <a-col :span="24" :md="6" class="d-flex justify-content-end">
          <a-button type="primary">
            <span> <i class="uil uil-save mr-1"></i> Guardar </span>
          </a-button>
        </a-col>
      </a-row>
      <!-- Formulario Endodoncia -->
      <FormEndodonticsMedicalExam />
    </a-card>
  </div>
</template>

<script>
import FormEndodonticsMedicalExam from '~/components/form/FormEndodonticsMedicalExam'
export default {
  components: {
    FormEndodonticsMedicalExam,
  },
  data() {
    return {
      odontogram: {
        date: this.$moment(),
      },
    }
  },
  methods: {
    disabledDate(current) {
      return current && current >= this.$moment().startOf('day').add(1, 'days')
    },
  },
}
</script>

<style></style>
