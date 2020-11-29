<template>
  <div class="card-info-pacient-odontogram">
    <a-card :title="false" :bordered="false">
      <a-row :gutter="16" type="flex" justify="space-between">
        <a-col :span="24" :md="6" class="with-button"> </a-col>
      </a-row>
      <!-- Formulario Endodoncia -->
      <FormEndodonticsOperationsAccidents />
    </a-card>
  </div>
</template>

<script>
import FormEndodonticsOperationsAccidents from '~/components/form/FormEndodonticsOperationsAccidents.vue'
export default {
  components: {
    FormEndodonticsOperationsAccidents,
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
