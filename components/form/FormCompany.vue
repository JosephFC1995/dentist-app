<template>
  <div>
    <div class="form-general">
      <a-form-model :model="form" ref="company" :rules="rules">
        <a-row :gutter="16">
          <!-- Logo -->
          <a-col :span="24" :md="24">
            <a-form-model-item label="Logo">
              <a-upload
                name="file"
                list-type="picture-card"
                class="avatar-uploader"
                :show-upload-list="false"
                :action="apiHost + '/file/upload'"
                :before-upload="beforeUpload"
                @change="changeUpload"
                :disabled="loading"
                :headers="headers"
                :data="{ key: 'avatar' }"
              >
                <img v-if="form.avatar" :src="form.avatar.path" alt="avatar" />
                <div v-else>
                  <a-icon :type="loadingFile ? 'loading' : 'plus'" />
                  <div class="ant-upload-text">Upload</div>
                </div>
              </a-upload>
            </a-form-model-item>
          </a-col>

          <!-- Logo -->
          <a-col :span="24" :md="24">
            <a-form-model-item label="Imagen de portada">
              <a-upload
                name="file"
                list-type="picture-card"
                class="avatar-uploader"
                :show-upload-list="false"
                :action="apiHost + '/file/upload'"
                :before-upload="beforeUpload"
                @change="changeUpload"
                :disabled="loading"
                :headers="headers"
                :data="{ key: 'portada' }"
              >
                <img v-if="form.portada" :src="form.portada.path" alt="avatar" />
                <div v-else>
                  <a-icon :type="loadingFile ? 'loading' : 'plus'" />
                  <div class="ant-upload-text">Upload</div>
                </div>
              </a-upload>
            </a-form-model-item>
          </a-col>

          <!-- RUC -->
          <a-col :span="24" :md="12">
            <a-form-model-item label="RUC" prop="name">
              <a-input v-model="form.ruc" :disabled="loading" v-mask="'############'" />
            </a-form-model-item>
          </a-col>
          <!-- Nombre -->
          <a-col :span="24" :md="12">
            <a-form-model-item label="Nombre">
              <a-input v-model="form.name" :disabled="loading" />
            </a-form-model-item>
          </a-col>

          <!-- Dirección -->
          <a-col :span="24" :md="12" v-show="form.id_role != 1">
            <a-form-model-item label="Dirección">
              <a-input v-model="form.direction" :disabled="loading" />
            </a-form-model-item>
          </a-col>

          <!-- Correo -->
          <a-col :span="24" :md="12" v-show="form.id_role != 1">
            <a-form-model-item label="Correo">
              <a-input v-model="form.email" :disabled="loading" />
            </a-form-model-item>
          </a-col>

          <a-col :span="24" class="d-flex justify-content-end">
            <a-button type="primary" html-type="submit" @click="submitLogin" :loading="loading">
              Actualizar información
            </a-button>
          </a-col>
        </a-row>
      </a-form-model>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'

function getBase64(img, callback) {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}

export default {
  props: {},
  data() {
    return {
      loadingFile: false,
      form: {
        avatar: null,
        portada: null,
      },
      apiHost: process.env.apiHost,
      headers: {
        Authorization: this.$auth.strategy.token.get(),
      },
      imageUrl: '',
      rules: {},
    }
  },
  methods: {
    submitLogin() {
      this.$refs.company.validate(async (valid) => {
        if (valid) {
          this.changeLoading(true)

          let response = false
          response = await this.$axios.$put(`/company`, this.form).catch((errors) => {
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
    beforeUpload(file) {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
      if (!isJpgOrPng) {
        this.$message.error('¡Solo puedes subir archivos JPG o PNG!')
      }
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('¡La imagen debe ser inferior a 2 MB!')
      }
      return isJpgOrPng && isLt2M
    },
    disabledDate(current) {
      return current && current >= this.$moment().startOf('day').add(1, 'days')
    },
    closeDrawer() {
      this.$emit('close')
    },
    changeUpload(info) {
      this.loadingFile = true
      const status = info.file.status
      if (status !== 'uploading') {
        console.log(info)
      }
      if (status === 'done') {
        this.$message.success(`${info.file.name} file uploaded successfully.`)
        let _key = info.file.response.key ? info.file.response.key : null
        this.loadingFile = false
        this.form[_key] = info.file.response.file
        this.form['id_' + _key + '_file'] = info.file.response.file.id
      } else if (status === 'error') {
        this.$message.error(`${info.file.name} file upload failed.`)
      }
    },
    ...mapActions({
      getDataCompany: 'data/company/GET_DATA_COMPANY',
      changeLoading: 'data/company/CHANGE_LOADING',
    }),
  },
  watch: {
    company(newValue, oldValue) {
      this.form = _.cloneDeep(newValue)
    },
  },
  computed: {
    ...mapGetters({
      company: 'data/company/getCompany',
      loading: 'data/company/getLoading',
    }),
  },
  async mounted() {
    this.changeLoading(true)
    await this.getDataCompany()
    this.changeLoading(false)
    this.form = this.company ? _.cloneDeep(this.company) : {}
  },
}
</script>

<style></style>
