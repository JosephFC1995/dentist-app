<template>
  <div
    class="content--page--picture public-layout login background--cover"
    style="
      background-image: url(https://source.unsplash.com/OOE4xAnBhKo/1600x900);
    "
  >
    <div class="content--box">
      <div class="content--header">
        <div class="logo">
          <img
            src="http://medic-app-react.next-item.com/static/media/logo.5e5f1d31.svg"
            alt=""
            width="auto"
            height="auto"
            class="logo-img"
          />
        </div>
      </div>
      <div class="content--body">
        <h4 class="mt-0 mb-1">Login form</h4>
        <p class="text-color-200">Login to access your Account</p>
        <a-form-model :model="form">
          <a-row>
            <a-col :span="24">
              <a-form-model-item>
                <a-input v-model="form.email" placeholder="Correo" />
              </a-form-model-item>
            </a-col>
            <a-col :span="24">
              <a-form-model-item>
                <a-input
                  type="password"
                  v-model="form.password"
                  placeholder="Contraseña"
                />
              </a-form-model-item>
            </a-col>
            <a-col :span="24">
              <a-form-model-item>
                <a-switch v-model="form.remember" size="small" />
                <span class="ml-2">Recuérdame</span>
              </a-form-model-item>
            </a-col>
            <a-col :span="24">
              <a-button type="primary" html-type="submit">
                Iniciar sesión
              </a-button>
            </a-col>
          </a-row>
        </a-form-model>
        <br />
        <p class="mb-1">
          <nuxt-link :to="{ name: 'singin-recovery' }">
            ¿Se te olvidó tu contraseña?
          </nuxt-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: 'Iniciar sesión',
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
