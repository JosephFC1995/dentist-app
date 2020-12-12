<template>
  <div class="page--app-users page--default">
    <header class="page-header">
      <h1 class="page-title">Usuarios</h1>
      <a-button class="ant-btn ant-btn-primary p-0 px-3">
        <span> <i class="uil uil-plus-circle mr-1"></i> Nuevo Usuarios </span>
      </a-button>
    </header>
    <TableUsers />
  </div>
</template>

<script>
// components
import TableUsers from '~/components/table/TableUsers'
import { mapState } from 'vuex'

export default {
  layout: 'user',
  middleware: 'auth',
  asyncData({ redirect, $axios }) {},
  async fetch({ store }) {
    await store.dispatch('tables/users/GET_USERS_TABLE')
    store.dispatch('data/general/GET_ROLES')
    store.dispatch('data/general/GET_TYPE_DOCUMENTS')
    store.dispatch('data/general/GET_SUBSIDIARIES')
    store.dispatch('data/general/GET_ESPECIALITIES')
    this.loading = false
  },
  components: {},
  data() {
    return {
      title: 'Usuarios',
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
