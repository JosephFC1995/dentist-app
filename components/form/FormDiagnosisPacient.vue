<template>
  <div class="form-general">
    <a-form-model :model="form" ref="form">
      <a-row :gutter="16">
        <!-- DiagnosticoPresuntivo -->
        <a-col :span="24" :md="12">
          <a-form-model-item label="DiagnosticoPresuntivo">
            <a-textarea v-model="form.presumptive_diagnosis" :rows="3" :disabled="loading" />
          </a-form-model-item>
        </a-col>
        <!-- Diagnostico definitivo -->
        <a-col :span="24" :md="12">
          <a-form-model-item label="Diagnostico definitivo">
            <a-textarea v-model="form.definitive_diagnosis" :rows="3" :disabled="loading" />
          </a-form-model-item>
        </a-col>
        <!-- Pronóstico -->
        <a-col :span="24" :md="12">
          <a-form-model-item label="Pronóstico">
            <a-textarea v-model="form.prognosis" :rows="3" :disabled="loading" />
          </a-form-model-item>
        </a-col>
        <!-- Plan de tratamiento -->
        <a-col :span="24" :md="12">
          <a-form-model-item label="Plan de tratamiento">
            <a-textarea v-model="form.treatment_plan" :rows="3" :disabled="loading" />
          </a-form-model-item>
        </a-col>
        <!-- Tratamiento / Recomendaciones -->
        <a-col :span="24" :md="12">
          <a-form-model-item label="Tratamiento / Recomendaciones">
            <a-textarea v-model="form.tratment_recommendations" :rows="3" :disabled="loading" />
          </a-form-model-item>
        </a-col>
        <!-- Control y evolución -->
        <a-col :span="24" :md="12">
          <a-form-model-item label="Control y evolución">
            <a-textarea v-model="form.control_evolution" :rows="3" :disabled="loading" />
          </a-form-model-item>
        </a-col>
        <!-- Cien -->
        <a-col :span="24" :md="12">
          <a-form-model-item label="Cien 10 (Tiene que ir con código de acceso)">
            <a-select placeholder="Seleccione un código" v-model="form.id_code_100" :allowClear="true" :disabled="loading">
              <a-select-option v-for="code in codes100" :key="code.id">
                {{ code.name }}
              </a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
        <!-- Fecha de alta -->
        <a-col :span="24" :md="12">
          <a-form-model-item label="Fecha de alta">
            <a-date-picker
              v-model="form.discharge_date"
              placeholder="Seleccione una fecha de alta"
              :disabled="loading"
              format="YYYY-MM-DD"
              valueFormat="YYYY-MM-DD"
            />
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
          response = await _self.$axios.$post(`/diagnosis`, tempForm).catch((errors) => {
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
    async getDiagnosisPatient() {
      this.changeLoading(true)
      let tempForm = await this.getDiagnosis({ id_patient: this.$route.params.id })
      this.form = tempForm ? tempForm : {}
      this.changeLoading(false)
    },
    ...mapActions({
      changeLoading: 'data/diagnosis/CHANGE_LOADING',
      getDiagnosis: 'data/diagnosis/GET_ANAMNESIS_DIAGNOSIS_BY_PATIENT',
    }),
  },
  computed: {
    ...mapGetters({
      loading: 'data/diagnosis/getLoading',
      codes100: 'data/codes100/getCode100',
    }),
  },
  async mounted() {
    this.changeLoading(true)
    await this.getDiagnosisPatient()
  },
}
</script>

<style></style>
