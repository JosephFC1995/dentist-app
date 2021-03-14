<template>
  <div class="form-general">
    <a-form-model :model="form" ref="newEvent" :rules="rules">
      <h6 class="mt-0 mb-1" :style="{ color: '#B9BABA' }">Datos del paciente</h6>
      <a-row :gutter="16">
        <a-col :span="24">
          <a-form-model-item label="Paciente" class="with-button" prop="id_patient">
            <a-select
              placeholder="Seleccione un paciente"
              v-model="form.id_patient"
              :allowClear="true"
              @change="changeSelectPacient"
              :disabled="loading"
            >
              <a-select-option v-for="item in patientsArray" :key="item.id" :value="item.id">
                {{ item.last_name_father + ' ' + item.last_name_mother + ' ' + item.name + ' (' + item.number_documento + ')' }}
              </a-select-option>
            </a-select>
            <a-button type="primary" @click="() => (openDrawerNewUser = true)" :disabled="loading">
              <i class="uil uil-plus-circle"></i>
              Agregar nuevo paciente
            </a-button>
          </a-form-model-item>
        </a-col>
        <a-col :span="24" :md="12">
          <a-form-model-item label="Correo" prop="email_aux">
            <a-input v-model="form.email_aux" placeholder="Correo" :disabled="loading" />
          </a-form-model-item>
        </a-col>
        <a-col :span="24" :md="12">
          <a-form-model-item label="Teléfono" prop="phone_aux">
            <a-input v-model="form.phone_aux" placeholder="Teléfono" :disabled="loading" v-mask="'#########'" />
          </a-form-model-item>
        </a-col>
        <a-col :span="24">
          <h6 class="mt-0 mb-1" :style="{ color: '#B9BABA' }">Datos generales</h6>
        </a-col>

        <a-col :span="24" :md="12">
          <a-form-model-item label="Doctor" prop="id_doctor_user">
            <a-select
              placeholder="Seleccione un doctor"
              v-model="form.id_doctor_user"
              :allowClear="true"
              :disabled="loading || disableSelectDoctor"
            >
              <a-select-option v-for="item in doctorsArray" :key="item.id" :value="item.id">
                {{ (item.last_name ? item.last_name : '') + ' ' + item.name }}
              </a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
        <a-col :span="24" :md="12">
          <a-form-model-item label="Sucursal" prop="id_subsidiary">
            <a-select placeholder="Seleccione una sucursal" v-model="form.id_subsidiary" :allowClear="true" :disabled="loading">
              <a-select-option v-for="item in subsidiariesArray" :key="item.id" :value="item.id">
                {{ item.name }}
              </a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
        <a-col :span="24" :md="12">
          <a-form-model-item label="Motivo" prop="id_reason">
            <a-select
              placeholder="Seleccione un motivo"
              v-model="form.id_reason"
              :allowClear="true"
              @change="changeSelectReason"
              :disabled="loading"
            >
              <a-select-option v-for="item in reasonsArray" :key="item.id" :value="item.id">
                {{ item.name }}
              </a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
        <a-col :span="24" :md="12">
          <a-form-model-item label="Canal" prop="id_referred">
            <a-select placeholder="Seleccione un canal" v-model="form.id_referred" :allowClear="true" :disabled="loading">
              <a-select-option v-for="item in referredsArray" :key="item.id" :value="item.id">
                {{ item.name }}
              </a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
        <a-col :span="24">
          <h6 class="mt-0 mb-1" :style="{ color: '#B9BABA' }">Fecha y hora</h6>
        </a-col>
        <a-col :span="24" :md="12">
          <a-form-model-item label="Fecha" prop="date_start">
            <a-date-picker
              v-model="form.date_start"
              :disabled-date="disabledDate"
              placeholder="Seleccione una fecha"
              format="YYYY-MM-DD"
              valueFormat="YYYY-MM-DD"
              :disabled="loading"
            />
          </a-form-model-item>
        </a-col>
        <a-col :span="24" :md="12">
          <a-form-model-item label="Hora" prop="time_start">
            <a-time-picker
              use12-hours
              format="HH:mm a"
              v-model="form.time_start"
              placeholder="Seleccione una hora"
              valueFormat="HH:mm:ss"
              :disabled="loading"
            />
          </a-form-model-item>
        </a-col>

        <a-col :span="24" :md="12">
          <a-form-model-item label="Estado" prop="id_appointment_status">
            <a-select placeholder="Seleccione un estado" v-model="form.id_appointment_status" :disabled="loading">
              <a-select-option :value="estado.id" :label="estado.label" v-for="estado in appointmentStatusArray" :key="estado.id">
                <span
                  role="color"
                  :aria-label="estado.name"
                  class="block-color"
                  :class="[estado.class_name]"
                  :style="{
                    backgroundColor: estado.background_color,
                  }"
                >
                </span>
                {{ estado.name }}
              </a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
        <a-col :span="24" :md="12">
          <a-form-model-item label="Duración (minuto)" prop="duration">
            <a-input v-model="form.duration" suffix="minutos" :disabled="loading" />
          </a-form-model-item>
        </a-col>
        <a-col :span="24">
          <a-form-model-item label="Observaciones">
            <a-textarea v-model="form.observations" :rows="4" :disabled="loading" />
          </a-form-model-item>
        </a-col>
        <a-col :span="24" :md="24">
          <a-form-model-item class="mb-2">
            <a-switch v-model="form.send_mail" size="small" :disabled="loading" />
            <span class="ml-2">Informar por correo electrónico</span>
          </a-form-model-item>
        </a-col>
        <a-col :span="24" :md="24">
          <a-form-model-item class="mb-2">
            <a-switch v-model="form.send_whatsapp" size="small" :disabled="true" />
            <span class="ml-2">Informar por whatsapp</span>
          </a-form-model-item>
        </a-col>
        <a-col :span="24" class="d-flex justify-content-end mb-3">
          <a-button type="primary" html-type="submit" @click="saveNewEvent" :loading="loading" class="w-100">
            Guardar cita
          </a-button>
        </a-col>
      </a-row>
    </a-form-model>
    <!-- <pre>
      {{ $auth.user }}
    </pre> -->
    <a-drawer
      :width="widthDrawerResponsive"
      :closable="false"
      :visible="openDrawerNewUser"
      :body-style="{ paddingBottom: '80px' }"
      :destroyOnClose="true"
    >
      <template slot="title">
        <div class="title-block p-0 m-0">
          <h4 class="modal-title m-0" style="color: #336cfb">Crear nuevo paciente</h4>
        </div>
      </template>
      <FormFastNewPacient @close="() => (openDrawerNewUser = false)" />
    </a-drawer>
  </div>
</template>

<script>
// components
import FormFastNewPacient from '~/components/form/FormFastNewPacient'
import { mapGetters, mapActions } from 'vuex'
import _ from 'lodash'

export default {
  name: 'FormNewEventCalendar',
  props: {
    selectDate: {
      type: String,
      default: null,
    },
  },
  components: {
    FormFastNewPacient,
  },
  data() {
    return {
      loading: false,
      openDrawerNewUser: false,
      disableSelectDoctor: false,
      widthDrawerResponsive: window.innerWidth > 900 ? 450 : window.innerWidth - 100,
      form: {
        send_mail: true,
        id_appointment_status: 1,
        id_doctor_user: undefined,
        duration: 15,
        date_start: null,
        time_start: null,
      },
      rules: {
        id_patient: [
          {
            required: true,
            message: 'Por favor seleccione un paciente',
            trigger: 'blur',
          },
        ],
        id_appointment_status: [
          {
            required: true,
            message: 'Por favor seleccione un estado',
            trigger: 'blur',
          },
        ],
        id_doctor_user: [
          {
            required: true,
            message: 'Por favor seleccione un doctor',
            trigger: 'blur',
          },
        ],
        id_subsidiary: [
          {
            required: true,
            message: 'Por favor seleccione una sucursal',
            trigger: 'blur',
          },
        ],
        id_reason: [
          {
            required: true,
            message: 'Por favor seleccione una razón',
            trigger: 'blur',
          },
        ],
        id_referred: [
          {
            required: true,
            message: 'Por favor seleccione una canal',
            trigger: 'blur',
          },
        ],
        duration: [
          {
            required: true,
            message: 'Por favor agregar la duración',
            trigger: 'blur',
          },
        ],
        email_aux: [
          {
            required: true,
            message: 'Por favor colocar la dirección electrónica del paciente',
            trigger: 'blur',
          },
        ],
        phone_aux: [
          {
            required: true,
            message: 'Por favor colocar el teléfono del paciente',
            trigger: 'blur',
          },
        ],
        date_start: [
          {
            required: true,
            message: 'Por favor ingresar la fecha',
            trigger: 'blur',
          },
        ],
        time_start: [
          {
            required: true,
            message: 'Por favor ingresar la hora',
            trigger: 'blur',
          },
        ],
      },
    }
  },
  methods: {
    saveNewEvent() {
      this.$refs.newEvent.validate(async (valid) => {
        if (valid) {
          let _self = this
          _self.loading = true
          let response = false
          response = await _self.$axios.$post(`/appointment`, _self.form).catch((errors) => {
            _self.loading = false
          })
          if (response.success) this.$message.success(response.message)
          _self.loading = false
          // this.$store.dispatch('tables/users/GET_USERS_TABLE')
          this.$emit('close-refresh')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    closeDrawer() {
      this.$emit('close')
    },
    disabledDate(current) {
      return current && current <= this.$moment().startOf('day')
    },
    changeSelectPacient($event) {
      var objectPacient = _.find(this.patientsArray, { id: $event })
      if (!objectPacient) return
      this.form.email_aux = objectPacient.email
      this.form.phone_aux = objectPacient.phone
    },
    changeSelectReason($event) {
      var objectReason = _.find(this.reasonsArray, { id: $event })
      if (!objectReason) return
      this.form.duration = objectReason.time
    },
  },
  mounted() {
    let dateSelectProp = this.selectDate
    if (dateSelectProp) {
      this.form.date_start = this.$moment(dateSelectProp).format('YYYY-MM-DD')
      this.form.time_start = this.$moment(dateSelectProp).format('HH:mm:ss')
    } else {
      this.form.date_start = null
      this.form.time_start = null
    }
    window.onresize = () => {
      let width = window.innerWidth
      this.widthDrawerResponsive = width > 900 ? 700 : width - 100
    }
    if (this.$auth.hasScope('doctor')) {
      console.log(this.$auth.user.id)
      this.form.id_doctor_user = this.$auth.user.id
      this.disableSelectDoctor = true
    }
  },
  watch: {
    selectDate(newValue, oldValue) {
      console.log(newValue, oldValue, 'NUEVO VALOR')
    },
  },
  computed: {
    ...mapGetters({
      patientsArray: 'tables/patients/getPatients',
      insurancesArray: 'data/general/getInsurances',
      subsidiariesArray: 'data/general/getSubsidiaries',
      reasonsArray: 'data/general/getReasons',
      referredsArray: 'data/general/getReferreds',
      doctorsArray: 'tables/users/getDoctors',
      appointmentStatusArray: 'data/appointment/getAppointmentStatus',
    }),
  },
}
</script>

<style></style>
