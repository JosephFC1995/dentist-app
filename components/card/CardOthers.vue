<template>
  <div class="card-disease">
    <a-card :title="false" :bordered="false">
      <FormOthersPacient />
    </a-card>
  </div>
</template>

<script>
import FormOthersPacient from '~/components/form/FormOthersPacient'

export default {
  components: {
    FormOthersPacient,
  },
}
</script>

<style></style>
