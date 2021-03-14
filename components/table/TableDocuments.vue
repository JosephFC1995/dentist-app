<template>
  <div class="table-general">
    <a-space class="mb-3 mt-2 d-flex justify-content-between">
      <div>
        <downloadExcel
          class="ant-btn ant-btn-sm rounded-full pr-2"
          :data="documents"
          :fields="json_fields_excel"
          name="reporte.xls"
          :disabled="loading"
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
        :data-source="documents"
        rowKey="id"
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
        <a slot="name" slot-scope="text">{{ text }}</a>
        <span slot="action" slot-scope="text, record">
          <a-button class="ant-btn ant-btn-sm" @click="openEditDocument(record)">
            <span class="ico">
              <i class="uil uil-eye"></i>
            </span>
          </a-button>
          <a-popconfirm
            title="¿Esta seguro que desea eliminar el informe?"
            ok-text="Si"
            cancel-text="No"
            @confirm="deleteUser(record)"
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
      @close="closeDrawerHistory"
    >
      <template slot="title">
        <div class="title-block p-0 m-0">
          <h4 class="modal-title m-0" style="color: #336cfb">Detalles del documento</h4>
        </div>
      </template>
      <FormDocuments @close="closeDrawerHistory" :form="documentForm" />
    </a-drawer>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'
import mixins from '~/mixins/helpersFile'

export default {
  components: {},
  mixins: [mixins],
  data() {
    return {
      widthDrawerResponsive: window.innerWidth > 900 ? 650 : window.innerWidth - 100,
      openDrawerDetail: false,
      documentForm: { file: [] },
      json_fields_excel: {
        ID: 'id',
        Nombre: 'name',
        Extension: 'file.type',
        Peso: 'file.size',
      },
      columns: [
        {
          dataIndex: 'id',
          key: 'id',
          title: 'ID',
          width: '5%',
        },
        {
          title: 'Nombre',
          dataIndex: 'name',
          key: 'name',
          width: '60%',
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
    }
  },
  methods: {
    async openEditDocument(record) {
      this.openDrawerDetail = true
      this.documentForm = await this.$store.dispatch('tables/documents/GET_DOCUMENT_SELECT', record.id)
    },
    async deleteUser(record) {
      this.changeLoading(true)
      let deleteResponse = await this.$store.dispatch('tables/documents/DELETE_DOCUMENT_SELECTED', record.id)
      if (deleteResponse) this.$message.success(deleteResponse.message)
      this.$store.dispatch('tables/documents/GET_DOCUMENTS_TABLE')
      this.changeLoading(false)
    },
    closeDrawerHistory() {
      setTimeout(() => {
        this.documentForm = { file: [] }
      }, 500)
      this.openDrawerDetail = false
    },
    ...mapActions({
      changeLoading: 'tables/documents/CHANGE_LOADING',
    }),
  },
  computed: {
    ...mapGetters({
      loading: 'tables/documents/getLoading',
      documents: 'tables/documents/getDocuments',
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
