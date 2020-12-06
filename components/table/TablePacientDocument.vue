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
        <span slot="action">
          <a-button size="small" @click="() => (openModal = true)">
            <span class="ico">
              <i class="uil uil-eye" :style="{ fontSize: '18px' }"></i>
            </span>
          </a-button>

          <a-button type="primary" size="small">
            <span class="ico">
              <i class="uil uil-envelope" :style="{ fontSize: '18px' }"></i>
            </span>
          </a-button>
          <a-button type="primary" size="small">
            <span class="ico">
              <i class="uil uil-print" :style="{ fontSize: '18px' }"></i>
            </span>
          </a-button>
          <a-button type="danger" size="small">
            <span class="ico">
              <i class="uil uil-trash-alt" :style="{ fontSize: '18px' }"></i>
            </span>
          </a-button>
        </span>
      </a-table>
    </div>
    <!-- Modal ver imagen -->
    <a-modal
      v-model="openModal"
      @ok="okModal"
      :centered="true"
      :forceRender="true"
      :dialog-style="{ top: '20px' }"
      :width="widthModalResponsive"
    >
      <template slot="title">
        <div class="title-block p-0 m-0">
          <h5 class="modal-title m-0" style="color: #000">Detalle del archivo</h5>
        </div>
      </template>
      <div class="d-flex flex-column">
        <div class="file-detail flex-column mb-0">
          <iframe
            src="https://drive.google.com/viewerng/viewer?
url=https://jurisbackend.sedetc.gob.pe/uploads/archivos/2020/07/5f0f171bbcc6e.pdf?
pid=explorer&efh=false&a=v&chrome=false&embedded=true"
            width="100%"
            height="700px"
          />
        </div>
      </div>
      <template slot="footer">
        <div class="d-flex justify-content-between modal-footer">
          <button type="button" class="ant-btn ant-btn-dangerous" @click="() => (openModal = false)">
            <span>Cancelar</span>
          </button>
          <button type="button" class="ant-btn ant-btn-danger" @click="okModal">
            <span>Eliminar</span>
          </button>
        </div>
      </template>
    </a-modal>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      detailDrawer: {},
      formDetailHystory: false,
      widthDrawerResponsive: window.innerWidth > 900 ? 650 : window.innerWidth - 100,
      widthModalResponsive: window.innerWidth > 900 ? 900 : window.innerWidth - 100,
      openModal: false,
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
          title: 'Nº',
          width: '10%',
        },
        {
          dataIndex: 'title',
          key: 'title',
          title: 'Título',
          width: '50%',
        },
        {
          dataIndex: 'size',
          key: 'size',
          title: 'Peso',
          width: '20%',
        },

        {
          title: 'Acciones',
          key: 'action',
          scopedSlots: { customRender: 'action' },
          width: '20%',
        },
      ],
      data: [
        {
          id: '1',
          title: 'Archivo PDF',
          size: '2mb',
          price: 100.0,
          descount: 10,
          total: 90,
          date: '12/11/2020',
          doctor: 'John Brown',
        },
        {
          id: '2',
          title: 'Archivo PDF',
          size: '2mb',
          price: 100.0,
          descount: 10,
          total: 90,
          date: '12/11/2020',
          doctor: 'John Brown',
        },
        {
          id: '3',
          title: 'Archivo PDF',
          size: '2mb',
          price: 100.0,
          descount: 10,
          total: 90,
          date: '12/11/2020',
          doctor: 'John Brown',
        },
        {
          id: '4',
          title: 'Archivo PDF',
          size: '2mb',
          price: 100.0,
          descount: 10,
          total: 90,
          date: '12/11/2020',
          doctor: 'John Brown',
        },
        {
          id: '5',
          title: 'Archivo PDF',
          size: '2mb',
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
    okModal(e) {
      console.log(e)
      this.openModal = false
    },
  },
  mounted() {
    window.onresize = () => {
      let width = window.innerWidth
      this.widthDrawerResponsive = width > 900 ? 700 : width - 100
      this.widthModalResponsive = width > 900 ? 900 : width - 100
    }
  },
}
</script>

<style></style>
