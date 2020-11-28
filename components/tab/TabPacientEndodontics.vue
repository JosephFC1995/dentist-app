<template>
  <div class="component-tab-pacient-endodontics">
    <a-divider dashed :style="{ margin: '0 0 1rem' }" />
    <div class="tab-content style">
      <a-tabs class="style sub">
        <!-- Historia médica -->
        <a-tab-pane key="endodontics_1">
          <span slot="tab"> Historia médica </span>
          <CardEndodonticsHistory />
        </a-tab-pane>
        <!-- Historia dental -->
        <a-tab-pane key="endodontics_2">
          <span slot="tab"> Historia dental </span>
        </a-tab-pane>
        <!-- Examen clínico -->
        <a-tab-pane key="endodontics_3">
          <span slot="tab"> Examen clínico </span>
        </a-tab-pane>
        <!-- Examen radiográfico -->
        <a-tab-pane key="endodontics_4">
          <span slot="tab"> Examen radiográfico </span>
        </a-tab-pane>
        <!-- Diagnóstico pulpar de persunción -->
        <a-tab-pane key="endodontics_5">
          <span slot="tab"> Diagnóstico pulpar de persunción </span>
        </a-tab-pane>
        <!-- Tratamientos y datos clínicos -->
        <a-tab-pane key="endodontics_6">
          <span slot="tab"> Tratamientos y datos clínicos </span>
        </a-tab-pane>
        <!-- Pronóstico -->
        <a-tab-pane key="endodontics_7">
          <span slot="tab"> Pronóstico </span>
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>

<script>
import CardEndodonticsHistory from '~/components/card/CardEndodonticsHistory'

export default {
  components: {
    components: { CardEndodonticsHistory },
  },
}
</script>

<style lang="scss">
.component-tab-pacient-endodontics {
  .ant-tabs-content {
    padding-top: 1rem;
  }
}
</style>
