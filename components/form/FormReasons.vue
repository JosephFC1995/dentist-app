<template>
  <div>
    <div class="form-general" v-if="form || newData">
      <a-form-model :model="form" ref="reason" :rules="rules">
        <a-row :gutter="16">
          <!-- Nombre -->
          <a-col :span="24" :md="12">
            <a-form-model-item label="Nombre" prop="name">
              <a-input v-model="form.name" :disabled="loading" />
            </a-form-model-item>
          </a-col>
          <!-- Tiempo -->
          <a-col :span="24" :md="12">
            <a-form-model-item label="Tiempo" class="with-button" prop="time">
              <a-input-number v-model="form.time" :disabled="loading" :min="1" :max="120" :defaultValue="60" />
              <span class="ml-3" :style="{ fontSize: '12px', color: '#B9BABA' }"> minutos </span>
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-button type="primary" html-type="submit" @click="submitLogin" class="w-100" :loading="loading">
              {{ newData ? 'Agregar motivo' : 'Editar motivo' }}
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
    closeDrawer() {
      this.$emit('close')
    },
  },
  computed: {},
}
</script>

<style></style>
