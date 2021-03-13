<template>
  <div class="form-general">
    <a-form-model :model="form" ref="newPacient">
      <!-- <h6 class="mt-0 mb-1" :style="{ color: '#000' }">Seleccione el diente, grupo o área que se le realizo el tratamiento</h6> -->
      <a-row :gutter="16">
        <a-col :span="24" :md="24">
          <div class="section-odontogram px-5 mt-4 mb-5">
            <a-card :title="false" :bordered="false" class="ant-card-bordered with-shadow">
              <h6 class="my-3 mx-3 text-center">Aqui ya se el futuro gráfico tratamiento.</h6>
            </a-card>
          </div>
        </a-col>

        <!-- <a-col :span="24" :md="24">
          <a-form-model-item label="Seleccione el servicio que se requiere para el diente" class="with-button">
            <a-select
              placeholder="Seleccione el servicio"
              :options="servicioArray"
              v-model="form.typeDocument"
              :allowClear="true"
              :disabled="loading"
            >
            </a-select>
            <a-button type="primary" :disabled="loading">
              <i class="uil uil-plus-circle"></i>
            </a-button>
          </a-form-model-item>
        </a-col>

        <a-col :span="24" :md="24" class="d-flex justify-content-between">
          <a-button type="primary" html-type="submit" @click="saveNewPacient" :loading="loading">
            {{ loading ? 'Creando servicio' : 'Crear servicio' }}
          </a-button>
        </a-col> -->
      </a-row>
    </a-form-model>
    <!-- <a-divider dashed>
      <span :style="{ color: '#B9BABA', fontWeight: 600, fontSize: '14px' }"> Servicios activos </span>
    </a-divider>
    <TableServicesActivesTreatment /> -->
  </div>
</template>

<script>
import TableServicesActivesTreatment from '~/components/table/TableServicesActivesTreatment'

export default {
  components: {
    TableServicesActivesTreatment,
  },
  data() {
    return {
      loading: false,
      imageUrl: '',
      loadingAvatar: false,
      form: {},
      servicioArray: [
        { value: 1, label: 'Extracción de dientes' },
        { value: 2, label: 'Limpieza' },
      ],
    }
  },
  methods: {
    saveNewPacient() {
      this.loading = true
      setTimeout(() => {
        this.loading = false
      }, 3000)
    },
    disabledDate(current) {
      return current && current >= this.$moment().startOf('day')
    },
  },
}
</script>

<style></style>
