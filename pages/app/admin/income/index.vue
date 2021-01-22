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
        <a-select-option v-for="item in subsidiariesArray" :key="item.id" :value="item.id">
          {{ item.name }}
        </a-select-option>
      </a-select>
    </a-form-model-item>

    <TableIncome />
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
  fetch({ store }) {
    store.dispatch('data/general/GET_SUBSIDIARIES')
    store.dispatch('data/general/GET_SUPPLIES')
    store.dispatch('tables/incomes/CHANGE_LOADING', true)
    store.dispatch('tables/incomes/GET_INCOMES_TABLE')
  },
  components: {},
  data() {
    return {
      title: 'Ingresos',
      loading: false,
      widthDrawerResponsive: window.innerWidth > 900 ? 750 : window.innerWidth - 100,
      openDrawerNewIncome: false,
      incomeForm: {
        income_details: [],
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
        this.incomeForm = {
          income_details: [],
        }
      }, 500)
      this.openDrawerNewIncome = false
    },
    changeSelect($event) {
      let options = {
        id_subsidiary: $event,
      }
      this.$store.dispatch('tables/incomes/CHANGE_LOADING', true)
      this.$store.dispatch('tables/incomes/GET_INCOMES_TABLE', options)
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
      subsidiariesArray: (state) => state.data.general.subsidiaries,
    }),
  },
}
</script>

<style></style>
