<template>
  <div class="card-info-pacient-odontogram">
    <a-card :title="false" :bordered="false">
      <a-row :gutter="16" type="flex" justify="space-between"> </a-row>
      <!-- Formulario -->
      <FormPacientDocument />
    </a-card>
    <TablePacientDocument />
  </div>
</template>

<script>
import FormPacientDocument from '~/components/form/FormPacientDocument'
import TablePacientDocument from '~/components/table/TablePacientDocument'

export default {
  components: {
    FormPacientDocument,
    TablePacientDocument,
  },
  data() {
    return {
      odontogram: {
        date: this.$moment(),
      },
    }
  },
  methods: {
    disabledDate(current) {
      return current && current >= this.$moment().startOf('day').add(1, 'days')
    },
  },
}
</script>

<style></style>
