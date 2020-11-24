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
        <a-button type="primary" size="small" @click="detailHistory(record)">
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
          width: '10%',
        },
        {
          title: 'Fecha',
          dataIndex: 'date',
          key: 'date',
          scopedSlots: { customRender: 'date' },
          width: '20%',
        },

        {
          title: 'Doctor',
          dataIndex: 'doctor',
          key: 'doctor',
          width: '60%',
        },
        {
          title: 'Acciones',
          key: 'action',
          scopedSlots: { customRender: 'action' },
          width: '10%',
        },
      ],
      data: [
        {
          id: '1',
          date: '12/11/2020',
          doctor: 'John Brown',
        },
        {
          id: '2',
          date: '12/11/2020',
          doctor: 'Jim Green',
          name: 'Jim',
        },
        {
          id: '3',
          date: '12/11/2020',
          doctor: 'John Brown',
        },
        {
          id: '4',
          date: '12/11/2020',
          doctor: 'Jim Green',
          name: 'Jim',
        },
        {
          id: '5',
          date: '12/11/2020',
          doctor: 'John Brown',
        },
        {
          id: '6',
          date: '12/11/2020',
          doctor: 'Jim Green',
          name: 'Jim',
        },
        {
          id: '7',
          date: '12/11/2020',
          doctor: 'John Brown',
        },
        {
          id: '8',
          date: '12/11/2020',
          doctor: 'Jim Green',
          name: 'Jim',
        },
      ],
    }
  },
  methods: {
    detailHistory(record) {},
  },
}
</script>

<style></style>
