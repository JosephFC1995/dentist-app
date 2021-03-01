<template>
  <div class="card-info-pacient-odontogram">
    <a-card :title="false" :bordered="false">
      <a-row :gutter="16" type="flex">
        <a-col :span="24" :md="6" class="with-button">
          <a-form-model-item class="with-button">
            <a-select placeholder="Seleccione la fecha" v-model="datesSelect" :loading="loading" @change="selectDate">
              <a-select-option v-for="item in datesOrthodonticPatient" :key="item.id" :value="item.id">
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
          <a-button type="primary" @click="openModalAddNewOrthodontic = true" :disabled="loading" class="ml-2">
            <span> <i class="uil uil-plus-circle mr-1"></i> Agregar nueva ortodoncia </span>
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
        <FormOrthodonticPatient :form="form" :disabledHasDate="!datesSelect" />
      </a-spin>
    </a-card>
    <ModalNewPatientOrthodontic
      modalTitle="Agregar nueva ortodoncia"
      :openModalProp="openModalAddNewOrthodontic"
      @close="openModalAddNewOrthodontic = false"
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
        usesin: [],
        model_analysis_exams: [],
        auxiliary_exams: [],
      },
      datesSelect: undefined,
      openModalAddNewOrthodontic: false,
    }
  },
  methods: {
    async deleteForm() {
      this.changeLoading(true)
      let response = false
      response = await this.$axios.$delete(`/orthodontic_patient/${this.form.id}`).catch((errors) => {
        this.loading = false
        this.changeLoading(false)
      })
      if (response.success) this.$message.success(response.message)
      this.form = {
        usesin: [],
        model_analysis_exams: [],
        auxiliary_exams: [],
      }
      this.datesSelect = undefined
      await this.getDatesOrthodonticPatient({ id_patient: this.$route.params.id })
      this.changeLoading(false)
    },
    async selectDate($event) {
      this.changeLoading(true)
      let tempForm = await this.getOrthodonticPatient($event, {})
      this.form = tempForm
        ? tempForm
        : {
            usesin: [],
            model_analysis_exams: [],
            auxiliary_exams: [],
          }
      this.changeLoading(false)
    },
    ...mapActions({
      changeLoading: 'data/orthodontics/CHANGE_LOADING',
      getDatesOrthodonticPatient: 'data/orthodontics/GET_DATES_ORTHODONTIC',
      getOrthodonticPatient: 'data/orthodontics/GET_ORTHODONTIC_BY_PATIENT',
    }),
  },
  computed: {
    ...mapGetters({
      loading: 'data/orthodontics/getLoading',
      datesOrthodonticPatient: 'data/orthodontics/getDates',
    }),
  },
  async mounted() {
    this.changeLoading(true)
    await this.getDatesOrthodonticPatient({ id_patient: this.$route.params.id })
    this.changeLoading(false)
  },
}
</script>

<style></style>
