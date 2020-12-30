<template>
  <div>
    <div class="form-general" v-if="form || newData">
      <a-form-model :model="form" ref="user" :rules="rules">
        <a-row :gutter="16">
          <!-- Avatar -->
          <a-col :span="24" :md="6">
            <a-form-model-item label="Avatar">
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
          <!-- Rol del usuario -->
          <a-col :span="24" :md="24">
            <a-form-model-item label="Rol del usuario" prop="id_role">
              <a-select placeholder="Seleccione una opción" v-model="form.id_role" :allowClear="false" :disabled="loading">
                <a-select-option v-for="item in rolesArray" :key="item.id" :value="item.id">
                  {{ item.name }}
                </a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
          <!-- Tipo de documento -->
          <a-col :span="24" :md="12">
            <a-form-model-item label="Tipo de documento">
              <a-select placeholder="Seleccione una opción" v-model="form.id_type_document" :disabled="loading">
                <a-select-option v-for="item in documentsArray" :key="item.id" :value="item.id">
                  {{ item.name }}
                </a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
          <!-- Número de documento -->
          <a-col :span="24" :md="12">
            <a-form-model-item label="Número de documento">
              <a-input v-model="form.number_document" :disabled="loading" v-mask="'############'" />
            </a-form-model-item>
          </a-col>
          <a-col :span="24" :md="24">
            <a-row :gutter="16">
              <!-- Nombres -->
              <a-col :span="24" :md="8">
                <a-form-model-item label="Nombres" prop="name">
                  <a-input v-model="form.name" :disabled="loading" />
                </a-form-model-item>
              </a-col>
              <!-- Apellidos -->
              <a-col :span="24" :md="16">
                <a-form-model-item label="Apellidos">
                  <a-input v-model="form.last_name" :disabled="loading" />
                </a-form-model-item>
              </a-col>
            </a-row>
          </a-col>

          <!-- Correo -->
          <a-col :span="24" :md="12">
            <a-form-model-item label="Correo" prop="email">
              <a-input v-model="form.email" :disabled="loading" />
            </a-form-model-item>
          </a-col>

          <!-- Password -->
          <a-col :span="24" :md="12">
            <a-form-model-item label="Password" prop="password_field">
              <a-input type="password" v-model="form.password_field" :disabled="!newData" />
            </a-form-model-item>
          </a-col>

          <!-- Fecha de nacimiento -->
          <a-col :span="24" :md="12">
            <a-form-model-item label="Fecha de nacimiento" class="with-button">
              <a-date-picker
                v-model="form.date_birth"
                :disabled-date="disabledDate"
                placeholder="Seleccione una fecha"
                :showToday="false"
                :showTime="false"
                format="YYYY-MM-DD"
                valueFormat="YYYY-MM-DD"
              />
            </a-form-model-item>
          </a-col>

          <!-- Telefono -->
          <a-col :span="24" :md="12">
            <a-form-model-item label="Telefono">
              <a-input v-model="form.phone" :disabled="loading" v-mask="'#########'" />
            </a-form-model-item>
          </a-col>

          <!-- Especialidad -->
          <a-col :span="24" :md="24" v-show="form.id_role != 1">
            <a-form-model-item label="Especialidad">
              <a-select placeholder="Seleccione una opción" v-model="form.id_specialty" :disabled="loading">
                <a-select-option v-for="item in specialitys" :key="item.id" :value="item.id">
                  {{ item.name }}
                </a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>

          <!-- Colegiatura -->
          <a-col :span="24" :md="24" v-show="form.id_role != 1">
            <a-form-model-item label="Colegiatura">
              <a-input v-model="form.tuition" :disabled="loading" />
            </a-form-model-item>
          </a-col>

          <!-- Dirección -->
          <a-col :span="24" :md="24" v-show="form.id_role != 1">
            <a-form-model-item label="Dirección">
              <a-input v-model="form.direction" :disabled="loading" />
            </a-form-model-item>
          </a-col>

          <!-- Firma -->
          <a-col :span="24" :md="24" v-show="form.id_role != 1">
            <a-form-model-item label="Firma">
              <a-upload-dragger
                :action="apiHost + '/file/upload'"
                :multiple="true"
                @change="changeUpload"
                :headers="headers"
                :data="{ key: 'firm' }"
                :show-upload-list="false"
              >
                <img v-if="form.firm" :src="form.firm.path" alt="firma" width="200px" />
                <div class="p-3" v-else>
                  <p class="ant-upload-drag-icon">
                    <i class="uil uil-cloud-upload"></i>
                  </p>
                  <p class="ant-upload-text">Haga clic o arrastre el archivo a esta área para cargar</p>
                  <p class="ant-upload-hint">
                    Compatibilidad con una carga única o masiva. Prohibir estrictamente cargando datos de la empresa u otros
                    archivos de banda
                  </p>
                </div>
              </a-upload-dragger>
            </a-form-model-item>
          </a-col>

          <!-- Sucursales -->
          <a-col :span="24" :md="24" v-show="form.id_role != 1">
            <a-form-model-item label="Sucursales">
              <a-select
                placeholder="Seleccione una opción"
                v-model="form.user_subsidiary_split"
                :allowClear="true"
                :disabled="loading"
                mode="multiple"
              >
                <a-select-option v-for="item in subsidiarysArray" :key="item.id" :value="item.id">
                  {{ item.name }}
                </a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>

          <a-col :span="24">
            <a-button type="primary" html-type="submit" @click="submitLogin" class="w-100" :loading="loading">
              {{ newData ? 'Agregar usuario' : 'Editar usuario' }}
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
      default: null,
    },
    newData: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    var rulePassword = {
      required: this.newData ? true : false,
      message: 'Por favor agregue una contraseña',
      trigger: 'blur',
    }
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
        id_role: [
          {
            required: true,
            message: 'Por favor seleccione un rol para el usuario',
            trigger: 'blur',
          },
        ],
        email: [
          {
            required: true,
            message: 'Por favor agregue su correo electrónico',
            trigger: 'blur',
          },
        ],
        password_field: [rulePassword],
      },
    }
  },
  methods: {
    submitLogin() {
      this.$refs.user.validate(async (valid) => {
        if (valid) {
          let _self = this
          _self.loading = true
          let response = false
          if (!this.newData) {
            response = await _self.$axios.$put(`/users/${this.form.id}`, _self.form).catch((errors) => {
              _self.loading = false
            })
          } else {
            response = await _self.$axios.$post(`/users`, _self.form).catch((errors) => {
              _self.loading = false
            })
          }
          if (response.success) this.$message.success(response.message)
          _self.loading = false
          this.$store.dispatch('tables/users/GET_USERS_TABLE')
          this.closeDrawer()
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
  computed: {
    ...mapState({
      rolesArray: (state) => state.data.general.roles,
      documentsArray: (state) => state.data.general.typeDocuments,
      subsidiarysArray: (state) => state.data.general.subsidiarys,
      specialitys: (state) => state.data.general.specialitys,
    }),
  },
}
</script>

<style></style>
