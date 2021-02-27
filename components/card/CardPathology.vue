<template>
  <div class="card-info-pacient-odontogram">
    <a-card :title="false" :bordered="false">
      <a-row :gutter="16" type="flex">
        <a-col :span="24" :md="6" class="with-button">
          <a-form-model-item class="with-button w-100">
            <a-select placeholder="Seleccione la fecha" v-model="datesSelect" :loading="loading" @change="selectDate">
              <a-select-option v-for="item in datesPathologyPatient" :key="item.id" :value="item.id">
                {{ item.date }}
              </a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
        <a-col :span="24" :md="4" class="d-flex">
          <a-popconfirm
            title="¿Esta seguro que desea eliminar el formulario?"
            ok-text="Si"
            cancel-text="No"
            @confirm="deleteForm()"
          >
            <a-button type="danger" :disabled="!datesSelect || loading">
              <span class="ico">
                <i class="uil uil-trash-alt"></i>
              </span>
            </a-button>
          </a-popconfirm>
          <a-button type="primary" @click="openModalAddNewPathology = true" :disabled="loading" class="ml-2">
            <span> <i class="uil uil-plus-circle mr-1"></i> Agregar nueva patología </span>
          </a-button>
        </a-col>
      </a-row>
      <a-alert
        message="Por favor seleccione una fecha para poder editar este formulario"
        type="warning"
        show-icon
        v-if="!datesSelect"
      />
      <a-spin :spinning="loading">
        <a-icon slot="indicator" type="loading" style="font-size: 24px" spin />
        <!-- Formulario Endodoncia -->
        <FormPathologyPacient class="mt-3" :form="form" :disabledHasDate="!datesSelect" />
      </a-spin>
    </a-card>
    <ModalNewPatientPathology
      modalTitle="Agregar nueva patología"
      :openModalProp="openModalAddNewPathology"
      @close="openModalAddNewPathology = false"
    />
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'

export default {
  components: {},
  data() {
    return {
      datesArray: [],
      form: {
        diagrams_injuries_exams: [],
        auxiliary_exams: [],
        rx_exams: [],
        tomography_exams: [],
        clinical_analysis_exams: [],
        biopsies_exisionals_exams: [],
        biopsies_exofoliativa_exams: [],
        others_exams: [],
      },
      datesSelect: undefined,
      openModalAddNewPathology: false,
    }
  },
  methods: {
    async deleteForm() {
      this.changeLoading(true)
      let response = false
      response = await this.$axios.$delete(`/pathology_patient/${this.form.id}`).catch((errors) => {
        this.loading = false
        this.changeLoading(false)
      })
      if (response.success) this.$message.success(response.message)
      this.form = {}
      this.datesSelect = undefined
      await this.getDatesPathologyPatient({ id_patient: this.$route.params.id })
      this.changeLoading(false)
    },
    async selectDate($event) {
      this.changeLoading(true)
      let tempForm = await this.getPathologyPatient($event, {})
      this.form = tempForm
        ? tempForm
        : {
            diagrams_injuries_exams: [],
            auxiliary_exams: [],
            rx_exams: [],
            tomography_exams: [],
            clinical_analysis_exams: [],
            biopsies_exisionals_exams: [],
            biopsies_exofoliativa_exams: [],
            others_exams: [],
          }
      this.changeLoading(false)
    },
    ...mapActions({
      changeLoading: 'data/pathologies/CHANGE_LOADING',
      getDatesPathologyPatient: 'data/pathologies/GET_DATES_PATHOLOGY',
      getPathologyPatient: 'data/pathologies/GET_PATHOLOGY_BY_PATIENT',
    }),
  },
  computed: {
    ...mapGetters({
      loading: 'data/pathologies/getLoading',
      datesPathologyPatient: 'data/pathologies/getDates',
    }),
  },
  async mounted() {
    this.changeLoading(true)
    await this.getDatesPathologyPatient({ id_patient: this.$route.params.id })
    this.changeLoading(false)
  },
}
</script>

<style></style>
