<template>
  <div class="page--app-users page--default">
    <header class="page-header">
      <h1 class="page-title">Sucursales</h1>
      <a-button class="ant-btn ant-btn-primary p-0 px-3" @click="() => (openDrawerSubsidiary = true)">
        <span> <i class="uil uil-plus-circle mr-1"></i> Agregar nuevo sucursal </span>
      </a-button>
    </header>
    <TableSubsidiaries />
    <a-drawer
      :width="widthDrawerResponsive"
      :closable="true"
      :visible="openDrawerSubsidiary"
      :body-style="{ paddingBottom: '80px' }"
      @close="closeDrawerHistory"
      :destroyOnClose="true"
    >
      <template slot="title">
        <div class="title-block p-0 m-0">
          <h4 class="modal-title m-0" style="color: #336cfb">Nuevo sucursal</h4>
        </div>
      </template>
      <FormSubsidiaries @close="closeDrawerHistory" :form="subsidiariesForm" :newData="true" />
    </a-drawer>
  </div>
</template>

<script>
// components
import TableSubsidiaries from '~/components/table/TableSubsidiaries'
import FormSubsidiaries from '~/components/form/FormSubsidiaries'

import { mapState } from 'vuex'

export default {
  layout: 'user',
  middleware: 'auth',
  asyncData({ redirect, $axios }) {},
  async fetch({ store }) {
    store.dispatch('tables/subsidiaries/CHANGE_LOADING', true)
    store.dispatch('tables/subsidiaries/GET_SUBSIDIARIES_TABLE')
    this.loading = false
  },
  components: {},
  data() {
    return {
      title: 'Referidos',
      loading: false,
      widthDrawerResponsive: window.innerWidth > 900 ? 650 : window.innerWidth - 100,
      openDrawerSubsidiary: false,
      subsidiariesForm: {
        logo: null,
        lat: -12.0526008,
        lng: -77.0449321,
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
    closeDrawerHistory() {
      setTimeout(() => {
        this.subsidiariesForm = {
          logo: null,
          lat: -12.0526008,
          lng: -77.0449321,
        }
      }, 500)
      this.openDrawerSubsidiary = false
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
