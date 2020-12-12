<template>
  <div class="table-general">
    <a-space class="mb-3 mt-2 d-flex justify-content-between">
      <div>
        <downloadExcel class="ant-btn ant-btn-sm rounded-full pr-2" :data="users" :fields="json_fields_excel" name="reporte.xls">
          <i class="uil uil-cloud-download mr-2"></i> Archivo excel
        </downloadExcel>
        <a-button shape="round" class="rounded-full" size="small">
          <i class="uil uil-cloud-download mr-2"></i> Archivo PDF
        </a-button>
      </div>
      <div>
        <a-input placeholder="Buscar" />
      </div>
    </a-space>
    <a-table
      :columns="columns"
      :data-source="users"
      rowKey="id"
      :pagination="{
        defaultPageSize: 10,
        hideOnSinglePage: true,
      }"
    >
      <a slot="name" slot-scope="text">{{ text }}</a>
      <span slot="avatar" slot-scope="avatar">
        <template v-if="!avatar">
          <a-avatar size="small" icon="user" />
        </template>
        <template v-else>
          <a-avatar size="small" icon="user" :src="avatar.path" />
        </template>
      </span>
      <span slot="action" slot-scope="text, record">
        <a-button class="ant-btn ant-btn-sm" @click="openEditUser(record)">
          <span class="ico">
            <i class="uil uil-eye"></i>
          </span>
        </a-button>

        <a-button type="danger" size="small">
          <span class="ico">
            <i class="uil uil-trash-alt"></i>
          </span>
        </a-button>
      </span>
    </a-table>
    <a-drawer
      :width="widthDrawerResponsive"
      :closable="true"
      :visible="openDrawerDetail"
      :body-style="{ paddingBottom: '80px' }"
      @close="closeDrawerHistory"
    >
      <template slot="title">
        <div class="title-block p-0 m-0">
          <h4 class="modal-title m-0" style="color: #336cfb">Detalles del usuario</h4>
        </div>
      </template>
      <FormUser @close="closeDrawerHistory" :form="userForm" />
    </a-drawer>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import FormUser from '~/components/form/FormUser'

export default {
  components: {
    FormUser,
  },
  data() {
    return {
      widthDrawerResponsive: window.innerWidth > 900 ? 650 : window.innerWidth - 100,
      openDrawerDetail: false,
      userForm: null,
      json_fields_excel: {
        ID: 'id',
        Nombre: 'name',
        Apellido: 'last_name',
        Teléfono: 'phone',
        Correo: 'email',
      },
      columns: [
        {
          dataIndex: 'id',
          key: 'id',
          title: 'ID',
        },
        {
          title: 'Foto',
          dataIndex: 'avatar',
          key: 'avatar',
          scopedSlots: { customRender: 'avatar' },
        },
        {
          title: 'Nombre',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'Apellido',
          dataIndex: 'last_name',
          key: 'last_name',
        },
        {
          title: 'Teléfono',
          dataIndex: 'phone',
          key: 'phone',
        },
        {
          title: 'Rol',
          dataIndex: 'role.name',
          key: 'role.name',
        },
        {
          title: 'Correo',
          dataIndex: 'email',
          key: 'email',
        },
        {
          title: 'Acciones',
          key: 'action',
          scopedSlots: { customRender: 'action' },
        },
      ],
    }
  },
  methods: {
    async openEditUser(record) {
      this.openDrawerDetail = true
      this.userForm = await this.$store.dispatch('tables/users/GET_USER_SELECTED', record.id)
    },
    closeDrawerHistory() {
      setTimeout(() => {
        this.userForm = null
      }, 500)
      this.openDrawerDetail = false
    },
    ...mapMutations({
      clearUser: 'tables/users/CLEAR_USER',
    }),
  },
  computed: {
    ...mapState({
      users: (state) => state.tables.users.users,
    }),
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
