<template>
  <div
    class="content--page--picture public-layout login background--cover"
    :style="{ backgroundImage: `url(${company.portada ? company.portada.url : +''})` }"
  >
    <div class="content--box">
      <div class="content--header">
        <div class="logo">
          <img
            :src="company.avatar ? company.avatar.url : +'/assets/images/logo.jpeg'"
            alt=""
            width="auto"
            height="auto"
            class="logo-img"
          />
        </div>
      </div>
      <div class="content--body">
        <h4 class="mt-0 mb-1">Formulario de recuperación de contraseña</h4>
        <p class="text-color-200">Recuperar contraseña</p>
        <a-form-model :model="form" ref="form" :rules="rules">
          <a-row>
            <a-col :span="24">
              <a-form-model-item prop="name">
                <a-input v-model="form.email" placeholder="Correo" />
              </a-form-model-item>
            </a-col>

            <a-col :span="24">
              <a-button type="primary" html-type="submit" @click="submit" :loading="loading"> Recuperar mi contraseña </a-button>
            </a-col>
          </a-row>
        </a-form-model>
        <br />
        <p class="mb-1">
          <nuxt-link :to="{ name: 'singin' }" :disabled="loading"> Regresar para iniciar sesión. </nuxt-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'

export default {
  auth: 'guest',
  data() {
    return {
      loading: false,
      title: 'Recuperar contraseña',
      form: {
        email: '',
      },
      rules: {
        email: [
          {
            required: true,
            message: 'Por favor ingrese su correo de usuario.',
            trigger: 'blur',
          },
        ],
      },
    }
  },
  head() {
    return {
      title: this.title,
      meta: [],
    }
  },
  methods: {
    submit() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          this.loading = true
          let response = false
          response = await this.$axios.$post(`/auth/recover-password`, this.form).catch((errors) => {
            this.loading = false
          })
          this.loading = false
          if (response.success) {
            this.$refs.form.resetFields()
            this.$router.push({
              name: 'singin',
            })
          }
          this.$message.success(response.message)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
  },
  computed: {
    ...mapGetters({
      company: 'data/company/getCompany',
    }),
  },
}
</script>

<style></style>
