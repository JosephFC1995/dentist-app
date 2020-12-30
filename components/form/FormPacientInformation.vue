<template>
  <div class="form-general">
    <a-form-model :model="form" ref="newPacient" :rules="rules">
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
        <a-col :span="24" :md="9">
          <a-form-model-item label="Tipo de documento" prop="id_type_document">
            <a-select
              placeholder="Seleccione un tipo de documento"
              v-model="form.id_type_document"
              :allowClear="true"
              :disabled="loading"
            >
              <a-select-option v-for="item in tiposDocumentosArray" :key="item.id" :value="item.id">
                {{ item.name }}
              </a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
        <a-col :span="24" :md="9">
          <a-form-model-item label="Número de documento" prop="number_documento">
            <a-input
              v-model="form.number_documento"
              placeholder="Número de documento"
              :disabled="loading"
              v-mask="'#############'"
            />
          </a-form-model-item>
        </a-col>
        <!-- Nombres -->
        <a-col :span="24" :md="6">
          <a-form-model-item label="Nombres" prop="name">
            <a-input v-model="form.name" placeholder="Nombres" :disabled="loading" />
          </a-form-model-item>
        </a-col>
        <!-- Apellido paterno -->
        <a-col :span="24" :md="6">
          <a-form-model-item label="Apellido paterno" prop="last_name_father">
            <a-input v-model="form.last_name_father" placeholder="Apellido paterno" :disabled="loading" />
          </a-form-model-item>
        </a-col>
        <!-- Apellido materno -->
        <a-col :span="24" :md="6">
          <a-form-model-item label="Apellido materno" prop="last_name_mother">
            <a-input v-model="form.last_name_mother" placeholder="Apellido materno" :disabled="loading" />
          </a-form-model-item>
        </a-col>
        <!-- Dirección -->
        <a-col :span="24" :md="12">
          <a-form-model-item label="Dirección" prop="direction">
            <a-input v-model="form.direction" placeholder="Dirección" :disabled="loading" />
          </a-form-model-item>
        </a-col>
        <!-- Telefono -->
        <a-col :span="24" :md="6">
          <a-form-model-item label="Teléfono" prop="phone">
            <a-input v-model="form.phone" placeholder="Teléfono" :disabled="loading" v-mask="'#########'" />
          </a-form-model-item>
        </a-col>
        <!-- Correo -->
        <a-col :span="24" :md="6">
          <a-form-model-item label="Correo electrónico" prop="email">
            <a-input v-model="form.email" placeholder="Correo electrónico" :disabled="loading" />
          </a-form-model-item>
        </a-col>

        <!-- Nacimiento -->
        <a-col :span="24" :md="6">
          <a-form-model-item label="Fecha de nacimiento" prop="birth">
            <a-date-picker
              v-model="form.birth"
              :disabled-date="disabledDate"
              placeholder="Seleccione una fecha de nacimiento"
              :disabled="loading"
              format="YYYY-MM-DD"
              valueFormat="YYYY-MM-DD"
            />
          </a-form-model-item>
        </a-col>
        <!-- Genero -->
        <a-col :span="24" :md="6">
          <a-form-model-item label="Género" prop="id_gender">
            <a-select placeholder="Seleccione un género" v-model="form.id_gender" :disabled="loading">
              <a-select-option v-for="item in generoArray" :key="item.id" :value="item.id">
                {{ item.name }}
              </a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
        <!-- Estado civil -->
        <a-col :span="24" :md="6">
          <a-form-model-item label="Estado civil" prop="id_civil_status">
            <a-select placeholder="Seleccione un estado civil" v-model="form.id_civil_status" :disabled="loading">
              <a-select-option v-for="item in estadoCivilArray" :key="item.id" :value="item.id">
                {{ item.name }}
              </a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
        <!-- Ocupación -->
        <a-col :span="24" :md="6">
          <a-form-model-item label="Ocupación" class="with-button" prop="id_ocupation">
            <a-select placeholder="Seleccione una ocupación" v-model="form.id_ocupation" :disabled="loading">
              <a-select-option v-for="item in ocupacionesArray" :key="item.id" :value="item.id">
                {{ item.name }}
              </a-select-option>
            </a-select>
            <a-button type="primary" :disabled="loading" @click="openModalAddOcupation = true">
              <i class="uil uil-plus-circle"></i>
            </a-button>
          </a-form-model-item>
        </a-col>
        <!-- Seguro -->
        <a-col :span="24" :md="6">
          <a-form-model-item label="Seguro" prop="id_insurance">
            <a-select placeholder="Seleccione un seguro" v-model="form.id_insurance" :disabled="loading">
              <a-select-option v-for="item in seguroArray" :key="item.id" :value="item.id">
                {{ item.name }}
              </a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
        <!-- Referido -->
        <a-col :span="24" :md="6">
          <a-form-model-item label="Referido" class="with-button" prop="id_referred">
            <a-select placeholder="Seleccione un referido" v-model="form.id_referred" :disabled="loading">
              <a-select-option v-for="item in referidosArray" :key="item.id" :value="item.id">
                {{ item.name }}
              </a-select-option>
            </a-select>
            <a-button type="primary" :disabled="loading" @click="openModalAddReferred = true">
              <i class="uil uil-plus-circle"></i>
            </a-button>
          </a-form-model-item>
        </a-col>
        <!-- Nacionalidad -->
        <a-col :span="24" :md="6">
          <a-form-model-item label="Nacionalidad" prop="id_nationality">
            <a-select placeholder="Seleccione una nacionalidad" v-model="form.id_nationality" :disabled="loading">
              <a-select-option v-for="item in nacionalidadArray" :key="item.id" :value="item.id">
                {{ item.name }}
              </a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
        <!-- Idioma -->
        <a-col :span="24" :md="6">
          <a-form-model-item label="Idioma" prop="id_languaje">
            <a-select placeholder="Seleccione una nacionalidad" v-model="form.id_languaje" :disabled="loading">
              <a-select-option v-for="item in idiomaArray" :key="item.id" :value="item.id">
                {{ item.name }}
              </a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
        <!-- Titulo -->
        <a-col :span="24" :md="24">
          <h6 class="mt-0 mb-1" :style="{ color: '#B9BABA' }">Campos de emergencia</h6>
        </a-col>
        <!-- Nombres -->
        <a-col :span="24" :md="6">
          <a-form-model-item label="Nombre de la persona" prop="names_emergency">
            <a-input v-model="form.names_emergency" placeholder="Nombres" :disabled="loading" />
          </a-form-model-item>
        </a-col>
        <!-- Apellido paterno -->
        <a-col :span="24" :md="6">
          <a-form-model-item label="Apellido paterno de la persona" prop="last_name_father_emergency">
            <a-input v-model="form.last_name_father_emergency" placeholder="Apellido paterno" :disabled="loading" />
          </a-form-model-item>
        </a-col>
        <!-- Apellido materno -->
        <a-col :span="24" :md="6">
          <a-form-model-item label="Apellido materno de la persona" prop="last_name_mother_emergency">
            <a-input v-model="form.last_name_mother_emergency" placeholder="Apellido materno" :disabled="loading" />
          </a-form-model-item>
        </a-col>
        <!-- Parentezco -->
        <a-col :span="24" :md="6">
          <a-form-model-item label="Parentesco" prop="relationship_emergency">
            <a-input v-model="form.relationship_emergency" placeholder="Parentesco" :disabled="loading" />
          </a-form-model-item>
        </a-col>

        <!-- Teléfono de emergencia -->
        <a-col :span="24" :md="6">
          <a-form-model-item label="Teléfono de emergencia" prop="phone_emergency">
            <a-input v-model="form.phone_emergency" placeholder="Teléfono" :disabled="loading" v-mask="'#########'" />
          </a-form-model-item>
        </a-col>

        <a-col :span="24" :md="24" class="d-flex justify-content-end">
          <a-button type="primary" html-type="submit" @click="saveNewPacient" :loading="loading">
            {{ loading ? 'Actualizando paciente' : 'Actualizar paciente' }}
          </a-button>
        </a-col>
      </a-row>
    </a-form-model>
    <ModalNewOcupation
      modalTitle="Agregar ocupación"
      :openModalProp="openModalAddOcupation"
      @close="openModalAddOcupation = false"
    />
    <ModalNewReferred modalTitle="Agregar referido" :openModalProp="openModalAddReferred" @close="openModalAddReferred = false" />
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import _ from 'lodash'

function getBase64(img, callback) {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}
export default {
  props: {
    // form: {
    //   type: Object,
    //   default: null,
    // },
  },
  data() {
    return {
      form: _.cloneDeep(this.$store.state.tables.patients.patient),
      loading: false,
      openModalAddOcupation: false,
      openModalAddReferred: false,
      imageUrl: '',
      nameAddPacient: null,
      idAddPacient: 0,
      loadingAvatar: false,
      apiHost: process.env.apiHost,
      headers: {
        Authorization: this.$auth.strategy.token.get(),
      },
      rules: {
        id_type_document: [
          {
            required: true,
            message: 'Por favor seleccione el tipo de documento',
            trigger: 'blur',
          },
        ],
        number_documento: [
          {
            required: true,
            message: 'Por favor agregue el número de documento del paciente',
            trigger: 'blur',
          },
        ],
        name: [
          {
            required: true,
            message: 'Por favor agregar el nombre del paciente',
            trigger: 'blur',
          },
        ],
        last_name_father: [
          {
            required: true,
            message: 'Por favor agregar el apellido paterno del paciente',
            trigger: 'blur',
          },
        ],
        last_name_mother: [
          {
            required: true,
            message: 'Por favor agregar el apellido materno del paciente',
            trigger: 'blur',
          },
        ],
        direction: [
          {
            required: true,
            message: 'Por favor agregar la dirección del paciente',
            trigger: 'blur',
          },
        ],
        phone: [
          {
            required: true,
            message: 'Por favor agregar el teléfono del paciente',
            trigger: 'blur',
          },
        ],
        email: [
          {
            required: true,
            message: 'Por favor agregue su correo electrónico',
            trigger: 'blur',
          },
          {
            type: 'email',
            message: 'Por favor agregue ingrese un correo válido',
            trigger: 'blur',
          },
        ],
        birth: [
          {
            required: true,
            message: 'Por favor agregar el la fecha válida',
            trigger: 'change',
          },
        ],
        id_gender: [
          {
            required: true,
            message: 'Por favor seleccionar el género del paciente',
            trigger: 'blur',
          },
        ],
        id_civil_status: [
          {
            required: true,
            message: 'Por favor seleccionar el estado civil del paciente',
            trigger: 'blur',
          },
        ],
        id_ocupation: [
          {
            required: true,
            message: 'Por favor seleccionar la ocupación del paciente',
            trigger: 'blur',
          },
        ],
        id_insurance: [
          {
            required: true,
            message: 'Por favor seleccionar el seguro del paciente',
            trigger: 'blur',
          },
        ],
        id_nationality: [
          {
            required: true,
            message: 'Por favor seleccionar la nacionalidad del paciente',
            trigger: 'blur',
          },
        ],
        id_languaje: [
          {
            required: true,
            message: 'Por favor seleccionar el lenguaje del paciente',
            trigger: 'blur',
          },
        ],
      },
      apiHost: process.env.apiHost,
    }
  },
  methods: {
    saveNewPacient() {
      this.$refs.newPacient.validate(async (valid) => {
        if (valid) {
          let _self = this
          _self.loading = true
          this.$store.commit('tables/patients/SET_PATIENT', _self.form)
          let response = false
          this.idAddPacient = null
          this.nameAddPacient = null
          response = await _self.$axios.$put(`/pacients/${_self.form.id}`, _self.form).catch((errors) => {
            _self.loading = false
          })
          if (response.success) this.$message.success({ content: response.message, duration: 5 })
          this.idAddPacient = response.data.id
          this.nameAddPacient = response.data.name
          _self.loading = false
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    disabledDate(current) {
      return current && current >= this.$moment().startOf('day')
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
  mounted() {},
  computed: {
    // form: {
    //   get() {
    //     return this.$store.state.tables.patients.patient
    //   },
    // },
    ...mapState({
      tiposDocumentosArray: (state) => state.data.general.typeDocuments,
      generoArray: (state) => state.data.general.genders,
      estadoCivilArray: (state) => state.data.general.civilStatus,
      ocupacionesArray: (state) => state.data.general.ocupations,
      seguroArray: (state) => state.data.general.insurances,
      referidosArray: (state) => state.data.general.referreds,
      nacionalidadArray: (state) => state.data.general.nacionalities,
      idiomaArray: (state) => state.data.general.languajes,
    }),
  },
}
</script>

<style></style>
