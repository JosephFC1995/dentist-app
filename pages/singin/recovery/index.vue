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
        <h4 class="mt-0 mb-1">Formuario de recuperación de contraseña</h4>
        <p class="text-color-200">Recuperar contraseña</p>
        <a-form-model :model="form">
          <a-row>
            <a-col :span="24">
              <a-form-model-item>
                <a-input v-model="form.email" placeholder="Correo" />
              </a-form-model-item>
            </a-col>

            <a-col :span="24">
              <a-button type="primary" html-type="submit"> Recuperar mi contraseña </a-button>
            </a-col>
          </a-row>
        </a-form-model>
        <br />
        <p class="mb-1">
          <nuxt-link :to="{ name: 'singin' }"> Iniciar sesión </nuxt-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // middleware: ['auth'],
  auth: 'guest',
  data() {
    return {
      title: 'Recuperar contraseña',
      form: {
        email: '',
        password: '',
        remember: true,
      },
    }
  },
  head() {
    return {
      title: this.title,
      meta: [],
    }
  },
}
</script>

<style></style>
