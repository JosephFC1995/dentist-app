<template>
  <div class="card-info-pacient-enodontics">
    <a-card :title="false" :bordered="false" class="body-p-0">
      <TabPacientEndodontics />
    </a-card>
  </div>
</template>

<script>
import TabPacientEndodontics from '~/components/tab/TabPacientEndodontics'

export default {
  components: {
    TabPacientEndodontics,
  },
}
</script>

<style lang="scss">
.card-info-pacient-enodontics {
  .ant-card-body {
    padding: 0 !important;
  }
}
</style>
