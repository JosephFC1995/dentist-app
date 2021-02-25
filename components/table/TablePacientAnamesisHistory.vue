<template>
  <div>
    <header class="page-header justify-content-end pb-3">
      <a-button type="primary" @click="methodOpenDrawerDetail(false, false)">
        <span> <i class="uil uil-plus-circle mr-1"></i> Nueva historía medica </span>
      </a-button>
    </header>
    <div class="table-general">
      <a-space class="mb-3 mt-2 d-flex justify-content-between">
        <div>
          <downloadExcel class="ant-btn ant-btn-sm rounded-full pr-2" :data="data" :fields="json_fields_excel" name="reporte.xls">
            <i class="uil uil-cloud-download mr-2"></i> Archivo excel
          </downloadExcel>
          <a-button shape="round" class="rounded-full" size="small">
            <i class="uil uil-cloud-download mr-2"></i> Archivo PDF
          </a-button>
        </div>
        <div>
          <a-input placeholder="Buscar" />
        </div>
      </a-space>
      <a-spin :spinning="loading" tip="Cargando...">
        <a-icon slot="indicator" type="loading" style="font-size: 24px" spin />
        <a-table
          :columns="columns"
          :data-source="medicalRecords"
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
              {{ !newForm ? 'Actualizar historia médica' : ' Nueva historia médica' }}
            </h4>
          </div>
        </template>
        <FormHistoryPacient @close="closeDrawer" :form="medicalRecordForm" :newData="newForm" :loaderData="loaderData" />
      </a-drawer>
    </div>
  </div>
</template>

<script>
import FormHistoryPacient from '~/components/form/FormHistoryPacient'
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'

export default {
  components: {
    FormHistoryPacient,
  },
  data() {
    return {
      detailDrawer: {},
      newForm: false,
      loaderData: true,
      openDrawerDetail: false,
      widthDrawerResponsive: window.innerWidth > 900 ? 650 : window.innerWidth - 100,
      medicalRecordForm: {
        notes: '',
      },
      json_fields_excel: {
        ID: 'id',
        Nombre: 'name',
        'Apellido paterno': 'lastNameFather',
        Teléfono: 'phone',
        Correo: 'email',
      },
      columns: [
        {
          dataIndex: 'id',
          key: 'id',
          title: 'ID',
          width: '10%',
        },
        {
          title: 'Fecha',
          dataIndex: 'date',
          key: 'date',
          scopedSlots: { customRender: 'date' },
          width: '20%',
        },

        {
          title: 'Doctor',
          dataIndex: 'doctor.name',
          key: 'doctor.name',
          width: '60%',
        },
        {
          title: 'Acciones',
          key: 'action',
          scopedSlots: { customRender: 'action' },
          width: '10%',
        },
      ],
      data: [],
    }
  },
  methods: {
    async methodOpenDrawerDetail(edit, record) {
      this.newForm = true
      this.openDrawerDetail = true
      if (edit) {
        this.newForm = false
        this.medicalRecordForm = await this.getMedicalRecordById(record.id)
        this.loaderData = false
      }
    },
    async deleteRow(record) {
      // this.loading = true
      this.changeLoading(true)
      let deleteResponse = await this.$store.dispatch('tables/medical_records/DELETE_MEDICAL_RECORDS_SELECTED', record.id)
      if (deleteResponse) this.$message.success(deleteResponse.message)
      await this.$store.dispatch('tables/medical_records/GET_MEDICAL_RECORDS_TABLE')
      // this.loading = false
      this.changeLoading(false)
    },
    closeDrawer() {
      setTimeout(() => {
        this.medicalRecordForm = {
          notes: '',
          answers: [],
        }
        this.loaderData = true
      }, 500)
      this.openDrawerDetail = false
    },
    ...mapActions({
      changeLoading: 'tables/medical_records/CHANGE_LOADING',
      getMedicalRecords: 'tables/medical_records/GET_MEDICAL_RECORDS_TABLE',
      getMedicalRecordById: 'tables/medical_records/GET_MEDICAL_RECORDS_BY_ID',
    }),
  },
  computed: {
    ...mapGetters({
      loading: 'tables/medical_records/getLoading',
      medicalRecords: 'tables/medical_records/getMedicalRecords',
    }),
  },
  async mounted() {
    this.changeLoading(true)
    await this.getMedicalRecords({ id_patient: this.$route.params.id })
    this.changeLoading(false)
    window.onresize = () => {
      let width = window.innerWidth
      this.widthDrawerResponsive = width > 900 ? 700 : width - 100
    }
  },
}
</script>

<style></style>
