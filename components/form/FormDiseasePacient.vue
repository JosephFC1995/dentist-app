<template>
  <div class="form-general">
    <a-form-model :model="form" ref="newPacient">
      <a-row :gutter="16">
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
        <!-- Titulo -->
        <a-col :span="24" :md="24">
          <h6 class="mt-0 mb-1" :style="{ color: '#B9BABA' }">
            Campos de emergencia
          </h6>
        </a-col>
        <!-- Tiempo de enfermedad -->
        <a-col :span="24" :md="12">
          <a-form-model-item label="Tiempo de enfermedad">
            <a-textarea v-model="form.timeDisease" :rows="3" />
          </a-form-model-item>
        </a-col>
        <!-- Antecedentes familiares -->
        <a-col :span="24" :md="12">
          <a-form-model-item label="Antecedentes familiares">
            <a-textarea v-model="form.familyHistory" :rows="3" />
          </a-form-model-item>
        </a-col>
        <!-- Signos y síntomas principales -->
        <a-col :span="24" :md="12">
          <a-form-model-item label="Signos y síntomas principales">
            <a-textarea v-model="form.principalSymptoms" :rows="3" />
          </a-form-model-item>
        </a-col>
        <!-- Antecedentes personales -->
        <a-col :span="24" :md="12">
          <a-form-model-item label="Antecedentes personales">
            <a-textarea v-model="form.personalHistory" :rows="3" />
          </a-form-model-item>
        </a-col>
        <!-- Relato cronológico -->
        <a-col :span="24" :md="12">
          <a-form-model-item label="Relato cronológico">
            <a-textarea v-model="form.chronologicalStory" :rows="3" />
          </a-form-model-item>
        </a-col>
        <!-- Alergias -->
        <a-col :span="24" :md="12">
          <a-form-model-item label="Alergias">
            <a-textarea v-model="form.allergies" :rows="3" />
          </a-form-model-item>
        </a-col>
        <!-- Funciones biológicas -->
        <a-col :span="24" :md="12">
          <a-form-model-item label="Funciones biológicas">
            <a-textarea v-model="form.biologicalFunctions" :rows="3" />
          </a-form-model-item>
        </a-col>
        <!-- Medicamentos -->
        <a-col :span="24" :md="12">
          <a-form-model-item label="Medicamentos">
            <a-textarea v-model="form.medications" :rows="3" />
          </a-form-model-item>
        </a-col>
        <!-- Notas -->
        <a-col :span="24" :md="12">
          <a-form-model-item label="Notas">
            <a-textarea v-model="form.notes" :rows="3" />
          </a-form-model-item>
        </a-col>
        <!-- Habitos -->
        <a-col :span="24" :md="12">
          <a-form-model-item label="Habitos">
            <a-textarea v-model="form.habits" :rows="3" />
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
