<template>
  <div class="form-general">
    <a-form-model :model="form" ref="odontogram">
      <div class="custom--data">
        <h6 class="mt-0 mb-1" :style="{ color: '#B9BABA' }">Doctor</h6>
        <span class="data" :style="{ color: '#000' }">
          {{ this.$auth.user.name }} {{ this.$auth.user.last_name ? this.$auth.user.last_name : '' }}
        </span>
      </div>
      <h6 class="mt-0 mb-1" :style="{ color: '#B9BABA' }">Odontogram</h6>
      <OdontogramMain class="pb-5" />
      <!-- <h6 class="mt-0 mb-1" :style="{ color: '#B9BABA' }">Extras</h6>
      <a-row :gutter="16">
        <a-col :span="24">
          <a-form-model-item label="Especificaciones">
            <a-textarea v-model="form.specification" :rows="4" />
          </a-form-model-item>
        </a-col>
        <a-col :span="24">
          <a-form-model-item label="Observaciones">
            <a-textarea v-model="form.observation" :rows="4" />
          </a-form-model-item>
        </a-col>
      </a-row> -->
    </a-form-model>
  </div>
</template>

<script>
import OdontogramMain from '~/components/sections/odontogram/OdontogramMain'

export default {
  components: {
    OdontogramMain,
  },
  data() {
    return {
      loading: false,
      form: {},
    }
  },
}
</script>

<style></style>
