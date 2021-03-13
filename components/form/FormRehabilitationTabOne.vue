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
        <!-- Proporciones faciales -->
        <a-col :span="24" :md="8">
          <a-form-model-item label="Proporciones faciales">
            <a-select
              placeholder="Seleccione una opción"
              :options="proporcionesParcialesArray"
              v-model="form.partial_proportion"
              :allowClear="true"
              :disabled="loading || !selectDate"
            >
            </a-select>
          </a-form-model-item>
        </a-col>
        <!-- Contorno perioral -->
        <a-col :span="24" :md="8">
          <a-form-model-item label="Contorno perioral">
            <a-select
              placeholder="Seleccione una opción"
              :options="contornoArray"
              v-model="form.relation_corone"
              :allowClear="true"
              :disabled="loading || !selectDate"
            >
            </a-select>
          </a-form-model-item>
        </a-col>
        <!-- Rebordes edéntulos -->
        <a-col :span="24" :md="8">
          <a-form-model-item label="Rebordes edéntulos">
            <a-select
              placeholder="Seleccione una opción"
              :options="rebordesArray"
              v-model="form.edentulo"
              :allowClear="true"
              :disabled="loading || !selectDate"
            >
            </a-select>
          </a-form-model-item>
        </a-col>
        <!-- Mucosa sobre rebordes -->
        <a-col :span="24" :md="8">
          <a-form-model-item label="Mucosa sobre rebordes">
            <a-select
              placeholder="Seleccione una opción"
              :options="mucosoRebordesArray"
              v-model="form.mucous_edentulo"
              :allowClear="true"
              :disabled="loading || !selectDate"
            >
            </a-select>
          </a-form-model-item>
        </a-col>
        <!-- Frenillos -->
        <a-col :span="24" :md="8">
          <a-form-model-item label="Frenillos">
            <a-select
              placeholder="Seleccione una opción"
              :options="frenillosArray"
              v-model="form.braces"
              :allowClear="true"
              :disabled="loading || !selectDate"
            >
            </a-select>
          </a-form-model-item>
        </a-col>
        <!-- Saliva -->
        <a-col :span="24" :md="8">
          <a-form-model-item label="Saliva">
            <a-select
              placeholder="Seleccione una opción"
              :options="salivaArray"
              v-model="form.saliva"
              :allowClear="true"
              :disabled="loading || !selectDate"
            >
            </a-select>
          </a-form-model-item>
        </a-col>
        <!-- Exostosis -->
        <a-col :span="24" :md="8">
          <a-form-model-item label="Exostosis">
            <a-select
              placeholder="Seleccione una opción"
              :options="exostosisArray"
              v-model="form.exostosis"
              :allowClear="true"
              :disabled="loading || !selectDate"
            >
            </a-select>
          </a-form-model-item>
        </a-col>

        <a-col :span="24">
          <h6 class="mt-0 mb-1" :style="{ color: '#B9BABA' }">Clasificación de Kennedy</h6>
        </a-col>

        <!-- Maxilar -->
        <a-col :span="24" :md="8">
          <a-form-model-item label="Maxilar">
            <a-select
              placeholder="Seleccione una opción"
              :options="maxilarArray"
              v-model="form.maxillary"
              :allowClear="true"
              :disabled="loading || !selectDate"
            >
            </a-select>
          </a-form-model-item>
        </a-col>
        <!-- Modificación -->
        <a-col :span="24" :md="8">
          <a-form-model-item label="Modificación">
            <a-select
              placeholder="Seleccione una opción"
              :options="modificationArray"
              v-model="form.modification"
              :allowClear="true"
              :disabled="loading || !selectDate"
            >
            </a-select>
          </a-form-model-item>
        </a-col>
        <!-- Mandibula -->
        <a-col :span="24" :md="8">
          <a-form-model-item label="Mandibula">
            <a-select
              placeholder="Seleccione una opción"
              :options="mandibulaArray"
              v-model="form.mandible"
              :allowClear="true"
              :disabled="loading || !selectDate"
            >
            </a-select>
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
      proporcionesParcialesArray: [
        { value: 1, label: 'Simetría' },
        { value: 2, label: 'Asimetría' },
      ],
      contornoArray: [
        { value: 1, label: 'Normal' },
        { value: 2, label: 'Hipotónico' },
        { value: 2, label: 'Hipotónico' },
      ],
      rebordesArray: [
        { value: 1, label: 'Regulares' },
        { value: 2, label: 'Irregulares' },
      ],
      mucosoRebordesArray: [
        { value: 1, label: 'Resilentes' },
        { value: 2, label: 'Firme' },
      ],
      frenillosArray: [
        { value: 1, label: 'Inserción favorables' },
        { value: 2, label: 'Inserción infavorables' },
      ],
      salivaArray: [
        { value: 1, label: 'Adecuada' },
        { value: 2, label: 'Escasa' },
      ],
      exostosisArray: [
        { value: 1, label: 'Presente' },
        { value: 2, label: 'Ausente' },
      ],
      maxilarArray: [
        { value: 1, label: 'Clase I' },
        { value: 2, label: 'Clase II' },
        { value: 3, label: 'Clase III' },
        { value: 4, label: 'Clase IV' },
      ],
      modificationArray: [
        { value: 1, label: '1' },
        { value: 2, label: '2' },
        { value: 3, label: '3' },
        { value: 4, label: '4' },
        { value: 5, label: '5' },
        { value: 6, label: '6' },
        { value: 7, label: '7' },
        { value: 8, label: '8' },
        { value: 9, label: '9' },
        { value: 10, label: '10' },
      ],
      mandibulaArray: [
        { value: 1, label: 'Clase I' },
        { value: 2, label: 'Clase II' },
        { value: 3, label: 'Clase III' },
        { value: 4, label: 'Clase IV' },
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
          response = await _self.$axios.$put(`/rehabilitation_tab_one/${this.form.id}`, this.form).catch((errors) => {
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
    rehabilitationRehabilitationTab1Select(newValue, oldValue) {
      this.form = _.cloneDeep(newValue)
    },
  },
  computed: {
    ...mapGetters({
      loading: 'data/rehabilitation/getLoading',
      selectDate: 'data/rehabilitation/getSeletedDate',
      rehabilitationSelect: 'data/rehabilitation/getRehabilitationSelect',
      rehabilitationRehabilitationTab1Select: 'data/rehabilitation/getRehabilitationRehabilitationTab1Select',
    }),
  },
  mounted() {
    this.form = this.rehabilitationRehabilitationTab1Select ? _.cloneDeep(this.rehabilitationRehabilitationTab1Select) : {}
  },
}
</script>

<style></style>
