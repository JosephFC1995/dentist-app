<template>
  <div class="form-general">
    <a-form-model :model="form" ref="newPacient">
      <h6 class="mt-0 mb-1" :style="{ color: '#B9BABA' }">Preguntas</h6>
      <a-row :gutter="16">
        <a-col
          :span="24"
          :md="24"
          v-for="(question, index_q) in questions"
          :key="index_q"
        >
          <a-form-model-item :label="question.question">
            <a-radio-group v-model="form[question.key]">
              <a-radio
                :value="alternative.id"
                v-for="alternative in question.alternatives"
                :key="alternative.id"
              >
                {{ alternative.label }}
              </a-radio>
            </a-radio-group>
          </a-form-model-item>
        </a-col>
        <a-col :span="24">
          <a-form-model-item label="Notas">
            <a-textarea v-model="form.notes" :rows="4" />
          </a-form-model-item>
        </a-col>
        <a-col :span="24">
          <a-button
            type="primary"
            html-type="submit"
            @click="() => $emit('close')"
          >
            Guardar cita
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
      questions: [
        {
          question: '¿Se encuentra usted en buen estado de salud?',
          key: 'question_1',
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
          question: '¿Esta usted recibiendo tratamiento médico actualmente?',
          key: 'question_2',
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
          question:
            '¿Ha notado algún cambio en su salud general en el último mes?',
          key: 'question_3',
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
          question: '¿Ha estado usted seriamente enfermo alguna vez?',
          key: 'question_4',
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
          question: '¿Ha estado usted hopitalizado?',
          key: 'question_5',
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
          question:
            '¿Conoce udted algún problema relacionado con su presión alterial?',
          key: 'question_6',
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
          question:
            '¿Padece udted problemas del corazón, problemas respiratorios o digestivos?',
          key: 'question_7',
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
          question: '¿Padece udted ataques de desmayos o convulsiones?',
          key: 'question_8',
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
          question: 'Señor(a), ¿está usted embarazada?',
          key: 'question_8',
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
    }
  },
}
</script>

<style></style>
