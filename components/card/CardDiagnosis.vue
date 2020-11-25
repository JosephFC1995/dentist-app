<template>
  <div class="card-disease">
    <a-card :title="false" :bordered="false">
      <FormDiagnosisPacient />
    </a-card>
  </div>
</template>

<script>
import FormDiagnosisPacient from '~/components/form/FormDiagnosisPacient'

export default {
  components: {
    FormDiagnosisPacient,
  },
}
</script>

<style></style>
