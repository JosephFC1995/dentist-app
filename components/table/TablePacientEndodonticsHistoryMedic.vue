<template>
  <div>
    <header class="page-header justify-content-end pb-3">
      <a-button type="primary" @click="methodOpenDrawerDetail(false, false)" :loading="loading" :disabled="!selectDate">
        <span> <i class="uil uil-plus-circle mr-1"></i> Nueva historia dental </span>
      </a-button>
    </header>
    <div class="table-general">
      <a-space class="mb-3 mt-2 d-flex justify-content-between">
        <div>
          <downloadExcel
            class="ant-btn ant-btn-sm rounded-full pr-2"
            :data="dentalHistoriesArray"
            :fields="json_fields_excel"
            name="reporte.xls"
            :class="{ disabled: !selectDate }"
          >
            <i class="uil uil-cloud-download mr-2"></i> Archivo excel
          </downloadExcel>
          <a-button shape="round" class="rounded-full" size="small" :disabled="!selectDate">
            <i class="uil uil-cloud-download mr-2"></i> Archivo PDF
          </a-button>
        </div>
        <div>
          <a-input placeholder="Buscar" />
        </div>
      </a-space>
      <a-spin :spinning="loading" tip="Cargando información...">
        <a-icon slot="indicator" type="loading" style="font-size: 24px" spin />
        <a-table
          :columns="columns"
          :data-source="dentalHistoriesArray"
          :pagination="{
            defaultPageSize: 10,
            hideOnSinglePage: true,
          }"
        >
          <a slot="name" slot-scope="text">{{ text }}</a>
          <span slot="photo">
            <a-avatar size="small" icon="user" />
          </span>
          <span slot="action" slot-scope="record">
            <a-button type="primary" size="small" @click="methodOpenDrawerDetail(true, record)">
              <span class="ico">
                <i class="uil uil-eye"></i>
              </span>
            </a-button>
            <a-popconfirm
              title="¿Esta seguro que desea eliminar este historial?"
              ok-text="Si"
              cancel-text="No"
              :disabled="!selectDate || loading"
              @confirm="deleteRow(record)"
            >
              <a-button type="danger" size="small">
                <span class="ico">
                  <i class="uil uil-trash-alt"></i>
                </span>
              </a-button>
            </a-popconfirm>
          </span>
        </a-table>
      </a-spin>
      <a-drawer
        :width="widthDrawerResponsive"
        :closable="true"
        :visible="openDrawerDetail"
        :body-style="{ paddingBottom: '80px' }"
        @close="closeDrawer"
        :destroyOnClose="true"
      >
        <template slot="title">
          <div class="title-block p-0 m-0">
            <h4 class="modal-title m-0" style="color: #336cfb">
              {{ formDetailHystory ? 'Diente Nº1' : 'Agregar diente' }}
            </h4>
          </div>
        </template>
        <FormEndodonticsHistoryDentPacient @close="closeDrawer" :newData="newForm" :form="form" @reload="reload" />
      </a-drawer>
    </div>
  </div>
</template>

<script>
import FormEndodonticsHistoryDentPacient from '~/components/form/FormEndodonticsHistoryDentPacient'
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'

export default {
  components: {
    FormEndodonticsHistoryDentPacient,
  },
  data() {
    return {
      detailDrawer: {},
      form: {
        temperature: [],
      },
      dentalHistoriesArray: [],
      newForm: false,
      formDetailHystory: false,
      openDrawerDetail: false,
      widthDrawerResponsive: window.innerWidth > 900 ? 650 : window.innerWidth - 100,
      json_fields_excel: {
        ID: 'id',
        Diente: 'dent.name',
        'Apellido paterno': 'lastNameFather',
        Doctor: 'doctor.name',
      },
      columns: [
        {
          dataIndex: 'id',
          key: 'id',
          title: 'ID',
          width: '10%',
        },
        {
          title: 'Diente',
          dataIndex: 'dent.name',
          key: 'dent',
          scopedSlots: { customRender: 'dent' },
          width: '20%',
        },
        {
          title: 'Doctor',
          dataIndex: 'doctor.name',
          key: 'doctor',
          width: '40%',
        },
        {
          title: 'Acciones',
          key: 'action',
          scopedSlots: { customRender: 'action' },
          width: '10%',
        },
      ],
    }
  },
  methods: {
    methodOpenDrawerDetail(edit, record) {
      this.newForm = true
      this.openDrawerDetail = true
      if (edit) {
        this.newForm = false
        this.form = record
        this.loaderData = false
      } else {
        this.form.id_endodontic = this.id_endodontic
      }
    },
    closeDrawer() {
      setTimeout(() => {
        this.form = {
          id_endodontic: this.id_endodontic,
          temperature: [],
        }
        this.loaderData = true
      }, 500)
      this.openDrawerDetail = false
    },
    async deleteRow($event) {
      this.changeLoading(true)
      let response = false
      response = await this.$axios.$delete(`/endodontic_dental_history/${$event.id}`).catch((errors) => {
        this.changeLoading(false)
      })
      if (response.success) this.$message.success(response.message)
      this.changeLoading(false)
      this.$emit('reload')
    },
    reload() {
      this.openDrawerDetail = false
      this.$emit('reload')
    },
    ...mapActions({
      changeLoading: 'data/endodontics/CHANGE_LOADING',
    }),
  },
  mounted() {
    window.onresize = () => {
      let width = window.innerWidth
      this.widthDrawerResponsive = width > 900 ? 700 : width - 100
    }
  },
  watch: {
    dentalHistories(newValue, oldValue) {
      this.dentalHistoriesArray = _.cloneDeep(newValue)
    },
  },
  computed: {
    ...mapGetters({
      loading: 'data/endodontics/getLoading',
      dentalHistories: 'data/endodontics/getEndodonticDentalHistoriesSelect',
      id_endodontic: 'data/endodontics/getIDSelectEndodontic',
      selectDate: 'data/endodontics/getSeletedDate',
    }),
  },
  mounted() {
    this.dentalHistoriesArray = this.dentalHistories ? _.cloneDeep(this.dentalHistories) : {}
  },
}
</script>

<style></style>
