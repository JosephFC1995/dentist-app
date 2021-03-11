<template>
  <div class="card-info-pacient-odontogram">
    <a-card :title="false" :bordered="false">
      <!-- Formulario Endodoncia historia -->
      <TablePacientEndodonticsHistoryMedic @reload="$emit('reload')" />
    </a-card>
  </div>
</template>

<script>
import FormEndodonticsHistoryPacient from '~/components/form/FormEndodonticsHistoryPacient'
import TablePacientEndodonticsHistoryMedic from '~/components/table/TablePacientEndodonticsHistoryMedic'

export default {
  components: {
    FormEndodonticsHistoryPacient,
    TablePacientEndodonticsHistoryMedic,
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
