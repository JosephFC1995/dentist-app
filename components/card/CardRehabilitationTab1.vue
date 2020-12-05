<template>
  <div class="card-info-pacient-odontogram">
    <a-card :title="false" :bordered="false">
      <h4 class="mt-0 mb-3" :style="{ color: '#000' }">Protesis fijas</h4>
      <h6 class="mt-0 mb-1" :style="{ color: '#B9BABA' }">Evaluación de pilares puente fijo convencional</h6>
      <TableRehabilitationFixedBirdge />
      <h6 class="mt-5 mb-1" :style="{ color: '#B9BABA' }">Evaluación de pilares para espigo Muñon</h6>
      <TableRehabilitationEspigeBirdge />
    </a-card>
  </div>
</template>

<script>
import TableRehabilitationFixedBirdge from '~/components/table/TableRehabilitationFixedBirdge'
import TableRehabilitationEspigeBirdge from '~/components/table/TableRehabilitationEspigeBirdge'
export default {
  components: {
    TableRehabilitationFixedBirdge,
    TableRehabilitationEspigeBirdge,
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
