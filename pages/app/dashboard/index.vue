<template>
  <div class="page--app-dashboard page--default">
    <a-row :gutter="{ xs: 8, sm: 16, md: 16, lg: 16 }">
      <a-col class="gutter-row" :span="24" :md="6" v-for="(res, index) in dashboard" :key="index">
        <a-card class="ant-card-bordered with-shadow" :style="{ background: 'rgb(251, 251, 251)' }">
          <div class="ant-card-body">
            <a-row :class="[loading ? 'show' : '']">
              <a-col span="6">
                <i
                  class="uil"
                  :class="['uil-' + res.ico]"
                  :style="{
                    'font-size': '36px',
                    color: 'rgba(51, 108, 251, 0.5)',
                  }"
                ></i>
              </a-col>
              <a-col span="18">
                <h6 class="mt-0 mb-1">{{ res.title }}</h6>
                <div
                  class="count font-weight-bold"
                  :style="{
                    'font-size': '20px',
                    color: 'rgb(51, 108, 251)',
                    'line-height': '1.4',
                  }"
                >
                  {{ res.total }}
                </div>
              </a-col>
            </a-row>
          </div>
        </a-card>
      </a-col>
    </a-row>
    <!-- <pre>
     
      {{ this.$auth.hasScope('administrator') }}
      {{ this.$auth.hasScope('doctor') }}
      {{ this.$auth.user }}
    </pre> -->
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'

export default {
  layout: 'user',
  middleware: 'auth',
  async fetch({ store, app }) {
    await store.dispatch('data/dashboard/GET_DATA_DASHBOARD')
    console.log(this.dashboard)
    this.resume = this.dashboard
  },
  data() {
    return {
      title: 'Dashboard',
      resume: [
        {
          title: '-',
          total: 0,
          ico: 'user-nurse',
        },
        {
          title: '-',
          total: 0,
          ico: 'user-plus',
        },
        {
          title: '-',
          total: 0,
          ico: 'stethoscope',
        },
        {
          title: '-',
          total: 0,
          ico: 'medical-drip',
        },
      ],
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
    ...mapActions({
      changeLoading: 'data/dashboard/CHANGE_LOADING',
    }),
  },
  computed: {
    ...mapGetters({
      loading: 'data/dashboard/getLoading',
      dashboard: 'data/dashboard/getDashboard',
    }),
  },
  mounted() {},
}
</script>

<style scope lang="scss">
.ant-row {
  &.loading {
    div {
      opacity: 0.5;
    }
  }
}
</style>
