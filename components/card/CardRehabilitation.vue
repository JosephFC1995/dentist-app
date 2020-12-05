<template>
  <div class="card-info-pacient-odontogram">
    <a-card :title="false" :bordered="false">
      <a-row :gutter="16" type="flex" justify="space-between">
        <a-col :span="24" :md="6" class="with-button"> </a-col>
      </a-row>
      <!-- Tab -->
      <TabRehabilitation />
    </a-card>
  </div>
</template>

<script>
import TabRehabilitation from '~/components/tab/TabRehabilitation'
export default {
  components: {
    TabRehabilitation,
  },
  data() {
    return {
      date: this.$moment(),
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
