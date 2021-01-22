<template>
  <div class="page--app-users page--default">
    <header class="page-header">
      <h1 class="page-title">Usuarios</h1>
      <a-button class="ant-btn ant-btn-primary p-0 px-3" @click="() => (openDrawerNewUser = true)">
        <span> <i class="uil uil-plus-circle mr-1"></i> Nuevo Usuarios </span>
      </a-button>
    </header>
    <TableUsers />
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
          <h4 class="modal-title m-0" style="color: #336cfb">Agregar usuario</h4>
        </div>
      </template>
      <FormUser @close="closeDrawerHistory" :form="userForm" :newData="true" />
    </a-drawer>
  </div>
</template>

<script>
// components
import TableUsers from '~/components/table/TableUsers'
import FormUser from '~/components/form/FormUser'

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
      title: 'Usuarios',
      widthDrawerResponsive: window.innerWidth > 900 ? 650 : window.innerWidth - 100,
      openDrawerNewUser: false,
      userForm: {
        firm: null,
        avatar: null,
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
        this.userForm = {
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
