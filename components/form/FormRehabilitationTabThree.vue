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
        <a-col :span="24" :md="12">
          <a-row :gutter="16">
            <a-col :span="24" :md="24">
              <h6 class="mt-0 mb-1" :style="{ color: '#B9BABA' }">Examen extraoral</h6>
            </a-col>
            <!-- Forma del cráneo -->
            <a-col :span="24" :md="24">
              <a-form-model-item label="Forma del cráneo">
                <a-select
                  placeholder="Seleccione una opción"
                  :options="craneoArray"
                  v-model="form.skull"
                  :allowClear="true"
                  :disabled="loading || !selectDate"
                >
                </a-select>
              </a-form-model-item>
            </a-col>
            <!-- Forma del cara -->
            <a-col :span="24" :md="24">
              <a-form-model-item label="Forma del cara">
                <a-select
                  placeholder="Seleccione una opción"
                  :options="caraArray"
                  v-model="form.face"
                  :allowClear="true"
                  :disabled="loading || !selectDate"
                >
                </a-select>
              </a-form-model-item>
            </a-col>
            <!--  Perfil anteposterior -->
            <a-col :span="24" :md="24">
              <a-form-model-item label="Perfil anteposterior">
                <a-input v-model="form.profile_ante" :disabled="loading || !selectDate" />
              </a-form-model-item>
            </a-col>
            <!--  Perfil anteposterior -->
            <a-col :span="24" :md="24">
              <h6 class="mt-0 mb-1" :style="{ color: '#000' }">ATM</h6>
            </a-col>
            <a-col :span="24" :md="24">
              <a-form-model-item label="Derecha" :label-col="{ span: 6 }" labelAlign="left">
                <a-radio-group v-model="form.atm_right">
                  <a-radio :value="1" :disabled="loading || !selectDate"> Dolor </a-radio>
                  <a-radio :value="2" :disabled="loading || !selectDate"> No dolor </a-radio>
                </a-radio-group>
              </a-form-model-item>
            </a-col>
            <a-col :span="24" :md="24">
              <a-form-model-item label="Izquierda" :label-col="{ span: 6 }" labelAlign="left">
                <a-radio-group v-model="form.atm_left">
                  <a-radio :value="1" :disabled="loading || !selectDate"> Dolor </a-radio>
                  <a-radio :value="2" :disabled="loading || !selectDate"> No dolor </a-radio>
                </a-radio-group>
              </a-form-model-item>
            </a-col>
            <!-- Simetría -->
            <a-col :span="24" :md="24">
              <a-form-model-item label="Simetría">
                <a-select
                  placeholder="Seleccione una opción"
                  :options="simetriaArray"
                  v-model="form.symmetry"
                  :allowClear="true"
                  :disabled="loading || !selectDate"
                >
                </a-select>
              </a-form-model-item>
            </a-col>
            <!--  Línea media -->

            <a-col :span="24" :md="24">
              <a-form-model-item label="Línea media" :label-col="{ span: 6 }" labelAlign="left">
                <a-radio-group v-model="form.line_middle">
                  <a-radio :value="1" :disabled="loading || !selectDate"> Coincidente </a-radio>
                  <a-radio :value="2" :disabled="loading || !selectDate"> No coincidente </a-radio>
                </a-radio-group>
              </a-form-model-item>
            </a-col>
            <a-col :span="24" :md="24">
              <a-form-model-item label="Perfil anteposterior" class="with-button">
                <a-input v-model="form.profile_ante_2" :disabled="loading || !selectDate" v-mask="'######'" />
                <span class="ml-3" :style="{ fontSize: '12px', color: '#B9BABA' }"> mm. </span>
              </a-form-model-item>
            </a-col>
          </a-row>
        </a-col>
        <a-col :span="24" :md="12">
          <a-row :gutter="16">
            <a-col :span="24" :md="24">
              <h6 class="mt-0 mb-1" :style="{ color: '#B9BABA' }">Examen dentolabial</h6>
            </a-col>
            <!-- Tipo de sonrisa -->
            <a-col :span="24" :md="24">
              <a-form-model-item label="Tipo de sonrisa">
                <a-select
                  placeholder="Seleccione una opción"
                  :options="smileArray"
                  v-model="form.smile_tipe"
                  :allowClear="true"
                  :disabled="loading || !selectDate"
                >
                </a-select>
              </a-form-model-item>
            </a-col>
            <!--  Exposición de diente en reposo -->
            <a-col :span="24" :md="24">
              <h6 class="mt-0 mb-3" :style="{ color: '#000' }">Exposición de diente en reposo</h6>
            </a-col>
            <a-col :span="24" :md="24">
              <a-form-model-item class="with-button">
                <span class="mr-3" :style="{ fontSize: '12px', color: '#B9BABA' }"> Superior </span>
                <a-input v-model="form.resting_tooth_top" :disabled="loading || !selectDate" />
                <span class="ml-3" :style="{ fontSize: '12px', color: '#B9BABA' }"> mm. </span>
              </a-form-model-item>
            </a-col>
            <a-col :span="24" :md="24">
              <a-form-model-item class="with-button">
                <span class="mr-3" :style="{ fontSize: '12px', color: '#B9BABA' }"> Inferior </span>
                <a-input v-model="form.resting_tooth_bottom" :disabled="loading || !selectDate" />
                <span class="ml-3" :style="{ fontSize: '12px', color: '#B9BABA' }"> mm. </span>
              </a-form-model-item>
            </a-col>
            <!--  Compatibilidad con edad y sexo -->
            <a-col :span="24" :md="24">
              <h6 class="mt-0 mb-3" :style="{ color: '#000' }">Compatibilidad con edad y sexo</h6>
            </a-col>
            <!-- Línea de sonrisa -->
            <a-col :span="24" :md="24">
              <a-form-model-item label="Línea de sonrisa">
                <a-select
                  placeholder="Seleccione una opción"
                  :options="lineaSonrisaArray"
                  v-model="form.smile_line"
                  :allowClear="true"
                  :disabled="loading || !selectDate"
                >
                </a-select>
              </a-form-model-item>
            </a-col>
            <!-- Angulo naso labial -->
            <a-col :span="24" :md="24">
              <a-form-model-item label="Angulo naso labial">
                <a-select
                  placeholder="Seleccione una opción"
                  :options="anguloNasalArray"
                  v-model="form.labial_angle"
                  :allowClear="true"
                  :disabled="loading || !selectDate"
                >
                </a-select>
              </a-form-model-item>
            </a-col>
            <!-- Tipo de labio -->
            <a-col :span="24" :md="24">
              <a-form-model-item label="Tipo de labio">
                <a-select
                  placeholder="Seleccione una opción"
                  :options="tipoLabioArray"
                  v-model="form.lip_type"
                  :allowClear="true"
                  :disabled="loading || !selectDate"
                >
                </a-select>
              </a-form-model-item>
            </a-col>
            <!-- Corredor bucal -->
            <a-col :span="24" :md="24">
              <a-form-model-item label="Corredor bucal">
                <a-select
                  placeholder="Seleccione una opción"
                  :options="corredoBucalArray"
                  v-model="form.buccal_corridor"
                  :allowClear="true"
                  :disabled="loading || !selectDate"
                >
                </a-select>
              </a-form-model-item>
            </a-col>
          </a-row>
        </a-col>

        <a-col :span="24" :md="24">
          <h6 class="mt-0 mb-1" :style="{ color: '#B9BABA' }">Examen dentogingival</h6>
        </a-col>
        <!-- Posición de cenit -->
        <a-col :span="24" :md="24">
          <a-form-model-item label="Posición de cenit">
            <a-select
              placeholder="Seleccione una opción"
              :options="posicionCenitArray"
              v-model="form.position_cenit"
              :allowClear="true"
              :disabled="loading || !selectDate"
            >
            </a-select>
          </a-form-model-item>
        </a-col>
        <!--  Papilas ausentes -->
        <a-col :span="24" :md="24">
          <a-form-model-item label="Papilas ausentes">
            <a-radio-group v-model="form.papillae_absent">
              <a-radio :value="1" :disabled="loading || !selectDate"> Si </a-radio>
              <a-radio :value="2" :disabled="loading || !selectDate"> No </a-radio>
            </a-radio-group>
          </a-form-model-item>
        </a-col>
        <a-col :span="24" :md="24">
          <a-form-model-item class="with-button">
            <a-input v-model="form.papillae_absent_no" :disabled="loading || !selectDate" placeholder="Pieza" />
          </a-form-model-item>
        </a-col>
        <!--  Paralelismo de cenit -->
        <a-col :span="24" :md="12">
          <a-form-model-item label="Paralelismo de cenit">
            <a-radio-group v-model="form.parallelism_cenit">
              <a-radio :value="1" :disabled="loading || !selectDate"> Si </a-radio>
              <a-radio :value="2" :disabled="loading || !selectDate"> No </a-radio>
            </a-radio-group>
          </a-form-model-item>
        </a-col>
        <!--  Fenotipo gingival -->
        <a-col :span="24" :md="12">
          <a-form-model-item label="Fenotipo gingival">
            <a-radio-group v-model="form.gingival">
              <a-radio :value="1" :disabled="loading || !selectDate"> Fino </a-radio>
              <a-radio :value="2" :disabled="loading || !selectDate"> Grueso </a-radio>
            </a-radio-group>
          </a-form-model-item>
        </a-col>
        <a-col :span="24" :md="24">
          <h6 class="mt-0 mb-1" :style="{ color: '#B9BABA' }">Alteraciones dentales</h6>
        </a-col>
        <!--  Desgastes -->
        <a-col :span="24" :md="12">
          <a-form-model-item label="Desgastes">
            <a-radio-group v-model="form.wear">
              <a-radio :value="1" :disabled="loading || !selectDate"> Si </a-radio>
              <a-radio :value="2" :disabled="loading || !selectDate"> No </a-radio>
            </a-radio-group>
          </a-form-model-item>
        </a-col>
        <!--  alteracion de color -->
        <a-col :span="24" :md="12">
          <a-form-model-item label="alteracion de color">
            <a-radio-group v-model="form.color">
              <a-radio :value="1" :disabled="loading || !selectDate"> Si </a-radio>
              <a-radio :value="2" :disabled="loading || !selectDate"> No </a-radio>
            </a-radio-group>
          </a-form-model-item>
        </a-col>
        <!--  alteracion de forma -->
        <a-col :span="24" :md="12">
          <a-form-model-item label="alteracion de forma">
            <a-radio-group v-model="form.shape">
              <a-radio :value="1" :disabled="loading || !selectDate"> Si </a-radio>
              <a-radio :value="2" :disabled="loading || !selectDate"> No </a-radio>
            </a-radio-group>
          </a-form-model-item>
        </a-col>

        <a-col :span="24">
          <a-button type="primary" html-type="submit" @click="submit" :loading="loading" :disabled="!selectDate">
            Guardar
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
      craneoArray: [
        { value: 1, label: 'Dolicio' },
        { value: 2, label: 'Céfalo' },
        { value: 3, label: 'Mesocéfalo' },
        { value: 4, label: 'Braquicéfalo' },
      ],
      caraArray: [
        { value: 1, label: 'Dolifacial' },
        { value: 2, label: 'Mesofacial' },
        { value: 3, label: 'Braquifacial' },
      ],
      simetriaArray: [
        { value: 1, label: 'Simetrio' },
        { value: 2, label: 'Asimetrico' },
      ],
      smileArray: [
        { value: 1, label: 'Alto' },
        { value: 2, label: 'Media' },
        { value: 3, label: 'Baja' },
      ],
      lineaSonrisaArray: [
        { value: 1, label: 'Paralela' },
        { value: 2, label: 'Recta' },
        { value: 3, label: 'Invertida' },
      ],
      anguloNasalArray: [
        { value: 1, label: 'Aumentado' },
        { value: 2, label: 'Disminuido' },
        { value: 3, label: 'Normal' },
      ],
      tipoLabioArray: [
        { value: 1, label: 'Delgado' },
        { value: 2, label: 'Medio' },
        { value: 3, label: 'Grueso' },
      ],
      corredoBucalArray: [
        { value: 1, label: 'Presnte' },
        { value: 2, label: 'Ausente' },
        { value: 3, label: 'Simétrico' },
        { value: 4, label: 'Asimétrico' },
      ],
      posicionCenitArray: [
        { value: 1, label: 'Concordantes' },
        { value: 2, label: 'No concordantes' },
      ],
    }
  },
  methods: {
    submit() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          let _self = this
          this.changeLoading(true)
          let response = false
          response = await _self.$axios.$put(`/rehabilitation_tab_three/${this.form.id}`, this.form).catch((errors) => {
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
      changeLoading: 'data/rehabilitation/CHANGE_LOADING',
    }),
  },
  watch: {
    rehabilitationRehabilitationTab3Select(newValue, oldValue) {
      this.form = _.cloneDeep(newValue)
    },
  },
  computed: {
    ...mapGetters({
      loading: 'data/rehabilitation/getLoading',
      selectDate: 'data/rehabilitation/getSeletedDate',
      rehabilitationSelect: 'data/rehabilitation/getRehabilitationSelect',
      rehabilitationRehabilitationTab3Select: 'data/rehabilitation/getRehabilitationRehabilitationTab3Select',
    }),
  },
  mounted() {
    this.form = this.rehabilitationRehabilitationTab3Select ? _.cloneDeep(this.rehabilitationRehabilitationTab3Select) : {}
  },
}
</script>

<style></style>
