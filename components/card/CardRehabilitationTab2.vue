<template>
  <div class="card-info-pacient-odontogram">
    <a-card :title="false" :bordered="false">
      <h6 class="mt-0 mb-1" :style="{ color: '#B9BABA' }">Prótesis parcial removible</h6>
      <FormRemovablePartialDenture />
    </a-card>
  </div>
</template>

<script>
import FormRemovablePartialDenture from '~/components/form/FormRemovablePartialDenture'

export default {
  components: {
    FormRemovablePartialDenture,
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
