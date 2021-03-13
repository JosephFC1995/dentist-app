<template>
  <div class="page--app-calendar page--default">
    <header class="page-header">
      <h1 class="page-title">Agenda de citas</h1>
    </header>
    <a-row class="mb-3" :gutter="16">
      <a-col :span="12" :md="6">
        <a-select placeholder="Seleccione una sucursal" :options="sucursalesArray" :allowClear="true"> </a-select>
      </a-col>
      <a-col :span="12" :md="6">
        <a-select placeholder="Seleccione un doctor" :options="doctoresArray" :allowClear="true"> </a-select>
      </a-col>
    </a-row>
    <a-spin tip="Cargando citas..." :spinning="loadingAppoinments">
      <a-icon slot="indicator" type="loading" style="font-size: 24px" spin />
      <FullCalendar :options="calendarOptions" />
    </a-spin>

    <!-- Modal vista de las citas -->
    <a-modal v-model="openModal" @ok="okModal" :forceRender="true" :destroyOnClose="true">
      <template slot="title">
        <div class="title-block p-0 m-0">
          <h3 class="modal-title m-0" style="color: rgb(237, 85, 100)">Cita: {{ eventSelect.title }}</h3>
        </div>
      </template>
      <div class="d-flex flex-column">
        <div class="event-pacient flex-column mb-4">
          <h5 class="event-title m-0">Paciente</h5>
          <span>
            {{ eventSelect.title }}
          </span>
        </div>
        <div class="event-time flex-column mb-4">
          <h5 class="event-title m-0">Hora de la cita</h5>
          <span>
            {{ eventSelect.start }}
          </span>
        </div>
        <div class="event-reason flex-column mb-4" v-if="eventSelect.appointment">
          <h5 class="event-title m-0">Razón de la cita</h5>
          <span>
            {{ eventSelect.appointment.reason.name }}
          </span>
        </div>
        <div class="event-desc flex-column mb-4">
          <h5 class="event-title m-0">Descripción de la cita</h5>
          <span>
            {{ eventSelect.description }}
          </span>
        </div>
        <div class="event-desc flex-column mb-4" v-if="eventSelect.appointment">
          <h5 class="event-title m-0">Doctor</h5>
          <span>
            {{
              eventSelect.appointment.doctor.last_name
                ? eventSelect.appointment.doctor.last_name
                : '' + ' ' + eventSelect.appointment.doctor.name
            }}
          </span>
        </div>
        <div class="event-accept">
          <a-button type="dashed" class="w-100" @click="goToPatient(eventSelect)" :loading="goPatient">
            <span>Atender cita</span>
          </a-button>
        </div>
      </div>
      <template slot="footer">
        <div class="d-flex justify-content-between modal-footer">
          <a-button type="danger" @click="() => (openModal = false)">
            <span>Cancelar</span>
          </a-button>
          <button type="button" class="ant-btn ant-btn-primary" @click="okModal">
            <span>Aceptar</span>
          </button>
        </div>
      </template>
    </a-modal>
    <!-- !Modal vista de las citas -->
    <!-- !Drawer nueva cita -->
    <a-drawer
      :width="widthDrawerResponsive"
      :visible="openDrawerNewEvent"
      :body-style="{ paddingBottom: '20px' }"
      @close="closeDrawerCreate"
      :destroyOnClose="true"
    >
      <template slot="title">
        <div class="title-block p-0 m-0">
          <h4 class="modal-title m-0" style="color: #336cfb">Crear nueva cita</h4>
        </div>
      </template>
      <FormNewEventCalendar @close-refresh="closeDrawerCreateRefresh" :selectDate="dateSelectFromCalendar" />
    </a-drawer>
  </div>
</template>

<script>
import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'
import timegridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import esLocale from '@fullcalendar/core/locales/es'
import { mapGetters, mapActions } from 'vuex'
import _ from 'lodash'

// components
import FormNewEventCalendar from '~/components/form/FormNewEventCalendar'

export default {
  layout: 'user',
  middleware: 'auth',
  async fetch({ store, app }) {
    store.dispatch('tables/patients/GET_PATIENTS_TABLE')
    store.dispatch('tables/users/GET_USERS_BY_ROLE_DOCTOR')
    store.dispatch('data/general/GET_GENDERS')
    store.dispatch('data/general/GET_CIVIL_STATUS')
    store.dispatch('data/general/GET_OCUPATIONS')
    store.dispatch('data/general/GET_SUBSIDIARIES')
    store.dispatch('data/general/GET_INSURANCES')
    store.dispatch('data/general/GET_REFERREDS')
    store.dispatch('data/general/GET_NACIONALITIES')
    store.dispatch('data/general/GET_LANGUAJES')
    store.dispatch('data/general/GET_TYPE_DOCUMENTS')
    store.dispatch('data/general/GET_REASONS')
    store.dispatch('data/appointment/GET_APPOINTMENT_STATUS')
    this.loading = false
  },
  components: {
    FullCalendar,
    FormNewEventCalendar,
  },
  data() {
    return {
      loading: false,
      date_start: null,
      date_end: null,
      dateSelectFromCalendar: null,
      openDrawerNewEvent: false,
      openModal: false,
      goPatient: false,
      openModalCreate: false,
      widthDrawerResponsive: window.innerWidth > 900 ? 700 : window.innerWidth - 100,
      title: 'Agenda de citas',
      sucursalesArray: [
        { value: 1, label: 'Los Olivos' },
        { value: 2, label: 'Jesus María' },
      ],
      doctoresArray: [
        { value: 1, label: 'Popeye' },
        { value: 2, label: 'Sonic' },
      ],
      calendarOptions: {
        timeZone: 'UTC',
        plugins: [dayGridPlugin, interactionPlugin, timegridPlugin],
        headerToolbar: {
          center: 'title',
          start: 'prev,next,today,myCustomButton',
          end: 'dayGridMonth,timeGridWeek,dayGridDay',
        },
        editable: true,
        eventDrop: this.dragEvent,
        eventResize: this.resizeEvent,
        dateClick: this.dateClick,
        datesSet: this.handleMonthChange,
        views: {
          timeGridWeek: {
            type: 'timeGrid',
            duration: { days: 4 },
            buttonText: 'Semana',
            slotLabelFormat: {
              hour: 'numeric',
              minute: '2-digit',
              omitZeroMinute: true,
              meridiem: 'short',
            },
          },
        },
        initialView: 'dayGridMonth',
        eventClick: this.showModalEvent,
        customButtons: {
          myCustomButton: {
            text: 'Agendar cita',
            click: this.createCite,
          },
        },
        locale: esLocale,
        eventTimeFormat: {
          hour: 'numeric',
          minute: '2-digit',
          meridiem: 'narrow',
        },
        events: [],
      },
      eventSelect: { title: '', description: '', start: '', appointment: null },
    }
  },
  head() {
    return {
      title: this.title,
      meta: [],
    }
  },
  methods: {
    dateClick: function (arg) {
      let today = this.$moment().format('YYYY-MM-DD HH:mm:ss')
      let date = this.$moment(arg.dateStr).format('YYYY-MM-DD HH:mm:ss')
      if (today > date) return
      this.dateSelectFromCalendar = date
      this.openDrawerNewEvent = true
    },
    createCite() {
      this.openDrawerNewEvent = true
      this.dateSelectFromCalendar = null
    },
    handleMonthChange(e) {
      let date_s = this.$moment(e.startStr).format('YYYY-MM-DD')
      let date_e = this.$moment(e.endStr).format('YYYY-MM-DD')
      if (this.date_start != date_s && this.date_end != date_e) {
        this.changeLoading(true)
        var params = {
          date_start: date_s,
          date_end: date_e,
        }
        this.getAppointmens(params)
        this.date_start = date_s
        this.date_end = date_e
      }

      // this.changeLoading(true)
    },
    async dragEvent(e) {
      this.changeLoading(true)
      let newDateEvent = this.$moment.utc(e.event.start).format('YYYY-MM-DD')
      let newtimeEvent = this.$moment.utc(e.event.start).format('HH:mm:ss')
      let appointment = e.event.extendedProps.appointment
      appointment.date_start = newDateEvent
      appointment.time_start = newtimeEvent
      let _self = this
      _self.loading = true
      var response = await _self.$axios.$put(`/appointment/${appointment.id}`, appointment).catch((errors) => {
        _self.loading = false
      })
      if (response) {
        this.calendarRefresh()
      }
    },
    async resizeEvent(e) {
      this.changeLoading(true)
      let newStartDateEventMoment = this.$moment.utc(e.event.start)
      let newEndDateEventMoment = this.$moment.utc(e.event.end)
      let duration = newEndDateEventMoment.diff(newStartDateEventMoment, 'minutes')
      let newDateEvent = newStartDateEventMoment.format('YYYY-MM-DD')
      let newtimeEvent = newStartDateEventMoment.format('HH:mm:ss')
      let appointment = e.event.extendedProps.appointment
      appointment.date_start = newDateEvent
      appointment.time_start = newtimeEvent
      appointment.duration = duration
      let _self = this
      _self.loading = true
      var response = await _self.$axios.$put(`/appointment/${appointment.id}`, appointment).catch((errors) => {
        _self.loading = false
      })
      if (response) {
        this.calendarRefresh()
      }
    },
    showModalEvent(info) {
      this.eventSelect.title = info.event.title
      this.eventSelect.description = info.event.extendedProps.description
      this.eventSelect.appointment = info.event.extendedProps.appointment
      this.eventSelect.start = this.$moment.utc(info.event.start).format('ddd DD [de] MMM [del] YYYY [a las] hh:mm a')
      this.openModal = true
    },
    goToPatient($event) {
      this.goPatient = true
      this.$router.push({
        name: 'app-patients-id',
        params: { id: $event.appointment.id_patient },
      })
    },
    okModal(e) {
      this.openModal = false
    },
    calendarRefresh() {
      this.changeLoading(true)
      var params = {
        date_start: this.date_start,
        date_end: this.date_end,
      }
      this.getAppointmens(params)
    },
    closeDrawerCreateRefresh(e) {
      this.changeLoading(true)
      var params = {
        date_start: this.date_start,
        date_end: this.date_end,
      }
      this.getAppointmens(params)
      this.openDrawerNewEvent = false
    },
    closeDrawerCreate(e) {
      this.openDrawerNewEvent = false
    },
    okDrawerCreate(e) {
      this.openDrawerNewEvent = false
    },
    ...mapActions({
      changeLoading: 'data/appointment/CHANGE_LOADING',
      getAppointmens: 'data/appointment/GET_APPOINTMENTS',
    }),
  },
  watch: {
    appoinments(newValue, oldValue) {
      this.calendarOptions.events = _.cloneDeep(newValue)
    },
  },
  computed: {
    ...mapGetters({
      appoinments: 'data/appointment/getAppointments',
      loadingAppoinments: 'data/appointment/getLoading',
    }),
  },
  mounted() {
    window.onresize = () => {
      let width = window.innerWidth
      this.widthDrawerResponsive = width > 900 ? 700 : width - 100
    }
  },
}
</script>

<style></style>
