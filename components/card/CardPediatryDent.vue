<template>
  <div class="card-info-pacient-odontogram">
    <a-card :title="false" :bordered="false">
      <a-row :gutter="16" type="flex">
        <a-col :span="24" :md="6" class="with-button">
          <a-form-model-item class="with-button w-100">
            <a-select placeholder="Seleccione la fecha" v-model="datesSelect" :loading="loading" @change="selectDate">
              <a-select-option v-for="item in datesPediatryDentPatient" :key="item.id" :value="item.id">
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
          <a-button type="primary" @click="openModalAddNewPediatryDent = true" :disabled="loading" class="ml-2">
            <span> <i class="uil uil-plus-circle mr-1"></i> Agregar nueva hoja pediatrica </span>
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
        <!-- Formulario odontopediatra -->
        <FormPediatryDentPatient :form="form" :disabledHasDate="!datesSelect" />
      </a-spin>
    </a-card>
    <ModalNewPatientPediatryDent
      modalTitle="Agregar nueva hoja pediatrica"
      :openModalProp="openModalAddNewPediatryDent"
      @close="openModalAddNewPediatryDent = false"
    />
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'

export default {
  data() {
    return {
      datesArray: [],
      form: {
        type_teething: [],
      },
      datesSelect: undefined,
      openModalAddNewPediatryDent: false,
    }
  },
  methods: {
    async deleteForm() {
      this.changeLoading(true)
      let response = false
      response = await this.$axios.$delete(`/pediatry_dent_patient/${this.form.id}`).catch((errors) => {
        this.loading = false
        this.changeLoading(false)
      })
      if (response.success) this.$message.success(response.message)
      this.form = {
        type_teething: [],
      }
      this.datesSelect = undefined
      await this.getDatesPediatryDentPatient({ id_patient: this.$route.params.id })
      this.changeLoading(false)
    },
    async selectDate($event) {
      this.changeLoading(true)
      let tempForm = await this.getPediatryDentPatient($event, {})
      this.form = tempForm
        ? tempForm
        : {
            type_teething: [],
          }
      this.changeLoading(false)
    },
    ...mapActions({
      changeLoading: 'data/pediatry_dent/CHANGE_LOADING',
      getDatesPediatryDentPatient: 'data/pediatry_dent/GET_DATES_PEDIATRY_DENT',
      getPediatryDentPatient: 'data/pediatry_dent/GET_PEDIATRY_DENT_BY_PATIENT',
    }),
  },
  computed: {
    ...mapGetters({
      loading: 'data/pediatry_dent/getLoading',
      datesPediatryDentPatient: 'data/pediatry_dent/getDates',
    }),
  },
  async mounted() {
    this.changeLoading(true)
    await this.getDatesPediatryDentPatient({ id_patient: this.$route.params.id })
    this.changeLoading(false)
  },
}
</script>

<style></style>
