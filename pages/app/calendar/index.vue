<template>
  <div class="page--app-calendar page--default">
    <header class="page-header">
      <h1 class="page-title">Agenda de citas</h1>
    </header>
    <a-row class="mb-3" :gutter="16">
      <a-col :span="12" :md="6"> a </a-col>
      <a-col :span="12" :md="6"> a </a-col>
    </a-row>
    <FullCalendar :options="calendarOptions" />
    <!-- Modal vista de las citas -->
    <a-modal v-model="openModal" @ok="okModal" :forceRender="true">
      <template slot="title">
        <div class="title-block p-0 m-0">
          <h3 class="modal-title m-0" style="color: rgb(237, 85, 100)">
            Cita: {{ eventSelect.title }}
          </h3>
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
        <div class="event-desc flex-column">
          <h5 class="event-title m-0">Descripción de la cita</h5>
          <span>
            {{ eventSelect.description }}
          </span>
        </div>
      </div>
      <template slot="footer">
        <div class="d-flex justify-content-between modal-footer">
          <button
            type="button"
            class="ant-btn ant-btn-dangerous"
            @click="() => (openModal = false)"
          >
            <span>Cancelar</span>
          </button>
          <button
            type="button"
            class="ant-btn ant-btn-primary"
            @click="okModal"
          >
            <span>Aceptar</span>
          </button>
        </div>
      </template>
    </a-modal>
    <!-- !Modal vista de las citas -->
    <!-- Modal creacion de citas -->
    <a-modal v-model="openModalCreate" @ok="okModalCreate" :forceRender="true">
      <template slot="title">
        <div class="title-block p-0 m-0">
          <h3 class="modal-title m-0" style="color: rgb(237, 85, 100)">
            Crear cita
          </h3>
        </div>
      </template>
      <div class="d-flex flex-column"></div>
      <template slot="footer">
        <div class="d-flex justify-content-between modal-footer">
          <button
            type="button"
            class="ant-btn ant-btn-dangerous"
            @click="() => (openModalCreate = false)"
          >
            <span>Cancelar</span>
          </button>
          <button
            type="button"
            class="ant-btn ant-btn-primary"
            @click="okModalCreate"
          >
            <span>Crear cita</span>
          </button>
        </div>
      </template>
    </a-modal>
  </div>
</template>

<script>
import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'
import timegridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import esLocale from '@fullcalendar/core/locales/es'

export default {
  layout: 'user',
  components: {
    FullCalendar,
  },
  data() {
    return {
      openModal: false,
      openModalCreate: false,
      title: 'Agenda de citas',
      calendarOptions: {
        plugins: [dayGridPlugin, interactionPlugin, timegridPlugin],
        headerToolbar: {
          center: 'title',
          start: 'prev,next,today,myCustomButton',
          end: 'dayGridMonth,timeGridWeek,dayGridDay',
        },
        dateClick: this.handleDateClick,
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
        events: [
          {
            title: 'Gabriel Lozada',
            date: '2020-12-01T14:30:00',
            start: '2020-12-01T14:30:00',
            end: '2020-12-01T16:30:00',
            backgroundColor: '#ED5564',
            classNames: 'event-orange',
            description:
              'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Libero iusto, illum, ea dolores veritatis numquam, deserunt eveniet ducimus quod ad vero at natus.',
          },
        ],
      },
      eventSelect: { title: '', description: '', start: '' },
    }
  },
  head() {
    return {
      title: this.title,
      meta: [],
    }
  },
  methods: {
    handleDateClick: function (arg) {
      let today = this.$moment().format('YYYY-MM-DD HH:mm:ss')
      let date = this.$moment(arg.dateStr).format('YYYY-MM-DD HH:mm:ss')
      console.log(date, today)
      if (today > date) return
      this.openModalCreate = true
      console.log(date)
    },
    createCite() {
      alert('clicked the custom button!')
    },
    showModalEvent(info) {
      console.log(info)
      console.log(this.$moment(info.event.start).format('YYYY-MM-DD'))
      this.eventSelect.title = info.event.title
      this.eventSelect.description = info.event.extendedProps.description
      this.eventSelect.start = this.$moment(info.event.start).format(
        'ddd DD [de] MM [del] YYYY [a las] hh:mm a'
      )
      this.openModal = true
    },
    okModal(e) {
      console.log(e)
      this.openModal = false
    },
    okModalCreate(e) {
      console.log(e)
      this.openModalCreate = false
    },
  },
}
</script>

<style></style>
