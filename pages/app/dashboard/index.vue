<template>
  <div class="page--app-dashboard page--default">
    <a-row :gutter="{ xs: 8, sm: 16, md: 16, lg: 16 }">
      <a-col class="gutter-row" :span="24" :md="6" v-for="(res, index) in resume" :key="index">
        <a-card class="ant-card-bordered with-shadow" :style="{ background: 'rgb(251, 251, 251)' }">
          <div class="ant-card-body">
            <a-row>
              <a-col span="7">
                <i
                  class="uil"
                  :class="['uil-' + res.ico]"
                  :style="{
                    'font-size': '36px',
                    color: 'rgba(51, 108, 251, 0.5)',
                  }"
                ></i>
              </a-col>
              <a-col span="17">
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
  </div>
</template>

<script>
export default {
  layout: 'user',
  middleware: 'auth',
  data() {
    return {
      title: 'Dashboard',
      resume: [
        {
          title: 'Total pacientes',
          total: 213,
          ico: 'user-nurse',
        },
        {
          title: 'Nuevos pacientes',
          total: 213,
          ico: 'user-plus',
        },
        {
          title: 'Citas del mes',
          total: 213,
          ico: 'stethoscope',
        },
        {
          title: 'Operaciónes del mes',
          total: 213,
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
  methods: {},
}
</script>

<style></style>
