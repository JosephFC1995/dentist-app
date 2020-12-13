<template>
  <div class="page--app-users page--default">
    <header class="page-header">
      <h1 class="page-title">Stock de insumos</h1>
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
      <TableStock />
    </a-spin>
  </div>
</template>

<script>
// components
import TableStock from '~/components/table/TableStock'

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
      title: 'Stock de insumos',
      loading: false,
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
    changeSelect($event) {
      this.loading = true
      setTimeout(() => {
        this.suppliesForm = {}
        this.loading = false
      }, 1500)
    },
  },
  mounted() {},
  computed: {
    ...mapState({
      subsidiarysArray: (state) => state.data.general.subsidiarys,
    }),
  },
}
</script>

<style></style>
