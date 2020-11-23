<template>
  <div class="form-general">
    <a-form-model :model="form">
      <h6 class="mt-0 mb-1" :style="{ color: '#B9BABA' }">
        Datos del paciente
      </h6>
      <a-row :gutter="16">
        <a-col :span="24">
          <a-form-model-item label="Paciente" class="with-button">
            <a-select
              placeholder="Seleccione un paciente"
              :options="pacientesArray"
              v-model="form.patient"
              :allowClear="true"
            >
            </a-select>
            <a-button type="primary">
              <i class="uil uil-plus-circle"></i>
              Agregar nuevo paciente
            </a-button>
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="Correo">
            <a-input v-model="form.email" placeholder="Correo" />
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="Teléfono">
            <a-input v-model="form.phone" placeholder="Teléfono" />
          </a-form-model-item>
        </a-col>
        <a-col :span="24">
          <h6 class="mt-0 mb-1" :style="{ color: '#B9BABA' }">
            Datos generales
          </h6>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="Sucursal">
            <a-select
              placeholder="Seleccione una sucursal"
              v-model="form.branchOffice"
              :options="sucursalesArray"
              :allowClear="true"
            >
            </a-select>
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="Doctor">
            <a-select
              placeholder="Seleccione un doctor"
              v-model="form.doctor"
              :options="doctoresArray"
              :allowClear="true"
            >
            </a-select>
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="Motivo">
            <a-select
              placeholder="Seleccione un motivo"
              v-model="form.motive"
              :options="motivosArray"
              :allowClear="true"
            >
            </a-select>
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="Canal">
            <a-select
              placeholder="Seleccione un canal"
              v-model="form.canale"
              :options="canalesArray"
              :allowClear="true"
            >
            </a-select>
          </a-form-model-item>
        </a-col>
        <a-col :span="24">
          <h6 class="mt-0 mb-1" :style="{ color: '#B9BABA' }">Fecha y hora</h6>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="Fecha">
            <a-date-picker
              v-model="form.date"
              :disabled-date="disabledDate"
              placeholder="Seleccione una fecha"
            />
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="Hora">
            <a-time-picker
              use12-hours
              format="hh:mm a"
              v-model="form.time"
              placeholder="Seleccione una hora"
            />
          </a-form-model-item>
        </a-col>

        <a-col :span="12">
          <a-form-model-item label="Estado">
            <a-select
              placeholder="Seleccione un estado"
              v-model="form.estado"
              :allowClear="true"
            >
              <a-select-option
                :value="estado.value"
                :label="estado.label"
                v-for="estado in estadosArray"
                :key="estado.value"
              >
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
        <a-col :span="12">
          <a-form-model-item label="Duración (minuto)">
            <a-input v-model="form.duration" suffix="minutos" />
          </a-form-model-item>
        </a-col>
        <a-col :span="24">
          <a-form-model-item label="Observaciones">
            <a-textarea v-model="form.observation" :rows="4" />
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item>
            <a-switch v-model="form.sendMail" size="small" />
            <span class="ml-2">Informar por correo electrónico</span>
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item>
            <a-switch v-model="form.sendWhatsapp" size="small" />
            <span class="ml-2">Informar por whatsapp</span>
          </a-form-model-item>
        </a-col>
        <a-col :span="24">
          <a-button type="primary" html-type="submit"> Guardar cita </a-button>
        </a-col>
      </a-row>
    </a-form-model>
  </div>
</template>

<script>
export default {
  name: 'FormNewEventCalendar',
  data() {
    return {
      form: {
        estado: 1,
        duration: 15,
      },
      pacientesArray: [
        { value: 1, label: 'Pepe' },
        { value: 2, label: 'Martin' },
      ],
      sucursalesArray: [
        { value: 1, label: 'Los Olivos' },
        { value: 2, label: 'Jesus María' },
      ],
      doctoresArray: [
        { value: 1, label: 'Popeye' },
        { value: 2, label: 'Sonic' },
      ],
      motivosArray: [
        { value: 1, label: 'Motivo a' },
        { value: 2, label: 'Motivo b' },
      ],
      canalesArray: [
        { value: 1, label: 'Redes sociales' },
        { value: 2, label: 'Televisión' },
      ],
      estadosArray: [
        { value: 1, label: 'Por confirmado', color: '#F29D39' },
        { value: 2, label: 'Confirmada', color: '#469B30' },
        { value: 3, label: 'Atendida', color: '#3F79DD' },
        { value: 4, label: 'Cancelada', color: '#BB271B' },
      ],
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
  },
}
</script>

<style></style>
