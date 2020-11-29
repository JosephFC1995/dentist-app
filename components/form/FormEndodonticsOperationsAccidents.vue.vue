<template>
  <div class="form-general">
    <a-form-model :model="form" ref="newPacient">
      <a-row :gutter="16">
        <a-col :span="24" :md="24">
          <a-form-model-item label="Tratamientos indicatos">
            <a-checkbox-group v-model="form.indicativeTreatments" :style="{ width: '100%' }">
              <a-row :gutter="16">
                <a-col :span="24" :md="12">
                  <a-checkbox :value="1" :disabled="loading" :style="vertical"> Acceso inadecuado </a-checkbox>
                </a-col>
                <a-col :span="24" :md="12">
                  <a-checkbox :value="2" :disabled="loading" :style="vertical"> Escalón </a-checkbox>
                </a-col>
                <a-col :span="24" :md="12">
                  <a-checkbox :value="3" :disabled="loading" :style="vertical"> Transportación </a-checkbox>
                </a-col>
                <a-col :span="24" :md="12">
                  <a-checkbox :value="4" :disabled="loading" :style="vertical"> Perforación en cámara </a-checkbox>
                </a-col>
                <a-col :span="24" :md="12">
                  <a-checkbox :value="5" :disabled="loading" :style="vertical"> Perforación en conducto </a-checkbox>
                </a-col>
                <a-col :span="24" :md="12">
                  <a-checkbox :value="6" :disabled="loading" :style="vertical"> Insrumento fracturado </a-checkbox>
                </a-col>
                <a-col :span="24" :md="12">
                  <a-checkbox :value="7" :disabled="loading" :style="vertical"> Sobre instrumentación </a-checkbox>
                </a-col>
                <a-col :span="24" :md="12">
                  <a-checkbox :value="8" :disabled="loading" :style="vertical"> Subinstrumentación </a-checkbox>
                </a-col>
                <a-col :span="24" :md="12">
                  <a-checkbox :value="9" :disabled="loading" :style="vertical"> Sobreobsturación </a-checkbox>
                </a-col>
                <a-col :span="24" :md="12">
                  <a-checkbox :value="10" :disabled="loading" :style="vertical"> Subobturación </a-checkbox>
                </a-col>
                <a-col :span="24" :md="12">
                  <a-checkbox :value="11" :disabled="loading" :style="vertical"> Obsturación inadecuada </a-checkbox>
                </a-col>
                <a-col :span="24" :md="12">
                  <a-checkbox :value="12" :disabled="loading" :style="vertical"> Fractura coronaria </a-checkbox>
                </a-col>
                <a-col :span="24" :md="12">
                  <a-checkbox :value="13" :disabled="loading" :style="vertical"> Fractura vertical </a-checkbox>
                </a-col>
                <a-col :span="24" :md="12">
                  <a-checkbox :value="14" :disabled="loading" :style="vertical"> Extrucsión de cemento </a-checkbox>
                </a-col>
                <a-col :span="24" :md="12">
                  <a-checkbox :value="15" :disabled="loading" :style="vertical"> Extrucsión de hipoclorito </a-checkbox>
                </a-col>
                <a-col :span="24" :md="12">
                  <a-checkbox :value="16" :disabled="loading" :style="vertical"> Sin dominio de técnica </a-checkbox>
                </a-col>
                <a-col :span="24" :md="12">
                  <a-checkbox :value="17" :disabled="loading" :style="vertical"> Favorable </a-checkbox>
                </a-col>
                <a-col :span="24" :md="12">
                  <a-checkbox :value="18" :disabled="loading" :style="vertical"> Desfaborable </a-checkbox>
                </a-col>
                <a-col :span="24" :md="12">
                  <a-checkbox :value="19" :disabled="loading" :style="vertical"> Reservado </a-checkbox>
                </a-col>
                <a-col :span="24" :md="12">
                  <a-checkbox :value="-1" :disabled="loading" :style="vertical"> Otro </a-checkbox>
                </a-col>
              </a-row>
            </a-checkbox-group>
          </a-form-model-item>
        </a-col>
        <a-col :span="24" :md="24">
          <a-form-model-item>
            <a-input
              v-model="form.indicativeTreatmentsOther"
              placeholder="Otro"
              :disabled="loading || form.indicativeTreatments != -1"
            />
          </a-form-model-item>
        </a-col>
        <a-col :span="24" class="d-flex justify-content-end">
          <a-button type="primary" html-type="submit">
            <span> <i class="uil uil-save mr-1"></i> Guardar </span>
          </a-button>
        </a-col>
      </a-row>
    </a-form-model>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      form: {},
      vertical: {
        display: 'block',
        height: '30px',
        lineHeight: '30px',
        marginLeft: '10px',
        marginBottom: '10px',
      },
      horizontal: {
        height: '30px',
        lineHeight: '30px',
        marginLeft: '0',
        marginRight: '10px',
        marginBottom: '7px',
      },
    }
  },
  methods: {},
  watch: {},
}
</script>

<style></style>
