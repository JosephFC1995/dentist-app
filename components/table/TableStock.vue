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
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  components: {},
  data() {
    return {
      loading: false,
      widthDrawerResponsive: window.innerWidth > 900 ? 650 : window.innerWidth - 100,
      openDrawerDetail: false,
      supplyForm: null,
      reasons: null,
      json_fields_excel: {
        ID: 'id',
        Insumo: 'supply',
        Stock: 'stock',
      },
      columns: [
        {
          dataIndex: 'id',
          key: 'id',
          title: 'ID',
          width: '15%',
        },
        {
          title: 'Insumo',
          dataIndex: 'supply',
          key: 'supply',
        },
        {
          title: 'Stock',
          dataIndex: 'stock',
          key: 'stock',
        },
      ],
    }
  },
  methods: {},
  computed: {},
}
</script>

<style></style>
