<template>
  <div class="card-info-pacient-odontogram">
    <a-card :title="false" :bordered="false">
      <a-alert
        message="Por favor seleccione una fecha para poder editar este espacio"
        type="warning"
        show-icon
        class="mb-3"
        v-if="!selectDate"
      />
      <h4 class="mt-0 mb-3" :style="{ color: '#000' }">Protesis fijas</h4>
      <h6 class="mt-0 mb-1" :style="{ color: '#B9BABA' }">Evaluación de pilares puente fijo convencional</h6>
      <TableRehabilitationFixedBirdge @reload="$emit('reload')" />
      <h6 class="mt-5 mb-1" :style="{ color: '#B9BABA' }">Evaluación de pilares para espigo Muñon</h6>
      <TableRehabilitationEspigeBirdge @reload="$emit('reload')" />
    </a-card>
  </div>
</template>

<script>
import TableRehabilitationFixedBirdge from '~/components/table/TableRehabilitationFixedBirdge'
import TableRehabilitationEspigeBirdge from '~/components/table/TableRehabilitationEspigeBirdge'
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'

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
  computed: {
    ...mapGetters({
      loading: 'data/rehabilitation/getLoading',
      id_rehabilitation: 'data/rehabilitation/getIDSelectRehabilitation',
      selectDate: 'data/rehabilitation/getSeletedDate',
      rehabilitationSelect: 'data/rehabilitation/getRehabilitationSelect',
      rehabilitationRehabilitationTableEspigeSelect: 'data/rehabilitation/getRehabilitationRehabilitationTableEspige',
    }),
  },
  methods: {
    disabledDate(current) {
      return current && current >= this.$moment().startOf('day').add(1, 'days')
    },
  },
}
</script>

<style></style>
