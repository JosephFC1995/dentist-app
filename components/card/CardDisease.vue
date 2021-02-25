<template>
  <div class="card-disease">
    <a-card :title="false" :bordered="false">
      <FormDiseasePacient />
    </a-card>
  </div>
</template>

<script>
import FormDiseasePacient from '~/components/form/FormDiseasePacient'

export default {
  components: {
    FormDiseasePacient,
  },
}
</script>

<style></style>
