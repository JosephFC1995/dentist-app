<template>
  <div>
    <div class="form-general">
      <a-form-model :model="form" ref="form" :rules="rules">
        <a-row :gutter="16">
          <!-- Fecha -->
          <a-col :span="24" :md="24">
            <a-form-model-item label="Asunto" class="with-button" prop="email">
              <a-input v-model="form.subject" :disabled="loading" placeholder="Asunto" />
            </a-form-model-item>
          </a-col>
          <!-- Correo -->
          <a-col :span="24" :md="24">
            <a-form-model-item
              label="Correo (puede colocar mas de un correo separado por comas)"
              class="with-button"
              prop="email"
            >
              <a-input v-model="form.email" :disabled="loading" placeholder="micorreo@corporation, otrocorreo@gmail.com" />
            </a-form-model-item>
          </a-col>
          <a-col :span="24" class="d-flex justify-content-between">
            <a-button type="button" @click="() => $emit('cancel')" :loading="loading">
              <span>Cancelar</span>
            </a-button>
            <a-button type="primary" html-type="submit" @click="submitAdd" :loading="loading"> Agregar </a-button>
          </a-col>
        </a-row>
      </a-form-model>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'

export default {
  props: {
    documentSelect: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      loading: false,
      form: {},
      rules: {
        subject: [
          {
            required: true,
            message: 'Por favor ingrese el asunto',
            trigger: 'blur',
          },
        ],
        email: [
          {
            required: true,
            message: 'Por favor el correo',
            trigger: 'blur',
          },
        ],
      },
    }
  },
  methods: {
    submitAdd() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          this.loading = true
          let response = false
          let tempForm = {
            ...this.form,
            archivo: this.documentSelect,
          }
          tempForm.id_patient = this.$route.params.id
          response = await this.$axios.$post(`/send_document`, tempForm).catch((errors) => {
            this.loading = false
          })

          if (response.success) {
            this.$message.success(response.message)
            this.form = {}
            this.$emit('cancel')
          } else {
            this.$message.error(response.message)
          }
          this.loading = false
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    disabledDate(current) {
      return current && current >= this.$moment().startOf('day').add(1, 'days')
    },
    ...mapActions({
      changeLoading: 'data/rehabilitation/CHANGE_LOADING',
      getDatesRehabilitationPatient: 'data/rehabilitation/GET_DATES_REHABILITATIONS',
    }),
  },
  computed: {},
}
</script>

<style></style>
