<template>
  <div>
    <div class="form-general" v-if="!loaderData || newData">
      <a-form-model :model="form" ref="form">
        <h6 class="mt-0 mb-1" :style="{ color: '#B9BABA' }">Preguntas</h6>
        <a-row :gutter="16">
          <a-col :span="24" :md="24" v-for="(question, index_q) in questions" :key="index_q">
            <a-form-model-item :label="question.question">
              <a-radio-group v-model="form[question.question_id]" :disabled="loading">
                <a-radio :value="alternative.id" v-for="alternative in question.alternatives" :key="alternative.id">
                  {{ alternative.name }}
                </a-radio>
              </a-radio-group>
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="Notas">
              <a-textarea v-model="form.notes" :rows="4" :disabled="loading" />
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-button type="primary" html-type="submit" @click="submitLogin" :disabled="loading">
              {{ newData ? 'Agregar' : 'Actualizar' }}
            </a-button>
          </a-col>
        </a-row>
      </a-form-model>
    </div>
    <Loading v-else width="350px" />
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'
import _ from 'lodash'

export default {
  props: {
    form: {
      type: Object,
      default: null,
    },
    newData: {
      type: Boolean,
      default: false,
    },
    loaderData: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {}
  },
  methods: {
    submitLogin() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          let _self = this
          this.changeLoading(true)
          let response = false
          let tempQuestion = this.form
          let tempForm = {
            id_patient: this.$route.params.id,
            notes: this.form.notes,
            questions: Object.keys(tempQuestion).map((key) => {
              if (key != 'notes') return { key, value: tempQuestion[key] }
            }),
          }

          if (!this.newData) {
            tempForm.date = this.form.date
            response = await _self.$axios.$put(`/medical_records/${this.form.id}`, tempForm).catch((errors) => {
              this.changeLoading(false)
            })
          } else {
            response = await _self.$axios.$post(`/medical_records`, tempForm).catch((errors) => {
              this.changeLoading(false)
            })
          }
          if (response.success) this.$message.success(response.message)
          this.changeLoading(false)
          this.$store.dispatch('tables/medical_records/GET_MEDICAL_RECORDS_TABLE')
          this.closeDrawer()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    closeDrawer() {
      this.$emit('close')
    },
    ...mapActions({
      changeLoading: 'data/questions/CHANGE_LOADING',
      getQuestions: 'data/questions/GET_QUESTIONS',
    }),
  },
  computed: {
    ...mapGetters({
      loading: 'data/questions/getLoading',
      questions: 'data/questions/getQuestions',
    }),
  },
  mounted() {
    // this.getQuestions()
  },
}
</script>

<style></style>
