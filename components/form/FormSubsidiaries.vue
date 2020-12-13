<template>
  <div>
    <div class="form-general" v-if="form || newData">
      <a-form-model :model="form" ref="reason" :rules="rules">
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
          <!-- Nombre -->
          <a-col :span="24" :md="24">
            <a-form-model-item label="Nombre" prop="name">
              <a-input v-model="form.name" :disabled="loading" />
            </a-form-model-item>
          </a-col>
          <!-- Nombre corto -->
          <a-col :span="24" :md="24">
            <a-form-model-item label="Nombre corto" prop="name_small">
              <a-input v-model="form.name_small" :disabled="loading" />
            </a-form-model-item>
          </a-col>
          <!-- Correo -->
          <a-col :span="24" :md="24">
            <a-form-model-item label="Correo" prop="email">
              <a-input v-model="form.email" :disabled="loading" />
            </a-form-model-item>
          </a-col>
          <!-- Dirección -->
          <a-col :span="24" :md="24">
            <a-form-model-item label="Dirección">
              <a-input v-model="form.direction" :disabled="loading" />
            </a-form-model-item>
          </a-col>
          <!-- Ubicación -->
          <a-col :span="24" :md="24" class="mb-3">
            <a-form-model-item label="Ubicación">
              <gmap-autocomplete @place_changed="setPlace" class="w-100 ant-input" placeholder="Escribe una dirección">
              </gmap-autocomplete>
            </a-form-model-item>
          </a-col>
          <a-col :span="24" :md="24" class="mb-3">
            <GmapMap
              ref="mapAddSubsidiaries"
              :center="mapCoordinaries"
              :zoom="mapZoom"
              :style="{ height: '20rem' }"
              :options="optionsMap"
              @click="mapClick"
            >
              <GmapMarker :position="mapMakerCoordinaries" :draggable="true" @dragend="eventDrag" />
            </GmapMap>
          </a-col>
          <a-col :span="24">
            <a-button type="primary" html-type="submit" @click="submitLogin" class="w-100" :loading="loading">
              {{ newData ? 'Agregar sucursal' : 'Editar sucursal' }}
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
            message: 'Por favor ingrese el motivo',
            trigger: 'blur',
          },
        ],
      },
      mapCoordinaries: {
        lat: -12.0526008,
        lng: -77.0449321,
      },
      mapZoom: 15,
      mapMakerCoordinaries: {
        lat: -12.0526008,
        lng: -77.0449321,
      },
      optionsMap: {
        zoomControl: false,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: false,
        disableDefaultUi: false,
      },
    }
  },
  methods: {
    submitLogin() {
      this.$refs.reason.validate(async (valid) => {
        if (valid) {
          let _self = this
          //   _self.loading = true
          //   let response = false
          //   if (!this.newData) {
          //     response = await _self.$axios.$put(`/users/${this.form.id}`, _self.form).catch((errors) => {
          //       _self.loading = false
          //     })
          //   } else {
          //     response = await _self.$axios.$post(`/users`, _self.form).catch((errors) => {
          //       _self.loading = false
          //     })
          //   }
          //   if (response.success) this.$message.success(response.message)
          //   _self.loading = false
          //   this.$store.dispatch('tables/users/GET_USERS_TABLE')
          this.closeDrawer()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    eventDrag($event) {
      this.mapMakerCoordinaries = {
        lat: $event.latLng.lat(),
        lng: $event.latLng.lng(),
      }
    },
    mapClick($event) {
      console.log($event)
      this.mapMakerCoordinaries = {
        lat: $event.latLng.lat(),
        lng: $event.latLng.lng(),
      }
    },
    setPlace($event) {
      this.mapMakerCoordinaries = {
        lat: $event.geometry.location.lat(),
        lng: $event.geometry.location.lng(),
      }
      this.mapCoordinaries = {
        lat: $event.geometry.location.lat(),
        lng: $event.geometry.location.lng(),
      }
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
    changeUpload(info) {
      const status = info.file.status
      if (status !== 'uploading') {
        console.log(info)
      }
      if (status === 'done') {
        this.$message.success(`${info.file.name} file uploaded successfully.`)
        let _key = info.file.response.key ? info.file.response.key : null
        if (_key) {
          this.form[_key] = info.file.response.file
          this.form['id_' + _key + '_file'] = info.file.response.file.id
        }
      } else if (status === 'error') {
        this.$message.error(`${info.file.name} file upload failed.`)
      }
    },
    closeDrawer() {
      this.$emit('close')
    },
  },
  computed: {},
}
</script>

<style></style>
