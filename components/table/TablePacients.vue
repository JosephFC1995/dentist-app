<template>
  <div class="table-general">
    <a-space class="mb-3 mt-2 d-flex justify-content-between">
      <div>
        <downloadExcel
          class="ant-btn ant-btn-sm rounded-full pr-2"
          :data="patients"
          :fields="json_fields_excel"
          name="reporte.xls"
        >
          <i class="uil uil-cloud-download mr-2"></i> Archivo excel
        </downloadExcel>
      </div>
      <div>
        <a-input placeholder="Buscar" />
      </div>
    </a-space>
    <a-table
      :columns="columns"
      :data-source="patients"
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
      <span slot="action" slot-scope="record">
        <nuxt-link :to="{ name: 'app-patients-id', params: { id: record.id } }" class="ant-btn ant-btn-sm">
          <span class="ico">
            <i class="uil uil-eye"></i>
          </span>
        </nuxt-link>
        <a-popconfirm
          title="¿Esta seguro que desea eliminar el informe?"
          ok-text="Si"
          cancel-text="No"
          @confirm="deleteUser(record.id)"
        >
          <a-button type="danger" size="small">
            <span class="ico">
              <i class="uil uil-trash-alt"></i>
            </span>
          </a-button>
        </a-popconfirm>
      </span>
    </a-table>
    <!-- Modal -->
    <a-modal v-model="openModalDelete" @ok="okModalDelete" :forceRender="true" centered>
      <template slot="title">
        <div class="title-block p-0 m-0">
          <h4 class="modal-title m-0" style="color: rgb(237, 85, 100)">Eliminar al usuario</h4>
        </div>
      </template>
      <span> Esta seguro que desea eliminar al usuario </span>
      <template slot="footer">
        <div class="d-flex justify-content-between modal-footer">
          <a-button type="button" class="ant-btn ant-btn-dangerous" @click="() => (openModalDelete = false)" :loading="loading">
            <span>Cancelar</span>
          </a-button>
          <a-button type="primary" class="ant-btn ant-btn-primary" @click="okModalDelete" :loading="loading">
            <span>Aceptar</span>
          </a-button>
        </div>
      </template>
    </a-modal>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  data() {
    return {
      openModalDelete: false,
      loading: false,
      idUserDelete: 0,
      json_fields_excel: {
        ID: 'id',
        Avatar: 'avatar.path',
        Nombre: 'name',
        'Apellido paterno': 'last_name_father',
        Teléfono: 'phone',
        Correo: 'email',
        Telefono: 'email',
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
          title: 'Apellido paterno',
          dataIndex: 'last_name_father',
          key: 'last_name_father',
        },
        {
          title: 'Teléfono',
          dataIndex: 'phone',
          key: 'phone',
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
    deleteUser(id) {
      this.openModalDelete = true
      this.idUserDelete = id
    },
    async okModalDelete() {
      this.loading = true
      let deleteResponse = await this.$store.dispatch('tables/patients/DELETE_PATIENTS_SELECTED', this.idUserDelete)
      if (deleteResponse) this.$message.success(deleteResponse.message)
      this.$store.dispatch('tables/patients/GET_PATIENTS_TABLE')
      this.openModalDelete = false
      this.idUserDelete = 0
      this.loading = false
    },
  },
  computed: {
    ...mapState({
      patients: (state) => state.tables.patients.patients,
    }),
  },
}
</script>

<style></style>
