<template>
  <div class="page--app-users page--default">
    <header class="page-header">
      <h1 class="page-title">Motivos</h1>
      <a-button class="ant-btn ant-btn-primary p-0 px-3" @click="() => (openDrawerReason = true)">
        <span> <i class="uil uil-plus-circle mr-1"></i> Nuevo motivo </span>
      </a-button>
    </header>
    <TableReasons />
    <a-drawer
      :width="widthDrawerResponsive"
      :closable="true"
      :visible="openDrawerReason"
      :body-style="{ paddingBottom: '80px' }"
      @close="closeDrawerHistory"
      :destroyOnClose="true"
    >
      <template slot="title">
        <div class="title-block p-0 m-0">
          <h4 class="modal-title m-0" style="color: #336cfb">Agregar motivo</h4>
        </div>
      </template>
      <FormReasons @close="closeDrawerHistory" :form="reasonForm" :newData="true" />
    </a-drawer>
  </div>
</template>

<script>
// components
import TableReasons from '~/components/table/TableReasons'
import FormReasons from '~/components/form/FormReasons'

import { mapState } from 'vuex'

export default {
  layout: 'user',
  middleware: 'auth',
  async fetch({ store }) {
    store.dispatch('tables/reasons/CHANGE_LOADING', true)
    store.dispatch('tables/reasons/GET_REASONS_TABLE')
  },
  components: {},
  data() {
    return {
      title: 'Motivos',
      loading: false,
      widthDrawerResponsive: window.innerWidth > 900 ? 650 : window.innerWidth - 100,
      openDrawerReason: false,
      reasonForm: {},
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
    closeDrawerHistory() {
      setTimeout(() => {
        this.reasonForm = {}
      }, 500)
      this.openDrawerReason = false
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
