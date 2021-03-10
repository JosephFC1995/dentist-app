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
        <!-- Corona anatómica -->
        <a-col :span="24" :md="24">
          <a-form-model-item label="Corona anatómica">
            <a-checkbox-group v-model="form.anatomical_crown">
              <a-checkbox :value="1" name="Caries" :disabled="loading || !selectDate"> Caries </a-checkbox>
              <a-checkbox :value="2" name="Restauración" :disabled="loading || !selectDate"> Restauración </a-checkbox>
              <a-checkbox :value="3" name="Bruximo" :disabled="loading || !selectDate"> Bruximo </a-checkbox>
              <a-checkbox :value="4" name="Fractura" :disabled="loading || !selectDate"> Fractura </a-checkbox>
              <a-checkbox :value="5" name="Fractura y exposición pulpar" :disabled="loading || !selectDate">
                Fractura y exposición pulpar
              </a-checkbox>
            </a-checkbox-group>
          </a-form-model-item>
        </a-col>
        <!-- Inflamación presente -->
        <a-col :span="24" :md="24">
          <a-form-model-item label="Inflamación presente">
            <a-radio-group v-model="form.inflammation_present_radio">
              <a-radio :value="1" :disabled="loading || !selectDate"> Si </a-radio>
              <a-radio :value="2" :disabled="loading || !selectDate"> No </a-radio>
            </a-radio-group>
          </a-form-model-item>
        </a-col>
        <a-col :span="24" :md="24">
          <a-form-model-item>
            <a-checkbox-group v-model="form.inflammation_present_check">
              <a-checkbox
                :value="1"
                name="Ensía vestibular"
                :disabled="loading || !selectDate || form.inflammation_present_radio != 1"
              >
                Ensía vestibular
              </a-checkbox>
              <a-checkbox
                :value="2"
                name="Encía lingual / palatina"
                :disabled="loading || !selectDate || form.inflammation_present_radio != 1"
              >
                Encía lingual / palatina
              </a-checkbox>
              <a-checkbox :value="3" name="Facial" :disabled="loading || !selectDate || form.inflammation_present_radio != 1">
                Facial
              </a-checkbox>
            </a-checkbox-group>
          </a-form-model-item>
        </a-col>
        <!-- Gingivitis -->
        <a-col :span="24" :md="12">
          <a-form-model-item label="Gingivitis">
            <a-radio-group v-model="form.gingivitis">
              <a-radio :value="1" :disabled="loading || !selectDate"> Si </a-radio>
              <a-radio :value="2" :disabled="loading || !selectDate"> No </a-radio>
            </a-radio-group>
          </a-form-model-item>
        </a-col>
        <!-- Sarro -->
        <a-col :span="24" :md="12">
          <a-form-model-item label="Sarro">
            <a-radio-group v-model="form.sarro">
              <a-radio :value="1" :disabled="loading || !selectDate"> Si </a-radio>
              <a-radio :value="2" :disabled="loading || !selectDate"> No </a-radio>
            </a-radio-group>
          </a-form-model-item>
        </a-col>
        <!-- Fisura -->
        <a-col :span="24" :md="24">
          <a-form-model-item label="Fisura">
            <a-radio-group v-model="form.fisure_radio">
              <a-radio :value="1" :disabled="loading || !selectDate"> Si </a-radio>
              <a-radio :value="2" :disabled="loading || !selectDate"> No </a-radio>
            </a-radio-group>
          </a-form-model-item>
        </a-col>
        <a-col :span="24" :md="24">
          <a-form-model-item>
            <a-checkbox-group v-model="form.fisure_check">
              <a-checkbox :value="1" name="Vest." :disabled="loading || !selectDate || form.fisure_radio != 1">
                Vest.
              </a-checkbox>
              <a-checkbox :value="2" name="Ling / Pal." :disabled="loading || !selectDate || form.fisure_radio != 1">
                Ling. / Pal.
              </a-checkbox>
              <a-checkbox :value="3" name="Extraoral" :disabled="loading || !selectDate || form.fisure_radio != 1">
                Extraoral
              </a-checkbox>
            </a-checkbox-group>
          </a-form-model-item>
        </a-col>
        <!-- Dolor presente -->
        <a-col :span="24" :md="24">
          <a-form-model-item label="Dolor presente">
            <a-radio-group v-model="form.pain_present_radio">
              <a-radio :value="1" :disabled="loading || !selectDate"> Si </a-radio>
              <a-radio :value="2" :disabled="loading || !selectDate"> No </a-radio>
            </a-radio-group>
          </a-form-model-item>
        </a-col>
        <a-col :span="24" :md="24">
          <a-form-model-item>
            <a-checkbox-group v-model="form.pain_present_check">
              <a-checkbox
                :value="pain.id"
                :name="pain.name"
                :disabled="loading || !selectDate || form.pain_present_radio != 1"
                v-for="pain in painPresentArray"
                :key="pain.id"
                :style="horizontal"
              >
                {{ pain.name }}
              </a-checkbox>
            </a-checkbox-group>
          </a-form-model-item>
        </a-col>
        <!-- Dolor a la percusión -->
        <a-col :span="24" :md="24">
          <a-form-model-item label="Dolor a la percusión">
            <a-checkbox-group v-model="form.pain_on_percussion">
              <a-checkbox :value="1" name="Vertical" :disabled="loading || !selectDate"> Vertical </a-checkbox>
              <a-checkbox :value="2" name="Horizontal" :disabled="loading || !selectDate"> Horizontal </a-checkbox>
            </a-checkbox-group>
          </a-form-model-item>
        </a-col>
        <!-- Dolor a la palpitación -->
        <a-col :span="24" :md="24">
          <a-form-model-item label="Dolor a la palpitación">
            <a-radio-group v-model="form.throbbing_pain">
              <a-radio :value="1" :disabled="loading || !selectDate"> Vesticular </a-radio>
              <a-radio :value="2" :disabled="loading || !selectDate"> Lingual / Palatino </a-radio>
            </a-radio-group>
          </a-form-model-item>
        </a-col>
        <!-- Bolsas -->
        <a-col :span="24" :md="12">
          <a-form-model-item label="Bolsas">
            <a-radio-group v-model="form.bags">
              <a-radio :value="1" :disabled="loading || !selectDate"> Si </a-radio>
              <a-radio :value="2" :disabled="loading || !selectDate"> No </a-radio>
            </a-radio-group>
          </a-form-model-item>
        </a-col>
        <a-col :span="24" :md="12">
          <a-form-model-item label="Sondeo">
            <a-input v-model="form.sounding" placeholder="Sondeo" :disabled="loading || !selectDate" />
          </a-form-model-item>
        </a-col>
        <!-- Movilidad -->
        <a-col :span="24" :md="24">
          <a-form-model-item label="Movilidad">
            <a-radio-group v-model="form.move">
              <a-radio :value="1" :disabled="loading || !selectDate"> Normal </a-radio>
              <a-radio :value="2" :disabled="loading || !selectDate"> Grado I </a-radio>
              <a-radio :value="3" :disabled="loading || !selectDate"> Grado II </a-radio>
              <a-radio :value="4" :disabled="loading || !selectDate"> Grado III </a-radio>
            </a-radio-group>
          </a-form-model-item>
        </a-col>
        <a-col :span="24">
          <a-divider dashed> </a-divider>
        </a-col>
        <!-- Movilidad -->
        <a-col :span="24" :md="24">
          <h6 class="mt-0 mb-1" :style="{ color: '#000' }">Pruebas de vitalidad</h6>
          <a-row :gutter="24">
            <a-col :span="24" :md="12">
              <a-form-model-item label="Frio">
                <a-switch default-checked v-model="form.vitality_tests_check_cold" />
                <!-- <a-checkbox-group v-model="form.vitality_tests_check_cold">
                  <a-checkbox :value="1" name="Frio" :disabled="loading || !selectDate"> Frio </a-checkbox>
                </a-checkbox-group> -->
              </a-form-model-item>
              <a-form-model-item label="Responde">
                <a-radio-group v-model="form.vitality_tests_cold_response" :disabled="!form.vitality_tests_check_cold">
                  <a-radio :value="1" :disabled="loading || !selectDate"> Si </a-radio>
                  <a-radio :value="2" :disabled="loading || !selectDate"> No </a-radio>
                </a-radio-group>
              </a-form-model-item>
              <a-form-model-item label="Duración">
                <a-radio-group v-model="form.vitality_tests_cold_duration" :disabled="!form.vitality_tests_check_cold">
                  <a-radio :value="1" :disabled="loading || !selectDate"> Corta </a-radio>
                  <a-radio :value="2" :disabled="loading || !selectDate"> Mediana </a-radio>
                  <a-radio :value="3" :disabled="loading || !selectDate"> Larga </a-radio>
                </a-radio-group>
              </a-form-model-item>
              <a-form-model-item label="Intensidad">
                <a-radio-group v-model="form.vitality_tests_cold_intensity" :disabled="!form.vitality_tests_check_cold">
                  <a-radio :value="1" :disabled="loading || !selectDate"> Leve 0 -3 </a-radio>
                  <a-radio :value="2" :disabled="loading || !selectDate"> Moderada 4 - 7 </a-radio>
                  <a-radio :value="3" :disabled="loading || !selectDate"> Severa 8 - 10 </a-radio>
                </a-radio-group>
              </a-form-model-item>
            </a-col>
            <a-col :span="24" :md="12">
              <a-form-model-item label="Calor">
                <a-switch default-checked v-model="form.vitality_tests_check_hot" />
                <!-- <a-checkbox-group v-model="form.vitality_tests_check_hot">
                  <a-checkbox :value="2" name="Calor" :disabled="loading || !selectDate"> Calor </a-checkbox>
                </a-checkbox-group> -->
              </a-form-model-item>
              <a-form-model-item label="Responde">
                <a-radio-group v-model="form.vitality_tests_hot_response" :disabled="!form.vitality_tests_check_hot">
                  <a-radio :value="1" :disabled="loading || !selectDate"> Si </a-radio>
                  <a-radio :value="2" :disabled="loading || !selectDate"> No </a-radio>
                </a-radio-group>
              </a-form-model-item>
              <a-form-model-item label="Duración">
                <a-radio-group v-model="form.vitality_tests_hot_duration" :disabled="!form.vitality_tests_check_hot">
                  <a-radio :value="1" :disabled="loading || !selectDate"> Corta </a-radio>
                  <a-radio :value="2" :disabled="loading || !selectDate"> Mediana </a-radio>
                  <a-radio :value="3" :disabled="loading || !selectDate"> Larga </a-radio>
                </a-radio-group>
              </a-form-model-item>
              <a-form-model-item label="Intensidad">
                <a-radio-group v-model="form.vitalityTests_hot_intensity" :disabled="!form.vitality_tests_check_hot">
                  <a-radio :value="1" :disabled="loading || !selectDate"> Leve 0 -3 </a-radio>
                  <a-radio :value="2" :disabled="loading || !selectDate"> Moderada 4 - 7 </a-radio>
                  <a-radio :value="3" :disabled="loading || !selectDate"> Severa 8 - 10 </a-radio>
                </a-radio-group>
              </a-form-model-item>
            </a-col>
            <a-col :span="24" :md="24" class="d-flex justify-content-end">
              <a-button type="primary" html-type="submit" @click="submit" :loading="loading" :disabled="!selectDate">
                Guardar
              </a-button>
            </a-col>
          </a-row>
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
      painPresentArray: [
        {
          id: 1,
          value: 1,
          label: 'Espotáneo',
          name: 'Espotáneo',
        },
        {
          id: 2,
          value: 2,
          label: 'Provocado',
          name: 'Provocado',
        },
        {
          id: 3,
          value: 3,
          label: 'Frio',
          name: 'Frio',
        },
        {
          id: 4,
          value: 4,
          label: 'Calor',
          name: 'Calor',
        },
        {
          id: 5,
          value: 5,
          label: 'Masticación',
          name: 'Masticación',
        },
        {
          id: 6,
          value: 6,
          label: 'Nocturno',
          name: 'Nocturno',
        },
        {
          id: 7,
          value: 7,
          label: 'Aire',
          name: 'Aire',
        },
        {
          id: 8,
          value: 8,
          label: 'Dulce',
          name: 'Dulce',
        },
        {
          id: 9,
          value: 9,
          label: 'Ácido',
          name: 'Ácido',
        },
        {
          id: 10,
          value: 10,
          label: 'Irradiado',
          name: 'Irradiado',
        },
        {
          id: 11,
          value: 11,
          label: 'Difuso',
          name: 'Difuso',
        },
        {
          id: 12,
          value: 12,
          label: 'Punzante',
          name: 'Punzante',
        },
        {
          id: 13,
          value: 13,
          label: 'Continuo',
          name: 'Continuo',
        },
        {
          id: 14,
          value: 14,
          label: 'Intermitente',
          name: 'Intermitente',
        },
        {
          id: 15,
          value: 15,
          label: 'Esporádico',
          name: 'Esporádico',
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
    }
  },
  methods: {
    submit() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          this.changeLoading(true)
          let response = false
          response = await this.$axios.$put(`/endodontic_clinical_exam/${this.form.id}`, this.form).catch((errors) => {
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
    endodonticMedicalExamSelect(newValue, oldValue) {
      this.form = newValue ? _.cloneDeep(newValue) : {}
    },
  },
  computed: {
    ...mapGetters({
      loading: 'data/endodontics/getLoading',
      selectDate: 'data/endodontics/getSeletedDate',
      endodonticSelect: 'data/endodontics/getEndodonticSelect',
      endodonticMedicalExamSelect: 'data/endodontics/getEndodonticMedicalExamSelect',
    }),
  },
  mounted() {
    this.form = this.endodonticMedicalExamSelect ? _.cloneDeep(this.endodonticMedicalExamSelect) : {}
  },
}
</script>

<style></style>
