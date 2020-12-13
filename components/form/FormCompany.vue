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
                  <a-icon :type="loadingAvatar ? 'loading' : 'plus'" />
                  <div class="ant-upload-text">Upload</div>
                </div>
              </a-upload>
            </a-form-model-item>
          </a-col>

          <!-- RUC -->
          <a-col :span="24" :md="12">
            <a-form-model-item label="RUC" prop="name">
              <a-input v-model="form.name" :disabled="loading" />
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
              <a-input v-model="form.direction" :disabled="loading" />
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
import { mapState } from 'vuex'

function getBase64(img, callback) {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}

export default {
  props: {
    form: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      loading: false,
      loadingAvatar: false,
      apiHost: process.env.apiHost,
      headers: {
        Authorization: this.$auth.strategy.token.get(),
      },
      imageUrl: '',
      rules: {
        name: [
          {
            required: true,
            message: 'Por favor seleccione un rol para el usuario',
            trigger: 'blur',
          },
        ],
      },
    }
  },
  methods: {
    submitLogin() {
      this.$refs.company.validate(async (valid) => {
        if (valid) {
          let _self = this
          //   _self.loading = true
          //   let response = false
          //     response = await _self.$axios.$put(`/users/${this.form.id}`, _self.form).catch((errors) => {
          //       _self.loading = false
          //     })

          //   if (response.success) this.$message.success(response.message)
          //   _self.loading = false
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
      const status = info.file.status
      if (status !== 'uploading') {
        console.log(info)
      }
      if (status === 'done') {
        this.$message.success(`${info.file.name} file uploaded successfully.`)
        let _key = info.file.response.key ? info.file.response.key : null

        this.form[_key] = info.file.response.file
        this.form['id_' + _key + '_file'] = info.file.response.file.id
      } else if (status === 'error') {
        this.$message.error(`${info.file.name} file upload failed.`)
      }
    },
  },
  computed: {},
}
</script>

<style></style>
