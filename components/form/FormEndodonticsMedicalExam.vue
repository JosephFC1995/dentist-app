<template>
  <div class="form-general">
    <a-form-model :model="form" ref="newPacient">
      <h6 class="mt-0 mb-1" :style="{ color: '#B9BABA' }">Preguntas</h6>
      <a-row :gutter="16">
        <!-- Corona anatómica -->
        <a-col :span="24" :md="24">
          <a-form-model-item label="Corona anatómica">
            <a-checkbox-group v-model="form.anatomicalCrown">
              <a-checkbox :value="1" name="Caries" :disabled="loading"> Caries </a-checkbox>
              <a-checkbox :value="2" name="Restauración" :disabled="loading"> Restauración </a-checkbox>
              <a-checkbox :value="3" name="Bruximo" :disabled="loading"> Bruximo </a-checkbox>
              <a-checkbox :value="4" name="Fractura" :disabled="loading"> Fractura </a-checkbox>
              <a-checkbox :value="5" name="Fractura y exposición pulpar" :disabled="loading">
                Fractura y exposición pulpar
              </a-checkbox>
            </a-checkbox-group>
          </a-form-model-item>
        </a-col>
        <!-- Inflamación presente -->
        <a-col :span="24" :md="24">
          <a-form-model-item label="Inflamación presente">
            <a-radio-group v-model="form.inflammationPresent_radio">
              <a-radio :value="1" :disabled="loading"> Si </a-radio>
              <a-radio :value="2" :disabled="loading"> No </a-radio>
            </a-radio-group>
          </a-form-model-item>
        </a-col>
        <a-col :span="24" :md="24">
          <a-form-model-item>
            <a-checkbox-group v-model="form.inflammationPresent_check">
              <a-checkbox :value="1" name="Ensía vestibular" :disabled="loading || form.inflammationPresent_radio != 1">
                Ensía vestibular
              </a-checkbox>
              <a-checkbox :value="2" name="Encía lingual / palatina" :disabled="loading || form.inflammationPresent_radio != 1">
                Encía lingual / palatina
              </a-checkbox>
              <a-checkbox :value="3" name="Facial" :disabled="loading || form.inflammationPresent_radio != 1">
                Facial
              </a-checkbox>
            </a-checkbox-group>
          </a-form-model-item>
        </a-col>
        <!-- Gingivitis -->
        <a-col :span="24" :md="12">
          <a-form-model-item label="Gingivitis">
            <a-radio-group v-model="form.gingivitis">
              <a-radio :value="1" :disabled="loading"> Si </a-radio>
              <a-radio :value="2" :disabled="loading"> No </a-radio>
            </a-radio-group>
          </a-form-model-item>
        </a-col>
        <!-- Sarro -->
        <a-col :span="24" :md="12">
          <a-form-model-item label="Sarro">
            <a-radio-group v-model="form.sarro">
              <a-radio :value="1" :disabled="loading"> Si </a-radio>
              <a-radio :value="2" :disabled="loading"> No </a-radio>
            </a-radio-group>
          </a-form-model-item>
        </a-col>
        <!-- Fisura -->
        <a-col :span="24" :md="24">
          <a-form-model-item label="Fisura">
            <a-radio-group v-model="form.fisure_radio">
              <a-radio :value="1" :disabled="loading"> Si </a-radio>
              <a-radio :value="2" :disabled="loading"> No </a-radio>
            </a-radio-group>
          </a-form-model-item>
        </a-col>
        <a-col :span="24" :md="24">
          <a-form-model-item>
            <a-checkbox-group v-model="form.fisure_check">
              <a-checkbox :value="1" name="Vest." :disabled="loading || form.fisure_radio != 1"> Vest. </a-checkbox>
              <a-checkbox :value="2" name="Ling / Pal." :disabled="loading || form.fisure_radio != 1"> Ling. / Pal. </a-checkbox>
              <a-checkbox :value="3" name="Extraoral" :disabled="loading || form.fisure_radio != 1"> Extraoral </a-checkbox>
            </a-checkbox-group>
          </a-form-model-item>
        </a-col>
        <!-- Dolor presente -->
        <a-col :span="24" :md="24">
          <a-form-model-item label="Dolor presente">
            <a-radio-group v-model="form.painPresent_radio">
              <a-radio :value="1" :disabled="loading"> Si </a-radio>
              <a-radio :value="2" :disabled="loading"> No </a-radio>
            </a-radio-group>
          </a-form-model-item>
        </a-col>
        <a-col :span="24" :md="24">
          <a-form-model-item>
            <a-checkbox-group v-model="form.painPresent_check">
              <a-checkbox
                :value="pain.id"
                :name="pain.name"
                :disabled="loading || form.painPresent_radio != 1"
                v-for="pain in painPresentArray"
                :key="pain.id"
                :style="horizontal"
              >
                {{ pain.name }}
              </a-checkbox>
            </a-checkbox-group>
          </a-form-model-item>
        </a-col>
        <!-- Dolor a la percusión -->
        <a-col :span="24" :md="24">
          <a-form-model-item label="Dolor a la percusión">
            <a-checkbox-group v-model="form.painOnPercussion">
              <a-checkbox :value="1" name="Vertical" :disabled="loading"> Vertical </a-checkbox>
              <a-checkbox :value="2" name="Horizontal" :disabled="loading"> Horizontal </a-checkbox>
            </a-checkbox-group>
          </a-form-model-item>
        </a-col>
        <!-- Dolor a la palpitación -->
        <a-col :span="24" :md="24">
          <a-form-model-item label="Dolor a la palpitación">
            <a-radio-group v-model="form.throbbingPain">
              <a-radio :value="1" :disabled="loading"> Vesticular </a-radio>
              <a-radio :value="2" :disabled="loading"> Lingual / Palatino </a-radio>
            </a-radio-group>
          </a-form-model-item>
        </a-col>
        <!-- Bolsas -->
        <a-col :span="24" :md="12">
          <a-form-model-item label="Bolsas">
            <a-radio-group v-model="form.bags">
              <a-radio :value="1" :disabled="loading"> Si </a-radio>
              <a-radio :value="2" :disabled="loading"> No </a-radio>
            </a-radio-group>
          </a-form-model-item>
        </a-col>
        <a-col :span="24" :md="12">
          <a-form-model-item label="Sondeo">
            <a-input v-model="form.sounding" placeholder="Sondeo" :disabled="loading" />
          </a-form-model-item>
        </a-col>
        <!-- Movilidad -->
        <a-col :span="24" :md="24">
          <a-form-model-item label="Movilidad">
            <a-radio-group v-model="form.move">
              <a-radio :value="1" :disabled="loading"> Normal </a-radio>
              <a-radio :value="2" :disabled="loading"> Grado I </a-radio>
              <a-radio :value="3" :disabled="loading"> Grado II </a-radio>
              <a-radio :value="4" :disabled="loading"> Grado III </a-radio>
            </a-radio-group>
          </a-form-model-item>
        </a-col>
        <a-col :span="24">
          <a-divider dashed> </a-divider>
        </a-col>
        <!-- Movilidad -->
        <a-col :span="24" :md="24">
          <h6 class="mt-0 mb-1" :style="{ color: '#000' }">Pruebas de vitalidad</h6>
          <a-row :gutter="24">
            <a-col :span="24" :md="12">
              <a-form-model-item>
                <a-checkbox-group v-model="form.vitalityTests_check">
                  <a-checkbox :value="1" name="Frio" :disabled="loading"> Frio </a-checkbox>
                </a-checkbox-group>
              </a-form-model-item>
              <a-form-model-item label="Responde">
                <a-radio-group v-model="form.vitalityTests_cold_response" :disabled="form.vitalityTests_check != 1">
                  <a-radio :value="1" :disabled="loading"> Si </a-radio>
                  <a-radio :value="2" :disabled="loading"> No </a-radio>
                </a-radio-group>
              </a-form-model-item>
              <a-form-model-item label="Duración">
                <a-radio-group v-model="form.vitalityTests_cold_duration" :disabled="form.vitalityTests_check != 1">
                  <a-radio :value="1" :disabled="loading"> Corta </a-radio>
                  <a-radio :value="2" :disabled="loading"> Mediana </a-radio>
                  <a-radio :value="3" :disabled="loading"> Larga </a-radio>
                </a-radio-group>
              </a-form-model-item>
              <a-form-model-item label="Intensidad">
                <a-radio-group v-model="form.vitalityTests_cold_intensity" :disabled="form.vitalityTests_check != 1">
                  <a-radio :value="1" :disabled="loading"> Leve 0 -3 </a-radio>
                  <a-radio :value="2" :disabled="loading"> Moderada 4 - 7 </a-radio>
                  <a-radio :value="3" :disabled="loading"> Severa 8 - 10 </a-radio>
                </a-radio-group>
              </a-form-model-item>
            </a-col>
            <a-col :span="24" :md="12">
              <a-form-model-item>
                <a-checkbox-group v-model="form.vitalityTests_check">
                  <a-checkbox :value="2" name="Calor" :disabled="loading"> Calor </a-checkbox>
                </a-checkbox-group>
              </a-form-model-item>
              <a-form-model-item label="Responde">
                <a-radio-group v-model="form.vitalityTests_hot_response" :disabled="form.vitalityTests_check != 2">
                  <a-radio :value="1" :disabled="loading"> Si </a-radio>
                  <a-radio :value="2" :disabled="loading"> No </a-radio>
                </a-radio-group>
              </a-form-model-item>
              <a-form-model-item label="Duración">
                <a-radio-group v-model="form.vitalityTests_hot_duration" :disabled="form.vitalityTests_check != 2">
                  <a-radio :value="1" :disabled="loading"> Corta </a-radio>
                  <a-radio :value="2" :disabled="loading"> Mediana </a-radio>
                  <a-radio :value="3" :disabled="loading"> Larga </a-radio>
                </a-radio-group>
              </a-form-model-item>
              <a-form-model-item label="Intensidad">
                <a-radio-group v-model="form.vitalityTests_hot_intensity" :disabled="form.vitalityTests_check != 2">
                  <a-radio :value="1" :disabled="loading"> Leve 0 -3 </a-radio>
                  <a-radio :value="2" :disabled="loading"> Moderada 4 - 7 </a-radio>
                  <a-radio :value="3" :disabled="loading"> Severa 8 - 10 </a-radio>
                </a-radio-group>
              </a-form-model-item>
            </a-col>
            <a-col :span="24" :md="24" class="d-flex justify-content-end">
              <a-button type="primary" html-type="submit" :loading="loading"> Guardar </a-button>
            </a-col>
          </a-row>
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
      painPresentArray: [
        {
          id: 1,
          value: 1,
          label: 'Espotáneo',
          name: 'Espotáneo',
        },
        {
          id: 2,
          value: 2,
          label: 'Provocado',
          name: 'Provocado',
        },
        {
          id: 3,
          value: 3,
          label: 'Frio',
          name: 'Frio',
        },
        {
          id: 4,
          value: 4,
          label: 'Calor',
          name: 'Calor',
        },
        {
          id: 5,
          value: 5,
          label: 'Masticación',
          name: 'Masticación',
        },
        {
          id: 6,
          value: 6,
          label: 'Nocturno',
          name: 'Nocturno',
        },
        {
          id: 7,
          value: 7,
          label: 'Aire',
          name: 'Aire',
        },
        {
          id: 8,
          value: 8,
          label: 'Dulce',
          name: 'Dulce',
        },
        {
          id: 9,
          value: 9,
          label: 'Ácido',
          name: 'Ácido',
        },
        {
          id: 10,
          value: 10,
          label: 'Irradiado',
          name: 'Irradiado',
        },
        {
          id: 11,
          value: 11,
          label: 'Difuso',
          name: 'Difuso',
        },
        {
          id: 12,
          value: 12,
          label: 'Punzante',
          name: 'Punzante',
        },
        {
          id: 13,
          value: 13,
          label: 'Continuo',
          name: 'Continuo',
        },
        {
          id: 14,
          value: 14,
          label: 'Intermitente',
          name: 'Intermitente',
        },
        {
          id: 15,
          value: 15,
          label: 'Esporádico',
          name: 'Esporádico',
        },
      ],
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
}
</script>

<style></style>
