<template>
  <div class="component-tab-pacient-endodontics">
    <a-divider dashed :style="{ margin: '0 0 1rem' }" />
    <div class="tab-content style">
      <a-tabs class="style sub">
        <!-- Historia médica -->
        <a-tab-pane key="endodontics_1">
          <span slot="tab"> Historia médica </span>
          <CardEndodonticsHistoryMedic />
        </a-tab-pane>
        <!-- Historia dental -->
        <a-tab-pane key="endodontics_2">
          <span slot="tab"> Historia dental </span>
          <CardEndodonticsHistoryDent />
        </a-tab-pane>
        <!-- Examen clínico -->
        <a-tab-pane key="endodontics_3">
          <span slot="tab"> Examen clínico </span>
          <CardEndodonticsMedicalExam />
        </a-tab-pane>
        <!-- Examen radiográfico -->
        <a-tab-pane key="endodontics_4">
          <span slot="tab"> Examen radiográfico </span>
          <CardEndodonticsRadiographicExam />
        </a-tab-pane>
        <!-- Diagnóstico pulpar de persunción -->
        <a-tab-pane key="endodontics_5">
          <span slot="tab"> Diagnóstico pulpar de persunción </span>
          <!-- A la espera -->
          <div class="section-odontogram px-5 mt-4">
            <a-card :title="false" :bordered="false" class="ant-card-bordered with-shadow">
              <h6 class="my-3 mx-3 text-center">Aqui ya se el Diagnóstico pulpar de persunción.</h6>
            </a-card>
          </div>
        </a-tab-pane>
        <!-- Tratamientos y datos clínicos -->
        <a-tab-pane key="endodontics_6">
          <span slot="tab"> Tratamientos y datos clínicos </span>
          <CardEndodonticsTreatments />
        </a-tab-pane>
        <!-- Accidentes operatorios -->
        <a-tab-pane key="endodontics_7">
          <span slot="tab"> Accidentes operatorios </span>
          <CardEndodonticsOperationsAccidents />
        </a-tab-pane>
        <!-- Pronóstico -->
        <a-tab-pane key="endodontics_8">
          <span slot="tab"> Pronóstico </span>
          <CardEndodonticsPronostic />
        </a-tab-pane>
        <div class="date_in_tab" slot="tabBarExtraContent">
          <a-form-model-item class="with-button">
            <a-date-picker placeholder="Seleccione una fecha" :showToday="false" />
          </a-form-model-item>
        </div>
      </a-tabs>
    </div>
  </div>
</template>

<script>
import CardEndodonticsHistoryMedic from '~/components/card/CardEndodonticsHistoryMedic'
import CardEndodonticsHistoryDent from '~/components/card/CardEndodonticsHistoryDent'
import CardEndodonticsMedicalExam from '~/components/card/CardEndodonticsMedicalExam'
import CardEndodonticsRadiographicExam from '~/components/card/CardEndodonticsRadiographicExam'
import CardEndodonticsTreatments from '~/components/card/CardEndodonticsTreatments'
import CardEndodonticsOperationsAccidents from '~/components/card/CardEndodonticsOperationsAccidents'
import CardEndodonticsPronostic from '~/components/card/CardEndodonticsPronostic'

export default {
  components: {
    components: {
      CardEndodonticsHistoryMedic,
      CardEndodonticsHistoryDent,
      CardEndodonticsMedicalExam,
      CardEndodonticsRadiographicExam,
      CardEndodonticsTreatments,
      CardEndodonticsPronostic,
    },
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
