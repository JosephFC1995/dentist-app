<template>
  <div class="form-general">
    <a-form-model :model="form" ref="form">
      <a-row :gutter="16">
        <!-- Examen de labios -->
        <a-col :span="24" :md="12">
          <a-row :gutter="16">
            <a-col :span="24">
              <h6 class="mt-0 mb-1" :style="{ color: '#B9BABA' }">Examen de labios</h6>
            </a-col>
            <!-- Lesión superficial -->
            <a-col :span="24" :md="24">
              <a-form-model-item label="Lesión superficial" :label-col="{ span: 6 }" labelAlign="left">
                <a-radio-group v-model="form.superficial_injury_lips">
                  <a-radio :value="1" :disabled="loading || disabledHasDate"> Si </a-radio>
                  <a-radio :value="2" :disabled="loading || disabledHasDate"> No </a-radio>
                </a-radio-group>
              </a-form-model-item>
            </a-col>
            <!-- Lesión profunda -->
            <a-col :span="24" :md="24">
              <a-form-model-item label="Lesión profunda" :label-col="{ span: 6 }" labelAlign="left">
                <a-radio-group v-model="form.deep_injury_lips">
                  <a-radio :value="1" :disabled="loading || disabledHasDate"> Si </a-radio>
                  <a-radio :value="2" :disabled="loading || disabledHasDate"> No </a-radio>
                </a-radio-group>
              </a-form-model-item>
            </a-col>
            <a-col :span="24">
              <a-form-model-item label="Descripción de la característica de la lesión">
                <a-textarea v-model="form.observation_lips" :rows="4" :disabled="loading || disabledHasDate" />
              </a-form-model-item>
            </a-col>
          </a-row>
        </a-col>
        <!-- Examen de comisuras -->
        <a-col :span="24" :md="12">
          <a-row :gutter="16">
            <a-col :span="24">
              <h6 class="mt-0 mb-1" :style="{ color: '#B9BABA' }">Examen de comisuras</h6>
            </a-col>
            <!-- Lesión superficial -->
            <a-col :span="24" :md="24">
              <a-form-model-item label="Lesión superficial" :label-col="{ span: 6 }" labelAlign="left">
                <a-radio-group v-model="form.superficial_injury_corners">
                  <a-radio :value="1" :disabled="loading || disabledHasDate"> Si </a-radio>
                  <a-radio :value="2" :disabled="loading || disabledHasDate"> No </a-radio>
                </a-radio-group>
              </a-form-model-item>
            </a-col>
            <!-- Lesión profunda -->
            <a-col :span="24" :md="24">
              <a-form-model-item label="Lesión profunda" :label-col="{ span: 6 }" labelAlign="left">
                <a-radio-group v-model="form.deep_injury_corners">
                  <a-radio :value="1" :disabled="loading || disabledHasDate"> Si </a-radio>
                  <a-radio :value="2" :disabled="loading || disabledHasDate"> No </a-radio>
                </a-radio-group>
              </a-form-model-item>
            </a-col>
            <a-col :span="24">
              <a-form-model-item label="Descripción de la característica de la lesión">
                <a-textarea v-model="form.observation_corners" :rows="4" :disabled="loading || disabledHasDate" />
              </a-form-model-item>
            </a-col>
          </a-row>
        </a-col>
        <!-- Examen de cara interna de mucosa -->
        <a-col :span="24" :md="12">
          <a-row :gutter="16">
            <a-col :span="24">
              <h6 class="mt-0 mb-1" :style="{ color: '#B9BABA' }">Examen de cara interna de mucosa</h6>
            </a-col>
            <!-- Lesión superficial -->
            <a-col :span="24" :md="24">
              <a-form-model-item label="Lesión superficial" :label-col="{ span: 6 }" labelAlign="left">
                <a-radio-group v-model="form.superficial_injury_muous">
                  <a-radio :value="1" :disabled="loading || disabledHasDate"> Si </a-radio>
                  <a-radio :value="2" :disabled="loading || disabledHasDate"> No </a-radio>
                </a-radio-group>
              </a-form-model-item>
            </a-col>
            <!-- Lesión profunda -->
            <a-col :span="24" :md="24">
              <a-form-model-item label="Lesión profunda" :label-col="{ span: 6 }" labelAlign="left">
                <a-radio-group v-model="form.deep_injury_muous">
                  <a-radio :value="1" :disabled="loading || disabledHasDate"> Si </a-radio>
                  <a-radio :value="2" :disabled="loading || disabledHasDate"> No </a-radio>
                </a-radio-group>
              </a-form-model-item>
            </a-col>
            <a-col :span="24">
              <a-form-model-item label="Descripción de la característica de la lesión">
                <a-textarea v-model="form.observation_muous" :rows="4" :disabled="loading || disabledHasDate" />
              </a-form-model-item>
            </a-col>
          </a-row>
        </a-col>
        <!-- Examen de Paladar duro -->
        <a-col :span="24" :md="12">
          <a-row :gutter="16">
            <a-col :span="24">
              <h6 class="mt-0 mb-1" :style="{ color: '#B9BABA' }">Examen de paladar duro</h6>
            </a-col>
            <!-- Lesión superficial -->
            <a-col :span="24" :md="24">
              <a-form-model-item label="Lesión superficial" :label-col="{ span: 6 }" labelAlign="left">
                <a-radio-group v-model="form.superficial_injury_hard_palate">
                  <a-radio :value="1" :disabled="loading || disabledHasDate"> Si </a-radio>
                  <a-radio :value="2" :disabled="loading || disabledHasDate"> No </a-radio>
                </a-radio-group>
              </a-form-model-item>
            </a-col>
            <!-- Lesión profunda -->
            <a-col :span="24" :md="24">
              <a-form-model-item label="Lesión profunda" :label-col="{ span: 6 }" labelAlign="left">
                <a-radio-group v-model="form.deepInjury_hard_palate">
                  <a-radio :value="1" :disabled="loading || disabledHasDate"> Si </a-radio>
                  <a-radio :value="2" :disabled="loading || disabledHasDate"> No </a-radio>
                </a-radio-group>
              </a-form-model-item>
            </a-col>
            <a-col :span="24">
              <a-form-model-item label="Descripción de la característica de la lesión">
                <a-textarea v-model="form.observation_hard_palate" :rows="4" :disabled="loading || disabledHasDate" />
              </a-form-model-item>
            </a-col>
          </a-row>
        </a-col>
        <!-- Examen de Paladar blando -->
        <a-col :span="24" :md="12">
          <a-row :gutter="16">
            <a-col :span="24">
              <h6 class="mt-0 mb-1" :style="{ color: '#B9BABA' }">Examen de paladar blando</h6>
            </a-col>
            <!-- Lesión superficial -->
            <a-col :span="24" :md="24">
              <a-form-model-item label="Lesión superficial" :label-col="{ span: 6 }" labelAlign="left">
                <a-radio-group v-model="form.superficial_injury_soft_palate">
                  <a-radio :value="1" :disabled="loading || disabledHasDate"> Si </a-radio>
                  <a-radio :value="2" :disabled="loading || disabledHasDate"> No </a-radio>
                </a-radio-group>
              </a-form-model-item>
            </a-col>
            <!-- Lesión profunda -->
            <a-col :span="24" :md="24">
              <a-form-model-item label="Lesión profunda" :label-col="{ span: 6 }" labelAlign="left">
                <a-radio-group v-model="form.deepInjury_soft_palate">
                  <a-radio :value="1" :disabled="loading || disabledHasDate"> Si </a-radio>
                  <a-radio :value="2" :disabled="loading || disabledHasDate"> No </a-radio>
                </a-radio-group>
              </a-form-model-item>
            </a-col>
            <a-col :span="24">
              <a-form-model-item label="Descripción de la característica de la lesión">
                <a-textarea v-model="form.observation_soft_palate" :rows="4" :disabled="loading || disabledHasDate" />
              </a-form-model-item>
            </a-col>
          </a-row>
        </a-col>
        <!-- Examen de orafaringe -->
        <a-col :span="24" :md="12">
          <a-row :gutter="16">
            <a-col :span="24">
              <h6 class="mt-0 mb-1" :style="{ color: '#B9BABA' }">Examen de orafaringe</h6>
            </a-col>
            <!-- Lesión superficial -->
            <a-col :span="24" :md="24">
              <a-form-model-item label="Lesión superficial" :label-col="{ span: 6 }" labelAlign="left">
                <a-radio-group v-model="form.superficial_injury_oropharynx">
                  <a-radio :value="1" :disabled="loading || disabledHasDate"> Si </a-radio>
                  <a-radio :value="2" :disabled="loading || disabledHasDate"> No </a-radio>
                </a-radio-group>
              </a-form-model-item>
            </a-col>
            <!-- Lesión profunda -->
            <a-col :span="24" :md="24">
              <a-form-model-item label="Lesión profunda" :label-col="{ span: 6 }" labelAlign="left">
                <a-radio-group v-model="form.deep_injury_oropharynx">
                  <a-radio :value="1" :disabled="loading || disabledHasDate"> Si </a-radio>
                  <a-radio :value="2" :disabled="loading || disabledHasDate"> No </a-radio>
                </a-radio-group>
              </a-form-model-item>
            </a-col>
            <a-col :span="24">
              <a-form-model-item label="Descripción de la característica de la lesión">
                <a-textarea v-model="form.observation_oropharynx" :rows="4" :disabled="loading || disabledHasDate" />
              </a-form-model-item>
            </a-col>
          </a-row>
        </a-col>
        <!-- Examen de piso de boca -->
        <a-col :span="24" :md="12">
          <a-row :gutter="16">
            <a-col :span="24">
              <h6 class="mt-0 mb-1" :style="{ color: '#B9BABA' }">Examen de piso de boca</h6>
            </a-col>
            <!-- Lesión superficial -->
            <a-col :span="24" :md="24">
              <a-form-model-item label="Lesión superficial" :label-col="{ span: 6 }" labelAlign="left">
                <a-radio-group v-model="form.superficial_injury_mouthfloor">
                  <a-radio :value="1" :disabled="loading || disabledHasDate"> Si </a-radio>
                  <a-radio :value="2" :disabled="loading || disabledHasDate"> No </a-radio>
                </a-radio-group>
              </a-form-model-item>
            </a-col>
            <!-- Lesión profunda -->
            <a-col :span="24" :md="24">
              <a-form-model-item label="Lesión profunda" :label-col="{ span: 6 }" labelAlign="left">
                <a-radio-group v-model="form.deep_injury_mouthfloor">
                  <a-radio :value="1" :disabled="loading || disabledHasDate"> Si </a-radio>
                  <a-radio :value="2" :disabled="loading || disabledHasDate"> No </a-radio>
                </a-radio-group>
              </a-form-model-item>
            </a-col>
            <a-col :span="24">
              <a-form-model-item label="Descripción de la característica de la lesión">
                <a-textarea v-model="form.observation_mouthfloor" :rows="4" :disabled="loading || disabledHasDate" />
              </a-form-model-item>
            </a-col>
          </a-row>
        </a-col>
        <!-- Examen de lengua -->
        <a-col :span="24" :md="12">
          <a-row :gutter="16">
            <a-col :span="24">
              <h6 class="mt-0 mb-1" :style="{ color: '#B9BABA' }">Examen de lengua</h6>
            </a-col>
            <!-- Lesión superficial -->
            <a-col :span="24" :md="24">
              <a-form-model-item label="Lesión superficial" :label-col="{ span: 6 }" labelAlign="left">
                <a-radio-group v-model="form.superficial_injury_tonge">
                  <a-radio :value="1" :disabled="loading || disabledHasDate"> Si </a-radio>
                  <a-radio :value="2" :disabled="loading || disabledHasDate"> No </a-radio>
                </a-radio-group>
              </a-form-model-item>
            </a-col>
            <!-- Lesión profunda -->
            <a-col :span="24" :md="24">
              <a-form-model-item label="Lesión profunda" :label-col="{ span: 6 }" labelAlign="left">
                <a-radio-group v-model="form.deep_injury_tonge">
                  <a-radio :value="1" :disabled="loading || disabledHasDate"> Si </a-radio>
                  <a-radio :value="2" :disabled="loading || disabledHasDate"> No </a-radio>
                </a-radio-group>
              </a-form-model-item>
            </a-col>
            <a-col :span="24">
              <a-form-model-item label="Descripción de la característica de la lesión" :disabled="loading || disabledHasDate">
                <a-textarea v-model="form.observation_tonge" :rows="4" />
              </a-form-model-item>
            </a-col>
          </a-row>
        </a-col>
        <!-- Tamaño -->
        <a-col :span="24" :md="24">
          <a-form-model-item label="Tamaño" :label-col="{ span: 6 }" labelAlign="left" :disabled="loading || disabledHasDate">
            <a-input v-model="form.size" />
          </a-form-model-item>
        </a-col>
        <!-- Base -->
        <a-col :span="24" :md="24">
          <a-form-model-item label="Base" :label-col="{ span: 4 }" labelAlign="left">
            <a-radio-group v-model="form.base">
              <a-radio :value="1" :disabled="loading || disabledHasDate"> Sésil </a-radio>
              <a-radio :value="2" :disabled="loading || disabledHasDate"> Pepiculada </a-radio>
              <a-radio :value="3" :disabled="loading || disabledHasDate"> Plano </a-radio>
              <a-radio :value="4" :disabled="loading || disabledHasDate"> Indurada </a-radio>
            </a-radio-group>
          </a-form-model-item>
        </a-col>
        <!-- Color -->
        <a-col :span="24" :md="24">
          <a-form-model-item label="Color" :label-col="{ span: 4 }" labelAlign="left">
            <a-radio-group v-model="form.color">
              <a-radio :value="1" :disabled="loading || disabledHasDate"> Leucoplasica </a-radio>
              <a-radio :value="2" :disabled="loading || disabledHasDate"> Eritroplacia </a-radio>
            </a-radio-group>
          </a-form-model-item>
        </a-col>
        <!-- Bordes -->
        <a-col :span="24" :md="24">
          <a-form-model-item label="Bordes" :label-col="{ span: 4 }" labelAlign="left">
            <a-radio-group v-model="form.borders">
              <a-radio :value="1" :disabled="loading || disabledHasDate"> Irregular </a-radio>
              <a-radio :value="2" :disabled="loading || disabledHasDate"> Definidos </a-radio>
              <a-radio :value="3" :disabled="loading || disabledHasDate"> Sinuosos </a-radio>
              <a-radio :value="4" :disabled="loading || disabledHasDate"> Elevados </a-radio>
              <a-radio :value="5" :disabled="loading || disabledHasDate"> Indurados </a-radio>
            </a-radio-group>
          </a-form-model-item>
        </a-col>
        <!-- Superficie -->
        <a-col :span="24" :md="24">
          <a-form-model-item label="Superficie" :label-col="{ span: 4 }" labelAlign="left">
            <a-radio-group v-model="form.area">
              <a-radio :value="1" :disabled="loading || disabledHasDate"> Ulceada </a-radio>
              <a-radio :value="2" :disabled="loading || disabledHasDate"> No ulcerada </a-radio>
            </a-radio-group>
          </a-form-model-item>
        </a-col>
        <!-- Localización -->
        <a-col :span="24" :md="24">
          <a-form-model-item label="Localización" :label-col="{ span: 6 }" labelAlign="left">
            <a-input v-model="form.location" />
          </a-form-model-item>
        </a-col>
        <!-- Consistencia -->
        <a-col :span="24" :md="24">
          <a-form-model-item label="Consistencia" :label-col="{ span: 4 }" labelAlign="left">
            <a-radio-group v-model="form.consistency">
              <a-radio :value="1" :disabled="loading || disabledHasDate"> Blada </a-radio>
              <a-radio :value="2" :disabled="loading || disabledHasDate"> Dura </a-radio>
              <a-radio :value="3" :disabled="loading || disabledHasDate"> Fluctuante </a-radio>
              <a-radio :value="4" :disabled="loading || disabledHasDate"> Renitente </a-radio>
              <a-radio :value="5" :disabled="loading || disabledHasDate"> Otro </a-radio>
            </a-radio-group>
          </a-form-model-item>
        </a-col>
        <!-- Movilidad -->
        <a-col :span="24" :md="24">
          <a-form-model-item label="Movilidad" :label-col="{ span: 4 }" labelAlign="left">
            <a-radio-group v-model="form.move">
              <a-radio :value="1" :disabled="loading || disabledHasDate"> Si </a-radio>
              <a-radio :value="2" :disabled="loading || disabledHasDate"> No </a-radio>
            </a-radio-group>
          </a-form-model-item>
        </a-col>
        <!-- Exudado o secreción -->
        <a-col :span="24" :md="24">
          <a-form-model-item label="Exudado o secreción" :label-col="{ span: 4 }" labelAlign="left">
            <a-radio-group v-model="form.exudate">
              <a-radio :value="1" :disabled="loading || disabledHasDate"> Si </a-radio>
              <a-radio :value="2" :disabled="loading || disabledHasDate"> No </a-radio>
            </a-radio-group>
          </a-form-model-item>
        </a-col>
        <!-- Diagama de la lesión -->
        <a-col :span="24" :md="24">
          <a-form-model-item label="Diagama de la lesión">
            <a-upload-dragger
              :disabled="loading || disabledHasDate"
              :action="apiHost + '/file/upload'"
              :multiple="true"
              :headers="headers"
              :file-list="form.diagrams_injuries_exams"
              @change="changeUpload($event, 'diagrams_injuries_exams')"
            >
              <p class="ant-upload-drag-icon">
                <i class="uil uil-cloud-upload"></i>
              </p>
              <p class="ant-upload-text">Haga clic o arrastre el archivo a esta área para cargar</p>
              <p class="ant-upload-hint">
                Compatibilidad con una carga única o masiva. Prohibir estrictamente cargando datos de la empresa u otros archivos
                relacionados.
              </p>
            </a-upload-dragger>
          </a-form-model-item>
        </a-col>
        <!-- Diagnóstico presuntivo -->
        <a-col :span="24" :md="24">
          <a-form-model-item label="Diagnóstico presuntivo" :label-col="{ span: 6 }" labelAlign="left">
            <a-textarea v-model="form.presumptive_diagnosis" :disabled="loading || disabledHasDate" :rows="4" />
          </a-form-model-item>
        </a-col>
        <!-- Examenes auxiliares -->
        <a-col :span="24" :md="24">
          <a-form-model-item label="Examenes auxiliares">
            <a-upload-dragger
              :disabled="loading || disabledHasDate"
              :action="apiHost + '/file/upload'"
              :multiple="true"
              :headers="headers"
              :file-list="form.auxiliary_exams"
              @change="changeUpload($event, 'auxiliary_exams')"
            >
              <p class="ant-upload-drag-icon">
                <i class="uil uil-cloud-upload"></i>
              </p>
              <p class="ant-upload-text">Haga clic o arrastre el archivo a esta área para cargar</p>
              <p class="ant-upload-hint">
                Compatibilidad con una carga única o masiva. Prohibir estrictamente cargando datos de la empresa u otros archivos
                relacionados.
              </p>
            </a-upload-dragger>
          </a-form-model-item>
        </a-col>
        <!-- RX -->
        <a-col :span="24" :md="24">
          <a-form-model-item label="RX">
            <a-upload-dragger
              :disabled="loading || disabledHasDate"
              :action="apiHost + '/file/upload'"
              :multiple="true"
              :headers="headers"
              :file-list="form.rx_exams"
              @change="changeUpload($event, 'rx_exams')"
            >
              <p class="ant-upload-drag-icon">
                <i class="uil uil-cloud-upload"></i>
              </p>
              <p class="ant-upload-text">Haga clic o arrastre el archivo a esta área para cargar</p>
              <p class="ant-upload-hint">
                Compatibilidad con una carga única o masiva. Prohibir estrictamente cargando datos de la empresa u otros archivos
                relacionados.
              </p>
            </a-upload-dragger>
          </a-form-model-item>
        </a-col>
        <!-- Tomografía -->
        <a-col :span="24" :md="24">
          <a-form-model-item label="Tomografía">
            <a-upload-dragger
              :disabled="loading || disabledHasDate"
              :action="apiHost + '/file/upload'"
              :multiple="true"
              :headers="headers"
              :file-list="form.tomography_exams"
              @change="changeUpload($event, 'tomography_exams')"
            >
              <p class="ant-upload-drag-icon">
                <i class="uil uil-cloud-upload"></i>
              </p>
              <p class="ant-upload-text">Haga clic o arrastre el archivo a esta área para cargar</p>
              <p class="ant-upload-hint">
                Compatibilidad con una carga única o masiva. Prohibir estrictamente cargando datos de la empresa u otros archivos
                relacionados.
              </p>
            </a-upload-dragger>
          </a-form-model-item>
        </a-col>
        <!-- Análisis clínicos -->
        <a-col :span="24" :md="24">
          <a-form-model-item label="Análisis clínicos">
            <a-upload-dragger
              :disabled="loading || disabledHasDate"
              :action="apiHost + '/file/upload'"
              :multiple="true"
              :headers="headers"
              :file-list="form.clinical_analysis_exams"
              @change="changeUpload($event, 'clinical_analysis_exams')"
            >
              <p class="ant-upload-drag-icon">
                <i class="uil uil-cloud-upload"></i>
              </p>
              <p class="ant-upload-text">Haga clic o arrastre el archivo a esta área para cargar</p>
              <p class="ant-upload-hint">
                Compatibilidad con una carga única o masiva. Prohibir estrictamente cargando datos de la empresa u otros archivos
                relacionados.
              </p>
            </a-upload-dragger>
          </a-form-model-item>
        </a-col>
        <!-- Biopsia exisional -->
        <a-col :span="24" :md="24">
          <a-form-model-item label="Biopsia exisional">
            <a-upload-dragger
              :disabled="loading || disabledHasDate"
              :action="apiHost + '/file/upload'"
              :multiple="true"
              :headers="headers"
              :file-list="form.biopsies_exisionals_exams"
              @change="changeUpload($event, 'biopsies_exisionals_exams')"
            >
              <p class="ant-upload-drag-icon">
                <i class="uil uil-cloud-upload"></i>
              </p>
              <p class="ant-upload-text">Haga clic o arrastre el archivo a esta área para cargar</p>
              <p class="ant-upload-hint">
                Compatibilidad con una carga única o masiva. Prohibir estrictamente cargando datos de la empresa u otros archivos
                relacionados.
              </p>
            </a-upload-dragger>
          </a-form-model-item>
        </a-col>
        <!-- Biopsia exofoliativa -->
        <a-col :span="24" :md="24">
          <a-form-model-item label="Biopsia exofoliativa">
            <a-upload-dragger
              :disabled="loading || disabledHasDate"
              :action="apiHost + '/file/upload'"
              :multiple="true"
              :headers="headers"
              :file-list="form.biopsies_exofoliativa_exams"
              @change="changeUpload($event, 'biopsies_exofoliativa_exams')"
            >
              <p class="ant-upload-drag-icon">
                <i class="uil uil-cloud-upload"></i>
              </p>
              <p class="ant-upload-text">Haga clic o arrastre el archivo a esta área para cargar</p>
              <p class="ant-upload-hint">
                Compatibilidad con una carga única o masiva. Prohibir estrictamente cargando datos de la empresa u otros archivos
                relacionados.
              </p>
            </a-upload-dragger>
          </a-form-model-item>
        </a-col>
        <!-- Otros -->
        <a-col :span="24" :md="24">
          <a-form-model-item label="Otros">
            <a-upload-dragger
              :disabled="loading || disabledHasDate"
              :action="apiHost + '/file/upload'"
              :multiple="true"
              :headers="headers"
              :file-list="form.others_exams"
              @change="changeUpload($event, 'others_exams')"
            >
              <p class="ant-upload-drag-icon">
                <i class="uil uil-cloud-upload"></i>
              </p>
              <p class="ant-upload-text">Haga clic o arrastre el archivo a esta área para cargar</p>
              <p class="ant-upload-hint">
                Compatibilidad con una carga única o masiva. Prohibir estrictamente cargando datos de la empresa u otros archivos
                relacionados.
              </p>
            </a-upload-dragger>
          </a-form-model-item>
        </a-col>
        <!-- Diagnóstico definitivo -->
        <a-col :span="24" :md="24">
          <a-form-model-item label="Diagnóstico definitivo" :label-col="{ span: 6 }" labelAlign="left">
            <a-textarea v-model="form.define_diagnosis" :rows="4" :disabled="loading || disabledHasDate" />
          </a-form-model-item>
        </a-col>
        <!-- Tratamiento -->
        <a-col :span="24" :md="24">
          <a-form-model-item label="Tratamiento" :label-col="{ span: 6 }" labelAlign="left">
            <a-textarea v-model="form.treatment" :rows="4" :disabled="loading || disabledHasDate" />
          </a-form-model-item>
        </a-col>
        <!-- Pronósticos -->
        <a-col :span="24" :md="24">
          <a-form-model-item label="Pronósticos" :label-col="{ span: 6 }" labelAlign="left">
            <a-textarea v-model="form.forecasts" :rows="4" :disabled="loading || disabledHasDate" />
          </a-form-model-item>
        </a-col>
        <!-- Evolución -->
        <a-col :span="24" :md="24">
          <a-form-model-item label="Evolución" :label-col="{ span: 6 }" labelAlign="left">
            <a-textarea v-model="form.evolution" :rows="4" :disabled="loading || disabledHasDate" />
          </a-form-model-item>
        </a-col>
        <a-col :span="24" class="d-flex justify-content-end">
          <a-button type="primary" html-type="submit" @click="submit" :loading="loading" :disabled="disabledHasDate">
            <span>  Guardar </span>
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
        diagrams_injuries_exams: [],
        auxiliary_exams: [],
        rx_exams: [],
        tomography_exams: [],
        clinical_analysis_exams: [],
        biopsies_exisionals_exams: [],
        biopsies_exofoliativa_exams: [],
        others_exams: [],
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
      apiHost: process.env.apiHost,
      headers: {
        Authorization: this.$auth.strategy.token.get(),
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
          response = await this.$axios.$put(`/pathology_patient/${tempForm.id}`, tempForm).catch((errors) => {
            this.loading = false
            this.changeLoading(false)
          })
          if (response.success) this.$message.success(response.message)
          this.loading = false
          this.changeLoading(false)
        }
      })
    },
    changeUpload(info, hook) {
      console.log({ info, hook })
      const status = info.file.status
      let fileList = [...info.fileList]
      fileList = fileList.map((file) => {
        if (file.response) {
          file.url = file.response.file.url
        }
        return file
      })

      this.form[hook] = fileList

      if (status === 'done') {
        this.$message.success(`${info.file.name} ha sudo subido correctamente.`)
      }
    },
    ...mapActions({
      changeLoading: 'data/pathologies/CHANGE_LOADING',
      getDiffussionPatient: 'data/pathologies/GET_PATHOLOGY_BY_PATIENT',
    }),
  },
  watch: {},
}
</script>

<style></style>
