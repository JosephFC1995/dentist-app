<template>
  <div
    class="content--page--picture public-layout login background--cover"
    style="background-image: url(https://source.unsplash.com/OOE4xAnBhKo/1600x900)"
  >
    <div class="content--box">
      <div class="content--header">
        <div class="logo">
          <img src="/assets/logo.svg" alt="" width="auto" height="auto" class="logo-img" />
        </div>
      </div>
      <div class="content--body">
        <h4 class="mt-0 mb-1">Formulario de logeo</h4>
        <p class="text-color-200">Entre para acceder a su cuenta</p>
        <a-form-model :model="form" :rules="rules" ref="loginForm">
          <a-row>
            <a-col :span="24">
              <a-form-model-item prop="email">
                <a-input v-model="form.email" placeholder="Correo" :disabled="loading" />
              </a-form-model-item>
            </a-col>
            <a-col :span="24">
              <a-form-model-item prop="password">
                <a-input type="password" v-model="form.password" placeholder="Contraseña" :disabled="loading" />
              </a-form-model-item>
            </a-col>
            <!-- <a-col :span="24">
              <a-form-model-item>
                <a-switch v-model="form.remember" size="small" />
                <span class="ml-2">Recuérdame</span>
              </a-form-model-item>
            </a-col> -->
            <a-col :span="24" class="mt-3">
              <a-button type="primary" html-type="submit" @click="submitLogin" :loading="loading"> Iniciar sesión </a-button>
            </a-col>
          </a-row>
        </a-form-model>
        <br />
        <p class="mb-1">
          <nuxt-link :to="{ name: 'singin-recovery' }"> ¿Se te olvidó tu contraseña? </nuxt-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // middleware: 'auth',
  data() {
    return {
      title: 'Iniciar sesión',
      loading: false,
      form: {
        email: '',
        password: '',
        remember: true,
      },
      rules: {
        email: [
          {
            required: true,
            message: 'Por favor agregue su correo electrónico',
            trigger: 'blur',
          },
          {
            type: 'email',
            message: 'Por favor ingrese un correo con formato válido',
            trigger: ['blur', 'change'],
          },
        ],
        password: [
          {
            required: true,
            message: 'Por favor agregue su contraseña',
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
    submitLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true
          this.$auth
            .loginWith('laravelJWT', {
              data: {
                email: this.form.email,
                password: this.form.password,
              },
            })
            .catch((err) => {
              this.loading = false
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
  },
}
</script>

<style></style>
