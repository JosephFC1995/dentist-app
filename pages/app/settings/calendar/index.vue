<template>
  <div class="page--app-users page--default">
    <header class="page-header">
      <h1 class="page-title">Calendario</h1>
    </header>
  </div>
</template>

<script>
// components
import FormCompany from '~/components/form/FormCompany'

import { mapState } from 'vuex'

export default {
  layout: 'user',
  middleware: 'auth',
  asyncData({ redirect, $axios }) {},
  fetch({ store }) {
    // await store.dispatch('tables/users/GET_USERS_TABLE')
    this.loading = false
  },
  components: {},
  data() {
    return {
      title: 'Empresa',
      loading: false,
      companyForm: {},
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
  mounted() {},
}
</script>

<style></style>
