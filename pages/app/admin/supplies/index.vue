<template>
  <div class="page--app-users page--default">
    <header class="page-header">
      <h1 class="page-title">Insumos</h1>
      <a-button class="ant-btn ant-btn-primary p-0 px-3" @click="() => (openDrawerSupply = true)">
        <span> <i class="uil uil-plus-circle mr-1"></i> Agregar nuevo insumo </span>
      </a-button>
    </header>
    <TableSupplies />
    <a-drawer
      :width="widthDrawerResponsive"
      :closable="true"
      :visible="openDrawerSupply"
      :body-style="{ paddingBottom: '80px' }"
      @close="closeDrawerHistory"
      :destroyOnClose="true"
    >
      <template slot="title">
        <div class="title-block p-0 m-0">
          <h4 class="modal-title m-0" style="color: #336cfb">Nuevo insumo</h4>
        </div>
      </template>
      <FormSupply @close="closeDrawerHistory" :form="suppliesForm" :newData="true" />
    </a-drawer>
  </div>
</template>

<script>
// components
import TableSupplies from '~/components/table/TableSupplies'
import FormSupply from '~/components/form/FormSupply'

import { mapState } from 'vuex'

export default {
  layout: 'user',
  middleware: 'auth',
  asyncData({ redirect, $axios }) {},
  async fetch({ store }) {
    store.dispatch('tables/supplies/CHANGE_LOADING', true)
    store.dispatch('tables/supplies/GET_SUPPLIES_TABLE')
    this.loading = false
  },
  components: {},
  data() {
    return {
      title: 'Insumos',
      loading: false,
      widthDrawerResponsive: window.innerWidth > 900 ? 650 : window.innerWidth - 100,
      openDrawerSupply: false,
      suppliesForm: {},
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
        this.suppliesForm = {}
      }, 500)
      this.openDrawerSupply = false
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
