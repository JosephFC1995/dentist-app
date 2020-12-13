<template>
  <div>
    <div class="form-general" v-if="form || newData">
      <a-form-model :model="form" ref="reason" :rules="rules">
        <a-row :gutter="16">
          <!-- Nombre -->
          <a-col :span="24" :md="24">
            <a-form-model-item label="Nombre" prop="name">
              <a-input v-model="form.name" :disabled="loading" />
            </a-form-model-item>
          </a-col>
          <!-- Sucursales -->
          <a-col :span="24" :md="12">
            <a-form-model-item label="Sucursales">
              <a-select
                placeholder="Seleccione una sucursal"
                :allowClear="true"
                :disabled="loading"
                ref="supplySelect"
                v-model="form.subsidiary"
              >
                <a-select-option v-for="item in subsidiarysArray" :key="item.id" :value="item.id">
                  {{ item.name }}
                </a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
          <!-- Fecha -->
          <a-col :span="24" :md="12">
            <a-form-model-item label="Fecha" class="with-button">
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
          <a-col :span="24" :md="24">
            <a-form-model-item label="Insumos">
              <a-select
                placeholder="Seleccione una sucursal"
                :allowClear="true"
                :disabled="loading"
                show-search
                :filter-option="filterOption"
                @change="changeSelectSupply"
                v-model="selectSupply"
                mode="multiple"
              >
                <a-select-option v-for="item in supplyArray" :key="item.id" :value="item.id">
                  {{ item.name }}
                </a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
          <a-divider dashed>
            <span :style="{ color: '#B9BABA', fontWeight: 600, fontSize: '14px' }"> Insumos agregados </span>
          </a-divider>
          <a-col :span="24" :md="24" class="mb-3" v-if="selectSupplyObject.length > 0">
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
            <a-row :gutter="16" class="custom--data" v-for="(suply, index) in selectSupplyObject" :key="index">
              <a-col :span="24" :md="12">
                <span class="label">
                  <a-form-model-item>
                    <a-input v-model="selectSupplyObject[index].name" :disabled="true" />
                  </a-form-model-item>
                </span>
              </a-col>
              <a-col :span="24" :md="8">
                <a-form-model-item>
                  <a-input v-model="selectSupplyObject[index].count" :disabled="loading" v-mask="'###'" placeholder="0" />
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
              {{ newData ? 'Agregar salida' : 'Editar salida' }}
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
import { find as findInObject, remove as removeInObject } from 'lodash'

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
      selectSupply: [],
      // selectSupplyObject: [],
      supplyArray: [
        {
          id: 1,
          name: 'Pasta dental',
          count: '',
        },
        {
          id: 2,
          name: 'Crema dental',
          count: '',
        },
      ],
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
    disabledDate(current) {
      return current && current >= this.$moment().startOf('day').add(1, 'days')
    },
    filterOption(input, option) {
      return option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
    },
    changeSelectSupply($event, $option) {
      this.selectSupplyObject = this.selectSupply.map((item) => {
        return this.findInObject(this.supplyArray, ['id', item])
      })
    },
    deleteSupply(id) {
      this.selectSupply = this.selectSupply.filter((item) => item != id)
    },
  },

  computed: {
    selectSupplyObject: {
      get: function () {
        return this.selectSupply.map((item) => {
          return this.findInObject(this.supplyArray, ['id', item])
        })
      },
      set: function (newValue) {
        return newValue
      },
    },
    ...mapState({
      subsidiarysArray: (state) => state.data.general.subsidiarys,
    }),
  },
}
</script>

<style></style>
