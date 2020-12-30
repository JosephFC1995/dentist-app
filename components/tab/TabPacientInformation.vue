<template>
  <div class="component-pacient-information">
    <FormPacientInformation :form="patient" />
  </div>
</template>

<script>
import FormPacientInformation from '~/components/form/FormPacientInformation'

export default {
  props: {
    patient: {
      type: Object,
      default: null,
    },
  },
  components: {
    FormPacientInformation,
  },
}
</script>

<style></style>
