<template>
  <div class="card-info-pacient-odontogram">
    <a-card :title="false" :bordered="false">
      <a-row :gutter="16" type="flex">
        <a-col :span="24" :md="6" class="with-button">
          <a-form-model-item class="with-button w-100">
            <!-- <a-date-picker
              v-model="odontogram.date"
              :disabled-date="disabledDate"
              placeholder="Seleccione una fecha"
              :showToday="false"
            /> -->
            <a-select placeholder="Seleccione la fecha" v-model="datesSelect" :loading="loading" @change="selectDate">
              <a-select-option v-for="item in datesDiffussionPatient" :key="item.id" :value="item.id">
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
            :disabled="!datesSelect || loading"
          >
            <a-button type="danger" :disabled="!datesSelect || loading">
              <span class="ico">
                <i class="uil uil-trash-alt"></i>
              </span>
            </a-button>
          </a-popconfirm>
          <a-button type="primary" @click="openModalAddNewDiffussion = true" :disabled="loading" class="ml-2">
            <span> <i class="uil uil-plus-circle mr-1"></i> Agregar nueva difusión </span>
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
        <!-- Formulario de difusión -->
        <FormDiffussionPacient :form="form" :disabledHasDate="!datesSelect" />
      </a-spin>
    </a-card>
    <ModalNewPatientDiffusion
      modalTitle="Agregar nueva difusión"
      :openModalProp="openModalAddNewDiffussion"
      @close="openModalAddNewDiffussion = false"
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
      form: {},
      datesSelect: undefined,
      openModalAddNewDiffussion: false,
    }
  },
  methods: {
    disabledDate(current) {
      return current && current >= this.$moment().startOf('day').add(1, 'days')
    },
    async deleteForm() {
      this.changeLoading(true)
      let response = false
      response = await this.$axios.$delete(`/diffusion_patient/${this.form.id}`).catch((errors) => {
        this.loading = false
        this.changeLoading(false)
      })
      if (response.success) this.$message.success(response.message)
      this.form = {}
      this.datesSelect = undefined
      await this.getDatesDiffussionPatient({ id_patient: this.$route.params.id })
      this.changeLoading(false)
    },
    async selectDate($event) {
      this.changeLoading(true)
      let tempForm = await this.getDiffussionPatient($event, {})
      this.form = tempForm ? tempForm : {}
      this.changeLoading(false)
    },
    ...mapActions({
      changeLoading: 'data/diffussion/CHANGE_LOADING',
      getDatesDiffussionPatient: 'data/diffussion/GET_DATES_DIFFUSSION',
      getDiffussionPatient: 'data/diffussion/GET_DIFFUSSION_BY_PATIENT',
    }),
  },
  computed: {
    ...mapGetters({
      loading: 'data/diffussion/getLoading',
      datesDiffussionPatient: 'data/diffussion/getDates',
    }),
  },
  async mounted() {
    this.changeLoading(true)
    await this.getDatesDiffussionPatient({ id_patient: this.$route.params.id })
    this.changeLoading(false)
  },
}
</script>

<style></style>
