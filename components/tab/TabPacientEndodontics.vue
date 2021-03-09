<template>
  <div class="component-tab-pacient-endodontics">
    <a-divider dashed :style="{ margin: '0 0 1rem' }" />
    <div class="tab-content style">
      <a-tabs class="style sub">
        <!-- Historia médica -->
        <a-tab-pane key="endodontics_1">
          <span slot="tab"> Historia médica </span>
          <CardEndodonticsHistoryMedic />
        </a-tab-pane>
        <!-- Historia dental -->
        <a-tab-pane key="endodontics_2">
          <span slot="tab"> Historia dental </span>
          <CardEndodonticsHistoryDent />
        </a-tab-pane>
        <!-- Examen clínico -->
        <a-tab-pane key="endodontics_3">
          <span slot="tab"> Examen clínico </span>
          <CardEndodonticsMedicalExam />
        </a-tab-pane>
        <!-- Examen radiográfico -->
        <a-tab-pane key="endodontics_4">
          <span slot="tab"> Examen radiográfico </span>
          <CardEndodonticsRadiographicExam />
        </a-tab-pane>
        <!-- Diagnóstico pulpar de persunción -->
        <a-tab-pane key="endodontics_5">
          <span slot="tab"> Diagnóstico pulpar de persunción </span>
          <!-- A la espera -->
          <div class="section-odontogram px-5 mt-4">
            <a-card :title="false" :bordered="false" class="ant-card-bordered with-shadow">
              <h6 class="my-3 mx-3 text-center">Aqui ya se el Diagnóstico pulpar de persunción.</h6>
            </a-card>
          </div>
        </a-tab-pane>
        <!-- Tratamientos y datos clínicos -->
        <a-tab-pane key="endodontics_6">
          <span slot="tab"> Tratamientos y datos clínicos </span>
          <CardEndodonticsTreatments />
        </a-tab-pane>
        <!-- Accidentes operatorios -->
        <a-tab-pane key="endodontics_7">
          <span slot="tab"> Accidentes operatorios </span>
          <CardEndodonticsOperationsAccidents />
        </a-tab-pane>
        <!-- Pronóstico -->
        <a-tab-pane key="endodontics_8">
          <span slot="tab"> Pronóstico </span>
          <CardEndodonticsPronostic />
        </a-tab-pane>
        <div class="date_in_tab" slot="tabBarExtraContent">
          <div class="date_in_tab--content">
            <a-form-model-item class="with-button">
              <a-select placeholder="Seleccione la fecha" v-model="datesSelect" :loading="loading" @change="selectDate">
                <a-select-option v-for="item in datesEndodonticPatient" :key="item.id" :value="item.id">
                  {{ item.date }}
                </a-select-option>
              </a-select>
            </a-form-model-item>
            <a-popconfirm
              title="¿Esta seguro que desea eliminar el formulario?"
              ok-text="Si"
              cancel-text="No"
              @confirm="deleteForm()"
              :disabled="!datesSelect || loading"
            >
              <a-button type="danger" :disabled="!datesSelect || loading">
                <span class="ico">
                  <i class="uil uil-trash-alt"></i>
                </span>
              </a-button>
            </a-popconfirm>
            <a-button type="primary" @click="openModalAddNewEndodontic = true" :disabled="loading" class="ml-2">
              <span> <i class="uil uil-plus-circle"></i> </span>
            </a-button>
          </div>
        </div>
      </a-tabs>
    </div>
    <ModalNewPatientEndodontic
      modalTitle="Agregar nueva endodoncia"
      :openModalProp="openModalAddNewEndodontic"
      @close="openModalAddNewEndodontic = false"
    />
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'

export default {
  data() {
    return {
      datesSelect: undefined,
      openModalAddNewEndodontic: false,
    }
  },
  methods: {
    async selectDate($event) {
      this.changeLoading(true)
      await this.getEndodonticPatient($event, {})
      this.setSelectDate(true)
      this.changeLoading(false)
    },
    async deleteForm() {
      this.changeLoading(true)
      let response = false
      response = await this.$axios.$delete(`/endodontic_patient/${this.datesSelect}`).catch((errors) => {
        this.loading = false
        this.changeLoading(false)
      })
      if (response.success) this.$message.success(response.message)
      this.form = {}
      this.datesSelect = undefined
      await this.getDatesEndodonticPatient({ id_patient: this.$route.params.id })
      this.setSelectDate(false)
      this.changeLoading(false)
    },
    ...mapActions({
      getQuestions: 'data/questions/GET_QUESTIONS',
      changeLoading: 'data/endodontics/CHANGE_LOADING',
      setSelectDate: 'data/endodontics/CHANGE_SELECTED_DATE',
      getDatesEndodonticPatient: 'data/endodontics/GET_DATES_ENDODONTICS',
      getEndodonticPatient: 'data/endodontics/GET_ENDODONTICS_BY_PATIENT',
      getOtherDiseases: 'data/other_diseases/GET_OTHER_DISEASES',
      getDiseases: 'data/diseases/GET_DISEASES',
    }),
  },
  computed: {
    ...mapGetters({
      loading: 'data/endodontics/getLoading',
      datesEndodonticPatient: 'data/endodontics/getDates',
    }),
  },
  async mounted() {
    this.changeLoading(true)
    this.getQuestions()
    await this.getDatesEndodonticPatient({ id_patient: this.$route.params.id })
    await this.getOtherDiseases()
    await this.getDiseases()
    this.changeLoading(false)
  },
}
</script>

<style lang="scss">
.component-tab-pacient-endodontics {
  .ant-tabs-content {
    padding-top: 1rem;
  }
}
.date_in_tab {
  &--content {
    display: flex;
    width: 320px;
    .with-button {
      flex: 1;
      margin-right: 5px;
    }
  }
}
.ant-tabs-extra-content {
  line-height: initial !important;
}
</style>
