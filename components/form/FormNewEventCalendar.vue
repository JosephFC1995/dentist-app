<template>
  <div class="form-general">
    <a-form-model :model="form">
      <h6 class="mt-0 mb-1" :style="{ color: '#B9BABA' }">Datos del paciente</h6>
      <a-row :gutter="16">
        <a-col :span="24">
          <a-form-model-item label="Paciente" class="with-button">
            <a-select
              placeholder="Seleccione un paciente"
              v-model="form.patient"
              :allowClear="true"
              @change="changeSelectPacient"
            >
              <a-select-option v-for="item in patientsArray" :key="item.id" :value="item.id">
                {{ item.last_name_father + ' ' + item.last_name_mother + ' ' + item.name + ' (' + item.number_documento + ')' }}
              </a-select-option>
            </a-select>
            <a-button type="primary" @click="() => (openDrawerNewUser = true)">
              <i class="uil uil-plus-circle"></i>
              Agregar nuevo paciente
            </a-button>
          </a-form-model-item>
        </a-col>
        <a-col :span="24" :md="12">
          <a-form-model-item label="Correo">
            <a-input v-model="form.email" placeholder="Correo" />
          </a-form-model-item>
        </a-col>
        <a-col :span="24" :md="12">
          <a-form-model-item label="Teléfono">
            <a-input v-model="form.phone" placeholder="Teléfono" />
          </a-form-model-item>
        </a-col>
        <a-col :span="24">
          <h6 class="mt-0 mb-1" :style="{ color: '#B9BABA' }">Datos generales</h6>
        </a-col>

        <a-col :span="24" :md="12">
          <a-form-model-item label="Doctor">
            <a-select placeholder="Seleccione un doctor" v-model="form.doctor" :allowClear="true">
              <a-select-option v-for="item in doctorsArray" :key="item.id" :value="item.id">
                {{ (item.last_name ? item.last_name : '') + ' ' + item.name }}
              </a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
        <a-col :span="24" :md="12">
          <a-form-model-item label="Sucursal">
            <a-select placeholder="Seleccione una sucursal" v-model="form.subsidiary" :allowClear="true">
              <a-select-option v-for="item in subsidiariesArray" :key="item.id" :value="item.id">
                {{ item.name }}
              </a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
        <a-col :span="24" :md="12">
          <a-form-model-item label="Motivo">
            <a-select placeholder="Seleccione un motivo" v-model="form.reason" :allowClear="true" @change="changeSelectReason">
              <a-select-option v-for="item in reasonsArray" :key="item.id" :value="item.id">
                {{ item.name }}
              </a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
        <a-col :span="24" :md="12">
          <a-form-model-item label="Canal">
            <a-select placeholder="Seleccione un canal" v-model="form.referred" :allowClear="true">
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
          <a-form-model-item label="Fecha">
            <a-date-picker v-model="form.date" :disabled-date="disabledDate" placeholder="Seleccione una fecha" />
          </a-form-model-item>
        </a-col>
        <a-col :span="24" :md="12">
          <a-form-model-item label="Hora">
            <a-time-picker use12-hours format="hh:mm a" v-model="form.time" placeholder="Seleccione una hora" />
          </a-form-model-item>
        </a-col>

        <a-col :span="24" :md="12">
          <a-form-model-item label="Estado">
            <a-select placeholder="Seleccione un estado" v-model="form.estado" :allowClear="true">
              <a-select-option :value="estado.value" :label="estado.label" v-for="estado in estadosArray" :key="estado.value">
                <span
                  role="color"
                  :aria-label="estado.label"
                  class="block-color"
                  :style="{
                    backgroundColor: estado.color,
                  }"
                >
                </span>
                {{ estado.label }}
              </a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
        <a-col :span="24" :md="12">
          <a-form-model-item label="Duración (minuto)">
            <a-input v-model="form.duration" suffix="minutos" />
          </a-form-model-item>
        </a-col>
        <a-col :span="24">
          <a-form-model-item label="Descripción">
            <a-textarea v-model="form.description" :rows="4" />
          </a-form-model-item>
        </a-col>
        <a-col :span="24" :md="12">
          <a-form-model-item>
            <a-switch v-model="form.sendMail" size="small" />
            <span class="ml-2">Informar por correo electrónico</span>
          </a-form-model-item>
        </a-col>
        <a-col :span="24" :md="12">
          <a-form-model-item>
            <a-switch v-model="form.sendWhatsapp" size="small" />
            <span class="ml-2">Informar por whatsapp</span>
          </a-form-model-item>
        </a-col>
        <a-col :span="24" class="d-flex justify-content-end">
          <a-button type="primary" html-type="submit"> Guardar cita </a-button>
        </a-col>
      </a-row>
    </a-form-model>
    <pre>
      {{ form }}
    </pre>
    <a-drawer
      :width="widthDrawerResponsive"
      :closable="false"
      :visible="openDrawerNewUser"
      :body-style="{ paddingBottom: '80px' }"
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
import { mapGetters } from 'vuex'
import _ from 'lodash'

export default {
  name: 'FormNewEventCalendar',
  components: {
    FormFastNewPacient,
  },
  data() {
    return {
      openDrawerNewUser: false,
      widthDrawerResponsive: window.innerWidth > 900 ? 450 : window.innerWidth - 100,
      form: {
        estado: 1,
        duration: 15,
      },
      estadosArray: [
        { value: 1, label: 'Por confirmado', color: '#F29D39' },
        { value: 2, label: 'Confirmada', color: '#469B30' },
        { value: 3, label: 'Atendida', color: '#3F79DD' },
        { value: 4, label: 'Cancelada', color: '#BB271B' },
      ],
    }
  },
  methods: {
    disabledDate(current) {
      return current && current <= this.$moment().startOf('day')
    },
    changeSelectPacient($event) {
      var objectPacient = _.find(this.patientsArray, { id: $event })
      if (!objectPacient) return
      this.form.email = objectPacient.email
      this.form.phone = objectPacient.phone
    },
    changeSelectReason($event) {
      var objectReason = _.find(this.reasonsArray, { id: $event })
      if (!objectReason) return
      this.form.duration = objectReason.time
    },
  },
  mounted() {
    window.onresize = () => {
      let width = window.innerWidth
      this.widthDrawerResponsive = width > 900 ? 700 : width - 100
    }
  },
  computed: {
    ...mapGetters({
      patientsArray: 'tables/patients/getPatients',
      insurancesArray: 'data/general/getInsurances',
      subsidiariesArray: 'data/general/getSubsidiaries',
      reasonsArray: 'data/general/getReasons',
      referredsArray: 'data/general/getReferreds',
      doctorsArray: 'tables/users/getDoctors',
    }),
  },
}
</script>

<style></style>
