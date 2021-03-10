<template>
  <div class="form-general custom--data">
    <a-alert
      message="Por favor seleccione una fecha para poder editar este formulario"
      type="warning"
      show-icon
      class="mb-3"
      v-if="!selectDate"
    />
    <a-form-model :model="form" ref="form">
      <a-row :gutter="16">
        <!-- Indicador de tratamiento -->
        <a-col :span="24" :md="24">
          <a-form-model-item label="Indicador de tratamiento">
            <a-checkbox-group v-model="form.indicated_treatment">
              <a-checkbox :value="1" :disabled="loading"> Biopulpectomía </a-checkbox>
              <a-checkbox :value="2" :disabled="loading"> Necropulpectomía </a-checkbox>
              <a-checkbox :value="3" :disabled="loading"> Retratamiento </a-checkbox>
              <a-checkbox :value="4" :disabled="loading"> Blanqueamiento </a-checkbox>
              <a-checkbox :value="5" :disabled="loading"> Apicectomía </a-checkbox>
              <a-checkbox :value="6" :disabled="loading"> Hemisección </a-checkbox>
              <a-checkbox :value="7" :disabled="loading"> Radicectomía </a-checkbox>
              <a-checkbox :value="8" :disabled="loading"> Extracción </a-checkbox>
            </a-checkbox-group>
          </a-form-model-item>
        </a-col>
        <a-col :span="24" :md="24">
          <h6 class="mt-0 mb-1" :style="{ color: '#000' }">Datos clínicos</h6>
          <a-row :gutter="16">
            <a-col :span="24" :md="4"> </a-col>
            <a-col :span="24" :md="4">
              <span class="label" :style="textOneLine" title="Longitud de trabajo"> Longitud de trabajo </span>
            </a-col>
            <a-col :span="24" :md="4">
              <span class="label" :style="textOneLine" title="Punto de referencia"> Punto de referencia </span>
            </a-col>
            <a-col :span="24" :md="3">
              <span class="label" :style="textOneLine" title="Lima inicial"> Lima inicial </span>
            </a-col>
            <a-col :span="24" :md="3">
              <span class="label" :style="textOneLine" title="Última lima aplicada"> Última lima aplicada </span>
            </a-col>
            <a-col :span="24" :md="2">
              <span class="label" :style="textOneLine" title="Gates"> Gates </span>
            </a-col>
            <a-col :span="24" :md="4">
              <span class="label" :style="textOneLine" title="Cono maestrode Gutaperec. Ha"> Cono maestrode Gutaperec. Ha </span>
            </a-col>
          </a-row>
          <!-- Unicos -->
          <a-row :gutter="16" v-for="data in arrayData" :key="data.id" class="mb-3">
            <a-col :span="24" :md="4">
              <span class="label"> {{ data.label }} </span>
            </a-col>
            <a-col :span="24" :md="4">
              <a-input v-model="form[data.inputLength]" placeholder="Longitud" :disabled="loading" />
            </a-col>
            <a-col :span="24" :md="4">
              <a-input v-model="form[data.inputPoint]" placeholder="Punto" :disabled="loading" />
            </a-col>
            <a-col :span="24" :md="3">
              <a-input v-model="form[data.inputFile]" placeholder="Lima inicial" :disabled="loading" />
            </a-col>
            <a-col :span="24" :md="3">
              <a-input v-model="form[data.inputLastFile]" placeholder="Ultima lima" :disabled="loading" />
            </a-col>
            <a-col :span="24" :md="2">
              <a-input v-model="form[data.inputGates]" placeholder="Gates" :disabled="loading" />
            </a-col>
            <a-col :span="24" :md="4">
              <a-input v-model="form[data.inputCones]" placeholder="Cono" :disabled="loading" />
            </a-col>
          </a-row>
        </a-col>
        <a-col :span="24">
          <a-divider dashed> </a-divider>
        </a-col>
        <!-- Téc. de instrumentación -->
        <a-col :span="24" :md="24">
          <a-form-model-item label="Téc. de instrumentación">
            <a-radio-group v-model="form.text_inst_radio">
              <a-radio :value="1" :disabled="loading"> Convencional </a-radio>
              <a-radio :value="2" :disabled="loading"> Fuerza balanceadas </a-radio>
              <a-radio :value="3" :disabled="loading"> Criwn Down </a-radio>
              <a-radio :value="4" :disabled="loading"> Step back </a-radio>
              <a-radio :value="0" :disabled="loading"> Otra </a-radio>
            </a-radio-group>
          </a-form-model-item>
        </a-col>
        <a-col :span="24" :md="24">
          <a-form-model-item>
            <a-input v-model="form.text_inst_input_other" placeholder="Otra" :disabled="loading || form.text_inst_radio != 0" />
          </a-form-model-item>
        </a-col>
        <!-- Agente irrigante -->
        <a-col :span="24" :md="24">
          <a-form-model-item label="Agente irrigante">
            <a-radio-group v-model="form.irrigant_agent_radio">
              <a-radio :value="1" :disabled="loading"> NaOCI 1% </a-radio>
              <a-radio :value="2" :disabled="loading"> NaOCI 2.5% </a-radio>
              <a-radio :value="3" :disabled="loading"> NaOCI 5.25% </a-radio>
              <a-radio :value="0" :disabled="loading"> Otra </a-radio>
            </a-radio-group>
          </a-form-model-item>
        </a-col>
        <a-col :span="24" :md="24">
          <a-form-model-item>
            <a-input
              v-model="form.irrigant_agent_input_other"
              placeholder="Otra"
              :disabled="loading || form.irrigant_agent_radio != 0"
            />
          </a-form-model-item>
        </a-col>
        <!-- Curativo de demora -->
        <a-col :span="24" :md="24">
          <a-form-model-item label="Curativo de demora">
            <a-radio-group v-model="form.delay_healing_radio">
              <a-radio :value="1" :disabled="loading"> So </a-radio>
              <a-radio :value="2" :disabled="loading"> No </a-radio>
              <a-radio :value="3" :disabled="loading"> Ca(OG)2 </a-radio>
              <a-radio :value="0" :disabled="loading"> Otra </a-radio>
            </a-radio-group>
          </a-form-model-item>
        </a-col>
        <a-col :span="24" :md="24">
          <a-form-model-item>
            <a-input
              v-model="form.delay_healing_input_other"
              placeholder="Otra"
              :disabled="loading || form.delay_healing_radio != 0"
            />
          </a-form-model-item>
        </a-col>
        <!-- Obsturación -->
        <a-col :span="24" :md="24">
          <a-form-model-item label="Obsturación">
            <a-checkbox-group v-model="form.obsturation">
              <a-checkbox :value="1" :disabled="loading"> Lateral </a-checkbox>
            </a-checkbox-group>
          </a-form-model-item>
        </a-col>
        <!-- Cemento -->
        <a-col :span="24" :md="24">
          <a-form-model-item label="Cemento">
            <a-radio-group v-model="form.cement_radio">
              <a-radio :value="1" :disabled="loading"> Sealapex </a-radio>
              <a-radio :value="2" :disabled="loading"> Tubli Seal </a-radio>
              <a-radio :value="0" :disabled="loading"> Otra </a-radio>
            </a-radio-group>
          </a-form-model-item>
        </a-col>
        <a-col :span="24" :md="24">
          <a-form-model-item>
            <a-input v-model="form.cement_input_other" placeholder="Otra" :disabled="loading || form.cement_radio != 0" />
          </a-form-model-item>
        </a-col>
        <a-col :span="24" class="d-flex justify-content-end">
          <a-button type="primary" html-type="submit" @click="submit" :loading="loading" :disabled="!selectDate">
            <span> Guardar </span>
          </a-button>
        </a-col>
      </a-row>
    </a-form-model>
    <pre>
      {{ form }}
    </pre>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'

export default {
  data() {
    return {
      form: {},
      arrayData: [
        {
          id: 1,
          label: 'Unicos',
          inputLength: 'key_length_input_unique',
          inputPoint: 'key_point_input_unique',
          inputFile: 'key_file_input_unique',
          inputLastFile: 'key_last_file_input_unique',
          inputGates: 'key_gates_input_unique',
          inputCones: 'key_cones_input_unique',
        },
        {
          id: 2,
          label: 'Vesticular',
          inputLength: 'key_length_input_vesticular',
          inputPoint: 'key_point_input_vesticular',
          inputFile: 'key_file_input_vesticular',
          inputLastFile: 'key_last_file_input_vesticular',
          inputGates: 'key_gates_input_vesticular',
          inputCones: 'key_cones_input_vesticular',
        },
        {
          id: 3,
          label: 'Palatino / Lingual',
          inputLength: 'key_length_input_palatine',
          inputPoint: 'key_point_input_palatine',
          inputFile: 'key_file_input_palatine',
          inputLastFile: 'key_last_file_input_palatine',
          inputGates: 'key_gates_input_palatine',
          inputCones: 'key_cones_input_palatine',
        },
        {
          id: 4,
          label: 'Mesio bucal',
          inputLength: 'key_length_input_mesio_bucal',
          inputPoint: 'key_point_input_mesio_bucal',
          inputFile: 'key_file_input_mesio_bucal',
          inputLastFile: 'key_last_file_input_mesio_bucal',
          inputGates: 'key_gates_input_mesio_bucal',
          inputCones: 'key_cones_input_mesio_bucal',
        },
        {
          id: 5,
          label: 'Mesio lingual',
          inputLength: 'key_length_input_mesio_lingual',
          inputPoint: 'key_point_input_mesioLingual',
          inputFile: 'key_file_input_mesio_lingual',
          inputLastFile: 'key_last_file_input_mesio_lingual',
          inputGates: 'key_gates_input_mesio_lingual',
          inputCones: 'key_cones_input_mesio_lingual',
        },
        {
          id: 6,
          label: 'Distal',
          inputLength: 'key_length_input_distal',
          inputPoint: 'key_point_input_distal',
          inputFile: 'key_file_input_distal',
          inputLastFile: 'key_last_file_input_distal',
          inputGates: 'key_gates_input_distal',
          inputCones: 'key_cones_input_distal',
        },
        {
          id: 7,
          label: 'Disto bucal',
          inputLength: 'key_length_input_disto_bucal',
          inputPoint: 'key_point_input_disto_bucal',
          inputFile: 'key_file_input_disto_bucal',
          inputLastFile: 'key_last_file_input_disto_bucal',
          inputGates: 'key_gates_input_disto_bucal',
          inputCones: 'key_cones_input_disto_bucal',
        },
        {
          id: 8,
          label: 'Disto lingual',
          inputLength: 'key_length_input_disto_lingual',
          inputPoint: 'key_point_input_disto_lingual',
          inputFile: 'key_file_input_disto_lingual',
          inputLastFile: 'key_last_file_input_disto_lingual',
          inputGates: 'key_gates_input_disto_lingual',
          inputCones: 'key_cones_input_disto_lingual',
        },
      ],
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
      textOneLine: {
        'font-size': '12px',
        'text-align': 'center',
        'white-space': 'nowrap',
        'text-overflow': 'ellipsis',
        overflow: 'hidden',
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
          response = await _self.$axios.$put(`/endodontic_treatment/${this.form.id}`, this.form).catch((errors) => {
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
    endodonticTreatmentSelect(newValue, oldValue) {
      this.form = _.cloneDeep(newValue)
    },
  },
  computed: {
    ...mapGetters({
      loading: 'data/endodontics/getLoading',
      selectDate: 'data/endodontics/getSeletedDate',
      endodonticSelect: 'data/endodontics/getEndodonticSelect',
      endodonticTreatmentSelect: 'data/endodontics/getEndodonticTreatmentSelect',
      questions: 'data/questions/getQuestions',
      diseases: 'data/diseases/getDiseases',
      otherDiseases: 'data/other_diseases/getOtherDiseases',
    }),
  },
  mounted() {
    this.form = this.endodonticTreatmentSelect ? _.cloneDeep(this.endodonticTreatmentSelect) : { indicative_treatments: [] }
  },
}
</script>

<style></style>
