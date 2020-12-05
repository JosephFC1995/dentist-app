<template>
  <div class="card-info-pacient-odontogram">
    <a-card :title="false" :bordered="false">
      <FormRemovableTotalDenture />
    </a-card>
  </div>
</template>

<script>
import FormRemovableTotalDenture from '~/components/form/FormRemovableTotalDenture'

export default {
  components: {
    FormRemovableTotalDenture,
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
