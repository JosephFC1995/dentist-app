<template>
  <div class="form-general">
    <a-form-model :model="form" ref="form">
      <h6 class="mt-0 mb-1" :style="{ color: '#B9BABA' }">Preguntas</h6>
      <a-row :gutter="16">
        <a-col :span="24" :md="24">
          <a-form-model-item label="Diente">
            <a-select
              show-search
              option-filter-prop="children"
              placeholder="Seleccione un diente"
              v-model="form.id_dent"
              :disabled="loading"
              :filter-option="filterOption"
            >
              <a-select-option v-for="item in dents" :key="item.id" :value="item.id">
                {{ item.name }}
              </a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
        <a-col :span="24" :md="24" v-for="(question, index_q) in questions" :key="index_q">
          <a-form-model-item :label="question.question">
            <a-radio-group v-model="form[question.value]">
              <a-radio
                :value="alternative.id"
                v-for="alternative in question.alternatives"
                :key="alternative.id"
                :disabled="loading || !form.id_dent"
              >
                {{ alternative.label }}
              </a-radio>
            </a-radio-group>
          </a-form-model-item>
        </a-col>

        <a-col :span="24" :md="24">
          <a-form-model-item label="Historia de dolor">
            <a-radio-group v-model="form.pain_history">
              <a-radio :value="1" :disabled="loading || !form.id_dent"> Si </a-radio>
              <a-radio :value="2" :disabled="loading || !form.id_dent"> No </a-radio>
            </a-radio-group>
          </a-form-model-item>
        </a-col>
        <a-col :span="24" :md="24">
          <a-form-model-item>
            <a-checkbox-group v-model="form.temperature">
              <a-checkbox
                :value="temperature.value"
                :name="String(temperature.value)"
                v-for="temperature in temperaturesArray"
                :key="temperature.value"
                :disabled="loading || !form.id_dent || form.pain_history == 2 || !form.pain_history"
              >
                {{ temperature.label }}
              </a-checkbox>
            </a-checkbox-group>
          </a-form-model-item>
        </a-col>
        <a-col :span="24" :md="24">
          <a-form-model-item>
            <a-radio-group v-model="form.time">
              <a-radio :value="1" :disabled="loading || !form.id_dent || form.pain_history == 2 || !form.pain_history">
                Días
              </a-radio>
              <a-radio :value="2" :disabled="loading || !form.id_dent || form.pain_history == 2 || !form.pain_history">
                Semanas
              </a-radio>
              <a-radio :value="3" :disabled="loading || !form.id_dent || form.pain_history == 2 || !form.pain_history">
                Meses
              </a-radio>
            </a-radio-group>
          </a-form-model-item>
        </a-col>
        <a-col :span="24">
          <a-form-model-item label="Notas">
            <a-textarea v-model="form.notes" :rows="4" :disabled="loading || !form.id_dent" />
          </a-form-model-item>
        </a-col>
        <a-col :span="24">
          <a-button type="primary" html-type="submit" @click="submit" :loading="loading" :disabled="!form.id_dent">
            Guardar cita
          </a-button>
        </a-col>
      </a-row>
    </a-form-model>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'

export default {
  props: {
    form: {
      type: Object,
      default: {},
    },
    newData: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      loading: false,
      dienteArray: [
        { value: 1, label: 'DNI' },
        { value: 2, label: 'Pasaporte' },
      ],
      questions: [
        {
          question: 'Tratamiento dental previo',
          key: 'previous_dental_treatment',
          value: 'previous_dental_treatment',
          alternatives: [
            {
              id: 1,
              label: 'Si',
            },
            {
              id: 2,
              label: 'No',
            },
          ],
        },
        {
          question: 'Tratamiento endodóntico previo',
          key: 'previous_endodontic_treatment',
          value: 'previous_endodontic_treatment',
          alternatives: [
            {
              id: 1,
              label: 'Si',
            },
            {
              id: 2,
              label: 'No',
            },
          ],
        },
        {
          question: 'Trauma dental',
          key: 'dental_trauma',
          value: 'dental_trauma',
          alternatives: [
            {
              id: 1,
              label: 'Si',
            },
            {
              id: 2,
              label: 'No',
            },
          ],
        },
      ],
      temperaturesArray: [
        {
          label: 'Frío',
          value: 1,
        },
        {
          label: 'Calor',
          value: 2,
        },
        {
          label: 'Masticación',
          value: 3,
        },
      ],
    }
  },
  methods: {
    filterOption(input, option) {
      return option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
    },
    submit() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          this.loading = true
          let response = false
          if (!this.newData) {
            response = await this.$axios.$put(`/endodontic_dental_history/${this.form.id}`, this.form).catch((errors) => {
              this.loading = false
            })
          } else {
            response = await this.$axios.$post(`/endodontic_dental_history`, this.form).catch((errors) => {
              this.loading = false
            })
          }
          this.loading = false
          this.$message.success(response.message)
          if (response.success) {
            this.$emit('close')
            this.$emit('reload')
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
  },
  computed: {
    ...mapGetters({
      dents: 'data/dents/getDents',
      id_endodontic: 'data/endodontics/getIDSelectEndodontic',
    }),
  },
}
</script>

<style></style>
