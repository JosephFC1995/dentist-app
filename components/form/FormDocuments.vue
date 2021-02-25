<template>
  <div>
    <div class="form-general" v-if="form.name || newData">
      <a-form-model :model="form" ref="form" :rules="rules">
        <a-row :gutter="16">
          <!-- Nombre -->
          <a-col :span="24" :md="24">
            <a-form-model-item label="Nombre" prop="name">
              <a-input v-model="form.name" :disabled="loading" placeholder="Nombre" />
            </a-form-model-item>
          </a-col>
          <!-- Subida -->
          <a-col :span="24" :md="24">
            <a-form-model-item prop="file" label="Archivo">
              <a-upload-dragger
                :disabled="loading"
                :action="apiHost + '/file/upload'"
                :headers="headers"
                :multiple="false"
                :file-list="form.file"
                accept=".doc,.docx"
                @change="changeUpload"
                :beforeUpload="beforeUpload"
              >
                <p class="ant-upload-drag-icon">
                  <i class="uil uil-cloud-upload"></i>
                </p>
                <p class="ant-upload-text">Haga clic o arrastre el archivo a esta área para cargar</p>
                <p class="ant-upload-hint">
                  Compatibilidad con una carga única o masiva. Prohibir estrictamente cargando datos de la empresa u otros
                  archivos de banda
                </p>
              </a-upload-dragger>
            </a-form-model-item>
          </a-col>
          <a-col :span="24" class="d-flex justify-content-between">
            <a-button type="primary" html-type="submit" class="w-100" @click="submit" :loading="loading">
              {{ newData ? 'Agregar documento' : 'Editar documento' }}
            </a-button>
          </a-col>
        </a-row>
      </a-form-model>
    </div>
    <Loading v-else width="350px" />
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  props: {
    form: {
      type: Object,
      default: {
        file: [],
      },
    },
    newData: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      loading: false,
      rules: {
        name: [
          {
            required: true,
            message: 'Por favor agregar el titulo del informe',
            trigger: 'blur',
          },
        ],
        file: [
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
          this.loading = true
          let response = false
          if (!this.newData) {
            let tempForm = this.form
            tempForm.id_file = this.form.file[0].response.file.id
            response = await this.$axios.$put(`/documents/${this.form.id}`, this.form).catch((errors) => {
              this.loading = false
            })
          } else {
            let tempForm = {
              name: this.form.name,
              id_patient: this.$route.params.id,
              id_file: this.form.file[0].response.file.id,
            }
            response = await this.$axios.$post(`/documents`, tempForm).catch((errors) => {
              this.loading = false
            })
          }
          this.loading = false
          if (response.success) this.$message.success(response.message)
          this.$refs.form.resetFields()
          this.$store.dispatch('tables/documents/GET_DOCUMENTS_TABLE')
          this.closeDrawer()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    closeDrawer() {
      this.$emit('close')
    },
    beforeUpload(info, fileList) {
      if (this.form.file.length > 0) {
        setTimeout(() => {
          this.form.file.splice(-1, 1)
        }, 2000)
        this.$message.error(`Solo se puede cargar 1 archivo para la subida del informe.`)
        return false
      }
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

      this.form.file = fileList

      if (status !== 'uploading') {
        // console.log(info.file, info.fileList)
      }
      if (status === 'done') {
        // this.$message.success(`${info.file.name} file uploaded successfully.`)
      } else if (status === 'error') {
        this.$message.error(`${info.file.name} file upload failed.`)
      }
    },
  },
  computed: {},
}
</script>

<style></style>
