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
        <h4 class="mt-0 mb-1">Contraseña nueva</h4>
        <p class="text-color-200">Hola {{ response.data.name }}, ingrese su nueva contraseña</p>
        <a-form-model :model="form" ref="form" :rules="rules" autocomplete="off">
          <a-row>
            <a-col :span="24">
              <a-form-model-item prop="password">
                <a-input-password
                  v-model="form.password"
                  placeholder="Contraseña"
                  type="password"
                  autocomplete="off"
                  :disabled="loading"
                />
              </a-form-model-item>
            </a-col>
            <a-col :span="24">
              <a-form-model-item prop="password_validator">
                <a-input
                  v-model="form.password_validator"
                  placeholder="Repetir Contraseña"
                  :disabled="!passwordValidation.valid || loading"
                  type="password"
                  autocomplete="off"
                />
              </a-form-model-item>
            </a-col>
            <a-col :span="24">
              <div class="alert_learning danger mb-3" style="padding: 1rem 0" v-if="!passwordValidation.valid">
                <div class="body_alert">
                  <div class="ico">
                    <span>
                      <i class="uil uil-exclamation-circle"></i>
                    </span>
                  </div>
                  <div class="til info--valid-condi">
                    <p v-for="(error, index) in passwordValidation.errors" :key="index">{{ error }}</p>
                  </div>
                </div>
              </div>
            </a-col>
            <transition name="fade">
              <a-col :span="24" v-show="passwordValidation.valid">
                <a-button type="primary" html-type="submit" :loading="loading" @click="submit"> Actualizar</a-button>
              </a-col>
            </transition>
          </a-row>
        </a-form-model>
        <br />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'

export default {
  async asyncData({ params, query, $axios, error, redirect }) {
    let tkn = query.tkn
    if (!tkn) return redirect('/singin')
    let response = await $axios.$post(`/auth/validate-token`, { token: tkn }).catch((errors) => {})
    if (response.error) error({ statusCode: 404, message: response.message })
    return {
      tkn: tkn,
      response: response,
    }
  },
  auth: 'guest',
  data() {
    let validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Por favor ingrese la contraseña'))
      } else {
        if (this.form.password_validator !== '') {
          this.$refs.form.validateField('password_validator')
        }
        callback()
      }
    }
    let validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Ingrese la contraseña nuevamente'))
      } else if (value !== this.form.password) {
        callback(new Error('¡Las dos entradas no coinciden!'))
      } else {
        callback()
      }
    }
    return {
      loading: false,
      title: 'Recuperar contraseña',
      form: {
        password: '',
        password_validator: '',
      },
      rules: {
        password: [{ validator: validatePass, trigger: 'change' }],
        password_validator: [{ validator: validatePass2, trigger: 'change' }],
      },
      rules_password: [
        { message: 'Se requiere una letra minúscula.', regex: /[a-z]+/ },
        { message: 'Se requiere una letra mayúscula.', regex: /[A-Z]+/ },
        { message: 'Se requiere 8 carácteres como mínimo.', regex: /.{8,}/ },
        { message: 'Se requiere un número requerido.', regex: /[0-9]+/ },
      ],
    }
  },
  computed: {
    passwordValidation() {
      let errors = []
      for (let condition of this.rules_password) {
        if (!condition.regex.test(this.form.password)) {
          errors.push(condition.message)
        }
      }
      if (errors.length === 0) {
        this.password_validator = false
        return { valid: true, errors }
      } else {
        this.password_validator = true
        return { valid: false, errors }
      }
    },
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
          let tempForm = {
            ...this.form,
            token: this.tkn,
          }
          response = await this.$axios.$post(`/auth/change-password`, tempForm).catch((errors) => {
            this.loading = false
          })
          this.loading = false
          if (response.success) {
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

<style scoped>
.content--body {
  display: block !important;
  margin-top: 2rem;
}
.fade-enter-active {
  transition: opacity 0.2s;
}
.fade-leave-active {
  transition: none;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.alert_learning .ico {
  position: absolute;
  top: 0;
  right: 0rem;
  opacity: 0.2;
  font-size: 5rem;
}

.alert_learning {
  width: 100%;
  padding: 2rem 1rem;
  background: #ccc;
  border-radius: 0.5rem;
  text-align: left;
  color: white;
  position: relative;
  margin-bottom: 1rem;
}

.alert_learning .til {
  color: #ffffff;
  font-size: 0.9rem;
  font-weight: 400;
  margin-left: 2rem;
  letter-spacing: 1px;
}

.alert_learning.info .til {
  color: #a77c0d;
}

.alert_learning.success {
  background: #a1e8a1;
}

.alert_learning.success .ico svg {
  fill: #87d687;
}

.alert_learning.info {
  background: #f7c646;
}

.alert_learning.danger {
  background: #fb6340;
}

.info--valid-condi {
  /* padding: 1rem .5rem;
    background: #FB6340; */
  border-radius: 0.5rem;
  /* margin-bottom: 1rem; */
  color: white;
  font-size: 0.9rem;
  font-weight: 600;
}

.info--valid-condi p {
  margin: 0;
}
</style>
