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
          <a-form-model-item label="Tratamientos indicatos">
            <a-checkbox-group v-model="form.indicative_treatments" :style="{ width: '100%' }">
              <a-row :gutter="16">
                <a-col :span="24" :md="12">
                  <a-checkbox :value="1" :disabled="loading || !selectDate" :style="vertical"> Acceso inadecuado </a-checkbox>
                </a-col>
                <a-col :span="24" :md="12">
                  <a-checkbox :value="2" :disabled="loading || !selectDate" :style="vertical"> Escalón </a-checkbox>
                </a-col>
                <a-col :span="24" :md="12">
                  <a-checkbox :value="3" :disabled="loading || !selectDate" :style="vertical"> Transportación </a-checkbox>
                </a-col>
                <a-col :span="24" :md="12">
                  <a-checkbox :value="4" :disabled="loading || !selectDate" :style="vertical"> Perforación en cámara </a-checkbox>
                </a-col>
                <a-col :span="24" :md="12">
                  <a-checkbox :value="5" :disabled="loading || !selectDate" :style="vertical">
                    Perforación en conducto
                  </a-checkbox>
                </a-col>
                <a-col :span="24" :md="12">
                  <a-checkbox :value="6" :disabled="loading || !selectDate" :style="vertical"> Insrumento fracturado </a-checkbox>
                </a-col>
                <a-col :span="24" :md="12">
                  <a-checkbox :value="7" :disabled="loading || !selectDate" :style="vertical"> Sobre instrumentación </a-checkbox>
                </a-col>
                <a-col :span="24" :md="12">
                  <a-checkbox :value="8" :disabled="loading || !selectDate" :style="vertical"> Subinstrumentación </a-checkbox>
                </a-col>
                <a-col :span="24" :md="12">
                  <a-checkbox :value="9" :disabled="loading || !selectDate" :style="vertical"> Sobreobsturación </a-checkbox>
                </a-col>
                <a-col :span="24" :md="12">
                  <a-checkbox :value="10" :disabled="loading || !selectDate" :style="vertical"> Subobturación </a-checkbox>
                </a-col>
                <a-col :span="24" :md="12">
                  <a-checkbox :value="11" :disabled="loading || !selectDate" :style="vertical">
                    Obsturación inadecuada
                  </a-checkbox>
                </a-col>
                <a-col :span="24" :md="12">
                  <a-checkbox :value="12" :disabled="loading || !selectDate" :style="vertical"> Fractura coronaria </a-checkbox>
                </a-col>
                <a-col :span="24" :md="12">
                  <a-checkbox :value="13" :disabled="loading || !selectDate" :style="vertical"> Fractura vertical </a-checkbox>
                </a-col>
                <a-col :span="24" :md="12">
                  <a-checkbox :value="14" :disabled="loading || !selectDate" :style="vertical">
                    Extrucsión de cemento
                  </a-checkbox>
                </a-col>
                <a-col :span="24" :md="12">
                  <a-checkbox :value="15" :disabled="loading || !selectDate" :style="vertical">
                    Extrucsión de hipoclorito
                  </a-checkbox>
                </a-col>
                <a-col :span="24" :md="12">
                  <a-checkbox :value="16" :disabled="loading || !selectDate" :style="vertical">
                    Sin dominio de técnica
                  </a-checkbox>
                </a-col>
                <a-col :span="24" :md="12">
                  <a-checkbox :value="17" :disabled="loading || !selectDate" :style="vertical"> Favorable </a-checkbox>
                </a-col>
                <a-col :span="24" :md="12">
                  <a-checkbox :value="18" :disabled="loading || !selectDate" :style="vertical"> Desfaborable </a-checkbox>
                </a-col>
                <a-col :span="24" :md="12">
                  <a-checkbox :value="19" :disabled="loading || !selectDate" :style="vertical"> Reservado </a-checkbox>
                </a-col>
                <a-col :span="24" :md="12">
                  <a-checkbox :value="0" :disabled="loading || !selectDate" :style="vertical"> Otro </a-checkbox>
                </a-col>
              </a-row>
            </a-checkbox-group>
          </a-form-model-item>
        </a-col>
        <a-col :span="24" :md="24">
          <a-form-model-item>
            <a-input v-model="form.indicative_treatments_other" placeholder="Otro" :disabled="loading || !selectDate" />
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
      form: {
        indicative_treatments: [],
      },
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
          response = await _self.$axios.$put(`/endodontic_operative_accident/${this.form.id}`, this.form).catch((errors) => {
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
    endodonticOperativeAccidentSelect(newValue, oldValue) {
      this.form = _.cloneDeep(newValue)
    },
  },
  computed: {
    ...mapGetters({
      loading: 'data/endodontics/getLoading',
      selectDate: 'data/endodontics/getSeletedDate',
      endodonticSelect: 'data/endodontics/getEndodonticSelect',
      endodonticOperativeAccidentSelect: 'data/endodontics/getEndodonticOperativeAccidentSelect',
      questions: 'data/questions/getQuestions',
      diseases: 'data/diseases/getDiseases',
      otherDiseases: 'data/other_diseases/getOtherDiseases',
    }),
  },
  mounted() {
    this.form = this.endodonticOperativeAccidentSelect
      ? _.cloneDeep(this.endodonticOperativeAccidentSelect)
      : { indicative_treatments: [] }
  },
}
</script>

<style></style>
