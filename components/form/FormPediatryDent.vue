<template>
  <div class="form-general">
    <a-form-model :model="form" ref="newPacient">
      <a-row :gutter="16">
        <!-- GENOGRAMA -->
        <a-col :span="24">
          <h6 class="mt-0 mb-1" :style="{ color: '#B9BABA' }">GENOGRAMA</h6>
        </a-col>
        <!-- Embarazo normal -->
        <a-col :span="24" :md="8">
          <a-form-model-item label="Embarazo normal">
            <a-radio-group v-model="form.normalPregnancy">
              <a-radio :value="1" :disabled="loading"> Si </a-radio>
              <a-radio :value="2" :disabled="loading"> No </a-radio>
            </a-radio-group>
          </a-form-model-item>
        </a-col>
        <!-- Tipo de embarazo -->
        <a-col :span="24" :md="8">
          <a-form-model-item label="Tipo de embarazo">
            <a-radio-group v-model="form.typePregnancy">
              <a-radio :value="1" :disabled="loading"> A término </a-radio>
              <a-radio :value="2" :disabled="loading"> Prematuro </a-radio>
              <a-radio :value="3" :disabled="loading"> Post Termino </a-radio>
            </a-radio-group>
          </a-form-model-item>
        </a-col>
        <!-- Parto -->
        <a-col :span="24" :md="8">
          <a-form-model-item label="Parto">
            <a-radio-group v-model="form.childbirth">
              <a-radio :value="1" :disabled="loading"> Normal </a-radio>
              <a-radio :value="2" :disabled="loading"> Fórceps </a-radio>
              <a-radio :value="3" :disabled="loading"> Cesarea </a-radio>
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
            <a-input v-model="form.feedingNatural" :disabled="loading" />
            <span class="ml-3" :style="{ fontSize: '12px', color: '#B9BABA' }"> años </span>
          </a-form-model-item>
        </a-col>
        <!--  Artificial ¿Hasta cuando? -->
        <a-col :span="24" :md="12">
          <a-form-model-item label="Artificial ¿Hasta cuando?" class="with-button">
            <a-input v-model="form.feedingArtificial" :disabled="loading" />
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
            <a-input v-model="form.feedingMixta" :disabled="loading" />
            <span class="ml-3" :style="{ fontSize: '12px', color: '#B9BABA' }"> años </span>
          </a-form-model-item>
        </a-col>
        <!-- Dieta actual -->
        <a-col :span="24" :md="6">
          <a-form-model-item label="Dieta actual">
            <a-radio-group v-model="form.actualDiet">
              <a-radio :value="1" :disabled="loading"> Completa </a-radio>
              <a-radio :value="2" :disabled="loading"> Incompleta </a-radio>
            </a-radio-group>
          </a-form-model-item>
        </a-col>
        <a-col :span="24" :md="6">
          <a-form-model-item label="¿Porque?" class="with-button">
            <a-input v-model="form.actualDietWhy" :disabled="loading" />
          </a-form-model-item>
        </a-col>
        <!--  Momento de azúcar -->
        <a-col :span="24" :md="12">
          <a-form-model-item label="Momento de azúcar" class="with-button">
            <a-input v-model="form.sugarMoment" :disabled="loading" />
            <span class="ml-3" :style="{ fontSize: '12px', color: '#B9BABA' }"> años </span>
          </a-form-model-item>
        </a-col>
        <!--  ¿Qué tipo de azúcar consume? -->
        <a-col :span="24" :md="12">
          <a-form-model-item label="¿Qué tipo de azúcar consume?" class="with-button">
            <a-input v-model="form.sugarMomentWhat" :disabled="loading" />
          </a-form-model-item>
        </a-col>
        <!-- ANTECEDENTES ODONTOLÓGICOS -->
        <a-col :span="24">
          <h6 class="mt-0 mb-1" :style="{ color: '#B9BABA' }">ANTECEDENTES ODONTOLÓGICOS</h6>
        </a-col>
        <!-- ¿Tuvo experiencia odontológica previa? -->
        <a-col :span="24" :md="12">
          <a-form-model-item label="¿Tuvo experiencia odontológica previa?">
            <a-radio-group v-model="form.prevExperiencieOdontoly">
              <a-radio :value="1" :disabled="loading"> Si </a-radio>
              <a-radio :value="2" :disabled="loading"> No </a-radio>
            </a-radio-group>
          </a-form-model-item>
        </a-col>
        <!-- ¿Recibió informacion de medida preventiva? -->
        <a-col :span="24" :md="12">
          <a-form-model-item label="¿Recibió informacion de medida preventiva?">
            <a-radio-group v-model="form.haveYouInformationPrev">
              <a-radio :value="1" :disabled="loading"> Si </a-radio>
              <a-radio :value="2" :disabled="loading"> No </a-radio>
            </a-radio-group>
          </a-form-model-item>
        </a-col>
        <!-- ¿Han seguido las instrucciones y medidas? -->
        <a-col :span="24" :md="6">
          <a-form-model-item label="¿Ha seguido las instrucciones y medidas?">
            <a-radio-group v-model="form.followInstructions">
              <a-radio :value="1" :disabled="loading"> Si </a-radio>
              <a-radio :value="2" :disabled="loading"> No </a-radio>
            </a-radio-group>
          </a-form-model-item>
        </a-col>
        <a-col :span="24" :md="6">
          <a-form-model-item label="¿Porque?" class="with-button">
            <a-input v-model="form.followInstructionsWhy" :disabled="loading" />
          </a-form-model-item>
        </a-col>
        <!-- ¿Usa pastilla dentífrica? -->
        <a-col :span="24" :md="6">
          <a-form-model-item label="¿Usa pastilla dentífrica?">
            <a-radio-group v-model="form.toothpaste">
              <a-radio :value="1" :disabled="loading"> Si </a-radio>
              <a-radio :value="2" :disabled="loading"> No </a-radio>
            </a-radio-group>
          </a-form-model-item>
        </a-col>
        <a-col :span="24" :md="6">
          <a-form-model-item label="¿Cual?" class="with-button">
            <a-input v-model="form.followInstructionsWhich" :disabled="loading" />
          </a-form-model-item>
        </a-col>
        <!--  Cuantas veces al día se cepilla -->
        <a-col :span="24" :md="12">
          <a-form-model-item label="Cuantas veces al día se cepilla" class="with-button">
            <a-input v-model="form.daysBrush" :disabled="loading" />
            <span class="ml-3" :style="{ fontSize: '12px', color: '#B9BABA' }"> veces </span>
          </a-form-model-item>
        </a-col>
        <!-- ¿Usa otro elemento de higuiene oral? -->
        <a-col :span="24" :md="6">
          <a-form-model-item label="¿Usa otro elemento de higuiene oral?">
            <a-radio-group v-model="form.anotherElementOral">
              <a-radio :value="1" :disabled="loading"> Si </a-radio>
              <a-radio :value="2" :disabled="loading"> No </a-radio>
            </a-radio-group>
          </a-form-model-item>
        </a-col>
        <a-col :span="24" :md="6">
          <a-form-model-item label="¿Cual?" class="with-button">
            <a-input v-model="form.anotherElementOralWhich" :disabled="loading" />
          </a-form-model-item>
        </a-col>
        <!-- ¿Recibió baño de fluor? -->
        <a-col :span="24" :md="6">
          <a-form-model-item label="¿Recibió baño de fluor?">
            <a-radio-group v-model="form.fluorBath">
              <a-radio :value="1" :disabled="loading"> Si </a-radio>
              <a-radio :value="2" :disabled="loading"> No </a-radio>
            </a-radio-group>
          </a-form-model-item>
        </a-col>
        <a-col :span="24" :md="6">
          <a-form-model-item label="Frecuencia" class="with-button">
            <a-input v-model="form.anotherElementOralWhich" :disabled="loading" />
          </a-form-model-item>
        </a-col>

        <!-- HÁBITOS -->
        <a-col :span="24">
          <h6 class="mt-0 mb-1" :style="{ color: '#B9BABA' }">HÁBITOS</h6>
        </a-col>
        <!-- Succión -->
        <a-col :span="24" :md="8">
          <a-form-model-item label="Succión">
            <a-radio-group v-model="form.succion">
              <a-radio :value="1" :disabled="loading"> Si </a-radio>
              <a-radio :value="2" :disabled="loading"> No </a-radio>
            </a-radio-group>
          </a-form-model-item>
        </a-col>
        <a-col :span="24" :md="8">
          <a-form-model-item label="Tipo de succión">
            <a-select
              placeholder="Seleccione una opción"
              :options="succionArray"
              v-model="form.succionType"
              :allowClear="true"
              :disabled="loading || form.succion != 1"
            >
            </a-select>
          </a-form-model-item>
        </a-col>
        <a-col :span="24" :md="8">
          <a-form-model-item label="¿Cuando?" class="with-button">
            <a-input v-model="form.succionWhen" :disabled="loading || form.succion != 1" />
          </a-form-model-item>
        </a-col>
        <a-col :span="24" :md="8">
          <a-form-model-item label="¿Hasta que edad?" class="with-button">
            <a-input v-model="form.untilWhen" :disabled="loading || form.succion != 1" />
          </a-form-model-item>
        </a-col>
        <!-- Otros objetos -->
        <a-col :span="24" :md="8">
          <a-form-model-item label="Otros objetos">
            <a-radio-group v-model="form.othersObjects" :disabled="loading || form.succion != 1">
              <a-radio :value="1" :disabled="loading"> Si </a-radio>
              <a-radio :value="2" :disabled="loading"> No </a-radio>
            </a-radio-group>
          </a-form-model-item>
        </a-col>
        <a-col :span="24" :md="8">
          <a-form-model-item label="¿Cuales?" class="with-button">
            <a-input v-model="form.succionWhich" :disabled="loading || form.succion != 1" />
          </a-form-model-item>
        </a-col>
        <!-- Deglución atípica -->
        <a-col :span="24" :md="6">
          <a-form-model-item label="Deglución atípica">
            <a-radio-group v-model="form.atypicalSwallowing" :disabled="loading">
              <a-radio :value="1" :disabled="loading"> Si </a-radio>
              <a-radio :value="2" :disabled="loading"> No </a-radio>
            </a-radio-group>
          </a-form-model-item>
        </a-col>
        <!-- Interposición lingual -->
        <a-col :span="24" :md="6">
          <a-form-model-item label="Interposición lingual">
            <a-radio-group v-model="form.lingualInterposition" :disabled="loading">
              <a-radio :value="1" :disabled="loading"> Si </a-radio>
              <a-radio :value="2" :disabled="loading"> No </a-radio>
            </a-radio-group>
          </a-form-model-item>
        </a-col>
        <!-- IRN (insuficiente respiratoria) -->
        <a-col :span="24" :md="6">
          <a-form-model-item label="IRN (insuficiente respiratoria)">
            <a-radio-group v-model="form.irn" :disabled="loading">
              <a-radio :value="1" :disabled="loading"> Si </a-radio>
              <a-radio :value="2" :disabled="loading"> No </a-radio>
            </a-radio-group>
          </a-form-model-item>
        </a-col>
        <!-- Fonación -->
        <a-col :span="24" :md="6">
          <a-form-model-item label="Fonación">
            <a-radio-group v-model="form.phonation" :disabled="loading">
              <a-radio :value="1" :disabled="loading"> Si </a-radio>
              <a-radio :value="2" :disabled="loading"> No </a-radio>
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
            <a-input v-model="form.lipsCompetent" :disabled="loading" />
          </a-form-model-item>
        </a-col>
        <!-- Incompetente -->
        <a-col :span="24" :md="8">
          <a-form-model-item label="Incompetente" class="with-button">
            <a-input v-model="form.lipsIncompetent" :disabled="loading" />
          </a-form-model-item>
        </a-col>
        <!-- Lesiones -->
        <a-col :span="24" :md="8">
          <a-form-model-item label="Lesiones" class="with-button">
            <a-input v-model="form.lipsLesions" :disabled="loading" />
          </a-form-model-item>
        </a-col>
        <!-- Frenillos -->
        <a-col :span="24">
          <h6 class="mt-0 mb-1" :style="{ color: '#B9BABA' }">Frenillos</h6>
        </a-col>
        <a-col :span="24" :md="12">
          <a-form-model-item label="Frenillos" class="with-button">
            <a-input v-model="form.braces" :disabled="loading" />
          </a-form-model-item>
        </a-col>
        <a-col :span="24" :md="12">
          <a-form-model-item label="Tipo frenillos">
            <a-radio-group v-model="form.phonation" :disabled="loading">
              <a-radio :value="1" :disabled="loading"> Normal </a-radio>
              <a-radio :value="2" :disabled="loading"> Anormal </a-radio>
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
            <a-input v-model="form.injuries" :disabled="loading" />
          </a-form-model-item>
        </a-col>
        <!-- Tejidos gingival -->
        <a-col :span="24" :md="8">
          <a-form-model-item label="Tejidos gingival" class="with-button">
            <a-input v-model="form.gingival" :disabled="loading" />
          </a-form-model-item>
        </a-col>
        <!-- Lengua -->
        <a-col :span="24">
          <h6 class="mt-0 mb-1" :style="{ color: '#B9BABA' }">Lengua</h6>
        </a-col>
        <!-- Normal -->
        <a-col :span="24" :md="8">
          <a-form-model-item label="Normal" class="with-button">
            <a-input v-model="form.tongueNormal" :disabled="loading" />
          </a-form-model-item>
        </a-col>
        <!-- Macroglosia -->
        <a-col :span="24" :md="8">
          <a-form-model-item label="Macroglosia" class="with-button">
            <a-input v-model="form.tongueMacroglosia" :disabled="loading" />
          </a-form-model-item>
        </a-col>
        <!-- Geográfica -->
        <a-col :span="24" :md="8">
          <a-form-model-item label="Geográfica" class="with-button">
            <a-input v-model="form.tongueGeografy" :disabled="loading" />
          </a-form-model-item>
        </a-col>
        <!-- Escrotal -->
        <a-col :span="24" :md="8">
          <a-form-model-item label="Escrotal" class="with-button">
            <a-input v-model="form.tongueEscrotal" :disabled="loading" />
          </a-form-model-item>
        </a-col>
        <!-- Glositis -->
        <a-col :span="24" :md="8">
          <a-form-model-item label="Glositis" class="with-button">
            <a-input v-model="form.tongueGlositis" :disabled="loading" />
          </a-form-model-item>
        </a-col>
        <!-- Observaciones -->
        <a-col :span="24" :md="24">
          <a-form-model-item label="Observaciones">
            <a-textarea v-model="form.observations" :rows="3" :disabled="loading" />
          </a-form-model-item>
        </a-col>
        <!-- TEJIDOS BLANDOS -->
        <a-col :span="24">
          <h6 class="mt-0 mb-1" :style="{ color: '#B9BABA' }">TEJIDOS BLANDOS</h6>
        </a-col>
        <!-- Tipo de dentición -->
        <a-col :span="24" :md="24">
          <a-form-model-item label="Tipo de dentición">
            <a-checkbox-group v-model="form.typeTeething">
              <a-checkbox :value="1" name="Primaria" :disabled="loading"> Primaria </a-checkbox>
              <a-checkbox :value="2" name="Mixta" :disabled="loading"> Mixta </a-checkbox>
              <a-checkbox :value="3" name="Permanente" :disabled="loading"> Permanente </a-checkbox>
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
            <a-input v-model="form.supernumeraria" :disabled="loading" />
          </a-form-model-item>
        </a-col>
        <!-- Agnesis -->
        <a-col :span="24" :md="12">
          <a-form-model-item label="Agnesis" class="with-button">
            <a-input v-model="form.agnesis" :disabled="loading" />
          </a-form-model-item>
        </a-col>
        <!-- Anomalías de tamaño -->
        <a-col :span="24">
          <h6 class="mt-0 mb-1" :style="{ color: '#000' }">Anomalías de tamaño</h6>
        </a-col>
        <!-- Macrodoncia -->
        <a-col :span="24" :md="12">
          <a-form-model-item label="Macrodoncia" class="with-button">
            <a-input v-model="form.macrodoncia" :disabled="loading" />
          </a-form-model-item>
        </a-col>
        <!-- Microdoncia -->
        <a-col :span="24" :md="12">
          <a-form-model-item label="Microdoncia" class="with-button">
            <a-input v-model="form.microdoncia" :disabled="loading" />
          </a-form-model-item>
        </a-col>
        <!-- Anomalías de estructura -->
        <a-col :span="24">
          <h6 class="mt-0 mb-1" :style="{ color: '#000' }">Anomalías de estructura</h6>
        </a-col>
        <!-- Hipoclasia -->
        <a-col :span="24" :md="6">
          <a-form-model-item label="Hipoclasia" class="with-button">
            <a-input v-model="form.hipoclasia" :disabled="loading" />
          </a-form-model-item>
        </a-col>
        <!-- Hipocalcificación -->
        <a-col :span="24" :md="6">
          <a-form-model-item label="Hipocalcificación" class="with-button">
            <a-input v-model="form.hipocalcification" :disabled="loading" />
          </a-form-model-item>
        </a-col>
        <!-- Pigment. Endógena -->
        <a-col :span="24" :md="6">
          <a-form-model-item label="Pigment. Endógena" class="with-button">
            <a-input v-model="form.pigmentEndogena" :disabled="loading" />
          </a-form-model-item>
        </a-col>
        <!-- Pigment. Exógena -->
        <a-col :span="24" :md="6">
          <a-form-model-item label="Pigment. Exógena" class="with-button">
            <a-input v-model="form.pigmentExogena" :disabled="loading" />
          </a-form-model-item>
        </a-col>
        <!-- Anomalías de forma -->
        <a-col :span="24">
          <h6 class="mt-0 mb-1" :style="{ color: '#000' }">Anomalías de forma</h6>
        </a-col>
        <!-- Dientes fusionados -->
        <a-col :span="24" :md="6">
          <a-form-model-item label="Dientes fusionados" class="with-button">
            <a-input v-model="form.fusionTeeth" :disabled="loading" />
          </a-form-model-item>
        </a-col>
        <!-- Dientes germinados -->
        <a-col :span="24" :md="6">
          <a-form-model-item label="Dientes germinados" class="with-button">
            <a-input v-model="form.germinatTeeth" :disabled="loading" />
          </a-form-model-item>
        </a-col>
        <!-- Dientes Conoides -->
        <a-col :span="24" :md="6">
          <a-form-model-item label="Dientes Conoides" class="with-button">
            <a-input v-model="form.conoideTeeth" :disabled="loading" />
          </a-form-model-item>
        </a-col>
        <!-- Otros -->
        <a-col :span="24" :md="6">
          <a-form-model-item label="Otros" class="with-button">
            <a-input v-model="form.othersTeeth" :disabled="loading" />
          </a-form-model-item>
        </a-col>
        <!-- Lesiones adquiridas de los tejidos duros -->
        <a-col :span="24">
          <h6 class="mt-0 mb-1" :style="{ color: '#000' }">Lesiones adquiridas de los tejidos duros</h6>
        </a-col>
        <!-- Trumatismos dentarios -->
        <a-col :span="24" :md="12">
          <a-form-model-item label="Trumatismos dentarios">
            <a-radio-group v-model="form.dentalTrumatisms">
              <a-radio :value="1" :disabled="loading"> Si </a-radio>
              <a-radio :value="2" :disabled="loading"> No </a-radio>
            </a-radio-group>
          </a-form-model-item>
        </a-col>
        <a-col :span="24" :md="12">
          <a-form-model-item label="Otros" class="with-button">
            <a-input v-model="form.dentalTrumatismsWhich" :disabled="loading" />
          </a-form-model-item>
        </a-col>
        <!-- Diagnóstico -->
        <a-col :span="24">
          <h6 class="mt-0 mb-1" :style="{ color: '#000' }">Diagnóstico</h6>
        </a-col>
        <!-- El diagnóstico incluye derivación a -->
        <a-col :span="24" :md="24">
          <a-form-model-item label="El diagnóstico incluye derivación a" class="with-button">
            <a-textarea v-model="form.diagnosisDeviation" :disabled="loading" :rows="4" />
          </a-form-model-item>
        </a-col>
        <!-- Plan de tratamiento presuntivo -->
        <a-col :span="24">
          <h6 class="mt-0 mb-1" :style="{ color: '#000' }">Plan de tratamiento presuntivo</h6>
        </a-col>
        <!-- Aparatología requerida -->
        <a-col :span="24" :md="24">
          <a-form-model-item label="Aparatología requerida" class="with-button">
            <a-textarea v-model="form.diagnosisApparatus" :disabled="loading" :rows="4" />
          </a-form-model-item>
        </a-col>
        <!-- Observaciones -->
        <a-col :span="24" :md="24">
          <a-form-model-item label="Observaciones" class="with-button">
            <a-textarea v-model="form.diagnosisObservations" :disabled="loading" :rows="4" />
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
      defaultListFiles: [
        {
          uid: 'vc-upload-1606273782891-22',
          lastModified: 1606273943549,
          lastModifiedDate: '2020-11-25T03:12:23.549Z',
          name: 'Screenshot_3.png',
          size: 1307,
          type: 'image/png',
          percent: 100,
          originFileObj: {
            uid: 'vc-upload-1606273782891-22',
          },
          status: 'done',
          response: {
            name: 'xxx.png',
            status: 'done',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
          },
          xhr: {},
          url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        },
      ],
      succionArray: [
        { value: 1, label: 'Chupete' },
        { value: 2, label: 'Digital' },
        { value: 23, label: 'Mamadera' },
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
    changeUpload(info) {
      const status = info.file.status

      if (status !== 'uploading') {
        // console.log(info.file, info.fileList)
      }
      if (status === 'done') {
        this.$message.success(`${info.file.name} file uploaded successfully.`)
        let fileList = [...info.fileList]

        fileList = fileList.map((file) => {
          if (file.response) {
            file.url = file.response.url
          }
          return file
        })

        this.defaultListFiles = fileList
      } else if (status === 'error') {
        this.$message.error(`${info.file.name} file upload failed.`)
      }
    },
  },
  watch: {},
}
</script>

<style></style>
