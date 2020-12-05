<template>
  <div class="form-general">
    <a-form-model :model="form" ref="newPacient">
      <a-row :gutter="16">
        <a-col :span="24" :md="12">
          <a-row :gutter="16">
            <a-col :span="24" :md="24">
              <h6 class="mt-0 mb-1" :style="{ color: '#B9BABA' }">Examen extraoral</h6>
            </a-col>
            <!-- Forma del cráneo -->
            <a-col :span="24" :md="24">
              <a-form-model-item label="Forma del cráneo">
                <a-select
                  placeholder="Seleccione una opción"
                  :options="craneoArray"
                  v-model="form.skull"
                  :allowClear="true"
                  :disabled="loading"
                >
                </a-select>
              </a-form-model-item>
            </a-col>
            <!-- Forma del cara -->
            <a-col :span="24" :md="24">
              <a-form-model-item label="Forma del cara">
                <a-select
                  placeholder="Seleccione una opción"
                  :options="caraArray"
                  v-model="form.face"
                  :allowClear="true"
                  :disabled="loading"
                >
                </a-select>
              </a-form-model-item>
            </a-col>
            <!--  Perfil anteposterior -->
            <a-col :span="24" :md="24">
              <a-form-model-item label="Perfil anteposterior">
                <a-input v-model="form.profileAnte" :disabled="loading" />
              </a-form-model-item>
            </a-col>
            <!--  Perfil anteposterior -->
            <a-col :span="24" :md="24">
              <h6 class="mt-0 mb-1" :style="{ color: '#000' }">ATM</h6>
            </a-col>
            <a-col :span="24" :md="24">
              <a-form-model-item label="Derecha" :label-col="{ span: 6 }" labelAlign="left">
                <a-radio-group v-model="form.atmRight">
                  <a-radio :value="1" :disabled="loading"> Dolor </a-radio>
                  <a-radio :value="2" :disabled="loading"> No dolor </a-radio>
                </a-radio-group>
              </a-form-model-item>
            </a-col>
            <a-col :span="24" :md="24">
              <a-form-model-item label="Izquierda" :label-col="{ span: 6 }" labelAlign="left">
                <a-radio-group v-model="form.atmLeft">
                  <a-radio :value="1" :disabled="loading"> Dolor </a-radio>
                  <a-radio :value="2" :disabled="loading"> No dolor </a-radio>
                </a-radio-group>
              </a-form-model-item>
            </a-col>
            <!-- Simetría -->
            <a-col :span="24" :md="24">
              <a-form-model-item label="Simetría">
                <a-select
                  placeholder="Seleccione una opción"
                  :options="simetriaArray"
                  v-model="form.symmetry"
                  :allowClear="true"
                  :disabled="loading"
                >
                </a-select>
              </a-form-model-item>
            </a-col>
            <!--  Línea media -->

            <a-col :span="24" :md="24">
              <a-form-model-item label="Línea media" :label-col="{ span: 6 }" labelAlign="left">
                <a-radio-group v-model="form.lineMiddle">
                  <a-radio :value="1" :disabled="loading"> Coincidente </a-radio>
                  <a-radio :value="2" :disabled="loading"> No coincidente </a-radio>
                </a-radio-group>
              </a-form-model-item>
            </a-col>
            <a-col :span="24" :md="24">
              <a-form-model-item label="Perfil anteposterior" class="with-button">
                <a-input v-model="form.profileAnte" :disabled="loading" />
                <span class="ml-3" :style="{ fontSize: '12px', color: '#B9BABA' }"> mm. </span>
              </a-form-model-item>
            </a-col>
          </a-row>
        </a-col>
        <a-col :span="24" :md="12">
          <a-row :gutter="16">
            <a-col :span="24" :md="24">
              <h6 class="mt-0 mb-1" :style="{ color: '#B9BABA' }">Examen dentolabial</h6>
            </a-col>
            <!-- Tipo de sonrisa -->
            <a-col :span="24" :md="24">
              <a-form-model-item label="Tipo de sonrisa">
                <a-select
                  placeholder="Seleccione una opción"
                  :options="smileArray"
                  v-model="form.smileTipe"
                  :allowClear="true"
                  :disabled="loading"
                >
                </a-select>
              </a-form-model-item>
            </a-col>
            <!--  Exposición de diente en reposo -->
            <a-col :span="24" :md="24">
              <h6 class="mt-0 mb-3" :style="{ color: '#000' }">Exposición de diente en reposo</h6>
            </a-col>
            <a-col :span="24" :md="24">
              <a-form-model-item class="with-button">
                <span class="mr-3" :style="{ fontSize: '12px', color: '#B9BABA' }"> Superior </span>
                <a-input v-model="form.restingToothTop" :disabled="loading" />
                <span class="ml-3" :style="{ fontSize: '12px', color: '#B9BABA' }"> mm. </span>
              </a-form-model-item>
            </a-col>
            <a-col :span="24" :md="24">
              <a-form-model-item class="with-button">
                <span class="mr-3" :style="{ fontSize: '12px', color: '#B9BABA' }"> Inferior </span>
                <a-input v-model="form.restingToothBottom" :disabled="loading" />
                <span class="ml-3" :style="{ fontSize: '12px', color: '#B9BABA' }"> mm. </span>
              </a-form-model-item>
            </a-col>
            <!--  Compatibilidad con edad y sexo -->
            <a-col :span="24" :md="24">
              <h6 class="mt-0 mb-3" :style="{ color: '#000' }">Compatibilidad con edad y sexo</h6>
            </a-col>
            <!-- Línea de sonrisa -->
            <a-col :span="24" :md="24">
              <a-form-model-item label="Línea de sonrisa">
                <a-select
                  placeholder="Seleccione una opción"
                  :options="lineaSonrisaArray"
                  v-model="form.smileLine"
                  :allowClear="true"
                  :disabled="loading"
                >
                </a-select>
              </a-form-model-item>
            </a-col>
            <!-- Angulo naso labial -->
            <a-col :span="24" :md="24">
              <a-form-model-item label="Angulo naso labial">
                <a-select
                  placeholder="Seleccione una opción"
                  :options="anguloNasalArray"
                  v-model="form.labialAngle"
                  :allowClear="true"
                  :disabled="loading"
                >
                </a-select>
              </a-form-model-item>
            </a-col>
            <!-- Tipo de labio -->
            <a-col :span="24" :md="24">
              <a-form-model-item label="Tipo de labio">
                <a-select
                  placeholder="Seleccione una opción"
                  :options="tipoLabioArray"
                  v-model="form.lipType"
                  :allowClear="true"
                  :disabled="loading"
                >
                </a-select>
              </a-form-model-item>
            </a-col>
            <!-- Corredor bucal -->
            <a-col :span="24" :md="24">
              <a-form-model-item label="Corredor bucal">
                <a-select
                  placeholder="Seleccione una opción"
                  :options="corredoBucalArray"
                  v-model="form.buccalCorridor"
                  :allowClear="true"
                  :disabled="loading"
                >
                </a-select>
              </a-form-model-item>
            </a-col>
          </a-row>
        </a-col>

        <a-col :span="24" :md="24">
          <h6 class="mt-0 mb-1" :style="{ color: '#B9BABA' }">Examen dentogingival</h6>
        </a-col>
        <!-- Posición de cenit -->
        <a-col :span="24" :md="24">
          <a-form-model-item label="Posición de cenit">
            <a-select
              placeholder="Seleccione una opción"
              :options="posicionCenitArray"
              v-model="form.positionCenit"
              :allowClear="true"
              :disabled="loading"
            >
            </a-select>
          </a-form-model-item>
        </a-col>
        <!--  Papilas ausentes -->
        <a-col :span="24" :md="24">
          <a-form-model-item label="Papilas ausentes">
            <a-radio-group v-model="form.papillaeAbsent">
              <a-radio :value="1" :disabled="loading"> Si </a-radio>
              <a-radio :value="2" :disabled="loading"> No </a-radio>
            </a-radio-group>
          </a-form-model-item>
        </a-col>
        <a-col :span="24" :md="24">
          <a-form-model-item class="with-button">
            <a-input v-model="form.papillaeAbsentNo" :disabled="loading" placeholder="Pieza" />
          </a-form-model-item>
        </a-col>
        <!--  Paralelismo de cenit -->
        <a-col :span="24" :md="12">
          <a-form-model-item label="Paralelismo de cenit">
            <a-radio-group v-model="form.parallelismCenit">
              <a-radio :value="1" :disabled="loading"> Si </a-radio>
              <a-radio :value="2" :disabled="loading"> No </a-radio>
            </a-radio-group>
          </a-form-model-item>
        </a-col>
        <!--  Fenotipo gingival -->
        <a-col :span="24" :md="12">
          <a-form-model-item label="Fenotipo gingival">
            <a-radio-group v-model="form.gingival">
              <a-radio :value="1" :disabled="loading"> Fino </a-radio>
              <a-radio :value="2" :disabled="loading"> Grueso </a-radio>
            </a-radio-group>
          </a-form-model-item>
        </a-col>
        <a-col :span="24" :md="24">
          <h6 class="mt-0 mb-1" :style="{ color: '#B9BABA' }">Alteraciones dentales</h6>
        </a-col>
        <!--  Desgastes -->
        <a-col :span="24" :md="12">
          <a-form-model-item label="Desgastes">
            <a-radio-group v-model="form.wear">
              <a-radio :value="1" :disabled="loading"> Si </a-radio>
              <a-radio :value="2" :disabled="loading"> No </a-radio>
            </a-radio-group>
          </a-form-model-item>
        </a-col>
        <!--  alteracion de color -->
        <a-col :span="24" :md="12">
          <a-form-model-item label="alteracion de color">
            <a-radio-group v-model="form.color">
              <a-radio :value="1" :disabled="loading"> Si </a-radio>
              <a-radio :value="2" :disabled="loading"> No </a-radio>
            </a-radio-group>
          </a-form-model-item>
        </a-col>
        <!--  alteracion de forma -->
        <a-col :span="24" :md="12">
          <a-form-model-item label="alteracion de forma">
            <a-radio-group v-model="form.shape">
              <a-radio :value="1" :disabled="loading"> Si </a-radio>
              <a-radio :value="2" :disabled="loading"> No </a-radio>
            </a-radio-group>
          </a-form-model-item>
        </a-col>

        <a-col :span="24">
          <a-button type="primary" html-type="submit"> Guardar </a-button>
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
      craneoArray: [
        { value: 1, label: 'Dolicio' },
        { value: 2, label: 'Céfalo' },
        { value: 3, label: 'Mesocéfalo' },
        { value: 4, label: 'Braquicéfalo' },
      ],
      caraArray: [
        { value: 1, label: 'Dolifacial' },
        { value: 2, label: 'Mesofacial' },
        { value: 3, label: 'Braquifacial' },
      ],
      simetriaArray: [
        { value: 1, label: 'Simetrio' },
        { value: 2, label: 'Asimetrico' },
      ],
      smileArray: [
        { value: 1, label: 'Alto' },
        { value: 2, label: 'Media' },
        { value: 3, label: 'Baja' },
      ],
      lineaSonrisaArray: [
        { value: 1, label: 'Paralela' },
        { value: 2, label: 'Recta' },
        { value: 3, label: 'Invertida' },
      ],
      anguloNasalArray: [
        { value: 1, label: 'Aumentado' },
        { value: 2, label: 'Disminuido' },
        { value: 3, label: 'Normal' },
      ],
      tipoLabioArray: [
        { value: 1, label: 'Delgado' },
        { value: 2, label: 'Medio' },
        { value: 3, label: 'Grueso' },
      ],
      corredoBucalArray: [
        { value: 1, label: 'Presnte' },
        { value: 2, label: 'Ausente' },
        { value: 3, label: 'Simétrico' },
        { value: 4, label: 'Asimétrico' },
      ],
      posicionCenitArray: [
        { value: 1, label: 'Concordantes' },
        { value: 2, label: 'No concordantes' },
      ],
    }
  },
  methods: {},
}
</script>

<style></style>
