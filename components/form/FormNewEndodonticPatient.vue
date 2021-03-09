<template>
  <div>
    <div class="form-general">
      <a-form-model :model="form" ref="form" :rules="rules">
        <a-row :gutter="16">
          <!-- Fecha -->
          <a-col :span="24" :md="24">
            <a-form-model-item label="Fecha" prop="date">
              <!-- <a-input v-model="form.date" :disabled="loading" placeholder="Fecha" /> -->
              <a-date-picker
                v-model="form.date"
                :disabled-date="disabledDate"
                placeholder="Seleccione una fecha"
                :showToday="false"
                format="YYYY-MM-DD"
                valueFormat="YYYY-MM-DD"
              />
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
  data() {
    return {
      loading: false,
      form: {},
      rules: {
        date: [
          {
            required: true,
            message: 'Por favor ingrese la fecha',
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
          let tempForm = this.form
          tempForm.id_patient = this.$route.params.id
          response = await this.$axios.$post(`/endodontics_patient`, tempForm).catch((errors) => {
            this.loading = false
          })

          if (response.success) {
            this.$message.success(response.message)
            this.changeLoading(true)
            await this.getDatesEndodonticsPatient({ id_patient: this.$route.params.id })
            this.form = {}
            this.changeLoading(false)
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
      changeLoading: 'data/endodontics/CHANGE_LOADING',
      getDatesEndodonticsPatient: 'data/endodontics/GET_DATES_ENDODONTICS',
    }),
  },
  computed: {},
}
</script>

<style></style>
