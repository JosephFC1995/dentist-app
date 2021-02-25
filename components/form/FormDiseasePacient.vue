<template>
  <div class="form-general">
    <a-form-model :model="form" ref="form">
      <a-row :gutter="16">
        <a-col :span="24" :md="24">
          <a-form-model-item label="Ha padecido alguna de las sigueintes enfermedades">
            <a-checkbox-group v-model="form.patient_diseases" :disabled="loading">
              <a-checkbox
                :value="disease.id"
                :name="String(disease.id)"
                :style="vertical"
                v-for="disease in diseases"
                :key="disease.id"
              >
                {{ disease.name }}
              </a-checkbox>
            </a-checkbox-group>
          </a-form-model-item>
        </a-col>
        <!-- Otras enfermedades -->
        <a-col :span="24">
          <a-form-model-item label="Otras enfermedades" class="with-button">
            <a-select mode="multiple" placeholder="Otras enfermedades" v-model="form.patient_other_diseases" :disabled="loading">
              <a-select-option v-for="other in otherDiseases" :key="other.id">
                {{ other.name }}
              </a-select-option>
            </a-select>
            <!-- <a-button type="primary" :disabled="loading">
              <i class="uil uil-plus-circle"></i>
            </a-button> -->
          </a-form-model-item>
        </a-col>
        <!-- Titulo -->
        <a-col :span="24" :md="24">
          <h6 class="mt-0 mb-1" :style="{ color: '#B9BABA' }">Campos de emergencia</h6>
        </a-col>
        <!-- Tiempo de enfermedad -->
        <a-col :span="24" :md="12">
          <a-form-model-item label="Tiempo de enfermedad">
            <a-textarea v-model="form.time_disease" :rows="3" :disabled="loading" />
          </a-form-model-item>
        </a-col>
        <!-- Antecedentes familiares -->
        <a-col :span="24" :md="12">
          <a-form-model-item label="Antecedentes familiares">
            <a-textarea v-model="form.family_history" :rows="3" :disabled="loading" />
          </a-form-model-item>
        </a-col>
        <!-- Signos y síntomas principales -->
        <a-col :span="24" :md="12">
          <a-form-model-item label="Signos y síntomas principales">
            <a-textarea v-model="form.principal_symptoms" :rows="3" :disabled="loading" />
          </a-form-model-item>
        </a-col>
        <!-- Antecedentes personales -->
        <a-col :span="24" :md="12">
          <a-form-model-item label="Antecedentes personales">
            <a-textarea v-model="form.personal_history" :rows="3" :disabled="loading" />
          </a-form-model-item>
        </a-col>
        <!-- Relato cronológico -->
        <a-col :span="24" :md="12">
          <a-form-model-item label="Relato cronológico">
            <a-textarea v-model="form.chronological_story" :rows="3" :disabled="loading" />
          </a-form-model-item>
        </a-col>
        <!-- Alergias -->
        <a-col :span="24" :md="12">
          <a-form-model-item label="Alergias">
            <a-textarea v-model="form.allergies" :rows="3" :disabled="loading" />
          </a-form-model-item>
        </a-col>
        <!-- Funciones biológicas -->
        <a-col :span="24" :md="12">
          <a-form-model-item label="Funciones biológicas">
            <a-textarea v-model="form.biological_functions" :rows="3" :disabled="loading" />
          </a-form-model-item>
        </a-col>
        <!-- Medicamentos -->
        <a-col :span="24" :md="12">
          <a-form-model-item label="Medicamentos">
            <a-textarea v-model="form.medications" :rows="3" :disabled="loading" />
          </a-form-model-item>
        </a-col>
        <!-- Notas -->
        <a-col :span="24" :md="12">
          <a-form-model-item label="Notas">
            <a-textarea v-model="form.notes" :rows="3" :disabled="loading" />
          </a-form-model-item>
        </a-col>
        <!-- Habitos -->
        <a-col :span="24" :md="12">
          <a-form-model-item label="Habitos">
            <a-textarea v-model="form.habits" :rows="3" :disabled="loading" />
          </a-form-model-item>
        </a-col>

        <a-col :span="24" class="d-flex justify-content-end">
          <a-button type="primary" html-type="submit" @click="submitLogin" :loading="loading"> Guardar </a-button>
        </a-col>
      </a-row>
    </a-form-model>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'

export default {
  data() {
    return {
      form: {},
      vertical: {
        display: 'block',
        height: '30px',
        lineHeight: '30px',
        marginLeft: '10px',
        marginBottom: '10px',
      },
    }
  },
  methods: {
    submitLogin() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          let _self = this
          this.changeLoading(true)
          let tempForm = this.form
          tempForm.id_patient = this.$route.params.id
          let response = false
          response = await _self.$axios.$post(`/anamnesis_diseases`, tempForm).catch((errors) => {
            this.changeLoading(false)
          })
          if (response.success) this.$message.success(response.message)
          this.changeLoading(false)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    async getAnamnesisDiseasePatient() {
      this.changeLoading(true)
      let tempForm = await this.getAnamnesisDisease({ id_patient: this.$route.params.id })
      this.form = tempForm ? tempForm : {}

      this.changeLoading(false)
    },
    ...mapActions({
      changeLoading: 'data/anamnesis_disease/CHANGE_LOADING',
      getAnamnesisDisease: 'data/anamnesis_disease/GET_ANAMNESIS_DISEASE_BY_PATIENT',
    }),
  },
  computed: {
    ...mapGetters({
      loading: 'data/anamnesis_disease/getLoading',
      diseases: 'data/diseases/getDiseases',
      otherDiseases: 'data/other_diseases/getOtherDiseases',
    }),
  },
  async mounted() {
    this.changeLoading(true)
    await this.getAnamnesisDiseasePatient()
  },
}
</script>

<style></style>
