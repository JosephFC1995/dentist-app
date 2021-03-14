<template>
  <div class="page--app-users page--default">
    <header class="page-header">
      <h1 class="page-title">Mi perfil</h1>
    </header>
    <FormProfile :form="profileForm" :newData="true" />
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
    store.dispatch('tables/users/CHANGE_LOADING', true)
    store.dispatch('tables/users/GET_USERS_TABLE')
    store.dispatch('data/general/GET_ROLES')
    store.dispatch('data/general/GET_TYPE_DOCUMENTS')
    store.dispatch('data/general/GET_SUBSIDIARIES')
    store.dispatch('data/general/GET_ESPECIALITIES')
  },
  components: {},
  data() {
    return {
      title: 'Empresa',
      loading: false,
      profileForm: {},
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
  mounted() {
    this.profileForm = this.$auth.user ? _.cloneDeep(this.$auth.user) : { firm: null, avatar: {} }
  },
}
</script>

<style></style>
