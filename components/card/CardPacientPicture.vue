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
    <a-divider :style="{ color: '#B9BABA', fontWeight: 600, fontSize: '14px' }" dashed>Imágenes</a-divider>
    <!-- Archivos -->
    <a-spin :spinning="loading">
      <a-icon slot="indicator" type="loading" style="font-size: 24px" spin />
      <div class="archivos-lista mt-5 px-4" v-if="files.length > 0">
        <a-row :gutter="24">
          <a-col :span="24" :md="6" v-for="(file, index) in files" :key="index" class="mb-5">
            <File :file="file.file" :id="file.id" />
          </a-col>
        </a-row>
      </div>
      <a-empty description="Este paciente no tiene imágenes agregadas" v-else />
    </a-spin>
  </div>
</template>

<script>
import FormPacientPictures from '~/components/form/FormPacientPictures'
import File from '~/components/sections/files/file'
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'

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
      // files: [],
    }
  },
  methods: {
    async getPicturesByPatient() {
      this.changeLoading(true)
      await this.getPicturesPatient({ id_patient: this.$route.params.id })
      // this.files = tempPictures ? tempPictures : []
      // this.changeLoading(false)
    },
    ...mapActions({
      changeLoading: 'data/pictures/CHANGE_LOADING',
      getPicturesPatient: 'data/pictures/GET_PICTURES_BY_PATIENT',
    }),
  },
  computed: {
    ...mapGetters({
      loading: 'data/pictures/getLoading',
      files: 'data/pictures/picturesSelected',
    }),
  },
  async mounted() {
    this.changeLoading(true)
    await this.getPicturesByPatient()
  },
}
</script>

<style></style>
