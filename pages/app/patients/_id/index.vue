<template>
  <div class="page--app-patients page--default">
    <header class="page-header">
      <h1 class="page-title">Paciente - {{ id }}</h1>
    </header>
    <div class="tab-content style">
      <a-tabs class="desing">
        <!-- Datos -->
        <a-tab-pane key="1">
          <span slot="tab">
            <i class="uil uil-user-exclamation mr-2"></i>Datos
          </span>
          <TabPacientInformation />
        </a-tab-pane>
        <!-- Analmesis general -->
        <a-tab-pane key="2">
          <span slot="tab">
            <i class="uil uil-syringe mr-2"></i>Analmesis general
          </span>
          <TabPacientAnamesisGeneral />
        </a-tab-pane>
        <!-- Examen odontológico -->
        <a-tab-pane key="3">
          <span slot="tab">
            <i class="uil uil-microscope mr-2"></i>Examen odontológico
          </span>
          Content of tab 3
        </a-tab-pane>
        <!-- Tratamiento -->
        <a-tab-pane key="4">
          <span slot="tab">
            <i class="uil uil-band-aid mr-2"></i>Tratamiento
          </span>
          Content of tab 3
        </a-tab-pane>
        <!-- Imágenes -->
        <a-tab-pane key="5">
          <span slot="tab"> <i class="uil uil-image mr-2"></i>Imágenes </span>
          Content of tab 3
        </a-tab-pane>
        <!-- Informes -->
        <a-tab-pane key="6">
          <span slot="tab">
            <i class="uil uil-file-alt mr-2"></i>Informes
          </span>
          Content of tab 3
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>

<script>
// components
import TabPacientInformation from '~/components/tab/TabPacientInformation'
import TabPacientAnamesisGeneral from '~/components/tab/TabPacientAnamesisGeneral'

export default {
  asyncData({ params }) {
    let { id } = params
    return {
      id: id,
    }
  },
  layout: 'user',
  components: {
    TabPacientInformation,
    TabPacientAnamesisGeneral,
  },
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
