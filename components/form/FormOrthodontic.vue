<template>
  <div class="form-general">
    <a-form-model :model="form" ref="newPacient">
      <a-row :gutter="16">
        <a-divider dashed>
          <span :style="{ color: '#B9BABA', fontWeight: 600, fontSize: '14px' }"> Información general</span>
        </a-divider>
        <a-col :span="24" :md="12">
          <a-row :gutter="16">
            <!-- Nucleo Familiar -->
            <a-col :span="24" :md="24">
              <a-form-model-item label="Nucleo familiar" :label-col="{ span: 6 }" labelAlign="left">
                <a-input v-model="form.familyNucleus" :disabled="loading" />
              </a-form-model-item>
            </a-col>
            <!-- Nacimiento -->
            <a-col :span="24" :md="24">
              <a-form-model-item label="Nacimiento" :label-col="{ span: 6 }" labelAlign="left">
                <a-radio-group v-model="form.birth">
                  <a-radio :value="1" :disabled="loading"> A término </a-radio>
                  <a-radio :value="2" :disabled="loading"> Otro </a-radio>
                </a-radio-group>
              </a-form-model-item>
            </a-col>
            <a-col :span="24" :md="24">
              <a-form-model-item>
                <a-input v-model="form.birthOther" :disabled="loading || form.birth != 2" placeholder="Otro" />
              </a-form-model-item>
            </a-col>
            <!-- Tipo de parto -->
            <a-col :span="24" :md="24">
              <a-form-model-item label="Tipo de parto">
                <a-select
                  placeholder="Seleccione una opción"
                  :options="partoArray"
                  v-model="form.parto"
                  :allowClear="true"
                  :disabled="loading"
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
                <a-radio-group v-model="form.previousTreatment">
                  <a-radio :value="1" :disabled="loading"> Si </a-radio>
                  <a-radio :value="2" :disabled="loading"> No </a-radio>
                </a-radio-group>
              </a-form-model-item>
            </a-col>
            <!-- Usó -->
            <a-col :span="24" :md="24">
              <a-form-model-item label="Usó">
                <a-checkbox-group v-model="form.use">
                  <a-checkbox :value="1" :disabled="loading"> Chupete </a-checkbox>
                  <a-checkbox :value="2" :disabled="loading"> Mamadera </a-checkbox>
                  <a-checkbox :value="3" :disabled="loading"> Lactancia </a-checkbox>
                  <a-checkbox :value="4" :disabled="loading"> Otro </a-checkbox>
                </a-checkbox-group>
              </a-form-model-item>
            </a-col>
            <a-col :span="24" :md="24">
              <a-form-model-item>
                <a-input v-model="form.useOther" :disabled="loading || form.use != 4" placeholder="Otro" />
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
                      v-model="form.facialPattern"
                      :allowClear="true"
                      :disabled="loading"
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
                      :disabled="loading"
                    >
                    </a-select>
                  </a-form-model-item>
                </a-col>
                <!-- Asimetría -->
                <a-col :span="24" :md="24">
                  <a-form-model-item label="Asimetría" :label-col="{ span: 6 }" labelAlign="left">
                    <a-radio-group v-model="form.asymmetry">
                      <a-radio :value="1" :disabled="loading"> Mad. derecha </a-radio>
                      <a-radio :value="2" :disabled="loading"> Mad. izquierda </a-radio>
                      <a-radio :value="3" :disabled="loading"> Otro </a-radio>
                    </a-radio-group>
                  </a-form-model-item>
                </a-col>
                <a-col :span="24" :md="24">
                  <a-form-model-item>
                    <a-input v-model="form.asymmetryOther" :disabled="loading || form.asymmetry != 3" placeholder="Otro" />
                  </a-form-model-item>
                </a-col>
                <!-- Altura facial -->
                <a-col :span="24" :md="24">
                  <a-form-model-item label="Altura facial" :label-col="{ span: 6 }" labelAlign="left">
                    <a-radio-group v-model="form.facialHeight">
                      <a-radio :value="1" :disabled="loading"> Equilibrada </a-radio>
                      <a-radio :value="2" :disabled="loading"> Larga </a-radio>
                      <a-radio :value="3" :disabled="loading"> Corta </a-radio>
                    </a-radio-group>
                  </a-form-model-item>
                </a-col>
                <!-- PerfilMaxilar -->
                <a-col :span="24" :md="24">
                  <a-form-model-item label="PerfilMaxilar">
                    <a-select
                      placeholder="Seleccione una opción"
                      :options="perfilMaxArray"
                      v-model="form.profileMax"
                      :allowClear="true"
                      :disabled="loading"
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
                      v-model="form.profileMad"
                      :allowClear="true"
                      :disabled="loading"
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
                      :disabled="loading"
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
                      v-model="form.lipsRest"
                      :allowClear="true"
                      :disabled="loading"
                    >
                    </a-select>
                  </a-form-model-item>
                </a-col>
              </a-row>
            </a-col>
            <!-- Perfil labial -->
            <a-col :span="24" :md="12">
              <a-form-model-item label="Perfil labial" :label-col="{ span: 6 }" labelAlign="left">
                <a-radio-group v-model="form.lipsProfile">
                  <a-radio :value="1" :disabled="loading"> Normal </a-radio>
                  <a-radio :value="2" :disabled="loading"> Protrusivos </a-radio>
                  <a-radio :value="3" :disabled="loading"> Retrusivos </a-radio>
                </a-radio-group>
              </a-form-model-item>
            </a-col>
            <a-col :span="24" :md="6">
              <a-form-model-item label="Superior">
                <a-input
                  v-model="form.lipsProfileTop"
                  :disabled="loading || form.lipsProfile != 3 || form.lipsProfile != 2"
                  placeholder="Superior"
                />
              </a-form-model-item>
            </a-col>
            <a-col :span="24" :md="6">
              <a-form-model-item label="Inferior">
                <a-input
                  v-model="form.lipsProfileBottom"
                  :disabled="loading || form.lipsProfile != 3 || form.lipsProfile != 2"
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
                  <a-radio :value="1" :disabled="loading"> Mad. derecha </a-radio>
                  <a-radio :value="2" :disabled="loading"> Mad. izquierda </a-radio>
                  <a-radio :value="3" :disabled="loading"> Otro </a-radio>
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
                    <a-input v-model="form.swallowingNormal" :disabled="loading" placeholder="Normal" />
                  </a-form-model-item>
                </a-col>
                <a-col :span="24" :md="12">
                  <a-form-model-item label="Contracción">
                    <a-input v-model="form.swallowingContraction" :disabled="loading" placeholder="Contracción" />
                  </a-form-model-item>
                </a-col>
                <!-- Actividad comisural -->
                <a-col :span="24" :md="24">
                  <h6 class="mt-0 mb-1" :style="{ color: '#B9BABA' }">Actividad comisural</h6>
                </a-col>
                <a-col :span="24" :md="12">
                  <a-form-model-item label="Normal">
                    <a-input v-model="form.commissuralNormal" :disabled="loading" placeholder="Normal" />
                  </a-form-model-item>
                </a-col>
                <a-col :span="24" :md="12">
                  <a-form-model-item label="Contracción">
                    <a-input v-model="form.commissuralContraction" :disabled="loading" placeholder="Contracción" />
                  </a-form-model-item>
                </a-col>
                <!-- Actividad lingual -->
                <a-col :span="24" :md="24">
                  <h6 class="mt-0 mb-1" :style="{ color: '#B9BABA' }">Actividad lingual</h6>
                </a-col>
                <a-col :span="24" :md="8">
                  <a-form-model-item label="Normal">
                    <a-input v-model="form.lingualNormal" :disabled="loading" placeholder="Normal" />
                  </a-form-model-item>
                </a-col>
                <a-col :span="24" :md="8">
                  <a-form-model-item label="Interp. Anterior">
                    <a-input v-model="form.lingualPrev" :disabled="loading" placeholder="Interp. Anterior" />
                  </a-form-model-item>
                </a-col>
                <a-col :span="24" :md="8">
                  <a-form-model-item label="Interp. Lateral">
                    <a-input v-model="form.lingualSide" :disabled="loading" placeholder="Interp. Lateral" />
                  </a-form-model-item>
                </a-col>
                <!-- Labio superior -->
                <a-col :span="24" :md="24">
                  <h6 class="mt-0 mb-1" :style="{ color: '#B9BABA' }">Labio superior</h6>
                </a-col>
                <a-col :span="24" :md="8">
                  <a-form-model-item label="Normal">
                    <a-input v-model="form.topLipNormal" :disabled="loading" placeholder="Normal" />
                  </a-form-model-item>
                </a-col>
                <a-col :span="24" :md="8">
                  <a-form-model-item label="Hipoactivo">
                    <a-input v-model="form.topLipHipo" :disabled="loading" placeholder="Hipoactivo" />
                  </a-form-model-item>
                </a-col>
                <a-col :span="24" :md="8">
                  <a-form-model-item label="Hiperactivo">
                    <a-input v-model="form.topLipHipe" :disabled="loading" placeholder="Hiperactivo" />
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
                    <a-input v-model="form.bottomLipNormal" :disabled="loading" placeholder="Normal" />
                  </a-form-model-item>
                </a-col>
                <a-col :span="24" :md="8">
                  <a-form-model-item label="Hipoactivo">
                    <a-input v-model="form.bottomLipHipo" :disabled="loading" placeholder="Hipoactivo" />
                  </a-form-model-item>
                </a-col>
                <a-col :span="24" :md="8">
                  <a-form-model-item label="Hiperactivo">
                    <a-input v-model="form.bottomLipHipe" :disabled="loading" placeholder="Hiperactivo" />
                  </a-form-model-item>
                </a-col>
                <!-- Mesetero -->
                <a-col :span="24" :md="24">
                  <h6 class="mt-0 mb-1" :style="{ color: '#B9BABA' }">Mesetero</h6>
                </a-col>
                <a-col :span="24" :md="8">
                  <a-form-model-item label="Normal">
                    <a-input v-model="form.masseterNormal" :disabled="loading" placeholder="Normal" />
                  </a-form-model-item>
                </a-col>
                <a-col :span="24" :md="8">
                  <a-form-model-item label="Hipoactivo">
                    <a-input v-model="form.masseterHipo" :disabled="loading" placeholder="Hipoactivo" />
                  </a-form-model-item>
                </a-col>
                <a-col :span="24" :md="8">
                  <a-form-model-item label="Hiperactivo">
                    <a-input v-model="form.masseterHipe" :disabled="loading" placeholder="Hiperactivo" />
                  </a-form-model-item>
                </a-col>
                <!-- Mentoniano -->
                <a-col :span="24" :md="24">
                  <h6 class="mt-0 mb-1" :style="{ color: '#B9BABA' }">Mentoniano</h6>
                </a-col>
                <a-col :span="24" :md="8">
                  <a-form-model-item label="Normal">
                    <a-input v-model="form.mentonianNormal" :disabled="loading" placeholder="Normal" />
                  </a-form-model-item>
                </a-col>
                <a-col :span="24" :md="8">
                  <a-form-model-item label="Hipoactivo">
                    <a-input v-model="form.mentonianHipo" :disabled="loading" placeholder="Hipoactivo" />
                  </a-form-model-item>
                </a-col>
                <a-col :span="24" :md="8">
                  <a-form-model-item label="Hiperactivo">
                    <a-input v-model="form.mentonianHipe" :disabled="loading" placeholder="Hiperactivo" />
                  </a-form-model-item>
                </a-col>
                <!-- Hábitos de succión -->
                <a-col :span="24" :md="24">
                  <h6 class="mt-0 mb-1" :style="{ color: '#B9BABA' }">Hábitos de succión</h6>
                </a-col>
                <a-col :span="24" :md="8">
                  <a-form-model-item label="Normal">
                    <a-input v-model="form.suctionNormal" :disabled="loading" placeholder="Normal" />
                  </a-form-model-item>
                </a-col>
                <a-col :span="24" :md="8">
                  <a-form-model-item label="Hipoactivo">
                    <a-input v-model="form.suctionHipo" :disabled="loading" placeholder="Hipoactivo" />
                  </a-form-model-item>
                </a-col>
                <a-col :span="24" :md="8">
                  <a-form-model-item label="Hiperactivo">
                    <a-input v-model="form.suctionHipe" :disabled="loading" placeholder="Hiperactivo" />
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
                    <a-input v-model="form.previousSonataSag" :disabled="loading" placeholder="Zonata anterior" />
                  </a-form-model-item>
                </a-col>
                <!-- Zonata lateral derecha -->
                <a-col :span="24" :md="24">
                  <a-form-model-item label="Zonata lateral derecha">
                    <a-radio-group v-model="form.sideRightSonataSag">
                      <a-radio :value="1" :disabled="loading"> Normal </a-radio>
                      <a-radio :value="2" :disabled="loading"> Abierto </a-radio>
                    </a-radio-group>
                  </a-form-model-item>
                </a-col>
                <!-- Zonata lateral izquierdo -->
                <a-col :span="24" :md="24">
                  <a-form-model-item label="Zonata lateral izquierdo">
                    <a-radio-group v-model="form.sideLeftSonataSag">
                      <a-radio :value="1" :disabled="loading"> Normal </a-radio>
                      <a-radio :value="2" :disabled="loading"> Abierto </a-radio>
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
                    <a-input v-model="form.previousSonataTrans" :disabled="loading" placeholder="Zonata anterior" />
                  </a-form-model-item>
                </a-col>
                <!-- Zonata lateral derecha -->
                <a-col :span="24" :md="24">
                  <a-form-model-item label="Zonata lateral derecha">
                    <a-radio-group v-model="form.sideRightSonataTrans">
                      <a-radio :value="1" :disabled="loading"> Normal </a-radio>
                      <a-radio :value="2" :disabled="loading"> Abierto </a-radio>
                    </a-radio-group>
                  </a-form-model-item>
                </a-col>
                <!-- Zonata lateral izquierdo -->
                <a-col :span="24" :md="24">
                  <a-form-model-item label="Zonata lateral izquierdo">
                    <a-radio-group v-model="form.sideLeftSonataTrans">
                      <a-radio :value="1" :disabled="loading"> Normal </a-radio>
                      <a-radio :value="2" :disabled="loading"> Abierto </a-radio>
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
          <a-form-model-item label="Análisis de modelos">
            <a-upload
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              :multiple="true"
              :default-file-list="defaultListFiles"
              @change="changeUpload"
            >
              <a-button type="primary">
                <span> <i class="uil uil-file-upload-alt mr-2"></i> Adjuntar documento </span>
              </a-button>
            </a-upload>
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
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              :multiple="true"
              :default-file-list="auxiliarExams"
              @change="changeUpload"
            >
              <p class="ant-upload-drag-icon">
                <i class="uil uil-cloud-upload"></i>
              </p>
              <p class="ant-upload-text">Haga clic o arrastre el archivo a esta área para cargar</p>
              <p class="ant-upload-hint">
                Compatibilidad con una carga única o masiva. Prohibir estrictamente cargando datos de la empresa u otros archivos
                de banda
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
            <a-textarea v-model="form.cefolometricDiagnosis" :rows="4" />
          </a-form-model-item>
        </a-col>
        <!-- Plan de tratamiento (objetivo/aparatología) -->
        <a-col :span="12">
          <a-form-model-item label="Plan de tratamiento (objetivo/aparatología)">
            <a-textarea v-model="form.cefolometricPlan" :rows="4" />
          </a-form-model-item>
        </a-col>
        <!-- Tiempo estimado -->
        <a-col :span="12">
          <a-form-model-item label="Tiempo estimado">
            <a-textarea v-model="form.cefolometricEstimatedTime" :rows="4" />
          </a-form-model-item>
        </a-col>
        <!-- Prognóstico -->
        <a-col :span="12">
          <a-form-model-item label="Prognóstico">
            <a-textarea v-model="form.cefolometricPrognosis" :rows="4" />
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
      partoArray: [
        { value: 1, label: 'Normal' },
        { value: 2, label: 'Cesarea' },
      ],
      patronFacialArray: [
        { value: 1, label: 'Mesofacial' },
        { value: 2, label: 'Dólico facial' },
        { value: 2, label: 'Braquifacial' },
      ],
      perfilArray: [
        { value: 1, label: 'Recto' },
        { value: 2, label: 'Cóncavo' },
        { value: 2, label: 'Convexto' },
      ],
      perfilMaxArray: [
        { value: 1, label: 'Ortognático' },
        { value: 2, label: 'Retrognático' },
        { value: 2, label: 'Prognático' },
      ],
      perfilMadArray: [
        { value: 1, label: 'Ortognático' },
        { value: 2, label: 'Retrognático' },
        { value: 2, label: 'Prognático' },
      ],
      surcoArray: [
        { value: 1, label: 'Normal' },
        { value: 2, label: 'Marcado' },
        { value: 2, label: 'Borrado' },
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
