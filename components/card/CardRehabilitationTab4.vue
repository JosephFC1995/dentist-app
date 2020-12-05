<template>
  <div class="card-info-pacient-odontogram">
    <a-card :title="false" :bordered="false">
      <FormRehabilitationOralExam />
    </a-card>
  </div>
</template>

<script>
import FormRehabilitationOralExam from '~/components/form/FormRehabilitationOralExam'

export default {
  components: {
    FormRehabilitationOralExam,
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
