<template>
  <div class="form-general">
    <a-form-model :model="form" ref="newPacient">
      <a-row :gutter="16">
        <a-divider dashed :style="{ marginTop: 0 }">
          <span :style="{ color: '#B9BABA', fontWeight: 600, fontSize: '14px' }"> Protesis total removible </span>
        </a-divider>
        <a-col :span="24" :md="24">
          <h6 class="mt-0 mb-1" :style="{ color: '#B9BABA' }">Examen extraoral</h6>
        </a-col>
        <!-- Proporciones faciales -->
        <a-col :span="24" :md="8">
          <a-form-model-item label="Proporciones faciales">
            <a-select
              placeholder="Seleccione una opción"
              :options="proporcionesParcialesArray"
              v-model="form.partialProportion"
              :allowClear="true"
              :disabled="loading"
            >
            </a-select>
          </a-form-model-item>
        </a-col>
        <!-- Dimensión vertical -->
        <a-col :span="24" :md="8">
          <a-form-model-item label="Dimensión vertical">
            <a-select
              placeholder="Seleccione una opción"
              :options="dimensionesVerticalesArray"
              v-model="form.verticalDimension"
              :allowClear="true"
              :disabled="loading"
            >
            </a-select>
          </a-form-model-item>
        </a-col>
        <!-- Perfil facial -->
        <a-col :span="24" :md="8">
          <a-form-model-item label="Perfil facial">
            <a-select
              placeholder="Seleccione una opción"
              :options="perfilFacialArray"
              v-model="form.facialProfile"
              :allowClear="true"
              :disabled="loading"
            >
            </a-select>
          </a-form-model-item>
        </a-col>
        <!-- Contorno perioral -->
        <a-col :span="24" :md="8">
          <a-form-model-item label="Contorno perioral">
            <a-select
              placeholder="Seleccione una opción"
              :options="contornoPerioralArray"
              v-model="form.contourPerioral"
              :allowClear="true"
              :disabled="loading"
            >
            </a-select>
          </a-form-model-item>
        </a-col>
        <!-- Apertura bocal -->
        <a-col :span="24" :md="8">
          <a-form-model-item label="Apertura bocal">
            <a-select
              placeholder="Seleccione una opción"
              :options="aperturaBocalArray"
              v-model="form.openingOral"
              :allowClear="true"
              :disabled="loading"
            >
            </a-select>
          </a-form-model-item>
        </a-col>
        <!-- Labios -->
        <a-col :span="24" :md="8">
          <a-form-model-item label="Labios">
            <a-select
              placeholder="Seleccione una opción"
              :options="labiosArray"
              v-model="form.lips"
              :allowClear="true"
              :disabled="loading"
            >
            </a-select>
          </a-form-model-item>
        </a-col>
        <a-col :span="24" :md="24">
          <h6 class="mt-0 mb-1" :style="{ color: '#B9BABA' }">Examen intraoral</h6>
        </a-col>
        <!-- Forma de arcos -->
        <a-col :span="24" :md="8">
          <a-form-model-item label="Forma de arcos">
            <a-select
              placeholder="Seleccione una opción"
              :options="formaArcosArray"
              v-model="form.archesShape"
              :allowClear="true"
              :disabled="loading"
            >
            </a-select>
          </a-form-model-item>
        </a-col>
        <!-- Tuberosidades -->
        <a-col :span="24" :md="8">
          <a-form-model-item label="Tuberosidades">
            <a-select
              placeholder="Seleccione una opción"
              :options="tuberosidadesArray"
              v-model="form.pipes"
              :allowClear="true"
              :disabled="loading"
            >
            </a-select>
          </a-form-model-item>
        </a-col>
        <!-- Simetría de arcos -->
        <a-col :span="24" :md="8">
          <a-form-model-item label="Simetría de arcos">
            <a-select
              placeholder="Seleccione una opción"
              :options="simetriArcosArray"
              v-model="form.archesSymmetry"
              :allowClear="true"
              :disabled="loading"
            >
            </a-select>
          </a-form-model-item>
        </a-col>
        <!-- Papila retromolar -->
        <a-col :span="24" :md="8">
          <a-form-model-item label="Papila retromolar">
            <a-select
              placeholder="Seleccione una opción"
              :options="papilaArray"
              v-model="form.retromolarPapila"
              :allowClear="true"
              :disabled="loading"
            >
            </a-select>
          </a-form-model-item>
        </a-col>
        <!-- Forma de rebordes -->
        <a-col :span="24" :md="8">
          <a-form-model-item label="Forma de rebordes">
            <a-select
              placeholder="Seleccione una opción"
              :options="rebordesArray"
              v-model="form.flageShape"
              :allowClear="true"
              :disabled="loading"
            >
            </a-select>
          </a-form-model-item>
        </a-col>
        <!-- Surco hamular -->
        <a-col :span="24" :md="8">
          <a-form-model-item label="Surco hamular">
            <a-select
              placeholder="Seleccione una opción"
              :options="surcoHamularArray"
              v-model="form.grooveGrind"
              :allowClear="true"
              :disabled="loading"
            >
            </a-select>
          </a-form-model-item>
        </a-col>
        <!-- Altura de rebordes -->
        <a-col :span="24" :md="8">
          <a-form-model-item label="Altura de rebordes">
            <a-select
              placeholder="Seleccione una opción"
              :options="alturaRebordesArray"
              v-model="form.flangeHeight"
              :allowClear="true"
              :disabled="loading"
            >
            </a-select>
          </a-form-model-item>
        </a-col>
        <!-- Post damming -->
        <a-col :span="24" :md="8">
          <a-form-model-item label="Post damming">
            <a-select
              placeholder="Seleccione una opción"
              :options="dammnigsArray"
              v-model="form.postDamming"
              :allowClear="true"
              :disabled="loading"
            >
            </a-select>
          </a-form-model-item>
        </a-col>
        <!-- Mucosa sobre rebordes -->
        <a-col :span="24" :md="8">
          <a-form-model-item label="Mucosa sobre rebordes">
            <a-select
              placeholder="Seleccione una opción"
              :options="mucosaRebordeArray"
              v-model="form.mucousOverRidges"
              :allowClear="true"
              :disabled="loading"
            >
            </a-select>
          </a-form-model-item>
        </a-col>
        <!-- Lengua -->
        <a-col :span="24" :md="8">
          <a-form-model-item label="Lengua">
            <a-select
              placeholder="Seleccione una opción"
              :options="lenguaArray"
              v-model="form.tongue"
              :allowClear="true"
              :disabled="loading"
            >
            </a-select>
          </a-form-model-item>
        </a-col>
        <!-- Relación entre rebordes -->
        <a-col :span="24" :md="8">
          <a-form-model-item label="Relación entre rebordes">
            <a-select
              placeholder="Seleccione una opción"
              :options="relacionBordesArray"
              v-model="form.relationshipFlanges"
              :allowClear="true"
              :disabled="loading"
            >
            </a-select>
          </a-form-model-item>
        </a-col>
        <!-- Saliva -->
        <a-col :span="24" :md="8">
          <a-form-model-item label="Saliva">
            <a-select
              placeholder="Seleccione una opción"
              :options="spitArray"
              v-model="form.spit"
              :allowClear="true"
              :disabled="loading"
            >
            </a-select>
          </a-form-model-item>
        </a-col>
        <!-- Frenillos -->
        <a-col :span="24" :md="8">
          <a-form-model-item label="Frenillos">
            <a-select
              placeholder="Seleccione una opción"
              :options="frenillosArray"
              v-model="form.braces"
              :allowClear="true"
              :disabled="loading"
            >
            </a-select>
          </a-form-model-item>
        </a-col>
        <!-- Pronóstico -->
        <a-col :span="24" :md="8">
          <a-form-model-item label="Pronóstico">
            <a-select
              placeholder="Seleccione una opción"
              :options="pronosticoArray"
              v-model="form.forecast"
              :allowClear="true"
              :disabled="loading"
            >
            </a-select>
          </a-form-model-item>
        </a-col>
        <!-- Exostosis -->
        <a-col :span="24" :md="8">
          <a-form-model-item label="Exostosis">
            <a-select
              placeholder="Seleccione una opción"
              :options="exostosisArray"
              v-model="form.exostoses"
              :allowClear="true"
              :disabled="loading"
            >
            </a-select>
          </a-form-model-item>
        </a-col>
        <a-col :span="24" :md="24">
          <h6 class="mt-0 mb-1" :style="{ color: '#B9BABA' }">Plan de trabajo para el diagnóstico en rehabilitación oral</h6>
        </a-col>
        <!-- Radiografías -->
        <a-col :span="24" :md="24">
          <a-form-model-item label="Radiografías">
            <a-upload-dragger
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              :multiple="true"
              :default-file-list="defaultListFiles"
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
        <!-- Fotografías -->
        <a-col :span="24" :md="24">
          <a-form-model-item label="Fotografías">
            <a-upload-dragger
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              :multiple="true"
              :default-file-list="defaultListFiles"
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
        <!-- Modelos de estudio -->
        <a-col :span="24" :md="24">
          <a-form-model-item label="Modelos de estudio">
            <a-upload-dragger
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              :multiple="true"
              :default-file-list="defaultListFiles"
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
        <!-- Corona anatómica -->
        <a-col :span="24" :md="24">
          <a-form-model-item label="Corona anatómica">
            <a-checkbox-group v-model="form.articulate">
              <a-checkbox :value="1" name="RFA" :disabled="loading"> RFA </a-checkbox>
              <a-checkbox :value="2" name="RC" :disabled="loading"> RC </a-checkbox>
              <a-checkbox :value="3" name="MIC" :disabled="loading"> MIC </a-checkbox>
            </a-checkbox-group>
          </a-form-model-item>
        </a-col>
        <!--  Encerado de planificación -->
        <a-col :span="24" :md="24">
          <a-form-model-item label="Encerado de planificación">
            <a-input v-model="form.planningWaxing" :disabled="loading" />
          </a-form-model-item>
        </a-col>

        <a-col :span="24">
          <a-button type="primary" html-type="submit" @click="() => $emit('close')"> Guardar </a-button>
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
      proporcionesParcialesArray: [
        { value: 1, label: 'Simetría' },
        { value: 2, label: 'Asimetría' },
      ],
      dimensionesVerticalesArray: [
        { value: 1, label: 'Conversada' },
        { value: 2, label: 'Aumentada' },
      ],
      perfilFacialArray: [
        { value: 1, label: 'Recto' },
        { value: 2, label: 'Convexo' },
      ],
      contornoPerioralArray: [
        { value: 1, label: 'Normal' },
        { value: 2, label: 'Hipotonico' },
      ],
      aperturaBocalArray: [
        { value: 1, label: 'Normal' },
        { value: 2, label: 'Pequeña' },
        { value: 3, label: 'Grande' },
      ],
      labiosArray: [
        { value: 1, label: 'Cortos' },
        { value: 2, label: 'Largos' },
        { value: 3, label: 'Gruesos' },
      ],
      formaArcosArray: [
        { value: 1, label: 'Ovoide' },
        { value: 2, label: 'Triangular' },
      ],
      tuberosidadesArray: [
        { value: 1, label: 'Pequeña' },
        { value: 2, label: 'Mediana' },
        { value: 3, label: 'Gruesa' },
      ],
      simetriArcosArray: [
        { value: 1, label: 'Simétricos' },
        { value: 2, label: 'Asimetricos' },
      ],
      papilaArray: [
        { value: 1, label: 'Pequeña' },
        { value: 2, label: 'Mediana' },
        { value: 3, label: 'Gruesa' },
      ],
      rebordesArray: [
        { value: 1, label: 'Regular' },
        { value: 2, label: 'Irregular' },
      ],
      surcoHamularArray: [
        { value: 1, label: 'Presente' },
        { value: 2, label: 'Ausente' },
      ],
      alturaRebordesArray: [
        { value: 1, label: 'Alto' },
        { value: 2, label: 'Mediano' },
        { value: 3, label: 'Bajo' },
      ],
      dammnigsArray: [
        { value: 1, label: 'Tipo I' },
        { value: 2, label: 'Tipo II' },
        { value: 3, label: 'Tipo III' },
      ],
      mucosaRebordeArray: [
        { value: 1, label: 'Resilente' },
        { value: 2, label: 'Firme' },
      ],
      lenguaArray: [
        { value: 1, label: 'Normal' },
        { value: 2, label: 'Mocroglo' },
      ],
      relacionBordesArray: [
        { value: 1, label: 'Clase I' },
        { value: 2, label: 'Clase II' },
        { value: 3, label: 'Clase III' },
      ],
      spitArray: [
        { value: 1, label: 'Adecuada' },
        { value: 2, label: 'Escasa' },
      ],
      frenillosArray: [{ value: 1, label: 'Insersión favorable' }],
      pronosticoArray: [
        { value: 1, label: 'Bueno' },
        { value: 2, label: 'Regular' },
        { value: 3, label: 'Malo' },
      ],
      exostosisArray: [
        { value: 1, label: 'Torus' },
        { value: 2, label: 'Platino' },
      ],
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
}
</script>

<style></style>
