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
      <a-spin :spinning="loading" tip="Cargando información...">
        <a-icon slot="indicator" type="loading" style="font-size: 24px" spin />
        <a-table
          :columns="columns"
          :data-source="documentsPatient"
          :pagination="{
            defaultPageSize: 10,
            hideOnSinglePage: true,
          }"
        >
          <span slot="file" slot-scope="file">
            <span>
              {{ humanFileSize(file.size) }}
            </span>
          </span>
          <span slot="action" slot-scope="record">
            <a-button size="small" @click="openDetailFile(record)">
              <span class="ico">
                <i class="uil uil-eye" :style="{ fontSize: '18px' }"></i>
              </span>
            </a-button>

            <a-button type="primary" size="small" @click="openSendFileFile(record)">
              <span class="ico">
                <i class="uil uil-envelope" :style="{ fontSize: '18px' }"></i>
              </span>
            </a-button>

            <a-popconfirm
              title="¿Esta seguro que desea eliminar el informe?"
              ok-text="Si"
              cancel-text="No"
              @confirm="deleteInform(record)"
            >
              <a-button type="danger" size="small">
                <span class="ico">
                  <i class="uil uil-trash-alt" :style="{ fontSize: '18px' }"></i>
                </span>
              </a-button>
            </a-popconfirm>
          </span>
        </a-table>
      </a-spin>
    </div>
    <ModalSendDocument
      modalTitle="Enviar documento"
      :openModalProp="openModalSendDocument"
      @close="onCloseModalSenDocument()"
      :documentSelect="selectDocumentSend"
    />
    <!-- Modal ver imagen -->
    <a-modal
      v-model="openModal"
      @ok="okModal"
      :centered="true"
      :forceRender="true"
      :dialog-style="{ top: '20px' }"
      :width="widthModalResponsive"
      :destroyOnClose="true"
    >
      <template slot="title">
        <div class="title-block p-0 m-0">
          <h5 class="modal-title m-0" style="color: #000">Detalle del archivo</h5>
        </div>
      </template>
      <div class="d-flex flex-column">
        <div class="file-detail flex-column mb-0">
          <iframe :src="selectFile.file ? selectFile.file.url : ''" width="100%" height="700px" />
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
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'

export default {
  components: {},
  data() {
    return {
      detailDrawer: {},
      selectFile: {},
      formDetailHystory: false,
      openModalSendDocument: false,
      widthDrawerResponsive: window.innerWidth > 900 ? 650 : window.innerWidth - 100,
      widthModalResponsive: window.innerWidth > 900 ? 900 : window.innerWidth - 100,
      openModal: false,
      selectDocumentSend: null,
      json_fields_excel: {
        ID: 'id',
        Archivo: 'file.name_original',
        Documento: 'document.name',
        Extension: 'file.type',
        Peso: 'file.size',
      },
      columns: [
        {
          dataIndex: 'id',
          key: 'id',
          title: 'Nº',
          width: '5%',
        },
        {
          dataIndex: 'file.name_original',
          key: 'file.name_original',
          title: 'Archivo',
          width: '40%',
        },
        {
          dataIndex: 'document.name',
          key: 'document.name',
          title: 'Documento',
          width: '20%',
        },
        {
          dataIndex: 'file.type',
          key: 'file.type',
          title: 'Extensión',
          width: '10%',
        },
        {
          dataIndex: 'file',
          key: 'file',
          scopedSlots: { customRender: 'file' },
          title: 'Peso',
          width: '10%',
        },

        {
          title: 'Acciones',
          key: 'action',
          scopedSlots: { customRender: 'action' },
          width: '15%',
        },
      ],
      data: [],
    }
  },
  methods: {
    okModal(e) {
      this.selectFile = {}
      this.openModal = false
    },
    openDetailFile(record) {
      console.log(record)
      this.selectFile = record
      this.openModal = true
    },
    async deleteInform(record) {
      this.changeLoading(true)
      let deleteResponse = await this.$store.dispatch('data/documents/DELETE_DOCUMENTS_BY_ID', record.id)
      if (deleteResponse) this.$message.success(deleteResponse.message)
      await this.getDocumentsPatient({ id_patient: this.$route.params.id })
      // this.loading = false
      this.changeLoading(false)
    },
    async openSendFileFile(record) {
      this.changeLoading(true)
      this.openModalSendDocument = true
      this.selectDocumentSend = record
      console.log(record)
      // let deleteResponse = await this.$store.dispatch('data/documents/DELETE_DOCUMENTS_BY_ID', record.id)
      // if (deleteResponse) this.$message.success(deleteResponse.message)
      // await this.getDocumentsPatient({ id_patient: this.$route.params.id })
      // this.loading = false
      this.changeLoading(false)
    },
    onCloseModalSenDocument() {
      this.openModalSendDocument = false
      this.selectDocumentSend = null
    },
    humanFileSize(bytes, si = false, dp = 1) {
      const thresh = si ? 1000 : 1024

      if (Math.abs(bytes) < thresh) {
        return bytes + ' B'
      }

      const units = si
        ? ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
        : ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB']
      let u = -1
      const r = 10 ** dp

      do {
        bytes /= thresh
        ++u
      } while (Math.round(Math.abs(bytes) * r) / r >= thresh && u < units.length - 1)

      return bytes.toFixed(dp) + ' ' + units[u]
    },
    ...mapActions({
      changeLoading: 'data/documents/CHANGE_LOADING',
      getDocumentsPatient: 'data/documents/GET_DOCUMENTS_BY_PATIENT',
    }),
  },
  computed: {
    ...mapGetters({
      loading: 'data/documents/getLoading',
      documentsPatient: 'data/documents/getDocumentsPatient',
    }),
  },
  async mounted() {
    this.changeLoading(true)
    await this.getDocumentsPatient({ id_patient: this.$route.params.id })
    this.changeLoading(false)
    window.onresize = () => {
      let width = window.innerWidth
      this.widthDrawerResponsive = width > 900 ? 700 : width - 100
      this.widthModalResponsive = width > 900 ? 900 : width - 100
    }
  },
}
</script>

<style></style>
