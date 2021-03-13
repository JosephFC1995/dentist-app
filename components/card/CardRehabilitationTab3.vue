<template>
  <div class="card-info-pacient-odontogram">
    <a-card :title="false" :bordered="false">
      <FormRehabilitationTabTwo />
    </a-card>
  </div>
</template>

<script>
export default {
  components: {},
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
