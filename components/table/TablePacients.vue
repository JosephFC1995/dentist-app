<template>
  <div class="table-general">
    <a-space class="mb-3 mt-2 d-flex justify-content-between">
      <div>
        <downloadExcel
          class="ant-btn ant-btn-sm rounded-full pr-2"
          :data="data"
          :fields="json_fields_excel"
          name="reporte.xls"
        >
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
      :data-source="data"
      :pagination="{
        defaultPageSize: 5,
        hideOnSinglePage: true,
      }"
    >
      <a slot="name" slot-scope="text">{{ text }}</a>
      <span slot="photo">
        <a-avatar size="small" icon="user" />
      </span>
      <span slot="action" slot-scope="record">
        <nuxt-link
          :to="{ name: 'app-patients-id', params: { id: record.id } }"
          class="ant-btn ant-btn-sm"
        >
          <span class="ico">
            <i class="uil uil-eye"></i>
          </span>
        </nuxt-link>

        <a-button type="danger" size="small">
          <span class="ico">
            <i class="uil uil-trash-alt"></i>
          </span>
        </a-button>
      </span>
    </a-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      json_fields_excel: {
        ID: 'id',
        Nombre: 'name',
        'Apellido paterno': 'lastNameFather',
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
          dataIndex: 'photo',
          key: 'photo',
          scopedSlots: { customRender: 'photo' },
        },
        {
          title: 'Nombre',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'Apellido paterno',
          dataIndex: 'lastNameFather',
          key: 'lastNameFather',
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
      data: [
        {
          id: '1',
          name: 'John',
          lastNameFather: 'Brown',
          phone: '987 654 321',
          email: 'user@company.org',
        },
        {
          id: '2',
          name: 'Jim',
          lastNameFather: 'Green',
          phone: '987 654 321',
          email: 'user@company.org',
        },
        {
          id: '3',
          name: 'Joe',
          lastNameFather: 'Black',
          phone: '987 654 321',
          email: 'user@company.org',
        },
        {
          id: '4',
          name: 'John',
          lastNameFather: 'Brown',
          phone: '987 654 321',
          email: 'user@company.org',
        },
        {
          id: '5',
          name: 'Jim',
          lastNameFather: 'Green',
          phone: '987 654 321',
          email: 'user@company.org',
        },
        {
          id: '6',
          name: 'Joe',
          lastNameFather: 'Black',
          phone: '987 654 321',
          email: 'user@company.org',
        },
      ],
    }
  },
}
</script>

<style></style>
