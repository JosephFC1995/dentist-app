<template>
  <div>
    <div class="form-general">
      <a-form-model :model="form" ref="form" :rules="rules">
        <a-row :gutter="16">
          <!-- Nombre -->
          <a-col :span="24" :md="24">
            <a-form-model-item label="Nombre" prop="name">
              <a-input v-model="form.name" :disabled="loading" placeholder="Nombre" />
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
import { mapState } from 'vuex'

export default {
  data() {
    return {
      loading: false,
      form: {},
      rules: {
        name: [
          {
            required: true,
            message: 'Por favor ingrese el motivo',
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
          let _self = this
          _self.loading = true
          let response = false
          if (!this.newData) {
            response = await _self.$axios.$post(`/referred`, _self.form).catch((errors) => {
              _self.loading = false
            })
          }
          _self.loading = false
          _self.$message.success(response.message)
          if (response.success) {
            _self.form = {}
            _self.$store.dispatch('data/general/GET_REFERREDS')
            _self.$emit('cancel')
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
  },
  computed: {},
}
</script>

<style></style>
