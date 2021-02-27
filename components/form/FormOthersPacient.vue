<template>
  <div class="form-general">
    <a-form-model :model="form" ref="form">
      <a-row :gutter="16">
        <!-- Titulo -->
        <a-col :span="24" :md="24">
          <h6 class="mt-0 mb-1" :style="{ color: '#B9BABA' }">Otros datos</h6>
        </a-col>
        <!-- Peso -->
        <a-col :span="24" :md="8">
          <a-form-model-item label="Peso" class="with-button">
            <a-input v-model="form.weight" placeholder="Peso" :disabled="loading" :maxLength="3" v-mask="'###'" />
            <span class="ml-3" :style="{ fontSize: '12px', color: '#B9BABA' }"> Kilográmos </span>
          </a-form-model-item>
        </a-col>
        <!-- Talla -->
        <a-col :span="24" :md="8">
          <a-form-model-item label="Talla" class="with-button">
            <a-input v-model="form.size" placeholder="Talla" :disabled="loading" :maxLength="3" v-mask="'###'" />
            <span class="ml-3" :style="{ fontSize: '12px', color: '#B9BABA' }"> Centrímetros </span>
          </a-form-model-item>
        </a-col>
        <!-- IMC -->
        <a-col :span="24" :md="8">
          <a-form-model-item label="IMC" class="with-button">
            <a-input v-model="form.imc" placeholder="IMC" :disabled="true" v-mask="'###'" />
          </a-form-model-item>
        </a-col>
        <!-- Exámenes clínicos -->
        <a-col :span="24" :md="24">
          <a-form-model-item label="Exámenes clínicos">
            <a-upload-dragger
              :disabled="loading"
              :action="apiHost + '/file/upload'"
              :multiple="true"
              :headers="headers"
              :file-list="form.clinical_exams"
              list-type="picture-card"
              @change="changeUpload($event, 'clinical_exams')"
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
        <!-- Exámenes clínicos Estomatolódicos -->
        <a-col :span="24" :md="24">
          <a-form-model-item label="Exámenes clínicos Estomatolódicos">
            <a-upload-dragger
              :disabled="loading"
              :action="apiHost + '/file/upload'"
              :multiple="true"
              :headers="headers"
              :file-list="form.stomatological_clinical_exams"
              list-type="picture-card"
              @change="changeUpload($event, 'stomatological_clinical_exams')"
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

        <!-- Exámenes auxiliares -->
        <a-col :span="24" :md="24">
          <a-form-model-item label="Exámenes auxiliares">
            <a-upload-dragger
              :disabled="loading"
              :action="apiHost + '/file/upload'"
              :multiple="true"
              :headers="headers"
              :file-list="form.auxiliary_exams"
              list-type="picture-card"
              @change="changeUpload($event, 'auxiliary_exams')"
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
          <a-button type="primary" html-type="submit" @click="submitLogin" :loading="loading"> Guardar </a-button>
        </a-col>
      </a-row>
    </a-form-model>
  </div>
</template>

<script>
import _ from 'lodash'
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'

export default {
  data() {
    return {
      apiHost: process.env.apiHost,
      headers: {
        Authorization: this.$auth.strategy.token.get(),
      },
      form: {
        weight: 0,
        size: 0,
        imc: 0,
        clinical_exams: [],
        stomatological_clinical_exams: [],
        auxiliary_exams: [],
      },
    }
  },
  methods: {
    changeUpload(info, hook) {
      const status = info.file.status
      let fileList = [...info.fileList]
      fileList = fileList.map((file) => {
        if (file.response) {
          file.url = file.response.file.url
        }
        return file
      })

      this.form[hook] = fileList

      if (status === 'done') {
        this.$message.success(`${info.file.name} ha sudo subido correctamente.`)
        let fileList = [...info.fileList]
        fileList = fileList.map((file) => {
          if (file.response) {
            file.url = file.response.file.url
          }
          return file
        })
      }
      // const status = info.file.status
      // if (status === 'removed') {
      //   let fileList = [...info.fileList]
      //   fileList = fileList.map((file) => {
      //     if (file.response) {
      //       file.url = file.response.file.url
      //     }
      //     return file
      //   })

      //   this.form[hook] = fileList
      // }

      // if (status !== 'uploading') {
      //   // console.log(info.file, info.fileList)
      // }
      // if (status === 'done') {
      //   this.$message.success(`${info.file.name} ha sudo subido correctamente.`)
      //   let fileList = [...info.fileList]
      //   fileList = fileList.map((file) => {
      //     if (file.response) {
      //       file.url = file.response.file.url
      //     }
      //     return file
      //   })

      //   this.form[hook] = fileList
      // } else if (status === 'error') {
      //   this.$message.error(`${info.file.name} hemos tenido un error para subir tu archivo.`)
      // }
    },
    updateListFilt(list, hook) {
      let fileList = [...list]
      fileList = fileList.map((file) => {
        if (file.response) {
          file.url = file.response.file.url
        }
        return file
      })

      this.form[hook] = fileList
    },
    submitLogin() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          let _self = this
          this.changeLoading(true)
          let tempForm = this.form
          tempForm.id_patient = this.$route.params.id
          let response = false
          response = await _self.$axios.$post(`/others`, tempForm).catch((errors) => {
            this.changeLoading(false)
          })
          if (response.success) this.$message.success(response.message)
          this.changeLoading(false)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    async getOtherPatient() {
      this.changeLoading(true)
      let tempForm = await this.getOther({ id_patient: this.$route.params.id })
      this.form = tempForm
        ? tempForm
        : {
            clinical_exams: [],
            stomatological_clinical_exams: [],
            auxiliary_exams: [],
          }
      // this.updateListFilt(this.form.clinical_exams, 'clinical_exams')
      // this.updateListFilt(this.form.stomatological_clinical_exams, 'stomatological_clinical_exams')
      // this.updateListFilt(this.form.auxiliary_exams, 'auxiliary_exams')
      this.changeLoading(false)
    },
    ...mapActions({
      changeLoading: 'data/others/CHANGE_LOADING',
      getOther: 'data/others/GET_ANAMNESIS_DISEASE_BY_PATIENT',
    }),
  },
  computed: {
    ...mapGetters({
      loading: 'data/others/getLoading',
    }),
  },
  watch: {
    'form.weight'(newValue, oldValue) {
      this.form.imc = 0
      let calc = (newValue / (this.form.size / 100)) * 2
      this.form.imc = isFinite(calc) ? calc.toFixed(2) : 0
    },
    'form.size'(newValue, oldValue) {
      this.form.imc = 0
      let calc = (this.form.weight / (newValue / 100)) * 2
      this.form.imc = isFinite(calc) ? calc.toFixed(2) : 0
    },
  },
  async mounted() {
    this.changeLoading(true)
    await this.getOtherPatient()
  },
}
</script>

<style></style>
