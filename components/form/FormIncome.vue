<template>
  <div>
    <div class="form-general" v-if="form || newData">
      <a-form-model :model="form" ref="reason" :rules="rules">
        <a-row :gutter="16">
          <!-- Sucursales -->
          <a-col :span="24" :md="12">
            <a-form-model-item label="Sucursal" prop="id_subsidiary">
              <a-select
                placeholder="Seleccione una sucursal"
                :allowClear="true"
                :disabled="loading"
                ref="supplySelect"
                v-model="form.id_subsidiary"
              >
                <a-select-option v-for="item in subsidiariesArray" :key="item.id" :value="item.id">
                  {{ item.name }}
                </a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
          <!-- Fecha -->
          <a-col :span="24" :md="12">
            <a-form-model-item label="Fecha" class="with-button" prop="date">
              <a-date-picker
                v-model="form.date"
                :disabled-date="disabledDate"
                placeholder="Seleccione una fecha"
                :showToday="false"
                :showTime="false"
                format="YYYY-MM-DD"
                valueFormat="YYYY-MM-DD"
              />
            </a-form-model-item>
          </a-col>
          <!-- Insumos -->
          <!-- <a-col :span="24" :md="24">
            <a-form-model-item label="Insumos">
              <a-select
                placeholder="Seleccione una sucursal"
                :allowClear="true"
                :disabled="loading"
                show-search
                :filter-option="filterOption"
                @change="changeSelectSupply"
                v-model="form.select_supply"
                mode="multiple"
              >
                <a-select-option v-for="item in supplyArray" :key="item.id" :value="item.id">
                  {{ item.name }}
                </a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col> -->
          <a-col :span="24" :md="24">
            <a-button type="dashed" html-type="submit" class="w-100 mt-4 mb-5" :loading="loading" @click="addSupply">
              Agregar insumo
            </a-button>
          </a-col>
          <a-divider dashed v-if="form.income_details.length > 0">
            <span :style="{ color: '#B9BABA', fontWeight: 600, fontSize: '14px' }"> Insumos agregados </span>
          </a-divider>
          <a-col :span="24" :md="24" class="mb-3" v-if="form.income_details.length > 0">
            <a-row :gutter="16" class="custom--data">
              <a-col :span="24" :md="12">
                <span class="label">Insumo</span>
              </a-col>
              <a-col :span="24" :md="8">
                <span class="label">Cantidad</span>
              </a-col>
              <a-col :span="24" :md="4">
                <span class="label">Acciones</span>
              </a-col>
            </a-row>
            <a-row :gutter="16" class="custom--data" v-for="(suply, index) in form.income_details" :key="index">
              <a-col :span="24" :md="12">
                <span class="label">
                  <a-form-model-item>
                    <!-- <a-input v-model="suply.name" :disabled="true" /> -->
                    <a-select
                      placeholder="Seleccione un insumo"
                      :allowClear="true"
                      :disabled="loading"
                      show-search
                      :filter-option="filterOption"
                      v-model="suply.id_supply"
                    >
                      <a-select-option v-for="item in supplyArray" :key="item.id" :value="item.id">
                        {{ item.name }}
                      </a-select-option>
                    </a-select>
                  </a-form-model-item>
                </span>
              </a-col>
              <a-col :span="24" :md="8">
                <a-form-model-item
                  :prop="'income_details.' + index + '.count'"
                  :rules="{
                    required: true,
                    message: 'Es importante colocar el total',
                    trigger: 'blur',
                  }"
                >
                  <a-input-number v-model="suply.count" :min="1" :disabled="loading" placeholder="0" />
                </a-form-model-item>
              </a-col>
              <a-col :span="24" :md="4">
                <a-button type="danger" size="small" @click="deleteSupply(suply.id)">
                  <span class="ico">
                    <i class="uil uil-trash-alt"></i>
                  </span>
                </a-button>
              </a-col>
            </a-row>
          </a-col>
          <a-col :span="24">
            <a-button type="primary" html-type="submit" @click="submitLogin" class="w-100" :loading="loading">
              {{ newData ? 'Agregar ingreso' : 'Editar ingreso' }}
            </a-button>
          </a-col>
        </a-row>
      </a-form-model>
    </div>
    <Loading v-else width="350px" />
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import { find as findInObject, remove as removeInObject } from 'lodash'
import _ from 'lodash'

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
      findInObject,
      removeInObject,
      loading: false,
      loadingAvatar: false,
      apiHost: process.env.apiHost,
      headers: {
        Authorization: this.$auth.strategy.token.get(),
      },
      rules: {
        id_subsidiary: [
          {
            required: true,
            message: 'Por favor seleccionar la sucursal',
            trigger: 'blur',
          },
        ],
        date: [
          {
            required: true,
            message: 'Por favor seleccionar una fecha',
            trigger: 'blur',
          },
        ],
      },
      selectSupply: [],
      // selectSupplyObject: [],
    }
  },
  methods: {
    submitLogin() {
      this.$refs.reason.validate(async (valid) => {
        if (valid) {
          if (this.form.income_details.length == 0) return this.$message.error('Es necesario selecionar al menos un insumo')
          let _self = this
          _self.loading = true
          let response = false
          if (!this.newData) {
            response = await _self.$axios.$put(`/incomes/${this.form.id}`, _self.form).catch((errors) => {
              _self.loading = false
            })
          } else {
            response = await _self.$axios.$post(`/incomes`, _self.form).catch((errors) => {
              _self.loading = false
            })
          }
          if (response.success) this.$message.success(response.message)
          _self.loading = false
          this.$store.dispatch('tables/incomes/GET_INCOMES_TABLE')
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
    disabledDate(current) {
      return current && current >= this.$moment().startOf('day').add(1, 'days')
    },
    filterOption(input, option) {
      return option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
    },
    addSupply() {
      this.form.income_details.push({
        key: Date.now(),
        count: '',
      })
    },
    deleteSupply(item) {
      let index = this.form.income_details.indexOf(item)
      if (index !== -1) {
        index = this.form.income_details.splice(index, 1)
      }
    },
  },

  computed: {
    ...mapGetters({
      subsidiariesArray: 'data/general/getSubsidiaries',
      supplyArray: 'data/general/getSupplies',
    }),
  },
}
</script>

<style></style>
