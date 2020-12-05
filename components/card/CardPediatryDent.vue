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
      </a-row>
      <!-- Formulario Endodoncia -->
      <FormPediatryDent />
    </a-card>
  </div>
</template>

<script>
import FormPediatryDent from '~/components/form/FormPediatryDent'
export default {
  components: {
    FormPediatryDent,
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
