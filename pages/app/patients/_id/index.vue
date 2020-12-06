<template>
  <div class="page--app-patients page--default">
    <header class="page-header">
      <h1 class="page-title">
        Paciente - {{ id }}
        <i
          class="uil uil-info-circle"
          :style="{ color: '#2E64FA', cursor: 'pointer' }"
          @click="() => (openDrawerInfoPacient = true)"
        ></i>
      </h1>
    </header>
    <div class="tab-content style">
      <a-tabs class="desing">
        <!-- Datos -->
        <a-tab-pane key="1">
          <span slot="tab"> <i class="uil uil-user-exclamation mr-2"></i>Datos </span>
          <TabPacientInformation />
        </a-tab-pane>
        <!-- Analmesis general -->
        <a-tab-pane key="2">
          <span slot="tab"> <i class="uil uil-syringe mr-2"></i>Analmesis general </span>
          <TabPacientAnamesisGeneral />
        </a-tab-pane>
        <!-- Examen odontológico -->
        <a-tab-pane key="3">
          <span slot="tab"> <i class="uil uil-microscope mr-2"></i>Examen odontológico </span>
          <TabPacientDentalExam />
        </a-tab-pane>
        <!-- Tratamiento -->
        <a-tab-pane key="4">
          <span slot="tab"> <i class="uil uil-band-aid mr-2"></i>Tratamiento </span>
          <TabPacientTreatment />
        </a-tab-pane>
        <!-- Imágenes -->
        <a-tab-pane key="5">
          <span slot="tab"> <i class="uil uil-image mr-2"></i>Imágenes </span>
          <TabPacientPictures />
        </a-tab-pane>
        <!-- Informes -->
        <a-tab-pane key="6">
          <span slot="tab"> <i class="uil uil-file-alt mr-2"></i>Informes </span>
          <TabPacientInform />
        </a-tab-pane>
        <!-- Documentos -->
        <a-tab-pane key="7">
          <span slot="tab"> <i class="uil uil-files-landscapes-alt mr-2"></i>Documentos </span>
          <TabPacientDocument />
        </a-tab-pane>
      </a-tabs>
    </div>
    <!-- !Drawer información usuario -->
    <a-drawer
      :width="widthDrawerResponsive"
      :visible="openDrawerInfoPacient"
      :body-style="{ paddingBottom: '80px' }"
      @close="closeDrawerInfoPacient"
    >
      <template slot="title">
        <div class="title-block p-0 m-0">
          <h4 class="modal-title m-0" style="color: #336cfb">Usuario: {{ this.id }}</h4>
        </div>
        <CardInfoPacient />
      </template>
    </a-drawer>
  </div>
</template>

<script>
// components
import TabPacientInformation from '~/components/tab/TabPacientInformation'
import TabPacientAnamesisGeneral from '~/components/tab/TabPacientAnamesisGeneral'
import TabPacientDentalExam from '~/components/tab/TabPacientDentalExam'
import CardInfoPacient from '~/components/card/CardInfoPacient'
import TabPacientTreatment from '~/components/tab/TabPacientTreatment'
import TabPacientPictures from '~/components/tab/TabPacientPictures'
import TabPacientInform from '~/components/tab/TabPacientInform'
import TabPacientDocument from '~/components/tab/TabPacientDocument'

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
    TabPacientDentalExam,
    CardInfoPacient,
    TabPacientTreatment,
    TabPacientPictures,
    TabPacientInform,
    TabPacientDocument,
  },
  data() {
    return {
      title: 'Paciente',
      openDrawerInfoPacient: false,
      widthDrawerResponsive: window.innerWidth > 900 ? 500 : window.innerWidth - 100,
    }
  },
  head() {
    return {
      title: this.title,
      meta: [],
    }
  },
  watch: {},
  methods: {
    closeDrawerInfoPacient() {
      this.openDrawerInfoPacient = false
    },
  },
}
</script>

<style></style>
