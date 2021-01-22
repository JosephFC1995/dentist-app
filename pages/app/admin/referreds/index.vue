<template>
  <div class="page--app-users page--default">
    <header class="page-header">
      <h1 class="page-title">Referidos</h1>
      <a-button class="ant-btn ant-btn-primary p-0 px-3" @click="() => (openDrawerReferred = true)">
        <span> <i class="uil uil-plus-circle mr-1"></i> Nuevo referido </span>
      </a-button>
    </header>
    <TableReferreds />
    <a-drawer
      :width="widthDrawerResponsive"
      :closable="true"
      :visible="openDrawerReferred"
      :body-style="{ paddingBottom: '80px' }"
      @close="closeDrawerHistory"
      :destroyOnClose="true"
    >
      <template slot="title">
        <div class="title-block p-0 m-0">
          <h4 class="modal-title m-0" style="color: #336cfb">Nuevo referido</h4>
        </div>
      </template>
      <FormReferreds @close="closeDrawerHistory" :form="referredsForm" :newData="true" />
    </a-drawer>
  </div>
</template>

<script>
// components

import { mapState } from 'vuex'

export default {
  layout: 'user',
  middleware: 'auth',
  asyncData({ redirect, $axios }) {},
  async fetch({ store }) {
    store.dispatch('tables/referreds/CHANGE_LOADING', true)
    store.dispatch('tables/referreds/GET_REFERREDS_TABLE')
  },
  components: {},
  data() {
    return {
      title: 'Referidos',
      widthDrawerResponsive: window.innerWidth > 900 ? 650 : window.innerWidth - 100,
      openDrawerReferred: false,
      referredsForm: {},
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
        this.referredsForm = {}
      }, 500)
      this.openDrawerReferred = false
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
