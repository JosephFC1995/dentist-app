<template>
  <div class="component-pacient-anamesis">
    <a-divider dashed :style="{ margin: '0 0 1rem' }" />
    <div class="tab-content style">
      <a-tabs class="style basic">
        <!-- Odontograma -->
        <a-tab-pane key="de_1">
          <span slot="tab"> <i class="uil uil-history mr-2"></i>Odontograma </span>
          <CardOdontogram />
        </a-tab-pane>
        <!-- Disfusión -->
        <a-tab-pane key="de_2">
          <span slot="tab"> <i class="uil uil-head-side-cough mr-2"></i>Disfusión </span>
          <CardDiffussion />
        </a-tab-pane>
        <!-- Endodoncia -->
        <a-tab-pane key="de_3">
          <span slot="tab"> <i class="uil uil-ellipsis-h mr-2"></i>Endodoncia </span>
          <CardEndodontics />
        </a-tab-pane>
        <!-- Patología estomalógico -->
        <a-tab-pane key="de_4">
          <span slot="tab"> <i class="uil uil-stethoscope-alt mr-2"></i>Patología estomalógico </span>
          <CardPathology />
        </a-tab-pane>
        <!-- Ortodoncia -->
        <a-tab-pane key="de_5">
          <span slot="tab"> <i class="uil uil-stethoscope-alt mr-2"></i>Ortodoncia </span>
          <CardOrthodontic />
        </a-tab-pane>
        <!-- Reabilitación -->
        <a-tab-pane key="de_6">
          <span slot="tab"> <i class="uil uil-stethoscope-alt mr-2"></i>Reabilitación </span>
          <CardRehabilitation />
        </a-tab-pane>
        <!-- Odontopediatría -->
        <a-tab-pane key="de_7">
          <span slot="tab"> <i class="uil uil-stethoscope-alt mr-2"></i>Odontopediatría </span>
          <CardPediatryDent />
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>

<script>
import CardOdontogram from '~/components/card/CardOdontogram'
import CardDiffussion from '~/components/card/CardDiffussion'
import CardEndodontics from '~/components/card/CardEndodontics'
import CardPathology from '~/components/card/CardPathology'
import CardOrthodontic from '~/components/card/CardOrthodontic'
import CardRehabilitation from '~/components/card/CardRehabilitation'
import CardPediatryDent from '~/components/card/CardPediatryDent'

export default {
  components: {
    components: {
      CardOdontogram,
      CardDiffussion,
      CardEndodontics,
      CardPathology,
      CardOrthodontic,
      CardRehabilitation,
      CardPediatryDent,
    },
  },
}
</script>

<style></style>
