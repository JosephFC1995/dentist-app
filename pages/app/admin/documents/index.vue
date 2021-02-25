<template>
  <div class="page--app-users page--default">
    <header class="page-header">
      <h1 class="page-title">Documentos</h1>
      <a-button class="ant-btn ant-btn-primary p-0 px-3" @click="() => (openDrawerNewDocument = true)">
        <span> <i class="uil uil-plus-circle mr-1"></i> Agregar nuevo documento </span>
      </a-button>
    </header>

    <TableDocuments />
    <a-drawer
      :width="widthDrawerResponsive"
      :closable="true"
      :visible="openDrawerNewDocument"
      :body-style="{ paddingBottom: '80px' }"
      @close="closeDrawerDocument"
      :destroyOnClose="true"
    >
      <template slot="title">
        <div class="title-block p-0 m-0">
          <h4 class="modal-title m-0" style="color: #336cfb">Nuevo documento</h4>
        </div>
      </template>
      <FormDocuments @close="closeDrawerDocument" :form="documentForm" :newData="true" />
    </a-drawer>
  </div>
</template>

<script>
// components
import TableExpense from '~/components/table/TableExpense'
import FormExpense from '~/components/form/FormExpense'

import { mapState } from 'vuex'

export default {
  layout: 'user',
  middleware: 'auth',
  asyncData({ redirect, $axios }) {},
  async fetch({ store }) {
    store.dispatch('tables/documents/CHANGE_LOADING', true)
    store.dispatch('tables/documents/GET_DOCUMENTS_TABLE')
  },
  components: {},
  data() {
    return {
      title: 'Documentos',
      loading: false,
      widthDrawerResponsive: window.innerWidth > 900 ? 750 : window.innerWidth - 100,
      openDrawerNewDocument: false,
      documentForm: {
        file: [],
      },
    }
  },
  head() {
    return {
      title: this.title,
      meta: [],
    }
  },
  watch: {},
  methods: {
    closeDrawerDocument() {
      setTimeout(() => {
        this.documentForm = {
          file: [],
        }
      }, 500)
      this.openDrawerNewDocument = false
    },
  },
  mounted() {
    window.onresize = () => {
      let width = window.innerWidth
      this.widthDrawerResponsive = width > 900 ? 700 : width - 100
    }
  },
  computed: {},
}
</script>

<style></style>
