<template>
  <div class="form-general">
    <a-form-model :model="form" ref="newPacient">
      <a-row :gutter="16">
        <!-- Título -->
        <!-- <a-col :span="24" :md="24">
          <a-form-model-item label="Título" class="with-button">
            <a-input v-model="form.size" placeholder="Título" :disabled="loading" :maxLength="3" />
          </a-form-model-item>
        </a-col> -->
        <!-- Subida -->
        <a-col :span="24" :md="24">
          <a-form-model-item>
            <a-upload-dragger
              :disabled="loading"
              :action="apiHost + '/file/upload'"
              :headers="headers"
              :multiple="false"
              :showUploadList="false"
              @change="changeUpload"
              accept=".png,.jpg,.jpeg"
            >
              <p class="ant-upload-drag-icon">
                <i class="uil uil-cloud-upload"></i>
              </p>
              <p class="ant-upload-text">Haga clic o arrastre el archivo a esta área para cargar</p>
              <p class="ant-upload-hint">
                Compatibilidad con una carga única o masiva. Prohibir estrictamente cargando datos de la empresa u otros archivos
                de banda
              </p>
            </a-upload-dragger>
          </a-form-model-item>
        </a-col>
      </a-row>
    </a-form-model>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'

export default {
  data() {
    return {
      form: {},
      apiHost: process.env.apiHost,
      headers: {
        Authorization: this.$auth.strategy.token.get(),
      },
    }
  },
  methods: {
    async changeUpload(info) {
      const status = info.file.status
      this.changeLoading(true)
      if (status !== 'uploading') {
        // console.log(info.file, info.fileList)
      }
      if (status === 'done') {
        await this.uploadFilePicture(info.file)
        // this.$message.success(`${info.file.name} file uploaded successfully.`)
      } else if (status === 'error') {
        this.changeLoading(false)
        this.$message.error(`${info.file.name} file upload failed.`)
      }
    },
    async uploadFilePicture(file) {
      let tempForm = {
        id_patient: this.$route.params.id,
        id_file: file.response.file.id,
      }
      let response = false
      response = await this.$axios.$post(`/pictures`, tempForm).catch((errors) => {
        this.changeLoading(false)
      })
      if (response.success) this.$message.success(response.message)
      await this.getPicturesPatient({ id_patient: this.$route.params.id })
      this.changeLoading(false)
    },
    ...mapActions({
      changeLoading: 'data/pictures/CHANGE_LOADING',
      getPicturesPatient: 'data/pictures/GET_PICTURES_BY_PATIENT',
    }),
  },

  computed: {
    ...mapGetters({
      loading: 'data/pictures/getLoading',
    }),
  },
  watch: {},
}
</script>

<style></style>
