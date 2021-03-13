<template>
  <div>
    <div class="form-general" v-if="form || newData">
      <a-form-model :model="form" ref="reason" :rules="rules">
        <a-row :gutter="16">
          <!-- Nombre -->
          <a-col :span="24" :md="24">
            <a-form-model-item label="Nombre" prop="name">
              <a-input v-model="form.name" :disabled="loading" />
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-button type="primary" html-type="submit" @click="submitLogin" class="w-100" :loading="loading">
              {{ newData ? 'Agregar referido' : 'Editar referido' }}
            </a-button>
          </a-col>
        </a-row>
      </a-form-model>
    </div>
    <GeneralLoading v-else width="350px" />
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
        time: [
          {
            required: true,
            message: 'Por favor ingresar los minutos para el motivo',
            trigger: 'blur',
          },
        ],
      },
    }
  },
  methods: {
    submitLogin() {
      this.$refs.reason.validate(async (valid) => {
        if (valid) {
          let _self = this
          _self.loading = true
          let response = false
          if (!this.newData) {
            response = await _self.$axios.$put(`/referreds/${this.form.id}`, _self.form).catch((errors) => {
              _self.loading = false
            })
          } else {
            response = await _self.$axios.$post(`/referreds`, _self.form).catch((errors) => {
              _self.loading = false
            })
          }
          if (response.success) this.$message.success(response.message)
          _self.loading = false
          this.$store.dispatch('tables/referreds/GET_REFERREDS_TABLE')
          this.closeDrawer()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    closeDrawer() {
      this.$emit('close')
    },
  },
  computed: {},
}
</script>

<style></style>
