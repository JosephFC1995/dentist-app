<template>
  <div
    class="content--page--picture public-layout login background--cover"
    :style="{ backgroundImage: `url(${company.portada ? company.portada.url : +''})` }"
  >
    <div class="content--box">
      <div class="content--header">
        <div class="logo">
          <img
            :src="company.avatar ? company.avatar.url : +'/assets/images/logo.jpeg'"
            alt=""
            width="auto"
            height="auto"
            class="logo-img"
          />
        </div>
      </div>
      <div class="content--body">
        <div class="appointment status-por-confirmar" v-if="response.id_appointment_status == 1">
          <h4 class="mt-0 mb-1">Confirmar cita</h4>
          <p class="text-color-200">Hola {{ response.patient.name }}, por favor confirma tu cita.</p>
          <div class="info-appointment">
            <div class="info-appointment-item">
              <div class="label">Fecha</div>
              <div class="value">
                {{ response.date_appointment }}
              </div>
            </div>
            <div class="info-appointment-item">
              <div class="label">Doctor</div>
              <div class="value">{{ response.doctor.name }} {{ response.doctor.last_name }}</div>
            </div>
            <div class="info-appointment-item">
              <div class="label">Razon</div>
              <div class="value">{{ response.reason.name }}</div>
            </div>
            <div class="info-appointment-item">
              <div class="label">Sucursal</div>
              <div class="value">{{ response.subsidiary.name_small }}</div>
            </div>
            <div class="info-appointment-item">
              <div class="label">Dirección</div>
              <div class="value">{{ response.subsidiary.direction }}</div>
            </div>
          </div>
          <a-col :span="24">
            <a-button type="primary" html-type="submit" :loading="loading" @click="submit"> Confirmar mi cita</a-button>
          </a-col>
        </div>
        <div class="appointment status-por-confirmar" v-else-if="response.id_appointment_status == 2">
          <h4 class="mt-0 mb-1">Cita por confirmada</h4>
          <p class="text-color-200">Muchas gracias por confirmar tu cita, aqui tienes la información de tu cita.</p>
          <div class="info-appointment">
            <div class="info-appointment-item">
              <div class="label">Fecha</div>
              <div class="value">
                {{ response.date_appointment }}
              </div>
            </div>
            <div class="info-appointment-item">
              <div class="label">Doctor</div>
              <div class="value">{{ response.doctor.name }} {{ response.doctor.last_name }}</div>
            </div>
            <div class="info-appointment-item">
              <div class="label">Razon</div>
              <div class="value">{{ response.reason.name }}</div>
            </div>
            <div class="info-appointment-item">
              <div class="label">Sucursal</div>
              <div class="value">{{ response.subsidiary.name_small }}</div>
            </div>
            <div class="info-appointment-item">
              <div class="label">Dirección</div>
              <div class="value">{{ response.subsidiary.direction }}</div>
            </div>
          </div>
        </div>
        <div class="appointment status-por-confirmar" v-else-if="response.id_appointment_status == 3">
          <h4 class="mt-0 mb-1">Cita atendida</h4>
          <p class="text-color-200">Muchas gracias por confirmar en nosotros, esta cita ya ha sido atendida.</p>
        </div>
        <div class="appointment status-por-confirmar" v-else-if="response.id_appointment_status == 4">
          <h4 class="mt-0 mb-1">Cita cancelada</h4>
          <p class="text-color-200">Esta cita ha sido cancelada.</p>
        </div>

        <br />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'

export default {
  async asyncData({ params, query, $axios, error, redirect }) {
    let tkn = query.tkn
    if (!tkn) return redirect('/singin')
    let { data } = await $axios.$post(`/valid-appoitment`, { token: tkn }).catch((errors) => {})
    // if (response.error) error({ statusCode: 404, message: response.message })
    return {
      tkn: tkn,
      response: data,
    }
  },
  auth: 'guest',
  data() {
    return {
      loading: false,
      title: 'Confirmar cita',
    }
  },
  computed: {},
  head() {
    return {
      title: this.title,
      meta: [],
    }
  },
  methods: {
    async submit() {
      this.loading = true
      let response = false
      let tempForm = {
        token: this.tkn,
      }
      response = await this.$axios.$post(`/confirm-appoitment`, tempForm).catch((errors) => {
        this.loading = false
      })
      this.loading = false
      if (response.success) {
        this.response.id_appointment_status = 2
      }
      this.$message.success(response.message)
    },
  },
  computed: {
    ...mapGetters({
      company: 'data/company/getCompany',
    }),
  },
}
</script>

<style scoped lang="scss">
.content--body {
  display: block !important;
  margin-top: 2rem;
}
.info-appointment-item {
  .label {
    color: #8c8c8c;
    text-transform: uppercase;
    letter-spacing: 2px;
    font-weight: 600;
  }
  .value {
    text-transform: capitalize;
    font-size: 16px;
    margin-bottom: 10px;
    color: #000;
  }
}
</style>
