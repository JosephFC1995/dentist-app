<template>
  <div class="page--app-users page--default">
    <header class="page-header">
      <h1 class="page-title">Sucursales</h1>
      <a-button class="ant-btn ant-btn-primary p-0 px-3" @click="() => (openDrawerNewUser = true)">
        <span> <i class="uil uil-plus-circle mr-1"></i> Agregar nuevo sucursal </span>
      </a-button>
    </header>
    <TableSubsidiaries />
    <a-drawer
      :width="widthDrawerResponsive"
      :closable="true"
      :visible="openDrawerNewUser"
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
    // await store.dispatch('tables/users/GET_USERS_TABLE')
    this.loading = false
  },
  components: {},
  data() {
    return {
      title: 'Referidos',
      loading: false,
      widthDrawerResponsive: window.innerWidth > 900 ? 650 : window.innerWidth - 100,
      openDrawerNewUser: false,
      subsidiariesForm: {},
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
          firm: null,
          avatar: null,
        }
      }, 500)
      this.openDrawerNewUser = false
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
