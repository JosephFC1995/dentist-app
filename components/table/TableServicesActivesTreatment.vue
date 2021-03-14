<template>
  <div>
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
      <a-table
        :columns="columns"
        :data-source="data"
        :pagination="{
          defaultPageSize: 5,
          hideOnSinglePage: true,
        }"
      >
        <a slot="name" slot-scope="text">{{ text }}</a>
        <span slot="photo">
          <a-avatar size="small" icon="user" />
        </span>
        <span slot="action">
          <a-button type="danger" size="small">
            <span class="ico">
              <i class="uil uil-trash-alt"></i>
            </span>
          </a-button>
        </span>
      </a-table>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      detailDrawer: {},
      formDetailHystory: false,
      openDrawerDetail: false,
      widthDrawerResponsive: window.innerWidth > 900 ? 650 : window.innerWidth - 100,
      json_fields_excel: {
        ID: 'id',
        Area: 'area',
        Servicio: 'services',
        'Descuento %': 'descount',
        Total: 'total',
      },
      columns: [
        {
          dataIndex: 'id',
          key: 'id',
          title: 'Nº',
          width: '10%',
        },
        {
          dataIndex: 'area',
          key: 'area',
          title: 'Área',
          width: '15%',
        },
        {
          dataIndex: 'services',
          key: 'services',
          title: 'Servicio',
          width: '30%',
        },
        {
          dataIndex: 'price',
          key: 'price',
          title: 'Precio',
          width: '10%',
        },
        {
          dataIndex: 'descount',
          key: 'descount',
          title: 'Descuento %',
          width: '15%',
        },
        {
          dataIndex: 'total',
          key: 'total',
          title: 'Total',
          width: '10%',
        },
        {
          title: 'Acciones',
          key: 'action',
          scopedSlots: { customRender: 'action' },
          width: '10%',
        },
      ],
      data: [
        {
          id: '1',
          area: 1.3,
          services: 'Extracción de diente',
          price: 100.0,
          descount: 10,
          total: 90,
          date: '12/11/2020',
          doctor: 'John Brown',
        },
        {
          id: '2',
          area: 1.3,
          services: 'Extracción de diente',
          price: 100.0,
          descount: 10,
          total: 90,
          date: '12/11/2020',
          doctor: 'John Brown',
        },
        {
          id: '3',
          area: 1.3,
          services: 'Extracción de diente',
          price: 100.0,
          descount: 10,
          total: 90,
          date: '12/11/2020',
          doctor: 'John Brown',
        },
        {
          id: '4',
          area: 1.3,
          services: 'Extracción de diente',
          price: 100.0,
          descount: 10,
          total: 90,
          date: '12/11/2020',
          doctor: 'John Brown',
        },
        {
          id: '5',
          area: 1.3,
          services: 'Extracción de diente',
          price: 100.0,
          descount: 10,
          total: 90,
          date: '12/11/2020',
          doctor: 'John Brown',
        },
      ],
    }
  },
  methods: {
    methodOpenDrawerDetail(detailDrawer, detail) {
      this.formDetailHystory = detailDrawer ? true : false
      this.detailDrawer = detail ? detail : false
      this.openDrawerDetail = true
    },
    closeDrawerHistory() {
      this.detailDrawer = {}
      this.formDetailHystory = false
      this.openDrawerDetail = false
    },
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
