<template>
  <div class="component-pacient-anamesis">
    <a-divider dashed :style="{ margin: '0 0 1rem' }" />

    <div class="tab-content style">
      <a-tabs class="basic">
        <!-- historia médica -->
        <a-tab-pane key="a">
          <span slot="tab"> <i class="uil uil-history mr-2"></i>Historia médica </span>
          <TabPacientAnamesisHistory />
        </a-tab-pane>
        <!-- Enfermedades -->
        <a-tab-pane key="b">
          <span slot="tab"> <i class="uil uil-head-side-cough mr-2"></i>Enfermedades </span>
          <CardDisease />
        </a-tab-pane>
        <!-- Otros -->
        <a-tab-pane key="c">
          <span slot="tab"> <i class="uil uil-ellipsis-h mr-2"></i>Otros </span>
          <CardOthers />
        </a-tab-pane>
        <!-- Diagnosticos -->
        <a-tab-pane key="d">
          <span slot="tab"> <i class="uil uil-stethoscope-alt mr-2"></i>Diagnosticos </span>
          <CardDiagnosis />
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>

<script>
import TabPacientAnamesisHistory from '~/components/tab/TabPacientAnamesisHistory'
import CardDisease from '~/components/card/CardDisease'
import CardOthers from '~/components/card/CardOthers'
import CardDiagnosis from '~/components/card/CardDiagnosis'
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'

export default {
  components: {
    TabPacientAnamesisHistory,
    CardDisease,
    CardDiagnosis,
  },
  methods: {
    ...mapActions({
      getQuestions: 'data/questions/GET_QUESTIONS',
      getDiseases: 'data/diseases/GET_DISEASES',
      getOtherDiseases: 'data/other_diseases/GET_OTHER_DISEASES',
      getCodes100: 'data/codes100/GET_DISEASES',
    }),
  },
  mounted() {
    this.getQuestions()
    this.getCodes100()
    this.getDiseases()
    this.getOtherDiseases()
  },
}
</script>

<style></style>
