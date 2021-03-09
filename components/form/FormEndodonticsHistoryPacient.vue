<template>
  <div class="form-general">
    <a-alert
      message="Por favor seleccione una fecha para poder editar este formulario"
      type="warning"
      show-icon
      class="mb-3"
      v-if="!selectDate"
    />
    <a-form-model :model="form" ref="form">
      <h6 class="mt-0 mb-1" :style="{ color: '#B9BABA' }">Preguntas</h6>
      <a-row :gutter="16">
        <a-col :span="24" :md="24" v-for="(question, index_q) in questions" :key="index_q">
          <a-form-model-item :label="question.question">
            <a-radio-group v-model="form[question.question_id]" :disabled="loading || !selectDate">
              <a-radio :value="alternative.id" v-for="alternative in question.alternatives" :key="alternative.id">
                {{ alternative.name }}
              </a-radio>
            </a-radio-group>
          </a-form-model-item>
        </a-col>
        <a-col :span="24">
          <a-form-model-item label="Notas">
            <a-textarea v-model="form.notes" :rows="4" :disabled="loading || !selectDate" />
          </a-form-model-item>
        </a-col>
        <a-col :span="24" :md="24">
          <a-form-model-item label="Ha padecido alguna de las sigueintes enfermedades">
            <a-checkbox-group v-model="form.disease" :disabled="loading || !selectDate">
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
            <a-select
              mode="multiple"
              placeholder="Otras enfermedades"
              v-model="form.other_diseases"
              :disabled="loading || !selectDate"
            >
              <a-select-option v-for="other in otherDiseases" :key="other.id">
                {{ other.name }}
              </a-select-option>
            </a-select>
            <!-- <a-button type="primary" :disabled="loading || !selectDate">
              <i class="uil uil-plus-circle"></i>
            </a-button> -->
          </a-form-model-item>
        </a-col>
        <a-col :span="24">
          <a-form-model-item label="Otros">
            <a-textarea v-model="form.others" :rows="4" :disabled="loading || !selectDate" />
          </a-form-model-item>
        </a-col>
        <a-col :span="24" class="d-flex justify-content-end">
          <a-button type="primary" html-type="submit" @click="submit" :loading="loading">
            <span> Guardar </span>
          </a-button>
        </a-col>
      </a-row>
    </a-form-model>
    <!-- <pre>
      {{ form }}
    </pre> -->
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'
import _ from 'lodash'

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
    submit() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          let _self = this
          this.changeLoading(true)
          let response = false
          let tempQuestion = this.form
          let tempForm = {
            ...this.form,
            questions: Object.keys(tempQuestion).map((key) => {
              if (key != 'notes') return { key, value: tempQuestion[key] }
            }),
          }
          tempForm.date = this.form.date
          response = await _self.$axios.$put(`/endodontic_medical_record/${this.form.id}`, tempForm).catch((errors) => {
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
    ...mapActions({
      changeLoading: 'data/endodontics/CHANGE_LOADING',
    }),
  },
  watch: {
    endodonticMedicalRecordSelect(newValue, oldValue) {
      this.form = _.cloneDeep(newValue)
    },
  },
  computed: {
    ...mapGetters({
      loading: 'data/endodontics/getLoading',
      selectDate: 'data/endodontics/getSeletedDate',
      endodonticSelect: 'data/endodontics/getEndodonticSelect',
      endodonticMedicalRecordSelect: 'data/endodontics/getEndodonticMedicalRecordSelect',
      questions: 'data/questions/getQuestions',
      diseases: 'data/diseases/getDiseases',
      otherDiseases: 'data/other_diseases/getOtherDiseases',
    }),
  },
  mounted() {
    this.form = this.endodonticMedicalRecordSelect ? _.cloneDeep(this.endodonticMedicalRecordSelect) : {}
  },
}
</script>

<style></style>
