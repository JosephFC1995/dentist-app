<template>
  <div class="form-general">
    <a-form-model :model="form" ref="newPacient">
      <h6 class="mt-0 mb-1" :style="{ color: '#B9BABA' }">Datos del nuevo paciente</h6>
      <a-row :gutter="16">
        <a-col :span="24" :md="6">
          <a-form-model-item label="Foto">
            <a-upload
              name="file"
              list-type="picture-card"
              class="avatar-uploader"
              :show-upload-list="false"
              :action="apiHost + '/file/upload'"
              :before-upload="beforeUpload"
              @change="handleChange"
              :disabled="loading"
            >
              <img v-if="imageUrl" :src="imageUrl" alt="avatar" />
              <div v-else>
                <a-icon :type="loadingAvatar ? 'loading' : 'plus'" />
                <div class="ant-upload-text">Upload</div>
              </div>
            </a-upload>
          </a-form-model-item>
        </a-col>
        <a-col :span="24" :md="9">
          <a-form-model-item label="Tipo de documento">
            <a-select
              placeholder="Seleccione un tipo de documento"
              :options="tiposDocumentosArray"
              v-model="form.typeDocument"
              :allowClear="true"
              :disabled="loading"
            >
            </a-select>
          </a-form-model-item>
        </a-col>
        <a-col :span="24" :md="9">
          <a-form-model-item label="Número de documento">
            <a-input v-model="form.numberDocumento" placeholder="Número de documento" :disabled="loading" />
          </a-form-model-item>
        </a-col>
        <!-- Nombres -->
        <a-col :span="24" :md="6">
          <a-form-model-item label="Nombres">
            <a-input v-model="form.names" placeholder="Nombres" :disabled="loading" />
          </a-form-model-item>
        </a-col>
        <!-- Apellido paterno -->
        <a-col :span="24" :md="6">
          <a-form-model-item label="Apellido paterno">
            <a-input v-model="form.lastNameFather" placeholder="Apellido paterno" :disabled="loading" />
          </a-form-model-item>
        </a-col>
        <!-- Apellido materno -->
        <a-col :span="24" :md="6">
          <a-form-model-item label="Apellido materno">
            <a-input v-model="form.lastNameMother" placeholder="Apellido materno" :disabled="loading" />
          </a-form-model-item>
        </a-col>
        <!-- Dirección -->
        <a-col :span="24" :md="12">
          <a-form-model-item label="Dirección">
            <a-input v-model="form.direction" placeholder="Dirección" :disabled="loading" />
          </a-form-model-item>
        </a-col>
        <!-- Telefono -->
        <a-col :span="24" :md="6">
          <a-form-model-item label="Teléfono">
            <a-input v-model="form.phone" placeholder="Teléfono" :disabled="loading" />
          </a-form-model-item>
        </a-col>
        <!-- Correo -->
        <a-col :span="24" :md="6">
          <a-form-model-item label="Correo electrónico">
            <a-input v-model="form.email" placeholder="Correo electrónico" :disabled="loading" />
          </a-form-model-item>
        </a-col>

        <!-- Nacimiento -->
        <a-col :span="24" :md="6">
          <a-form-model-item label="Fecha de nacimiento">
            <a-date-picker
              v-model="form.birth"
              :disabled-date="disabledDate"
              placeholder="Seleccione una fecha de nacimiento"
              :disabled="loading"
            />
          </a-form-model-item>
        </a-col>
        <!-- Genero -->
        <a-col :span="24" :md="6">
          <a-form-model-item label="Género">
            <a-select placeholder="Seleccione un género" :options="generoArray" v-model="form.genere" :disabled="loading">
            </a-select>
          </a-form-model-item>
        </a-col>
        <!-- Estado civil -->
        <a-col :span="24" :md="6">
          <a-form-model-item label="Estado civil">
            <a-select
              placeholder="Seleccione un estado civil"
              :options="estadoCivilArray"
              v-model="form.civilStatus"
              :disabled="loading"
            >
            </a-select>
          </a-form-model-item>
        </a-col>
        <!-- Ocupación -->
        <a-col :span="24" :md="6">
          <a-form-model-item label="Ocupación" class="with-button">
            <a-select
              placeholder="Seleccione una ocupación"
              :options="ocupacionesArray"
              v-model="form.ocupation"
              :disabled="loading"
            >
            </a-select>
            <a-button type="primary" :disabled="loading">
              <i class="uil uil-plus-circle"></i>
            </a-button>
          </a-form-model-item>
        </a-col>
        <!-- Seguro -->
        <a-col :span="24" :md="6">
          <a-form-model-item label="Seguro">
            <a-select placeholder="Seleccione un seguro" :options="seguroArray" v-model="form.segure" :disabled="loading">
            </a-select>
          </a-form-model-item>
        </a-col>
        <!-- Referido -->
        <a-col :span="24" :md="6">
          <a-form-model-item label="Referido" class="with-button">
            <a-select placeholder="Seleccione un referido" :options="referidosArray" v-model="form.referred" :disabled="loading">
            </a-select>
            <a-button type="primary" :disabled="loading">
              <i class="uil uil-plus-circle"></i>
            </a-button>
          </a-form-model-item>
        </a-col>
        <!-- Nacionalidad -->
        <a-col :span="24" :md="6">
          <a-form-model-item label="Nacionalidad">
            <a-select
              placeholder="Seleccione una nacionalidad"
              :options="nacionalidadArray"
              v-model="form.nationality"
              :disabled="loading"
            >
            </a-select>
          </a-form-model-item>
        </a-col>
        <!-- Idioma -->
        <a-col :span="24" :md="6">
          <a-form-model-item label="Idioma">
            <a-select
              placeholder="Seleccione una nacionalidad"
              :options="idiomaArray"
              v-model="form.languaje"
              :disabled="loading"
            >
            </a-select>
          </a-form-model-item>
        </a-col>
        <!-- Titulo -->
        <a-col :span="24" :md="24">
          <h6 class="mt-0 mb-1" :style="{ color: '#B9BABA' }">Campos de emergencia</h6>
        </a-col>
        <!-- Nombres -->
        <a-col :span="24" :md="6">
          <a-form-model-item label="Nombre de la persona">
            <a-input v-model="form.namesEmergency" placeholder="Nombres" :disabled="loading" />
          </a-form-model-item>
        </a-col>
        <!-- Apellido paterno -->
        <a-col :span="24" :md="6">
          <a-form-model-item label="Apellido paterno de la persona">
            <a-input v-model="form.lastNameFatherEmergency" placeholder="Apellido paterno" :disabled="loading" />
          </a-form-model-item>
        </a-col>
        <!-- Apellido materno -->
        <a-col :span="24" :md="6">
          <a-form-model-item label="Apellido materno de la persona">
            <a-input v-model="form.lastNameMotherEmergency" placeholder="Apellido materno" :disabled="loading" />
          </a-form-model-item>
        </a-col>
        <!-- Parentezco -->
        <a-col :span="24" :md="6">
          <a-form-model-item label="Parentesco">
            <a-input v-model="form.relationship" placeholder="Parentesco" :disabled="loading" />
          </a-form-model-item>
        </a-col>

        <a-col :span="24" :md="24" class="d-flex justify-content-between">
          <a-button type="primary" html-type="submit" @click="saveNewPacient" :loading="loading">
            {{ loading ? 'Creando usuario' : 'Crear usuario' }}
          </a-button>
        </a-col>
      </a-row>
    </a-form-model>
  </div>
</template>

<script>
function getBase64(img, callback) {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}
export default {
  data() {
    return {
      loading: false,
      imageUrl: '',
      loadingAvatar: false,
      form: {},
      apiHost: process.env.apiHost,
      tiposDocumentosArray: [
        { value: 1, label: 'DNI' },
        { value: 2, label: 'Pasaporte' },
      ],
      generoArray: [
        { value: 1, label: 'Hombre' },
        { value: 2, label: 'Mujer' },
        { value: 3, label: 'Otro' },
      ],
      estadoCivilArray: [
        { value: 1, label: 'Soltero' },
        { value: 2, label: 'Casado' },
        { value: 3, label: 'Viudo' },
        { value: 4, label: 'Divorciado' },
      ],
      ocupacionesArray: [
        { value: 1, label: 'Estudiante' },
        { value: 2, label: 'Obrero' },
        { value: 3, label: 'Desempleado' },
      ],
      seguroArray: [
        { value: 1, label: 'Seguro Social del Perú (EsSalud)' },
        { value: 2, label: 'SIS' },
        { value: 3, label: 'Rimac' },
        { value: 4, label: 'Mapfre' },
        { value: 5, label: 'Sanitas' },
        { value: 6, label: 'Pacífico' },
      ],
      referidosArray: [
        { value: 1, label: 'A' },
        { value: 2, label: 'B' },
      ],
      nacionalidadArray: [
        { value: 1, label: 'Perú' },
        { value: 2, label: 'Brasil' },
      ],
      idiomaArray: [
        { value: 1, label: 'Español' },
        { value: 2, label: 'Ingles' },
      ],
    }
  },
  methods: {
    saveNewPacient() {
      this.loading = true
      setTimeout(() => {
        this.loading = false
      }, 3000)
    },
    disabledDate(current) {
      return current && current >= this.$moment().startOf('day')
    },
    handleChange(info) {
      console.log(info.file.status)
      if (info.file.status === 'uploading') {
        this.loadingAvatar = true
        return
      }
      if (info.file.status === 'done') {
        getBase64(info.file.originFileObj, (imageUrl) => {
          this.imageUrl = imageUrl
          this.loadingAvatar = false
        })
      }
      if (info.file.status === 'error') {
        this.loadingAvatar = false
        this.$message.error('Error al subir la imagen')
      }
    },
    beforeUpload(file) {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
      if (!isJpgOrPng) {
        this.$message.error('You can only upload JPG file!')
      }
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('Image must smaller than 2MB!')
      }
      return isJpgOrPng && isLt2M
    },
  },
  mounted() {},
}
</script>

<style></style>
