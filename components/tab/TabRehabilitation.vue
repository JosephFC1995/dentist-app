<template>
  <div class="component-tab-pacient-endodontics">
    <a-divider dashed :style="{ margin: '0 0 1rem' }" />
    <div class="tab-content style">
      <a-tabs class="style sub">
        <!-- 1 -->
        <a-tab-pane key="orthidontic_1">
          <span slot="tab"> 1 </span>
          <CardRehabilitationTab1 @reload="reloadRehabilitationHistory" />
        </a-tab-pane>
        <!-- 2 -->
        <a-tab-pane key="orthidontic_2">
          <span slot="tab"> 2 </span>
          <CardRehabilitationTab2 />
        </a-tab-pane>
        <!-- 3 -->
        <a-tab-pane key="orthidontic_3">
          <span slot="tab"> 3 </span>
          <CardRehabilitationTab3 />
        </a-tab-pane>
        <!-- 4 -->
        <a-tab-pane key="orthidontic_4">
          <span slot="tab"> 4 </span>
          <CardRehabilitationTab4 />
        </a-tab-pane>
        <div class="date_in_tab" slot="tabBarExtraContent">
          <div class="date_in_tab--content">
            <a-form-model-item class="with-button">
              <a-select placeholder="Seleccione la fecha" v-model="datesSelect" :loading="loading" @change="selectDate">
                <a-select-option v-for="item in datesRehabilitationPatient" :key="item.id" :value="item.id">
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
            <a-button type="primary" @click="openModalAddNewRehabilitation = true" :disabled="loading" class="ml-2">
              <span> <i class="uil uil-plus-circle"></i> </span>
            </a-button>
          </div>
        </div>
      </a-tabs>
    </div>
    <ModalNewPatientRehabilitation
      modalTitle="Agregar nueva rehabilitación"
      :openModalProp="openModalAddNewRehabilitation"
      @close="openModalAddNewRehabilitation = false"
    />
  </div>
</template>

<script>
import CardRehabilitationTab1 from '~/components/card/CardRehabilitationTab1'
import CardRehabilitationTab2 from '~/components/card/CardRehabilitationTab2'
import CardRehabilitationTab3 from '~/components/card/CardRehabilitationTab3'
import CardRehabilitationTab4 from '~/components/card/CardRehabilitationTab4'

import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'

export default {
  components: {
    components: {
      CardRehabilitationTab1,
      CardRehabilitationTab2,
      CardRehabilitationTab3,
      CardRehabilitationTab4,
    },
  },
  data() {
    return {
      datesSelect: undefined,
      openModalAddNewRehabilitation: false,
    }
  },
  methods: {
    async selectDate($event) {
      this.changeLoading(true)
      await this.getRehabilitationPatient($event, {})
      this.setIdRehabilitationPatient($event)
      this.setSelectDate(true)
      this.changeLoading(false)
    },
    async deleteForm() {
      this.changeLoading(true)
      let response = false
      response = await this.$axios.$delete(`/rehabilitation_patient/${this.datesSelect}`).catch((errors) => {
        this.loading = false
        this.changeLoading(false)
      })
      if (response.success) this.$message.success(response.message)
      this.form = {}
      this.datesSelect = undefined
      await this.getDatesRehabilitationPatient({ id_patient: this.$route.params.id })
      this.setSelectDate(false)
      this.changeLoading(false)
      this.clear()
    },
    async reloadRehabilitationHistory() {
      this.changeLoading(true)
      await this.getRehabilitationPatient(this.idRehabilitation, {})
      this.changeLoading(false)
    },
    ...mapActions({
      changeLoading: 'data/rehabilitation/CHANGE_LOADING',
      setSelectDate: 'data/rehabilitation/CHANGE_SELECTED_DATE',
      getDatesRehabilitationPatient: 'data/rehabilitation/GET_DATES_REHABILITATIONS',
      getRehabilitationPatient: 'data/rehabilitation/GET_REHABILITATIONS_BY_PATIENT',
      setIdRehabilitationPatient: 'data/rehabilitation/SET_ID_SELECT_REHABILITATION',
      clear: 'data/rehabilitation/CLEAR_ALL',
    }),
  },
  computed: {
    ...mapGetters({
      loading: 'data/rehabilitation/getLoading',
      hasSelectDate: 'data/rehabilitation/getSeletedDate',
      datesRehabilitationPatient: 'data/rehabilitation/getDates',
      idRehabilitation: 'data/rehabilitation/getIDSelectRehabilitation',
    }),
  },
  async mounted() {
    this.changeLoading(true)
    await this.getDatesRehabilitationPatient({ id_patient: this.$route.params.id })
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
