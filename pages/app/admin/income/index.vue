<template>
  <div class="page--app-users page--default">
    <header class="page-header">
      <h1 class="page-title">Ingresos</h1>
      <a-button class="ant-btn ant-btn-primary p-0 px-3" @click="() => (openDrawerNewIncome = true)">
        <span> <i class="uil uil-plus-circle mr-1"></i> Agregar nuevo ingreso </span>
      </a-button>
    </header>
    <a-form-model-item label="Sucursales">
      <a-select placeholder="Seleccione una sucursal" :allowClear="true" :disabled="loading" @change="changeSelect">
        <a-select-option v-for="item in subsidiarysArray" :key="item.id" :value="item.id">
          {{ item.name }}
        </a-select-option>
      </a-select>
    </a-form-model-item>
    <a-spin :spinning="loading">
      <a-icon slot="indicator" type="loading" style="font-size: 24px" spin />
      <TableIncome />
    </a-spin>
    <a-drawer
      :width="widthDrawerResponsive"
      :closable="true"
      :visible="openDrawerNewIncome"
      :body-style="{ paddingBottom: '80px' }"
      @close="closeDrawerHistory"
      :destroyOnClose="true"
    >
      <template slot="title">
        <div class="title-block p-0 m-0">
          <h4 class="modal-title m-0" style="color: #336cfb">Nuevo ingreso</h4>
        </div>
      </template>
      <FormIncome @close="closeDrawerHistory" :form="incomeForm" :newData="true" />
    </a-drawer>
  </div>
</template>

<script>
// components
import TableIncome from '~/components/table/TableIncome'
import FormIncome from '~/components/form/FormIncome'

import { mapState } from 'vuex'

export default {
  layout: 'user',
  middleware: 'auth',
  asyncData({ redirect, $axios }) {},
  async fetch({ store }) {
    store.dispatch('data/general/GET_SUBSIDIARIES')
    this.loading = false
  },
  components: {},
  data() {
    return {
      title: 'Ingresos',
      loading: false,
      widthDrawerResponsive: window.innerWidth > 900 ? 750 : window.innerWidth - 100,
      openDrawerNewIncome: false,
      incomeForm: {},
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
        this.incomeForm = {}
      }, 500)
      this.openDrawerNewIncome = false
    },
    changeSelect($event) {
      this.loading = true
      setTimeout(() => {
        this.incomeForm = {}
        this.loading = false
      }, 1500)
    },
  },
  mounted() {
    window.onresize = () => {
      let width = window.innerWidth
      this.widthDrawerResponsive = width > 900 ? 700 : width - 100
    }
  },
  computed: {
    ...mapState({
      subsidiarysArray: (state) => state.data.general.subsidiarys,
    }),
  },
}
</script>

<style></style>
