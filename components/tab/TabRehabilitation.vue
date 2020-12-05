<template>
  <div class="component-tab-pacient-endodontics">
    <a-divider dashed :style="{ margin: '0 0 1rem' }" />
    <div class="tab-content style">
      <a-tabs class="style sub">
        <!-- 1 -->
        <a-tab-pane key="orthidontic_1">
          <span slot="tab"> 1 </span>
          <CardRehabilitationTab1 />
        </a-tab-pane>
        <!-- 2 -->
        <a-tab-pane key="orthidontic_2">
          <span slot="tab"> 2 </span>
          <CardRehabilitationTab2 />
        </a-tab-pane>
        <!-- 3 -->
        <a-tab-pane key="orthidontic_3">
          <span slot="tab"> 3 </span>
          <CardRehabilitationTab3 />
        </a-tab-pane>
        <!-- 4 -->
        <a-tab-pane key="orthidontic_4">
          <span slot="tab"> 4 </span>
          <CardRehabilitationTab4 />
        </a-tab-pane>
        <div class="date_in_tab" slot="tabBarExtraContent">
          <a-form-model-item class="with-button">
            <a-date-picker v-model="date" :disabled-date="disabledDate" placeholder="Seleccione una fecha" :showToday="false" />
          </a-form-model-item>
        </div>
      </a-tabs>
    </div>
  </div>
</template>

<script>
import CardRehabilitationTab1 from '~/components/card/CardRehabilitationTab1'
import CardRehabilitationTab2 from '~/components/card/CardRehabilitationTab2'
import CardRehabilitationTab3 from '~/components/card/CardRehabilitationTab3'
import CardRehabilitationTab4 from '~/components/card/CardRehabilitationTab4'

export default {
  components: {
    components: {
      CardRehabilitationTab1,
      CardRehabilitationTab2,
      CardRehabilitationTab3,
      CardRehabilitationTab4,
    },
  },
  data() {
    return {
      date: this.$moment(),
    }
  },
  methods: {
    disabledDate(current) {
      return current && current >= this.$moment().startOf('day').add(1, 'days')
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
