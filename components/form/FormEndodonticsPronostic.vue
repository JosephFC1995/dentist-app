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
      <a-row :gutter="16">
        <a-col :span="24" :md="24">
          <a-form-model-item label="Ingrese el pronóstico">
            <a-textarea v-model="form.pronostic" :rows="3" :disabled="loading || !selectDate" />
          </a-form-model-item>
        </a-col>

        <a-col :span="24" class="d-flex justify-content-end">
          <a-button type="primary" html-type="submit" @click="submit" :loading="loading" :disabled="!selectDate">
            <span> Guardar </span>
          </a-button>
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
      horizontal: {
        height: '30px',
        lineHeight: '30px',
        marginLeft: '0',
        marginRight: '10px',
        marginBottom: '7px',
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
          response = await _self.$axios.$put(`/endodontic_forecast/${this.form.id}`, this.form).catch((errors) => {
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
    endodonticForecastSelect(newValue, oldValue) {
      this.form = _.cloneDeep(newValue)
    },
  },
  computed: {
    ...mapGetters({
      loading: 'data/endodontics/getLoading',
      selectDate: 'data/endodontics/getSeletedDate',
      endodonticSelect: 'data/endodontics/getEndodonticSelect',
      endodonticForecastSelect: 'data/endodontics/getEndodonticForecastSelect',
      questions: 'data/questions/getQuestions',
      diseases: 'data/diseases/getDiseases',
      otherDiseases: 'data/other_diseases/getOtherDiseases',
    }),
  },
  mounted() {
    this.form = this.endodonticForecastSelect ? _.cloneDeep(this.endodonticForecastSelect) : { indicative_treatments: [] }
  },
}
</script>

<style></style>
