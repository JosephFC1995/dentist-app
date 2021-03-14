<template>
  <div class="table-general">
    <a-space class="mb-3 mt-2 d-flex justify-content-between">
      <div>
        <downloadExcel
          class="ant-btn ant-btn-sm rounded-full pr-2"
          :data="incomes"
          :fields="json_fields_excel"
          name="reporte.xls"
        >
          <i class="uil uil-cloud-download mr-2"></i> Archivo excel
        </downloadExcel>
      </div>
      <div>
        <a-input placeholder="Buscar" />
      </div>
    </a-space>
    <a-spin :spinning="loading">
      <a-icon slot="indicator" type="loading" style="font-size: 24px" spin />
      <a-table
        :columns="columns"
        :data-source="incomes"
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
      <FormIncome @close="closeDrawerHistory" :form="incomeForm" />
    </a-drawer>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
import FormIncome from '~/components/form/FormIncome'

export default {
  components: {
    FormIncome,
  },
  data() {
    return {
      widthDrawerResponsive: window.innerWidth > 900 ? 650 : window.innerWidth - 100,
      openDrawerDetail: false,
      incomeForm: null,
      reasons: null,
      json_fields_excel: {
        ID: 'id',
        Sucursal: 'subsidiary.name',
        Fecha: 'date',
      },
      columns: [
        {
          dataIndex: 'id',
          key: 'id',
          title: 'ID',
          width: '10%',
        },
        {
          title: 'Sucursal',
          dataIndex: 'subsidiary.name',
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
      this.incomeForm = await this.$store.dispatch('tables/incomes/GET_INCOME_SELECT', record.id)
    },
    async deleteUser(record) {
      this.changeLoading(true)
      let deleteResponse = await this.$store.dispatch('tables/incomes/DELETE_INCOME_SELECTED', record.id)
      if (deleteResponse) this.$message.success(deleteResponse.message)
      this.$store.dispatch('tables/incomes/GET_INCOMES_TABLE')
      this.changeLoading(false)
    },
    closeDrawerHistory() {
      setTimeout(() => {
        this.incomeForm = null
      }, 500)
      this.openDrawerDetail = false
    },
    ...mapActions({
      changeLoading: 'tables/incomes/CHANGE_LOADING',
    }),
  },
  computed: {
    ...mapGetters({
      loading: 'tables/incomes/getLoading',
      incomes: 'tables/incomes/getIncomes',
    }),
  },
  mounted() {
    window.onresize = () => {
      let width = window.innerWidth
      this.widthDrawerResponsive = width > 900 ? 700 : width - 100
    }
  },
}
</script>

<style></style>
