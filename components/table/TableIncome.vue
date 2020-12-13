<template>
  <div class="table-general">
    <a-space class="mb-3 mt-2 d-flex justify-content-between">
      <div>
        <downloadExcel
          class="ant-btn ant-btn-sm rounded-full pr-2"
          :data="reasons"
          :fields="json_fields_excel"
          name="reporte.xls"
        >
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
    <a-spin :spinning="loading">
      <a-icon slot="indicator" type="loading" style="font-size: 24px" spin />
      <a-table
        :columns="columns"
        :data-source="reasons"
        rowKey="id"
        :pagination="{
          defaultPageSize: 10,
          hideOnSinglePage: true,
        }"
      >
        <a slot="name" slot-scope="text">{{ text }}</a>
        <span slot="action" slot-scope="text, record">
          <a-button class="ant-btn ant-btn-sm" @click="openEditUser(record)">
            <span class="ico">
              <i class="uil uil-eye"></i>
            </span>
          </a-button>

          <a-button type="danger" size="small" @click="deleteUser(record)">
            <span class="ico">
              <i class="uil uil-trash-alt"></i>
            </span>
          </a-button>
        </span>
      </a-table>
    </a-spin>
    <a-drawer
      :width="widthDrawerResponsive"
      :closable="true"
      :visible="openDrawerDetail"
      :body-style="{ paddingBottom: '80px' }"
      @close="closeDrawerHistory"
    >
      <template slot="title">
        <div class="title-block p-0 m-0">
          <h4 class="modal-title m-0" style="color: #336cfb">Detalles de la razón</h4>
        </div>
      </template>
      <FormIncome @close="closeDrawerHistory" :form="supplyForm" />
    </a-drawer>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import FormIncome from '~/components/form/FormIncome'

export default {
  components: {
    FormIncome,
  },
  data() {
    return {
      loading: false,
      widthDrawerResponsive: window.innerWidth > 900 ? 650 : window.innerWidth - 100,
      openDrawerDetail: false,
      supplyForm: null,
      reasons: null,
      json_fields_excel: {
        ID: 'id',
        Nombre: 'name',
        Apellido: 'last_name',
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
          title: 'Número',
          dataIndex: 'number',
          key: 'number',
        },
        {
          title: 'Sucursal',
          dataIndex: 'subsidiary',
          key: 'subsidiary',
        },
        {
          title: 'Fecha',
          dataIndex: 'date',
          key: 'date',
        },
        {
          title: 'Acciones',
          key: 'action',
          scopedSlots: { customRender: 'action' },
          width: '15%',
        },
      ],
    }
  },
  methods: {
    async openEditUser(record) {
      this.openDrawerDetail = true
      // this.supplyForm = await this.$store.dispatch('tables/users/GET_USER_SELECTED', record.id)
    },
    async deleteUser(record) {
      this.loading = true
      //   let deleteResponse = await this.$store.dispatch('tables/users/DELETE_USER_SELECTED', record.id)
      //   if (deleteResponse) this.$message.success(deleteResponse.message)
      //   this.$store.dispatch('tables/users/GET_USERS_TABLE')
      this.loading = false
    },
    closeDrawerHistory() {
      setTimeout(() => {
        this.supplyForm = null
      }, 500)
      this.openDrawerDetail = false
    },
    ...mapMutations({
      clearUser: 'tables/users/CLEAR_USER',
    }),
  },
  computed: {},
  mounted() {
    window.onresize = () => {
      let width = window.innerWidth
      this.widthDrawerResponsive = width > 900 ? 700 : width - 100
    }
  },
}
</script>

<style></style>
