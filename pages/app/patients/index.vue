<template>
  <div class="page--app-patients page--default">
    <header class="page-header">
      <h1 class="page-title">Pacientes</h1>
      <nuxt-link :to="{ name: 'app-patients-new' }" class="ant-btn ant-btn-primary p-0 px-3">
        <span> <i class="uil uil-plus-circle mr-1"></i> Nuevo paciente </span>
      </nuxt-link>
    </header>
    <TablePacients />
  </div>
</template>

<script>
// components
import TablePacients from '~/components/table/TablePacients'

export default {
  layout: 'user',
  middleware: 'auth',
  async fetch({ store }) {
    await store.dispatch('tables/patients/GET_PATIENTS_TABLE')
    this.loading = false
  },
  components: {
    TablePacients,
  },
  data() {
    return {
      title: 'Pacientes',
      loading: false,
    }
  },
  head() {
    return {
      title: this.title,
      meta: [],
    }
  },
  watch: {},
  methods: {},
}
</script>

<style></style>
