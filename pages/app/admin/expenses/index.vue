<template>
  <div class="page--app-users page--default">
    <header class="page-header">
      <h1 class="page-title">Salidas</h1>
      <a-button class="ant-btn ant-btn-primary p-0 px-3" @click="() => (openDrawerNewIncome = true)">
        <span> <i class="uil uil-plus-circle mr-1"></i> Agregar nueva salida </span>
      </a-button>
    </header>
    <a-form-model-item label="Sucursales">
      <a-select placeholder="Seleccione una sucursal" :allowClear="true" :disabled="loading" @change="changeSelect">
        <a-select-option v-for="item in subsidiariesArray" :key="item.id" :value="item.id">
          {{ item.name }}
        </a-select-option>
      </a-select>
    </a-form-model-item>

    <TableExpense />
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
          <h4 class="modal-title m-0" style="color: #336cfb">Nueva salida</h4>
        </div>
      </template>
      <FormExpense @close="closeDrawerHistory" :form="expenseForm" :newData="true" />
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
    store.dispatch('data/general/GET_SUBSIDIARIES')
    store.dispatch('data/general/GET_SUPPLIES')
    store.dispatch('tables/expenses/CHANGE_LOADING', true)
    store.dispatch('tables/expenses/GET_EXPENSES_TABLE')
  },
  components: {},
  data() {
    return {
      title: 'Referidos',
      loading: false,
      widthDrawerResponsive: window.innerWidth > 900 ? 750 : window.innerWidth - 100,
      openDrawerNewIncome: false,
      expenseForm: {
        expense_details: [],
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
        this.expenseForm = {
          expense_details: [],
        }
      }, 500)
      this.openDrawerNewIncome = false
    },
    changeSelect($event) {
      let options = {
        id_subsidiary: $event,
      }
      this.$store.dispatch('tables/expenses/CHANGE_LOADING', true)
      this.$store.dispatch('tables/expenses/GET_EXPENSES_TABLE', options)
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
