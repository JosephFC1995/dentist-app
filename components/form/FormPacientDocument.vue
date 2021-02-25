<template>
  <div class="form-general">
    <a-form-model :model="form" ref="form" :rules="rules">
      <a-row :gutter="16">
        <!-- Tipo -->
        <a-col :span="24" :md="6">
          <a-form-model-item label="Tipo" prop="id_document">
            <a-select placeholder="Seleccione un tipo" v-model="form.id_document" :disabled="loading">
              <a-select-option v-for="code in documents" :key="code.id">
                {{ code.name }}
              </a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
        <!-- Enviar a un correo -->
        <a-col :span="24" :md="24">
          <a-form-model-item label="Enviar a un correo" prop="send_mail">
            <a-switch v-model="form.send_mail" :disabled="loading" />
          </a-form-model-item>
        </a-col>
        <!-- Correo -->
        <a-col :span="24" :md="24" v-show="form.send_mail">
          <a-form-model-item label="Correo (puede colocar mas de un correo separado por comas)" class="with-button" prop="email">
            <a-input v-model="form.email" :disabled="loading" placeholder="micorreo@corporation, otrocorreo@gmail.com" />
          </a-form-model-item>
        </a-col>
        <!-- Asunto -->
        <a-col :span="24" :md="24" v-show="form.send_mail">
          <a-form-model-item label="Asunto" class="with-button" prop="subject">
            <a-input v-model="form.subject" placeholder="Asunto" :disabled="loading" />
          </a-form-model-item>
        </a-col>
        <!-- Contenido -->
        <a-col :span="24" :md="24">
          <a-form-model-item label="Contenido" prop="content">
            <a-textarea v-model="form.content" :rows="3" :disabled="loading" placeholder="Contenido del mensaje" />
          </a-form-model-item>
        </a-col>

        <a-col :span="24" class="d-flex justify-content-end">
          <a-button type="primary" html-type="submit" @click="submit" :loading="loading"> Generar documento </a-button>
        </a-col>
      </a-row>
    </a-form-model>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'

export default {
  data() {
    let validateSendEmail = (rule, value, callback) => {
      if (value === '' && this.form.send_mail) {
        callback(new Error('Por favor rellenar el correo'))
      } else {
        callback()
      }
    }
    let validateSendSubject = (rule, value, callback) => {
      if (value === '' && this.form.send_mail) {
        callback(new Error('Por favor colocar el asunto para el envio del correo'))
      } else {
        callback()
      }
    }
    return {
      loading: false,
      form: {
        send_mail: false,
        email: '',
        subject: '',
      },
      rules: {
        id_document: [
          {
            required: true,
            message: 'Por favor seleccione documento.',
            trigger: 'blur',
          },
        ],
        content: [
          {
            required: true,
            message: 'Por favor agregar el contenido de su documento.',
            trigger: 'blur',
          },
        ],
        email: [{ validator: validateSendEmail, trigger: 'change' }],
        subject: [{ validator: validateSendSubject, trigger: 'change' }],
      },
    }
  },
  methods: {
    submit() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          this.loading = true
          let tempForm = this.form
          tempForm.id_patient = this.$route.params.id
          let response = false
          response = await this.$axios.$post(`/document_patient`, tempForm).catch((errors) => {
            this.loading = false
          })
          if (response.success) this.$message.success(response.message)
          this.$refs.form.resetFields()
          await this.getDocumentsPatient({ id_patient: this.$route.params.id })
          this.loading = false
          console.log('Enviando')
        }
      })
    },
    ...mapActions({
      getDocuments: 'tables/documents/GET_DOCUMENTS_TABLE',
      getDocumentsPatient: 'data/documents/GET_DOCUMENTS_BY_PATIENT',
    }),
  },
  computed: {
    ...mapGetters({
      documents: 'tables/documents/getDocuments',
    }),
  },
  watch: {},
  mounted() {
    this.getDocuments()
  },
}
</script>

<style></style>
