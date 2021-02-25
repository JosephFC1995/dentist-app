<template>
  <div class="form-general">
    <a-form-model :model="form" ref="form" :rules="rules">
      <a-row :gutter="16">
        <!-- Título -->
        <a-col :span="24" :md="24">
          <a-form-model-item label="Título" class="with-button" prop="title">
            <a-input v-model="form.title" placeholder="Título" :disabled="loading" />
          </a-form-model-item>
        </a-col>
        <!-- Subida -->
        <a-col :span="24" :md="24">
          <a-form-model-item prop="informs" label="Archivo">
            <a-upload-dragger
              :disabled="loading"
              :action="apiHost + '/file/upload'"
              :headers="headers"
              :multiple="false"
              :file-list="form.informs"
              accept=".pdf,.doc,.docx,.xls,.xls"
              @change="changeUpload"
              :beforeUpload="beforeUpload"
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

        <a-col :span="24" class="d-flex justify-content-end">
          <a-button type="primary" html-type="submit" :loading="loading" @click="submit">
            <span> Guardar informe </span>
          </a-button>
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
      form: {
        informs: [],
      },
      rules: {
        title: [
          {
            required: true,
            message: 'Por favor agregar el titulo del informe',
            trigger: 'blur',
          },
        ],
        informs: [
          {
            required: true,
            message: 'Por favor agregar un archivo',
            trigger: ['blur', 'trigger'],
          },
        ],
      },
      apiHost: process.env.apiHost,
      headers: {
        Authorization: this.$auth.strategy.token.get(),
      },
    }
  },
  methods: {
    submit() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          this.changeLoading(true)
          let tempForm = {
            title: this.form.title,
            id_patient: this.$route.params.id,
            id_file: this.form.informs[0].response.file.id,
          }
          let response = false
          response = await this.$axios.$post(`/informs`, tempForm).catch((errors) => {
            this.changeLoading(false)
          })
          if (response.success) this.$message.success(response.message)
          this.$refs.form.resetFields()
          await this.getInformsPatient({ id_patient: this.$route.params.id })
          this.changeLoading(false)
        }
      })
    },
    beforeUpload(info, fileList) {
      if (this.form.informs.length > 0) {
        setTimeout(() => {
          this.form.informs.splice(-1, 1)
        }, 2000)
        this.$message.error(`Solo se puede cargar 1 archivo para la subida del informe.`)
        return false
      }
      return
    },
    changeUpload(info) {
      const status = info.file.status
      let fileList = [...info.fileList]

      fileList = fileList.map((file) => {
        if (file.response) {
          file.url = file.response.file.url
        }
        return file
      })

      this.form.informs = fileList

      if (status !== 'uploading') {
        // console.log(info.file, info.fileList)
      }
      if (status === 'done') {
        // this.$message.success(`${info.file.name} file uploaded successfully.`)
      } else if (status === 'error') {
        this.$message.error(`${info.file.name} file upload failed.`)
      }
    },
    ...mapActions({
      changeLoading: 'data/informs/CHANGE_LOADING',
      getInformsPatient: 'data/informs/GET_INFORMS_BY_PATIENT',
    }),
  },
  computed: {
    ...mapGetters({
      loading: 'data/informs/getLoading',
    }),
  },
  watch: {},
}
</script>

<style></style>
