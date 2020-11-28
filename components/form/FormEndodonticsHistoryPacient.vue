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
            <a-textarea v-model="form.notesQuestions1" :rows="4" />
          </a-form-model-item>
        </a-col>
        <a-col :span="24" :md="24">
          <a-form-model-item
            label="Ha padecido alguna de las sigueintes enfermedades"
          >
            <a-checkbox-group v-model="form.disease">
              <a-checkbox
                :value="disease.value"
                :name="disease.value"
                :style="vertical"
                v-for="disease in diseases"
                :key="disease.value"
              >
                {{ disease.label }}
              </a-checkbox>
            </a-checkbox-group>
          </a-form-model-item>
        </a-col>
        <!-- Otras enfermedades -->
        <a-col :span="24">
          <a-form-model-item label="Otras enfermedades" class="with-button">
            <a-select mode="multiple" placeholder="Otras enfermedades">
              <a-select-option v-for="i in 25" :key="(i + 9).toString(36) + i">
                {{ (i + 9).toString(36) + i }}
              </a-select-option>
            </a-select>
            <a-button type="primary" :disabled="loading">
              <i class="uil uil-plus-circle"></i>
            </a-button>
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="Otros">
            <a-textarea v-model="form.others" :rows="4" />
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="Notas">
            <a-textarea v-model="form.notesQuestions2" :rows="4" />
          </a-form-model-item>
        </a-col>
        <a-col :span="24" class="d-flex justify-content-end">
          <a-button
            type="primary"
            html-type="submit"
            @click="() => $emit('close')"
          >
            <span> <i class="uil uil-save mr-1"></i> Guardar </span>
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
      diseases: [
        {
          label: 'Alergias',
          value: 1,
        },
        {
          label: 'Infarto',
          value: 2,
        },
        {
          label: 'Alta presión',
          value: 3,
        },
        {
          label: 'Baja presión',
          value: 4,
        },
        {
          label: 'Diabetes',
          value: 5,
        },
        {
          label: 'Tuberculosis',
          value: 6,
        },
        {
          label: 'Úlceras gástricas',
          value: 7,
        },
        {
          label: 'Sinusitis',
          value: 8,
        },
        {
          label: 'Cáncer',
          value: 9,
        },
        {
          label: 'Problemas sde coagilación',
          value: 10,
        },
        {
          label: 'Hepatitis',
          value: 11,
        },
        {
          label: 'VIH+/SIDA',
          value: 12,
        },
      ],
      vertical: {
        display: 'block',
        height: '30px',
        lineHeight: '30px',
        marginLeft: '10px',
        marginBottom: '10px',
      },
    }
  },
}
</script>

<style></style>
