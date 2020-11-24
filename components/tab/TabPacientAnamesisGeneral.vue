<template>
  <div class="component-pacient-anamesis">
    <a-divider dashed :style="{ margin: '0 0 1rem' }" />

    <div class="tab-content style">
      <a-tabs class="basic">
        <!-- historia médica -->
        <a-tab-pane key="a">
          <span slot="tab">
            <i class="uil uil-history mr-2"></i>Historia médica
          </span>
          <header class="page-header justify-content-end pb-3">
            <a-button type="primary">
              <span>
                <i class="uil uil-plus-circle mr-1"></i> Nueva historía medica
              </span>
            </a-button>
          </header>
          <TabPacientAnamesisHistory />
        </a-tab-pane>
        <!-- Enfermedades -->
        <a-tab-pane key="b">
          <span slot="tab">
            <i class="uil uil-head-side-cough mr-2"></i>Enfermedades
          </span>
        </a-tab-pane>
        <!-- Otros -->
        <a-tab-pane key="c">
          <span slot="tab"> <i class="uil uil-ellipsis-h mr-2"></i>Otros </span>
          Content of tab 3
        </a-tab-pane>
        <!-- Diagnosticos -->
        <a-tab-pane key="d">
          <span slot="tab">
            <i class="uil uil-stethoscope-alt mr-2"></i>Diagnosticos
          </span>
          Content of tab 3
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>

<script>
import TabPacientAnamesisHistory from '~/components/tab/TabPacientAnamesisHistory'

export default {
  components: {
    components: {
      TabPacientAnamesisHistory,
    },
  },
}
</script>

<style></style>
