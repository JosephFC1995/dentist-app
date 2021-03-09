<template>
  <div class="form-general">
    <a-form-model :model="form" ref="newPacient">
      <h6 class="mt-0 mb-1" :style="{ color: '#B9BABA' }">Preguntas</h6>
      <a-row :gutter="16">
        <a-col :span="24" :md="24">
          <a-form-model-item label="Diente">
            <a-select
              placeholder="Seleccione un diente"
              :options="dienteArray"
              v-model="form.dent"
              :allowClear="true"
              :disabled="loading"
            >
            </a-select>
          </a-form-model-item>
        </a-col>
        <a-col :span="24" :md="24" v-for="(question, index_q) in questions" :key="index_q">
          <a-form-model-item :label="question.question">
            <a-radio-group v-model="form[question.value]">
              <a-radio
                :value="alternative.id"
                v-for="alternative in question.alternatives"
                :key="alternative.id"
                :disabled="loading || !form.dent"
              >
                {{ alternative.label }}
              </a-radio>
            </a-radio-group>
          </a-form-model-item>
        </a-col>

        <a-col :span="24" :md="24">
          <a-form-model-item label="Historia de dolor">
            <a-radio-group v-model="form.painHistory">
              <a-radio :value="1" :disabled="loading || !form.dent"> Si </a-radio>
              <a-radio :value="2" :disabled="loading || !form.dent"> No </a-radio>
            </a-radio-group>
          </a-form-model-item>
        </a-col>
        <a-col :span="24" :md="24">
          <a-form-model-item>
            <a-checkbox-group v-model="form.temperature">
              <a-checkbox
                :value="temperature.value"
                :name="temperature.value"
                :style="vertical"
                v-for="temperature in temperaturesArray"
                :key="temperature.value"
                :disabled="loading || !form.dent || form.painHistory == 2 || !form.painHistory"
              >
                {{ temperature.label }}
              </a-checkbox>
            </a-checkbox-group>
          </a-form-model-item>
        </a-col>
        <a-col :span="24" :md="24">
          <a-form-model-item>
            <a-radio-group v-model="form.time">
              <a-radio :value="1" :disabled="loading || !form.dent || form.painHistory == 2 || !form.painHistory"> Días </a-radio>
              <a-radio :value="2" :disabled="loading || !form.dent || form.painHistory == 2 || !form.painHistory">
                Semanas
              </a-radio>
              <a-radio :value="3" :disabled="loading || !form.dent || form.painHistory == 2 || !form.painHistory">
                Meses
              </a-radio>
            </a-radio-group>
          </a-form-model-item>
        </a-col>
        <a-col :span="24">
          <a-form-model-item label="Notas">
            <a-textarea v-model="form.notes" :rows="4" :disabled="loading || !form.dent" />
          </a-form-model-item>
        </a-col>
        <a-col :span="24">
          <a-button type="primary" html-type="submit" @click="() => $emit('close')"> Guardar cita </a-button>
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
      dienteArray: [
        { value: 1, label: 'DNI' },
        { value: 2, label: 'Pasaporte' },
      ],
      questions: [
        {
          question: 'Tratamiento dental previo',
          key: 'previous_dental_treatment',
          value: 'previous_dental_treatment',
          alternatives: [
            {
              id: 1,
              label: 'Si',
            },
            {
              id: 2,
              label: 'No',
            },
          ],
        },
        {
          question: 'Tratamiento endodóntico previo',
          key: 'previous_endodontic_treatment',
          value: 'previous_endodontic_treatment',
          alternatives: [
            {
              id: 1,
              label: 'Si',
            },
            {
              id: 2,
              label: 'No',
            },
          ],
        },
        {
          question: 'Trauma dental',
          key: 'dental_trauma',
          value: 'dental_trauma',
          alternatives: [
            {
              id: 1,
              label: 'Si',
            },
            {
              id: 2,
              label: 'No',
            },
          ],
        },
      ],
      temperaturesArray: [
        {
          label: 'Frío',
          value: 1,
        },
        {
          label: 'Calor',
          value: 2,
        },
        {
          label: 'Masticación',
          value: 3,
        },
      ],
    }
  },
}
</script>

<style></style>
