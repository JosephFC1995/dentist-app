<template>
  <div class="page--app-patients-new page--default">
    <header class="page-header">
      <h1 class="page-title">Nuevo pacientes</h1>
    </header>
    <div class="tab-content style">
      <a-tabs class="desing">
        <!-- Datos -->
        <a-tab-pane key="1">
          <span slot="tab"> <i class="uil uil-user-exclamation mr-2"></i>Datos </span>
          <TabNewPacientInform />
        </a-tab-pane>
        <!-- Analmesis general -->
        <a-tab-pane key="2" disabled>
          <span slot="tab"> <i class="uil uil-syringe mr-2"></i>Analmesis general </span>
        </a-tab-pane>
        <!-- Examen odontológico -->
        <a-tab-pane key="3" disabled>
          <span slot="tab"> <i class="uil uil-microscope mr-2"></i>Examen odontológico </span>
        </a-tab-pane>
        <!-- Tratamiento -->
        <a-tab-pane key="4" disabled>
          <span slot="tab"> <i class="uil uil-band-aid mr-2"></i>Tratamiento </span>
        </a-tab-pane>
        <!-- Imágenes -->
        <a-tab-pane key="5" disabled>
          <span slot="tab"> <i class="uil uil-image mr-2"></i>Imágenes </span>
        </a-tab-pane>
        <!-- Informes -->
        <a-tab-pane key="6" disabled>
          <span slot="tab"> <i class="uil uil-file-alt mr-2"></i>Informes </span>
        </a-tab-pane>
        <!-- Documentos -->
        <a-tab-pane key="6" disabled>
          <span slot="tab"> <i class="uil uil-file-landscape-alt mr-2"></i>Documentos </span>
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>

<script>
// components
import TabNewPacientInform from '~/components/tab/TabNewPacientInform'

export default {
  layout: 'user',
  middleware: 'auth',
  components: {
    TabNewPacientInform,
  },
  async fetch({ store }) {
    store.dispatch('data/general/GET_GENDERS')
    store.dispatch('data/general/GET_CIVIL_STATUS')
    store.dispatch('data/general/GET_OCUPATIONS')
    store.dispatch('data/general/GET_INSURANCES')
    store.dispatch('data/general/GET_REFERREDS')
    store.dispatch('data/general/GET_NACIONALITIES')
    store.dispatch('data/general/GET_LANGUAJES')
    store.dispatch('data/general/GET_TYPE_DOCUMENTS')
    this.loading = false
  },
  data() {
    return {
      title: 'Nuevo paciente',
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
