<template>
  <div class="form-general">
    <a-form-model :model="form" ref="form">
      <a-row :gutter="16">
        <!-- GENOGRAMA -->
        <a-col :span="24">
          <h6 class="mt-0 mb-1" :style="{ color: '#B9BABA' }">GENOGRAMA</h6>
        </a-col>
        <!-- Embarazo normal -->
        <a-col :span="24" :md="8">
          <a-form-model-item label="Embarazo normal">
            <a-radio-group v-model="form.normal_pregnancy">
              <a-radio :value="1" :disabled="loading || disabledHasDate"> Si </a-radio>
              <a-radio :value="2" :disabled="loading || disabledHasDate"> No </a-radio>
            </a-radio-group>
          </a-form-model-item>
        </a-col>
        <!-- Tipo de embarazo -->
        <a-col :span="24" :md="8">
          <a-form-model-item label="Tipo de embarazo">
            <a-radio-group v-model="form.type_pregnancy">
              <a-radio :value="1" :disabled="loading || disabledHasDate"> A término </a-radio>
              <a-radio :value="2" :disabled="loading || disabledHasDate"> Prematuro </a-radio>
              <a-radio :value="3" :disabled="loading || disabledHasDate"> Post Termino </a-radio>
            </a-radio-group>
          </a-form-model-item>
        </a-col>
        <!-- Parto -->
        <a-col :span="24" :md="8">
          <a-form-model-item label="Parto">
            <a-radio-group v-model="form.childbirth">
              <a-radio :value="1" :disabled="loading || disabledHasDate"> Normal </a-radio>
              <a-radio :value="2" :disabled="loading || disabledHasDate"> Fórceps </a-radio>
              <a-radio :value="3" :disabled="loading || disabledHasDate"> Cesarea </a-radio>
            </a-radio-group>
          </a-form-model-item>
        </a-col>
        <!-- ALIMENTACIÓN DEL RECIEN NACIDO -->
        <a-col :span="24">
          <h6 class="mt-0 mb-1" :style="{ color: '#B9BABA' }">ALIMENTACIÓN DEL RECIEN NACIDO</h6>
        </a-col>
        <!--  Natural ¿Hasta cuando? -->
        <a-col :span="24" :md="12">
          <a-form-model-item label="Natural ¿Hasta cuando?" class="with-button">
            <a-input-number
              v-model="form.feeding_natural"
              :disabled="loading || disabledHasDate"
              v-mask="'##'"
              :min="1"
              :max="99"
              class="hidden-arrows"
            />
            <span class="ml-3" :style="{ fontSize: '12px', color: '#B9BABA' }"> años </span>
          </a-form-model-item>
        </a-col>
        <!--  Artificial ¿Hasta cuando? -->
        <a-col :span="24" :md="12">
          <a-form-model-item label="Artificial ¿Hasta cuando?" class="with-button">
            <a-input-number
              v-model="form.feeding_artificial"
              :disabled="loading || disabledHasDate"
              v-mask="'##'"
              :min="1"
              :max="99"
              class="hidden-arrows"
            />
            <span class="ml-3" :style="{ fontSize: '12px', color: '#B9BABA' }"> años </span>
          </a-form-model-item>
        </a-col>
        <!-- NUTRICIÓN Y DIETA -->
        <a-col :span="24">
          <h6 class="mt-0 mb-1" :style="{ color: '#B9BABA' }">NUTRICIÓN Y DIETA</h6>
        </a-col>
        <!--  Comienzo de la alimentación mixta -->
        <a-col :span="24" :md="12">
          <a-form-model-item label="Comienzo de la alimentación mixta" class="with-button">
            <a-input-number
              v-model="form.feeding_mixta"
              :disabled="loading || disabledHasDate"
              v-mask="'##'"
              :min="1"
              :max="99"
              class="hidden-arrows"
            />
            <span class="ml-3" :style="{ fontSize: '12px', color: '#B9BABA' }"> años </span>
          </a-form-model-item>
        </a-col>
        <!-- Dieta actual -->
        <a-col :span="24" :md="6">
          <a-form-model-item label="Dieta actual">
            <a-radio-group v-model="form.actual_diet">
              <a-radio :value="1" :disabled="loading || disabledHasDate"> Completa </a-radio>
              <a-radio :value="2" :disabled="loading || disabledHasDate"> Incompleta </a-radio>
            </a-radio-group>
          </a-form-model-item>
        </a-col>
        <a-col :span="24" :md="6">
          <a-form-model-item label="¿Porque?" class="with-button">
            <a-input v-model="form.actual_diet_why" :disabled="loading || disabledHasDate" />
          </a-form-model-item>
        </a-col>
        <!--  Momento de azúcar -->
        <a-col :span="24" :md="12">
          <a-form-model-item label="Momento de azúcar" class="with-button">
            <a-input-number
              v-model="form.sugar_moment"
              :disabled="loading || disabledHasDate"
              v-mask="'##'"
              :min="1"
              :max="99"
              class="hidden-arrows"
            />
            <span class="ml-3" :style="{ fontSize: '12px', color: '#B9BABA' }"> años </span>
          </a-form-model-item>
        </a-col>
        <!--  ¿Qué tipo de azúcar consume? -->
        <a-col :span="24" :md="12">
          <a-form-model-item label="¿Qué tipo de azúcar consume?" class="with-button">
            <a-input v-model="form.sugar_moment_what" :disabled="loading || disabledHasDate" />
          </a-form-model-item>
        </a-col>
        <!-- ANTECEDENTES ODONTOLÓGICOS -->
        <a-col :span="24">
          <h6 class="mt-0 mb-1" :style="{ color: '#B9BABA' }">ANTECEDENTES ODONTOLÓGICOS</h6>
        </a-col>
        <!-- ¿Tuvo experiencia odontológica previa? -->
        <a-col :span="24" :md="12">
          <a-form-model-item label="¿Tuvo experiencia odontológica previa?">
            <a-radio-group v-model="form.prev_experiencie_odontoly">
              <a-radio :value="1" :disabled="loading || disabledHasDate"> Si </a-radio>
              <a-radio :value="2" :disabled="loading || disabledHasDate"> No </a-radio>
            </a-radio-group>
          </a-form-model-item>
        </a-col>
        <!-- ¿Recibió informacion de medida preventiva? -->
        <a-col :span="24" :md="12">
          <a-form-model-item label="¿Recibió informacion de medida preventiva?">
            <a-radio-group v-model="form.have_you_information_prev">
              <a-radio :value="1" :disabled="loading || disabledHasDate"> Si </a-radio>
              <a-radio :value="2" :disabled="loading || disabledHasDate"> No </a-radio>
            </a-radio-group>
          </a-form-model-item>
        </a-col>
        <!-- ¿Han seguido las instrucciones y medidas? -->
        <a-col :span="24" :md="6">
          <a-form-model-item label="¿Ha seguido las instrucciones y medidas?">
            <a-radio-group v-model="form.follow_instructions">
              <a-radio :value="1" :disabled="loading || disabledHasDate"> Si </a-radio>
              <a-radio :value="2" :disabled="loading || disabledHasDate"> No </a-radio>
            </a-radio-group>
          </a-form-model-item>
        </a-col>
        <a-col :span="24" :md="6">
          <a-form-model-item label="¿Porque?" class="with-button">
            <a-input v-model="form.follow_instructions_why" :disabled="loading || disabledHasDate" />
          </a-form-model-item>
        </a-col>
        <!-- ¿Usa pastilla dentífrica? -->
        <a-col :span="24" :md="6">
          <a-form-model-item label="¿Usa pastilla dentífrica?">
            <a-radio-group v-model="form.toothpaste">
              <a-radio :value="1" :disabled="loading || disabledHasDate"> Si </a-radio>
              <a-radio :value="2" :disabled="loading || disabledHasDate"> No </a-radio>
            </a-radio-group>
          </a-form-model-item>
        </a-col>
        <a-col :span="24" :md="6">
          <a-form-model-item label="¿Cual?" class="with-button">
            <a-input v-model="form.follow_instructions_which" :disabled="loading || disabledHasDate" />
          </a-form-model-item>
        </a-col>
        <!--  Cuantas veces al día se cepilla -->
        <a-col :span="24" :md="12">
          <a-form-model-item label="Cuantas veces al día se cepilla" class="with-button">
            <a-input-number
              v-model="form.days_brush"
              :disabled="loading || disabledHasDate"
              v-mask="'##'"
              :min="1"
              :max="99"
              class="hidden-arrows"
            />
            <span class="ml-3" :style="{ fontSize: '12px', color: '#B9BABA' }"> veces </span>
          </a-form-model-item>
        </a-col>
        <!-- ¿Usa otro elemento de higuiene oral? -->
        <a-col :span="24" :md="6">
          <a-form-model-item label="¿Usa otro elemento de higuiene oral?">
            <a-radio-group v-model="form.another_element_oral">
              <a-radio :value="1" :disabled="loading || disabledHasDate"> Si </a-radio>
              <a-radio :value="2" :disabled="loading || disabledHasDate"> No </a-radio>
            </a-radio-group>
          </a-form-model-item>
        </a-col>
        <a-col :span="24" :md="6">
          <a-form-model-item label="¿Cual?" class="with-button">
            <a-input v-model="form.another_element_oral_which" :disabled="loading || disabledHasDate" />
          </a-form-model-item>
        </a-col>
        <!-- ¿Recibió baño de fluor? -->
        <a-col :span="24" :md="12">
          <a-form-model-item label="¿Recibió baño de fluor?">
            <a-radio-group v-model="form.fluor_bath">
              <a-radio :value="1" :disabled="loading || disabledHasDate"> Si </a-radio>
              <a-radio :value="2" :disabled="loading || disabledHasDate"> No </a-radio>
            </a-radio-group>
          </a-form-model-item>
        </a-col>
        <a-col :span="24" :md="12">
          <a-form-model-item label="Frecuencia" class="with-button">
            <a-input v-model="form.fluor_bath_frecuency" :disabled="loading || disabledHasDate" />
          </a-form-model-item>
        </a-col>

        <!-- HÁBITOS -->
        <a-col :span="24">
          <h6 class="mt-0 mb-1" :style="{ color: '#B9BABA' }">HÁBITOS</h6>
        </a-col>
        <!-- Succión -->
        <a-col :span="24" :md="12">
          <a-form-model-item label="Succión">
            <a-radio-group v-model="form.succion">
              <a-radio :value="1" :disabled="loading || disabledHasDate"> Si </a-radio>
              <a-radio :value="2" :disabled="loading || disabledHasDate"> No </a-radio>
            </a-radio-group>
          </a-form-model-item>
        </a-col>
        <a-col :span="24" :md="12">
          <a-form-model-item label="Tipo de succión">
            <a-select
              placeholder="Seleccione una opción"
              :options="succionArray"
              v-model="form.succion_type"
              :allowClear="true"
              :disabled="loading || disabledHasDate || form.succion != 1"
            >
            </a-select>
          </a-form-model-item>
        </a-col>
        <a-col :span="24" :md="12">
          <a-form-model-item label="¿Cuando?" class="with-button">
            <a-input-number
              v-model="form.succion_when"
              :disabled="loading || disabledHasDate || form.succion != 1"
              v-mask="'##'"
              :min="1"
              :max="99"
              class="hidden-arrows"
            />
            <span class="ml-3" :style="{ fontSize: '12px', color: '#B9BABA' }"> años </span>
          </a-form-model-item>
        </a-col>
        <a-col :span="24" :md="12">
          <a-form-model-item label="¿Hasta que edad?" class="with-button">
            <a-input-number
              v-model="form.until_when"
              :disabled="loading || disabledHasDate || form.succion != 1"
              v-mask="'##'"
              :min="1"
              :max="99"
              class="hidden-arrows"
            />
            <span class="ml-3" :style="{ fontSize: '12px', color: '#B9BABA' }"> años </span>
          </a-form-model-item>
        </a-col>
        <!-- Otros objetos -->
        <a-col :span="24" :md="12">
          <a-form-model-item label="Otros objetos">
            <a-radio-group v-model="form.others_objects" :disabled="loading || disabledHasDate || form.succion != 1">
              <a-radio :value="1" :disabled="loading || disabledHasDate"> Si </a-radio>
              <a-radio :value="2" :disabled="loading || disabledHasDate"> No </a-radio>
            </a-radio-group>
          </a-form-model-item>
        </a-col>
        <a-col :span="24" :md="12">
          <a-form-model-item label="¿Cuales?" class="with-button">
            <a-input v-model="form.succion_which" :disabled="loading || disabledHasDate || form.succion != 1" />
          </a-form-model-item>
        </a-col>
        <!-- Deglución atípica -->
        <a-col :span="24" :md="6">
          <a-form-model-item label="Deglución atípica">
            <a-radio-group v-model="form.atypical_swallowing" :disabled="loading || disabledHasDate">
              <a-radio :value="1" :disabled="loading || disabledHasDate"> Si </a-radio>
              <a-radio :value="2" :disabled="loading || disabledHasDate"> No </a-radio>
            </a-radio-group>
          </a-form-model-item>
        </a-col>
        <!-- Interposición lingual -->
        <a-col :span="24" :md="6">
          <a-form-model-item label="Interposición lingual">
            <a-radio-group v-model="form.lingual_interposition" :disabled="loading || disabledHasDate">
              <a-radio :value="1" :disabled="loading || disabledHasDate"> Si </a-radio>
              <a-radio :value="2" :disabled="loading || disabledHasDate"> No </a-radio>
            </a-radio-group>
          </a-form-model-item>
        </a-col>
        <!-- IRN (insuficiente respiratoria) -->
        <a-col :span="24" :md="6">
          <a-form-model-item label="IRN (insuficiente respiratoria)">
            <a-radio-group v-model="form.irn" :disabled="loading || disabledHasDate">
              <a-radio :value="1" :disabled="loading || disabledHasDate"> Si </a-radio>
              <a-radio :value="2" :disabled="loading || disabledHasDate"> No </a-radio>
            </a-radio-group>
          </a-form-model-item>
        </a-col>
        <!-- Fonación -->
        <a-col :span="24" :md="6">
          <a-form-model-item label="Fonación">
            <a-radio-group v-model="form.phonation" :disabled="loading || disabledHasDate">
              <a-radio :value="1" :disabled="loading || disabledHasDate"> Si </a-radio>
              <a-radio :value="2" :disabled="loading || disabledHasDate"> No </a-radio>
            </a-radio-group>
          </a-form-model-item>
        </a-col>
        <a-divider dashed>
          <span :style="{ color: '#B9BABA', fontWeight: 600, fontSize: '14px' }"> Examen bucal </span>
        </a-divider>
        <!-- Tejidos blandos -->
        <a-col :span="24">
          <h6 class="mt-0 mb-1" :style="{ color: '#000' }">Tejidos blandos</h6>
        </a-col>
        <a-col :span="24">
          <h6 class="mt-0 mb-1" :style="{ color: '#B9BABA' }">Labios</h6>
        </a-col>
        <!-- Competentes -->
        <a-col :span="24" :md="8">
          <a-form-model-item label="Competentes" class="with-button">
            <a-input v-model="form.lips_competent" :disabled="loading || disabledHasDate" />
          </a-form-model-item>
        </a-col>
        <!-- Incompetente -->
        <a-col :span="24" :md="8">
          <a-form-model-item label="Incompetente" class="with-button">
            <a-input v-model="form.lips_incompetent" :disabled="loading || disabledHasDate" />
          </a-form-model-item>
        </a-col>
        <!-- Lesiones -->
        <a-col :span="24" :md="8">
          <a-form-model-item label="Lesiones" class="with-button">
            <a-input v-model="form.lips_lesions" :disabled="loading || disabledHasDate" />
          </a-form-model-item>
        </a-col>
        <!-- Frenillos -->
        <a-col :span="24">
          <h6 class="mt-0 mb-1" :style="{ color: '#B9BABA' }">Frenillos</h6>
        </a-col>
        <a-col :span="24" :md="12">
          <a-form-model-item label="Frenillos" class="with-button">
            <a-input v-model="form.braces" :disabled="loading || disabledHasDate" />
          </a-form-model-item>
        </a-col>
        <a-col :span="24" :md="12">
          <a-form-model-item label="Tipo frenillos">
            <a-radio-group v-model="form.braces_type" :disabled="loading || disabledHasDate">
              <a-radio :value="1" :disabled="loading || disabledHasDate"> Normal </a-radio>
              <a-radio :value="2" :disabled="loading || disabledHasDate"> Anormal </a-radio>
            </a-radio-group>
          </a-form-model-item>
        </a-col>
        <!-- Mucosa -->
        <a-col :span="24">
          <h6 class="mt-0 mb-1" :style="{ color: '#B9BABA' }">Mucosa</h6>
        </a-col>
        <!-- Lesiones -->
        <a-col :span="24" :md="8">
          <a-form-model-item label="Incompetente" class="with-button">
            <a-input v-model="form.injuries" :disabled="loading || disabledHasDate" />
          </a-form-model-item>
        </a-col>
        <!-- Tejidos gingival -->
        <a-col :span="24" :md="8">
          <a-form-model-item label="Tejidos gingival" class="with-button">
            <a-input v-model="form.gingival" :disabled="loading || disabledHasDate" />
          </a-form-model-item>
        </a-col>
        <!-- Lengua -->
        <a-col :span="24">
          <h6 class="mt-0 mb-1" :style="{ color: '#B9BABA' }">Lengua</h6>
        </a-col>
        <!-- Normal -->
        <a-col :span="24" :md="8">
          <a-form-model-item label="Normal" class="with-button">
            <a-input v-model="form.tongue_normal" :disabled="loading || disabledHasDate" />
          </a-form-model-item>
        </a-col>
        <!-- Macroglosia -->
        <a-col :span="24" :md="8">
          <a-form-model-item label="Macroglosia" class="with-button">
            <a-input v-model="form.tongue_macroglosia" :disabled="loading || disabledHasDate" />
          </a-form-model-item>
        </a-col>
        <!-- Geográfica -->
        <a-col :span="24" :md="8">
          <a-form-model-item label="Geográfica" class="with-button">
            <a-input v-model="form.tongue_geografy" :disabled="loading || disabledHasDate" />
          </a-form-model-item>
        </a-col>
        <!-- Escrotal -->
        <a-col :span="24" :md="8">
          <a-form-model-item label="Escrotal" class="with-button">
            <a-input v-model="form.tongue_escrotal" :disabled="loading || disabledHasDate" />
          </a-form-model-item>
        </a-col>
        <!-- Glositis -->
        <a-col :span="24" :md="8">
          <a-form-model-item label="Glositis" class="with-button">
            <a-input v-model="form.tongue_glositis" :disabled="loading || disabledHasDate" />
          </a-form-model-item>
        </a-col>
        <!-- Observaciones -->
        <a-col :span="24" :md="24">
          <a-form-model-item label="Observaciones">
            <a-textarea v-model="form.observations" :rows="3" :disabled="loading || disabledHasDate" />
          </a-form-model-item>
        </a-col>
        <!-- TEJIDOS BLANDOS -->
        <a-col :span="24">
          <h6 class="mt-0 mb-1" :style="{ color: '#B9BABA' }">TEJIDOS BLANDOS</h6>
        </a-col>
        <!-- Tipo de dentición -->
        <a-col :span="24" :md="24">
          <a-form-model-item label="Tipo de dentición">
            <a-checkbox-group v-model="form.type_teething">
              <a-checkbox :value="1" name="Primaria" :disabled="loading || disabledHasDate"> Primaria </a-checkbox>
              <a-checkbox :value="2" name="Mixta" :disabled="loading || disabledHasDate"> Mixta </a-checkbox>
              <a-checkbox :value="3" name="Permanente" :disabled="loading || disabledHasDate"> Permanente </a-checkbox>
            </a-checkbox-group>
          </a-form-model-item>
        </a-col>
        <!-- Anomalías de número -->
        <a-col :span="24">
          <h6 class="mt-0 mb-1" :style="{ color: '#000' }">Anomalías de número</h6>
        </a-col>
        <!-- Supernumerarias -->
        <a-col :span="24" :md="12">
          <a-form-model-item label="Supernumerarias" class="with-button">
            <a-input v-model="form.supernumeraria" :disabled="loading || disabledHasDate" />
          </a-form-model-item>
        </a-col>
        <!-- Agnesis -->
        <a-col :span="24" :md="12">
          <a-form-model-item label="Agnesis" class="with-button">
            <a-input v-model="form.agnesis" :disabled="loading || disabledHasDate" />
          </a-form-model-item>
        </a-col>
        <!-- Anomalías de tamaño -->
        <a-col :span="24">
          <h6 class="mt-0 mb-1" :style="{ color: '#000' }">Anomalías de tamaño</h6>
        </a-col>
        <!-- Macrodoncia -->
        <a-col :span="24" :md="12">
          <a-form-model-item label="Macrodoncia" class="with-button">
            <a-input v-model="form.macrodoncia" :disabled="loading || disabledHasDate" />
          </a-form-model-item>
        </a-col>
        <!-- Microdoncia -->
        <a-col :span="24" :md="12">
          <a-form-model-item label="Microdoncia" class="with-button">
            <a-input v-model="form.microdoncia" :disabled="loading || disabledHasDate" />
          </a-form-model-item>
        </a-col>
        <!-- Anomalías de estructura -->
        <a-col :span="24">
          <h6 class="mt-0 mb-1" :style="{ color: '#000' }">Anomalías de estructura</h6>
        </a-col>
        <!-- Hipoclasia -->
        <a-col :span="24" :md="6">
          <a-form-model-item label="Hipoclasia" class="with-button">
            <a-input v-model="form.hipoclasia" :disabled="loading || disabledHasDate" />
          </a-form-model-item>
        </a-col>
        <!-- Hipocalcificación -->
        <a-col :span="24" :md="6">
          <a-form-model-item label="Hipocalcificación" class="with-button">
            <a-input v-model="form.hipocalcification" :disabled="loading || disabledHasDate" />
          </a-form-model-item>
        </a-col>
        <!-- Pigment. Endógena -->
        <a-col :span="24" :md="6">
          <a-form-model-item label="Pigment. Endógena" class="with-button">
            <a-input v-model="form.pigment_endogena" :disabled="loading || disabledHasDate" />
          </a-form-model-item>
        </a-col>
        <!-- Pigment. Exógena -->
        <a-col :span="24" :md="6">
          <a-form-model-item label="Pigment. Exógena" class="with-button">
            <a-input v-model="form.pigment_exogena" :disabled="loading || disabledHasDate" />
          </a-form-model-item>
        </a-col>
        <!-- Anomalías de forma -->
        <a-col :span="24">
          <h6 class="mt-0 mb-1" :style="{ color: '#000' }">Anomalías de forma</h6>
        </a-col>
        <!-- Dientes fusionados -->
        <a-col :span="24" :md="6">
          <a-form-model-item label="Dientes fusionados" class="with-button">
            <a-input v-model="form.fusion_teeth" :disabled="loading || disabledHasDate" />
          </a-form-model-item>
        </a-col>
        <!-- Dientes germinados -->
        <a-col :span="24" :md="6">
          <a-form-model-item label="Dientes germinados" class="with-button">
            <a-input v-model="form.germinat_teeth" :disabled="loading || disabledHasDate" />
          </a-form-model-item>
        </a-col>
        <!-- Dientes Conoides -->
        <a-col :span="24" :md="6">
          <a-form-model-item label="Dientes Conoides" class="with-button">
            <a-input v-model="form.conoide_teeth" :disabled="loading || disabledHasDate" />
          </a-form-model-item>
        </a-col>
        <!-- Otros -->
        <a-col :span="24" :md="6">
          <a-form-model-item label="Otros" class="with-button">
            <a-input v-model="form.others_teeth" :disabled="loading || disabledHasDate" />
          </a-form-model-item>
        </a-col>
        <!-- Lesiones adquiridas de los tejidos duros -->
        <a-col :span="24">
          <h6 class="mt-0 mb-1" :style="{ color: '#000' }">Lesiones adquiridas de los tejidos duros</h6>
        </a-col>
        <!-- Trumatismos dentarios -->
        <a-col :span="24" :md="12">
          <a-form-model-item label="Trumatismos dentarios">
            <a-radio-group v-model="form.dental_trumatisms">
              <a-radio :value="1" :disabled="loading || disabledHasDate"> Si </a-radio>
              <a-radio :value="2" :disabled="loading || disabledHasDate"> No </a-radio>
            </a-radio-group>
          </a-form-model-item>
        </a-col>
        <a-col :span="24" :md="12">
          <a-form-model-item label="Otros" class="with-button">
            <a-input v-model="form.dental_trumatisms_which" :disabled="loading || disabledHasDate" />
          </a-form-model-item>
        </a-col>
        <!-- Diagnóstico -->
        <a-col :span="24">
          <h6 class="mt-0 mb-1" :style="{ color: '#000' }">Diagnóstico</h6>
        </a-col>
        <!-- El diagnóstico incluye derivación a -->
        <a-col :span="24" :md="24">
          <a-form-model-item label="El diagnóstico incluye derivación a" class="with-button">
            <a-textarea v-model="form.diagnosis_deviation" :disabled="loading || disabledHasDate" :rows="4" />
          </a-form-model-item>
        </a-col>
        <!-- Plan de tratamiento presuntivo -->
        <a-col :span="24">
          <h6 class="mt-0 mb-1" :style="{ color: '#000' }">Plan de tratamiento presuntivo</h6>
        </a-col>
        <!-- Aparatología requerida -->
        <a-col :span="24" :md="24">
          <a-form-model-item label="Aparatología requerida" class="with-button">
            <a-textarea v-model="form.diagnosis_apparatus" :disabled="loading || disabledHasDate" :rows="4" />
          </a-form-model-item>
        </a-col>
        <!-- Observaciones -->
        <a-col :span="24" :md="24">
          <a-form-model-item label="Observaciones" class="with-button">
            <a-textarea v-model="form.diagnosis_observations" :disabled="loading || disabledHasDate" :rows="4" />
          </a-form-model-item>
        </a-col>

        <a-col :span="24" class="d-flex justify-content-end">
          <a-button type="primary" html-type="submit" @click="submit" :loading="loading" :disabled="disabledHasDate">
            <span> Guardar </span>
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
      default: {
        type_teething: [],
      },
    },
    disabledHasDate: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      loading: false,
      succionArray: [
        { value: 1, label: 'Chupete' },
        { value: 2, label: 'Digital' },
        { value: 3, label: 'Mamadera' },
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
  methods: {
    submit() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          this.loading = true
          this.changeLoading(true)
          let tempForm = this.form
          tempForm.id_patient = this.$route.params.id
          let response = false
          response = await this.$axios.$put(`/pediatry_dent_patient/${tempForm.id}`, tempForm).catch((errors) => {
            this.loading = false
            this.changeLoading(false)
          })
          if (response.success) this.$message.success(response.message)
          this.loading = false
          this.changeLoading(false)
        }
      })
    },
    ...mapActions({
      changeLoading: 'data/pediatry_dent/CHANGE_LOADING',
    }),
  },
  watch: {},
}
</script>

<style></style>
