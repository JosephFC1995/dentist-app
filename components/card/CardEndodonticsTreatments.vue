<template>
  <div class="card-info-pacient-odontogram">
    <a-card :title="false" :bordered="false">
      <a-row :gutter="16" type="flex" justify="space-between">
        <a-col :span="24" :md="6" class="with-button"> </a-col>
      </a-row>
      <!-- Formulario Endodoncia -->
      <FormEndodonticsTreatments />
    </a-card>
  </div>
</template>

<script>
import FormEndodonticsTreatments from '~/components/form/FormEndodonticsTreatments'
export default {
  components: {
    FormEndodonticsTreatments,
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
