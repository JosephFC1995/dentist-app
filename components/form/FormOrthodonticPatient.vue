<template>
  <div class="form-general">
    <a-form-model :model="form" ref="form">
      <a-row :gutter="16">
        <a-divider dashed>
          <span :style="{ color: '#B9BABA', fontWeight: 600, fontSize: '14px' }"> Información general</span>
        </a-divider>
        <a-col :span="24" :md="12">
          <a-row :gutter="16">
            <!-- Nucleo Familiar -->
            <a-col :span="24" :md="24">
              <a-form-model-item label="Nucleo familiar" :label-col="{ span: 6 }" labelAlign="left">
                <a-input v-model="form.family_nucleus" :disabled="loading || disabledHasDate" />
              </a-form-model-item>
            </a-col>
            <!-- Nacimiento -->
            <a-col :span="24" :md="24">
              <a-form-model-item label="Nacimiento" :label-col="{ span: 6 }" labelAlign="left">
                <a-radio-group v-model="form.birth">
                  <a-radio :value="1" :disabled="loading || disabledHasDate"> A término </a-radio>
                  <a-radio :value="2" :disabled="loading || disabledHasDate"> Otro </a-radio>
                </a-radio-group>
              </a-form-model-item>
            </a-col>
            <a-col :span="24" :md="24">
              <a-form-model-item>
                <a-input
                  v-model="form.birth_other"
                  :disabled="loading || form.birth != 2 || disabledHasDate"
                  placeholder="Otro"
                />
              </a-form-model-item>
            </a-col>
            <!-- Tipo de parto -->
            <a-col :span="24" :md="24">
              <a-form-model-item label="Tipo de parto">
                <a-select
                  placeholder="Seleccione una opción"
                  :options="partoArray"
                  v-model="form.birth_type"
                  :allowClear="true"
                  :disabled="loading || disabledHasDate"
                >
                </a-select>
              </a-form-model-item>
            </a-col>
          </a-row>
        </a-col>

        <a-col :span="24" :md="12">
          <a-row :gutter="16">
            <!-- Tuvo tratamiento previo -->
            <a-col :span="24" :md="24">
              <a-form-model-item label="Tuvo tratamiento previo">
                <a-radio-group v-model="form.previous_treatment">
                  <a-radio :value="1" :disabled="loading || disabledHasDate"> Si </a-radio>
                  <a-radio :value="2" :disabled="loading || disabledHasDate"> No </a-radio>
                </a-radio-group>
              </a-form-model-item>
            </a-col>
            <!-- Usó -->
            <a-col :span="24" :md="24">
              <a-form-model-item label="Usó">
                <a-checkbox-group v-model="form.usesin">
                  <a-checkbox :value="1" :disabled="loading || disabledHasDate"> Chupete </a-checkbox>
                  <a-checkbox :value="2" :disabled="loading || disabledHasDate"> Mamadera </a-checkbox>
                  <a-checkbox :value="3" :disabled="loading || disabledHasDate"> Lactancia </a-checkbox>
                  <a-checkbox :value="4" :disabled="loading || disabledHasDate"> Otro </a-checkbox>
                </a-checkbox-group>
              </a-form-model-item>
            </a-col>
            <a-col :span="24" :md="24">
              <a-form-model-item>
                <a-input
                  v-model="form.usesin_other"
                  :disabled="loading || !form.usesin.includes(4) || disabledHasDate"
                  placeholder="Otro"
                />
              </a-form-model-item>
            </a-col>
          </a-row>
        </a-col>

        <a-divider dashed>
          <span :style="{ color: '#B9BABA', fontWeight: 600, fontSize: '14px' }"> Análisis facial </span>
        </a-divider>

        <a-col :span="24" :md="24">
          <a-row :gutter="16">
            <a-col :span="24" :md="12">
              <a-row :gutter="16">
                <!-- Patrón facial -->
                <a-col :span="24" :md="24">
                  <a-form-model-item label="Patrón facial">
                    <a-select
                      placeholder="Seleccione una opción"
                      :options="patronFacialArray"
                      v-model="form.facial_pattern"
                      :allowClear="true"
                      :disabled="loading || disabledHasDate"
                    >
                    </a-select>
                  </a-form-model-item>
                </a-col>
                <!-- Perfil -->
                <a-col :span="24" :md="24">
                  <a-form-model-item label="Perfil">
                    <a-select
                      placeholder="Seleccione una opción"
                      :options="perfilArray"
                      v-model="form.profile"
                      :allowClear="true"
                      :disabled="loading || disabledHasDate"
                    >
                    </a-select>
                  </a-form-model-item>
                </a-col>
                <!-- Asimetría -->
                <a-col :span="24" :md="24">
                  <a-form-model-item label="Asimetría" :label-col="{ span: 6 }" labelAlign="left">
                    <a-radio-group v-model="form.asymmetry">
                      <a-radio :value="1" :disabled="loading || disabledHasDate"> Mad. derecha </a-radio>
                      <a-radio :value="2" :disabled="loading || disabledHasDate"> Mad. izquierda </a-radio>
                      <a-radio :value="3" :disabled="loading || disabledHasDate"> Otro </a-radio>
                    </a-radio-group>
                  </a-form-model-item>
                </a-col>
                <a-col :span="24" :md="24">
                  <a-form-model-item>
                    <a-input
                      v-model="form.asymmetry_other"
                      :disabled="loading || form.asymmetry != 3 || disabledHasDate"
                      placeholder="Otro"
                    />
                  </a-form-model-item>
                </a-col>
                <!-- Altura facial -->
                <a-col :span="24" :md="24">
                  <a-form-model-item label="Altura facial" :label-col="{ span: 6 }" labelAlign="left">
                    <a-radio-group v-model="form.facial_height">
                      <a-radio :value="1" :disabled="loading || disabledHasDate"> Equilibrada </a-radio>
                      <a-radio :value="2" :disabled="loading || disabledHasDate"> Larga </a-radio>
                      <a-radio :value="3" :disabled="loading || disabledHasDate"> Corta </a-radio>
                    </a-radio-group>
                  </a-form-model-item>
                </a-col>
                <!-- PerfilMaxilar -->
                <a-col :span="24" :md="24">
                  <a-form-model-item label="PerfilMaxilar">
                    <a-select
                      placeholder="Seleccione una opción"
                      :options="perfilMaxArray"
                      v-model="form.profile_max"
                      :allowClear="true"
                      :disabled="loading || disabledHasDate"
                    >
                    </a-select>
                  </a-form-model-item>
                </a-col>
              </a-row>
            </a-col>
            <a-col :span="24" :md="12">
              <a-row :gutter="16">
                <!-- Perfil mandular -->
                <a-col :span="24" :md="24">
                  <a-form-model-item label="Perfil mandular">
                    <a-select
                      placeholder="Seleccione una opción"
                      :options="perfilMadArray"
                      v-model="form.profile_mad"
                      :allowClear="true"
                      :disabled="loading || disabledHasDate"
                    >
                    </a-select>
                  </a-form-model-item>
                </a-col>
              </a-row>
            </a-col>
            <a-col :span="24" :md="12">
              <a-row :gutter="16">
                <!-- Surco labio - mentón -->
                <a-col :span="24" :md="24">
                  <a-form-model-item label="Surco labio - mentón">
                    <a-select
                      placeholder="Seleccione una opción"
                      :options="surcoArray"
                      v-model="form.surce"
                      :allowClear="true"
                      :disabled="loading || disabledHasDate"
                    >
                    </a-select>
                  </a-form-model-item>
                </a-col>
              </a-row>
            </a-col>
            <a-col :span="24" :md="12">
              <a-row :gutter="16">
                <!-- Labios en reposo -->
                <a-col :span="24" :md="24">
                  <a-form-model-item label="Labios en reposo">
                    <a-select
                      placeholder="Seleccione una opción"
                      :options="labiosArray"
                      v-model="form.lips_rest"
                      :allowClear="true"
                      :disabled="loading || disabledHasDate"
                    >
                    </a-select>
                  </a-form-model-item>
                </a-col>
              </a-row>
            </a-col>
            <!-- Perfil labial -->
            <a-col :span="24" :md="12">
              <a-form-model-item label="Perfil labial" :label-col="{ span: 6 }" labelAlign="left">
                <a-radio-group v-model="form.lips_profile">
                  <a-radio :value="1" :disabled="loading || disabledHasDate"> Normal </a-radio>
                  <a-radio :value="2" :disabled="loading || disabledHasDate"> Protrusivos </a-radio>
                  <a-radio :value="3" :disabled="loading || disabledHasDate"> Retrusivos </a-radio>
                </a-radio-group>
              </a-form-model-item>
            </a-col>
            <a-col :span="24" :md="6">
              <a-form-model-item label="Superior">
                <a-input
                  v-model="form.lips_profile_top"
                  :disabled="loading || form.lips_profile != 3 || form.lips_profile != 2 || disabledHasDate"
                  placeholder="Superior"
                />
              </a-form-model-item>
            </a-col>
            <a-col :span="24" :md="6">
              <a-form-model-item label="Inferior">
                <a-input
                  v-model="form.lips_profile_bottom"
                  :disabled="loading || form.lips_profile != 3 || form.lips_profile != 2 || disabledHasDate"
                  placeholder="Inferior"
                />
              </a-form-model-item>
            </a-col>
          </a-row>
        </a-col>

        <a-divider dashed>
          <span :style="{ color: '#B9BABA', fontWeight: 600, fontSize: '14px' }"> Análisis funcional </span>
        </a-divider>

        <a-col :span="24" :md="24">
          <a-row :gutter="16">
            <!-- Respiración -->
            <a-col :span="24" :md="24">
              <a-form-model-item label="Respiración">
                <a-radio-group v-model="form.breathing">
                  <a-radio :value="1" :disabled="loading || disabledHasDate"> Mad. derecha </a-radio>
                  <a-radio :value="2" :disabled="loading || disabledHasDate"> Mad. izquierda </a-radio>
                  <a-radio :value="3" :disabled="loading || disabledHasDate"> Otro </a-radio>
                </a-radio-group>
              </a-form-model-item>
            </a-col>
            <a-col :span="24" :md="12">
              <a-row :gutter="16">
                <!-- Deglución -->
                <a-col :span="24" :md="24">
                  <h6 class="mt-0 mb-1" :style="{ color: '#B9BABA' }">Deglución</h6>
                </a-col>
                <a-col :span="24" :md="12">
                  <a-form-model-item label="Normal">
                    <a-input v-model="form.swallowing_normal" :disabled="loading || disabledHasDate" placeholder="Normal" />
                  </a-form-model-item>
                </a-col>
                <a-col :span="24" :md="12">
                  <a-form-model-item label="Contracción">
                    <a-input
                      v-model="form.swallowing_contraction"
                      :disabled="loading || disabledHasDate"
                      placeholder="Contracción"
                    />
                  </a-form-model-item>
                </a-col>
                <!-- Actividad comisural -->
                <a-col :span="24" :md="24">
                  <h6 class="mt-0 mb-1" :style="{ color: '#B9BABA' }">Actividad comisural</h6>
                </a-col>
                <a-col :span="24" :md="12">
                  <a-form-model-item label="Normal">
                    <a-input v-model="form.commissural_normal" :disabled="loading || disabledHasDate" placeholder="Normal" />
                  </a-form-model-item>
                </a-col>
                <a-col :span="24" :md="12">
                  <a-form-model-item label="Contracción">
                    <a-input
                      v-model="form.commissural_contraction"
                      :disabled="loading || disabledHasDate"
                      placeholder="Contracción"
                    />
                  </a-form-model-item>
                </a-col>
                <!-- Actividad lingual -->
                <a-col :span="24" :md="24">
                  <h6 class="mt-0 mb-1" :style="{ color: '#B9BABA' }">Actividad lingual</h6>
                </a-col>
                <a-col :span="24" :md="8">
                  <a-form-model-item label="Normal">
                    <a-input v-model="form.lingual_normal" :disabled="loading || disabledHasDate" placeholder="Normal" />
                  </a-form-model-item>
                </a-col>
                <a-col :span="24" :md="8">
                  <a-form-model-item label="Interp. Anterior">
                    <a-input v-model="form.lingual_prev" :disabled="loading || disabledHasDate" placeholder="Interp. Anterior" />
                  </a-form-model-item>
                </a-col>
                <a-col :span="24" :md="8">
                  <a-form-model-item label="Interp. Lateral">
                    <a-input v-model="form.lingual_side" :disabled="loading || disabledHasDate" placeholder="Interp. Lateral" />
                  </a-form-model-item>
                </a-col>
                <!-- Labio superior -->
                <a-col :span="24" :md="24">
                  <h6 class="mt-0 mb-1" :style="{ color: '#B9BABA' }">Labio superior</h6>
                </a-col>
                <a-col :span="24" :md="8">
                  <a-form-model-item label="Normal">
                    <a-input v-model="form.top_lip_normal" :disabled="loading || disabledHasDate" placeholder="Normal" />
                  </a-form-model-item>
                </a-col>
                <a-col :span="24" :md="8">
                  <a-form-model-item label="Hipoactivo">
                    <a-input v-model="form.top_lip_hipo" :disabled="loading || disabledHasDate" placeholder="Hipoactivo" />
                  </a-form-model-item>
                </a-col>
                <a-col :span="24" :md="8">
                  <a-form-model-item label="Hiperactivo">
                    <a-input v-model="form.top_lip_hipe" :disabled="loading || disabledHasDate" placeholder="Hiperactivo" />
                  </a-form-model-item>
                </a-col>
              </a-row>
            </a-col>
            <a-col :span="24" :md="12">
              <a-row :gutter="16">
                <!-- Labio inferior -->
                <a-col :span="24" :md="24">
                  <h6 class="mt-0 mb-1" :style="{ color: '#B9BABA' }">Labio inferior</h6>
                </a-col>
                <a-col :span="24" :md="8">
                  <a-form-model-item label="Normal">
                    <a-input v-model="form.bottom_lip_normal" :disabled="loading || disabledHasDate" placeholder="Normal" />
                  </a-form-model-item>
                </a-col>
                <a-col :span="24" :md="8">
                  <a-form-model-item label="Hipoactivo">
                    <a-input v-model="form.bottom_lip_hipo" :disabled="loading || disabledHasDate" placeholder="Hipoactivo" />
                  </a-form-model-item>
                </a-col>
                <a-col :span="24" :md="8">
                  <a-form-model-item label="Hiperactivo">
                    <a-input v-model="form.bottom_lip_hipe" :disabled="loading || disabledHasDate" placeholder="Hiperactivo" />
                  </a-form-model-item>
                </a-col>
                <!-- Mesetero -->
                <a-col :span="24" :md="24">
                  <h6 class="mt-0 mb-1" :style="{ color: '#B9BABA' }">Mesetero</h6>
                </a-col>
                <a-col :span="24" :md="8">
                  <a-form-model-item label="Normal">
                    <a-input v-model="form.masseter_normal" :disabled="loading || disabledHasDate" placeholder="Normal" />
                  </a-form-model-item>
                </a-col>
                <a-col :span="24" :md="8">
                  <a-form-model-item label="Hipoactivo">
                    <a-input v-model="form.masseter_hipo" :disabled="loading || disabledHasDate" placeholder="Hipoactivo" />
                  </a-form-model-item>
                </a-col>
                <a-col :span="24" :md="8">
                  <a-form-model-item label="Hiperactivo">
                    <a-input v-model="form.masseter_hipe" :disabled="loading || disabledHasDate" placeholder="Hiperactivo" />
                  </a-form-model-item>
                </a-col>
                <!-- Mentoniano -->
                <a-col :span="24" :md="24">
                  <h6 class="mt-0 mb-1" :style="{ color: '#B9BABA' }">Mentoniano</h6>
                </a-col>
                <a-col :span="24" :md="8">
                  <a-form-model-item label="Normal">
                    <a-input v-model="form.mentonian_normal" :disabled="loading || disabledHasDate" placeholder="Normal" />
                  </a-form-model-item>
                </a-col>
                <a-col :span="24" :md="8">
                  <a-form-model-item label="Hipoactivo">
                    <a-input v-model="form.mentonian_hipo" :disabled="loading || disabledHasDate" placeholder="Hipoactivo" />
                  </a-form-model-item>
                </a-col>
                <a-col :span="24" :md="8">
                  <a-form-model-item label="Hiperactivo">
                    <a-input v-model="form.mentonian_hipe" :disabled="loading || disabledHasDate" placeholder="Hiperactivo" />
                  </a-form-model-item>
                </a-col>
                <!-- Hábitos de succión -->
                <a-col :span="24" :md="24">
                  <h6 class="mt-0 mb-1" :style="{ color: '#B9BABA' }">Hábitos de succión</h6>
                </a-col>
                <a-col :span="24" :md="8">
                  <a-form-model-item label="Normal">
                    <a-input v-model="form.suction_normal" :disabled="loading || disabledHasDate" placeholder="Normal" />
                  </a-form-model-item>
                </a-col>
                <a-col :span="24" :md="8">
                  <a-form-model-item label="Hipoactivo">
                    <a-input v-model="form.suction_hipo" :disabled="loading || disabledHasDate" placeholder="Hipoactivo" />
                  </a-form-model-item>
                </a-col>
                <a-col :span="24" :md="8">
                  <a-form-model-item label="Hiperactivo">
                    <a-input v-model="form.suction_hipe" :disabled="loading || disabledHasDate" placeholder="Hiperactivo" />
                  </a-form-model-item>
                </a-col>
              </a-row>
            </a-col>
          </a-row>
        </a-col>
        <a-divider dashed>
          <span :style="{ color: '#B9BABA', fontWeight: 600, fontSize: '14px' }"> Examen de oclusión </span>
        </a-divider>

        <a-col :span="24" :md="24">
          <a-row :gutter="16">
            <a-col :span="24" :md="12">
              <a-row :gutter="16">
                <a-col :span="24" :md="24">
                  <h5 class="mt-0 mb-1" :style="{ color: '#B9BABA' }">Sentido sagital</h5>
                </a-col>
                <!-- Zonata anterior -->
                <a-col :span="24" :md="24">
                  <a-form-model-item label="Zonata anterior">
                    <a-input
                      v-model="form.previous_sonata_sag"
                      :disabled="loading || disabledHasDate"
                      placeholder="Zonata anterior"
                    />
                  </a-form-model-item>
                </a-col>
                <!-- Zonata lateral derecha -->
                <a-col :span="24" :md="24">
                  <a-form-model-item label="Zonata lateral derecha">
                    <a-radio-group v-model="form.side_eight_sonata_sag">
                      <a-radio :value="1" :disabled="loading || disabledHasDate"> Normal </a-radio>
                      <a-radio :value="2" :disabled="loading || disabledHasDate"> Abierto </a-radio>
                    </a-radio-group>
                  </a-form-model-item>
                </a-col>
                <!-- Zonata lateral izquierdo -->
                <a-col :span="24" :md="24">
                  <a-form-model-item label="Zonata lateral izquierdo">
                    <a-radio-group v-model="form.side_left_sonata_sag">
                      <a-radio :value="1" :disabled="loading || disabledHasDate"> Normal </a-radio>
                      <a-radio :value="2" :disabled="loading || disabledHasDate"> Abierto </a-radio>
                    </a-radio-group>
                  </a-form-model-item>
                </a-col>
              </a-row>
            </a-col>
            <a-col :span="24" :md="12">
              <a-row :gutter="16">
                <a-col :span="24" :md="24">
                  <h5 class="mt-0 mb-1" :style="{ color: '#B9BABA' }">Sentido transversal</h5>
                </a-col>
                <!-- Zonata anterior -->
                <a-col :span="24" :md="24">
                  <a-form-model-item label="Zonata anterior">
                    <a-input
                      v-model="form.previous_sonata_trans"
                      :disabled="loading || disabledHasDate"
                      placeholder="Zonata anterior"
                    />
                  </a-form-model-item>
                </a-col>
                <!-- Zonata lateral derecha -->
                <a-col :span="24" :md="24">
                  <a-form-model-item label="Zonata lateral derecha">
                    <a-radio-group v-model="form.side_right_sonata_trans">
                      <a-radio :value="1" :disabled="loading || disabledHasDate"> Normal </a-radio>
                      <a-radio :value="2" :disabled="loading || disabledHasDate"> Abierto </a-radio>
                    </a-radio-group>
                  </a-form-model-item>
                </a-col>
                <!-- Zonata lateral izquierdo -->
                <a-col :span="24" :md="24">
                  <a-form-model-item label="Zonata lateral izquierdo">
                    <a-radio-group v-model="form.side_left_sonata_rrans">
                      <a-radio :value="1" :disabled="loading || disabledHasDate"> Normal </a-radio>
                      <a-radio :value="2" :disabled="loading || disabledHasDate"> Abierto </a-radio>
                    </a-radio-group>
                  </a-form-model-item>
                </a-col>
              </a-row>
            </a-col>
          </a-row>
        </a-col>
        <a-divider dashed> </a-divider>

        <!-- Análisis de modelos -->
        <a-col :span="24" :md="24">
          <a-form-model-item label="Examenes auxiliares">
            <a-upload-dragger
              :disabled="loading || disabledHasDate"
              :action="apiHost + '/file/upload'"
              :multiple="true"
              :headers="headers"
              :file-list="form.model_analysis_exams"
              @change="changeUpload($event, 'model_analysis_exams')"
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
        <!-- Resumen -->
        <a-col :span="24">
          <a-form-model-item label="Resumen">
            <a-textarea v-model="form.resume" :rows="4" />
          </a-form-model-item>
        </a-col>
        <!-- Exámenes axiliares -->
        <a-col :span="24" :md="24">
          <a-form-model-item label="Adjuntar archivos radiográficos">
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
        <a-divider dashed>
          <span :style="{ color: '#B9BABA', fontWeight: 600, fontSize: '14px' }"> Análisis cefolométricos </span>
        </a-divider>
        <!-- Diagnostico -->
        <a-col :span="12">
          <a-form-model-item label="Diagnóstico">
            <a-textarea v-model="form.cefolometric_diagnosis" :rows="4" :disabled="loading || disabledHasDate" />
          </a-form-model-item>
        </a-col>
        <!-- Plan de tratamiento (objetivo/aparatología) -->
        <a-col :span="12">
          <a-form-model-item label="Plan de tratamiento (objetivo/aparatología)">
            <a-textarea v-model="form.cefolometric_plan" :rows="4" :disabled="loading || disabledHasDate" />
          </a-form-model-item>
        </a-col>
        <!-- Tiempo estimado -->
        <a-col :span="12">
          <a-form-model-item label="Tiempo estimado">
            <a-textarea v-model="form.cefolometric_estimated_time" :rows="4" :disabled="loading || disabledHasDate" />
          </a-form-model-item>
        </a-col>
        <!-- Prognóstico -->
        <a-col :span="12">
          <a-form-model-item label="Prognóstico">
            <a-textarea v-model="form.cefolometric_prognosis" :rows="4" :disabled="loading || disabledHasDate" />
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
import _ from 'lodash'

export default {
  props: {
    form: {
      type: Object,
      default: {
        usesin: [],
        model_analysis_exams: [],
        auxiliary_exams: [],
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
      partoArray: [
        { value: 1, label: 'Normal' },
        { value: 2, label: 'Cesarea' },
      ],
      patronFacialArray: [
        { value: 1, label: 'Mesofacial' },
        { value: 2, label: 'Dólico facial' },
        { value: 3, label: 'Braquifacial' },
      ],
      perfilArray: [
        { value: 1, label: 'Recto' },
        { value: 2, label: 'Cóncavo' },
        { value: 3, label: 'Convexto' },
      ],
      perfilMaxArray: [
        { value: 1, label: 'Ortognático' },
        { value: 2, label: 'Retrognático' },
        { value: 3, label: 'Prognático' },
      ],
      perfilMadArray: [
        { value: 1, label: 'Ortognático' },
        { value: 2, label: 'Retrognático' },
        { value: 3, label: 'Prognático' },
      ],
      surcoArray: [
        { value: 1, label: 'Normal' },
        { value: 2, label: 'Marcado' },
        { value: 3, label: 'Borrado' },
      ],
      labiosArray: [
        { value: 1, label: 'Competentes' },
        { value: 2, label: 'Incompetentes' },
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
          response = await this.$axios.$put(`/orthodontic_patient/${tempForm.id}`, tempForm).catch((errors) => {
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
      changeLoading: 'data/orthodontics/CHANGE_LOADING',
    }),
  },
  watch: {},
}
</script>

<style></style>
