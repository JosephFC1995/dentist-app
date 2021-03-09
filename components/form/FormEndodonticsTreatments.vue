<template>
  <div class="form-general custom--data">
    <a-form-model :model="form" ref="newPacient">
      <a-row :gutter="16">
        <!-- Indicador de tratamiento -->
        <a-col :span="24" :md="24">
          <a-form-model-item label="Indicador de tratamiento">
            <a-checkbox-group v-model="form.indicatedTreatment">
              <a-checkbox :value="1" :disabled="loading"> Biopulpectomía </a-checkbox>
              <a-checkbox :value="2" :disabled="loading"> Necropulpectomía </a-checkbox>
              <a-checkbox :value="3" :disabled="loading"> Retratamiento </a-checkbox>
              <a-checkbox :value="4" :disabled="loading"> Blanqueamiento </a-checkbox>
              <a-checkbox :value="5" :disabled="loading"> Apicectomía </a-checkbox>
              <a-checkbox :value="6" :disabled="loading"> Hemisección </a-checkbox>
              <a-checkbox :value="7" :disabled="loading"> Radicectomía </a-checkbox>
              <a-checkbox :value="8" :disabled="loading"> Extracción </a-checkbox>
            </a-checkbox-group>
          </a-form-model-item>
        </a-col>
        <a-col :span="24" :md="24">
          <h6 class="mt-0 mb-1" :style="{ color: '#000' }">Datos clínicos</h6>
          <a-row :gutter="16">
            <a-col :span="24" :md="4"> </a-col>
            <a-col :span="24" :md="4">
              <span class="label" :style="textOneLine" title="Longitud de trabajo"> Longitud de trabajo </span>
            </a-col>
            <a-col :span="24" :md="4">
              <span class="label" :style="textOneLine" title="Punto de referencia"> Punto de referencia </span>
            </a-col>
            <a-col :span="24" :md="3">
              <span class="label" :style="textOneLine" title="Lima inicial"> Lima inicial </span>
            </a-col>
            <a-col :span="24" :md="3">
              <span class="label" :style="textOneLine" title="Última lima aplicada"> Última lima aplicada </span>
            </a-col>
            <a-col :span="24" :md="2">
              <span class="label" :style="textOneLine" title="Gates"> Gates </span>
            </a-col>
            <a-col :span="24" :md="4">
              <span class="label" :style="textOneLine" title="Cono maestrode Gutaperec. Ha"> Cono maestrode Gutaperec. Ha </span>
            </a-col>
          </a-row>
          <!-- Unicos -->
          <a-row :gutter="16" v-for="data in arrayData" :key="data.id" class="mb-3">
            <a-col :span="24" :md="4">
              <span class="label"> {{ data.label }} </span>
            </a-col>
            <a-col :span="24" :md="4">
              <a-input v-model="form[data.inputLength]" placeholder="Longitud" :disabled="loading" />
            </a-col>
            <a-col :span="24" :md="4">
              <a-input v-model="form[data.inputPoint]" placeholder="Punto" :disabled="loading" />
            </a-col>
            <a-col :span="24" :md="3">
              <a-input v-model="form[data.inputFile]" placeholder="Lima inicial" :disabled="loading" />
            </a-col>
            <a-col :span="24" :md="3">
              <a-input v-model="form[data.inputLastFile]" placeholder="Ultima lima" :disabled="loading" />
            </a-col>
            <a-col :span="24" :md="2">
              <a-input v-model="form[data.inputGates]" placeholder="Gates" :disabled="loading" />
            </a-col>
            <a-col :span="24" :md="4">
              <a-input v-model="form[data.inputCones]" placeholder="Cono" :disabled="loading" />
            </a-col>
          </a-row>
        </a-col>
        <a-col :span="24">
          <a-divider dashed> </a-divider>
        </a-col>
        <!-- Téc. de instrumentación -->
        <a-col :span="24" :md="24">
          <a-form-model-item label="Téc. de instrumentación">
            <a-radio-group v-model="form.text_inst_radio">
              <a-radio :value="1" :disabled="loading"> Convencional </a-radio>
              <a-radio :value="2" :disabled="loading"> Fuerza balanceadas </a-radio>
              <a-radio :value="3" :disabled="loading"> Criwn Down </a-radio>
              <a-radio :value="4" :disabled="loading"> Step back </a-radio>
              <a-radio :value="-1" :disabled="loading"> Otra </a-radio>
            </a-radio-group>
          </a-form-model-item>
        </a-col>
        <a-col :span="24" :md="24">
          <a-form-model-item>
            <a-input v-model="form.textInst_input" placeholder="Otra" :disabled="loading || form.textInst_radio != -1" />
          </a-form-model-item>
        </a-col>
        <!-- Agente irrigante -->
        <a-col :span="24" :md="24">
          <a-form-model-item label="Agente irrigante">
            <a-radio-group v-model="form.irrigantAgent_radio">
              <a-radio :value="1" :disabled="loading"> NaOCI 1% </a-radio>
              <a-radio :value="2" :disabled="loading"> NaOCI 2.5% </a-radio>
              <a-radio :value="3" :disabled="loading"> NaOCI 5.25% </a-radio>
              <a-radio :value="-1" :disabled="loading"> Otra </a-radio>
            </a-radio-group>
          </a-form-model-item>
        </a-col>
        <a-col :span="24" :md="24">
          <a-form-model-item>
            <a-input
              v-model="form.irrigantAgent_input"
              placeholder="Otra"
              :disabled="loading || form.irrigantAgent_radio != -1"
            />
          </a-form-model-item>
        </a-col>
        <!-- Curativo de demora -->
        <a-col :span="24" :md="24">
          <a-form-model-item label="Curativo de demora">
            <a-radio-group v-model="form.delayHealing_radio">
              <a-radio :value="1" :disabled="loading"> So </a-radio>
              <a-radio :value="2" :disabled="loading"> No </a-radio>
              <a-radio :value="3" :disabled="loading"> Ca(OG)2 </a-radio>
              <a-radio :value="-1" :disabled="loading"> Otra </a-radio>
            </a-radio-group>
          </a-form-model-item>
        </a-col>
        <a-col :span="24" :md="24">
          <a-form-model-item>
            <a-input v-model="form.delayHealing_input" placeholder="Otra" :disabled="loading || form.delayHealing_radio != -1" />
          </a-form-model-item>
        </a-col>
        <!-- Obsturación -->
        <a-col :span="24" :md="24">
          <a-form-model-item label="Obsturación">
            <a-checkbox-group v-model="form.obsturation">
              <a-checkbox :value="1" :disabled="loading"> Lateral </a-checkbox>
            </a-checkbox-group>
          </a-form-model-item>
        </a-col>
        <!-- Cemento -->
        <a-col :span="24" :md="24">
          <a-form-model-item label="Cemento">
            <a-radio-group v-model="form.cement_radio">
              <a-radio :value="1" :disabled="loading"> Sealapex </a-radio>
              <a-radio :value="2" :disabled="loading"> Tubli Seal </a-radio>
              <a-radio :value="-1" :disabled="loading"> Otra </a-radio>
            </a-radio-group>
          </a-form-model-item>
        </a-col>
        <a-col :span="24" :md="24">
          <a-form-model-item>
            <a-input v-model="form.cement_input" placeholder="Otra" :disabled="loading || form.cement_radio != -1" />
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
      arrayData: [
        {
          id: 1,
          label: 'Unicos',
          inputLength: 'keyLengthInputUnique',
          inputPoint: 'keyPointInputUnique',
          inputFile: 'keyFileInputUnique',
          inputLastFile: 'keyLastFileInputUnique',
          inputGates: 'keyGatesInputUnique',
          inputCones: 'keyConesInputUnique',
        },
        {
          id: 2,
          label: 'Vesticular',
          inputLength: 'keyLengthInputVesticular',
          inputPoint: 'keyPointInputVesticular',
          inputFile: 'keyFileInputVesticular',
          inputLastFile: 'keyLastFileInputVesticular',
          inputGates: 'keyGatesInputVesticular',
          inputCones: 'keyConesInputVesticular',
        },
        {
          id: 3,
          label: 'Palatino / Lingual',
          inputLength: 'keyLengthInputPalatine',
          inputPoint: 'keyPointInputPalatine',
          inputFile: 'keyFileInputPalatine',
          inputLastFile: 'keyLastFileInputPalatine',
          inputGates: 'keyGatesInputPalatine',
          inputCones: 'keyConesInputPalatine',
        },
        {
          id: 4,
          label: 'Mesio bucal',
          inputLength: 'keyLengthInputMesioBucal',
          inputPoint: 'keyPointInputMesioBucal',
          inputFile: 'keyFileInputMesioBucal',
          inputLastFile: 'keyLastFileInputMesioBucal',
          inputGates: 'keyGatesInputMesioBucal',
          inputCones: 'keyConesInputMesioBucal',
        },
        {
          id: 5,
          label: 'Mesio lingual',
          inputLength: 'keyLengthInputMesioLingual',
          inputPoint: 'keyPointInputMesioLingual',
          inputFile: 'keyFileInputMesioLingual',
          inputLastFile: 'keyLastFileInputMesioLingual',
          inputGates: 'keyGatesInputMesioLingual',
          inputCones: 'keyConesInputMesioLingual',
        },
        {
          id: 6,
          label: 'Distal',
          inputLength: 'keyLengthInputDistal',
          inputPoint: 'keyPointInputDistal',
          inputFile: 'keyFileInputDistal',
          inputLastFile: 'keyLastFileInputDistal',
          inputGates: 'keyGatesInputDistal',
          inputCones: 'keyConesInputDistal',
        },
        {
          id: 7,
          label: 'Disto bucal',
          inputLength: 'keyLengthInputDistoBucal',
          inputPoint: 'keyPointInputDistoBucal',
          inputFile: 'keyFileInputDistoBucal',
          inputLastFile: 'keyLastFileInputDistoBucal',
          inputGates: 'keyGatesInputDistoBucal',
          inputCones: 'keyConesInputDistoBucal',
        },
        {
          id: 8,
          label: 'Disto lingual',
          inputLength: 'keyLengthInputDistoLingual',
          inputPoint: 'keyPointInputDistoLingual',
          inputFile: 'keyFileInputDistoLingual',
          inputLastFile: 'keyLastFileInputDistoLingual',
          inputGates: 'keyGatesInputDistoLingual',
          inputCones: 'keyConesInputDistoLingual',
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
      textOneLine: {
        'font-size': '12px',
        'text-align': 'center',
        'white-space': 'nowrap',
        'text-overflow': 'ellipsis',
        overflow: 'hidden',
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
