<template>
  <div class="card-info-pacient-odontogram">
    <a-card :title="false" :bordered="false">
      <a-row :gutter="16" type="flex" justify="space-between">
        <!-- <a-col :span="24" :md="6" class="with-button">
          <a-form-model-item class="with-button">
            <a-date-picker
              v-model="odontogram.date"
              :disabled-date="disabledDate"
              placeholder="Seleccione una fecha"
              :showToday="false"
            />
          </a-form-model-item>
        </a-col> -->
      </a-row>
      <!-- Formulario -->
      <FormPacientInform />
    </a-card>
    <a-divider :style="{ color: '#B9BABA', fontWeight: 600, fontSize: '14px' }" dashed>Informes</a-divider>
    <TablePacientInforms />
  </div>
</template>

<script>
import FormPacientInform from '~/components/form/FormPacientInform'
import TablePacientInforms from '~/components/table/TablePacientInforms'

export default {
  components: {
    FormPacientInform,
    TablePacientInforms,
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
