<template>
  <div class="card-info-pacient-odontogram">
    <a-card :title="false" :bordered="false">
      <a-row :gutter="16" type="flex" justify="space-between">
        <!-- <a-col :span="24" :md="6" class="with-button">
          <a-form-model-item class="with-button">
            <a-date-picker
              v-model="odontogram.date"
              :disabled-date="disabledDate"
              placeholder="Seleccione una fecha"
              :showToday="false"
            />
          </a-form-model-item>
        </a-col> -->
      </a-row>
      <!-- Formulario Endodoncia -->
      <FormPacientPictures />
    </a-card>
    <!-- Archivos -->
    <div class="archivos-lista mt-5 px-4">
      <a-row :gutter="24">
        <a-col :span="24" :md="6" v-for="(file, index) in files" :key="index" class="mb-5">
          <File :title="file.title + ' ' + file.id" />
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script>
import FormPacientPictures from '~/components/form/FormPacientPictures'
import File from '~/components/sections/files/file'

export default {
  components: {
    FormPacientPictures,
    File,
  },
  data() {
    return {
      odontogram: {
        date: this.$moment(),
      },
      files: [
        {
          id: 1,
          title: 'Archivo',
        },
        {
          id: 2,
          title: 'Archivo',
        },
        {
          id: 3,
          title: 'Archivo',
        },
        {
          id: 4,
          title: 'Archivo',
        },
        {
          id: 5,
          title: 'Archivo',
        },
        {
          id: 6,
          title: 'Archivo',
        },
        {
          id: 7,
          title: 'Archivo',
        },
        {
          id: 8,
          title: 'Archivo',
        },
      ],
    }
  },
  methods: {
    disabledDate(current) {
      return current && current >= this.$moment().startOf('day').add(1, 'days')
    },
  },
}
</script>

<style></style>
