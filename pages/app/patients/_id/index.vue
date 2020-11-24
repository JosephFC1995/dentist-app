<template>
  <div class="page--app-patients page--default">
    <header class="page-header">
      <h1 class="page-title">Pacientes</h1>
      <a-button type="primary" html-type="submit">
        <i class="uil uil-plus-circle mr-1"></i> Nuevo paciente
      </a-button>
    </header>
  </div>
</template>

<script>
// components

export default {
  layout: 'user',
  components: {},
  data() {
    return {
      title: 'Paciente - A',
    }
  },
  head() {
    return {
      title: this.title,
      meta: [],
    }
  },
  watch: {},
  methods: {},
}
</script>

<style></style>
