<template>
  <div class="form-general">
    <a-form-model :model="form" ref="newPacient" :rules="rules">
      <h6 class="mt-0 mb-1" :style="{ color: '#B9BABA' }">Datos del nuevo paciente</h6>
      <a-row :gutter="16">
        <a-col :span="24" :md="24">
          <a-form-model-item label="Tipo de documento" prop="id_type_document">
            <a-select
              placeholder="Seleccione un tipo de documento"
              v-model="form.id_type_document"
              :allowClear="true"
              :disabled="loading"
            >
              <a-select-option v-for="item in typeDocumentsArray" :key="item.id" :value="item.id">
                {{ item.name }}
              </a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
        <a-col :span="24" :md="24">
          <a-form-model-item label="Número de documento" prop="number_documento">
            <a-input
              v-model="form.number_documento"
              placeholder="Número de documento"
              :disabled="loading"
              v-mask="'#############'"
            />
          </a-form-model-item>
        </a-col>
        <a-col :span="24" :md="24">
          <a-form-model-item label="Nombres" prop="name">
            <a-input v-model="form.name" placeholder="Nombres" :disabled="loading" />
          </a-form-model-item>
        </a-col>
        <a-col :span="24" :md="24">
          <a-form-model-item label="Apellido paterno" prop="last_name_father">
            <a-input v-model="form.last_name_father" placeholder="Apellido paterno" :disabled="loading" />
          </a-form-model-item>
        </a-col>
        <a-col :span="24" :md="24">
          <a-form-model-item label="Apellido materno" prop="last_name_mother">
            <a-input v-model="form.last_name_mother" placeholder="Apellido materno" :disabled="loading" />
          </a-form-model-item>
        </a-col>
        <a-col :span="24" :md="24">
          <a-form-model-item label="Correo electrónico" prop="email">
            <a-input v-model="form.email" placeholder="Correo electrónico" :disabled="loading" />
          </a-form-model-item>
        </a-col>
        <a-col :span="24" :md="24">
          <a-form-model-item label="Teléfono" prop="phone">
            <a-input v-model="form.phone" placeholder="Teléfono" :disabled="loading" />
          </a-form-model-item>
        </a-col>
        <!-- Genero -->
        <a-col :span="24" :md="24">
          <a-form-model-item label="Género" prop="id_gender">
            <a-select placeholder="Seleccione un género" v-model="form.id_gender" :disabled="loading">
              <a-select-option v-for="item in gendersArray" :key="item.id" :value="item.id">
                {{ item.name }}
              </a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
        <!-- Nacimiento -->
        <a-col :span="24" :md="24">
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
        <a-col :span="24" :md="24" class="d-flex justify-content-between">
          <a-button @click="() => $emit('close')" :loading="loading"> Cerrar </a-button>

          <a-button type="primary" html-type="submit" @click="saveNewPacient" :loading="loading">
            {{ loading ? 'Creando usuario' : 'Crear usuario' }}
          </a-button>
        </a-col>
      </a-row>
    </a-form-model>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      loading: false,
      form: {},
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
      },
    }
  },
  methods: {
    saveNewPacient() {
      this.$refs.newPacient.validate(async (valid) => {
        if (valid) {
          let _self = this
          _self.loading = true
          let response = false
          response = await _self.$axios.$post(`/pacients`, _self.form).catch((errors) => {
            _self.loading = false
          })
          if (response.success) this.$message.success({ content: response.message, duration: 5 })
          _self.loading = false
          this.form = {}
          this.$store.dispatch('tables/patients/GET_PATIENTS_TABLE')
          this.$emit('close')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    disabledDate(current) {
      return current && current >= this.$moment().startOf('day')
    },
  },
  computed: {
    ...mapGetters({
      typeDocumentsArray: 'data/general/getTypeDocuments',
      gendersArray: 'data/general/getGenders',
    }),
  },
}
</script>

<style></style>
