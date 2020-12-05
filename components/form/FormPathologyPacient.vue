<template>
  <div class="form-general">
    <a-form-model :model="form" ref="newPacient">
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
                <a-radio-group v-model="form.superficialInjuryLips">
                  <a-radio :value="1" :disabled="loading"> Si </a-radio>
                  <a-radio :value="2" :disabled="loading"> No </a-radio>
                </a-radio-group>
              </a-form-model-item>
            </a-col>
            <!-- Lesión profunda -->
            <a-col :span="24" :md="24">
              <a-form-model-item label="Lesión profunda" :label-col="{ span: 6 }" labelAlign="left">
                <a-radio-group v-model="form.deepInjuryLips">
                  <a-radio :value="1" :disabled="loading"> Si </a-radio>
                  <a-radio :value="2" :disabled="loading"> No </a-radio>
                </a-radio-group>
              </a-form-model-item>
            </a-col>
            <a-col :span="24">
              <a-form-model-item label="Descripción de la característica de la lesión">
                <a-textarea v-model="form.observationLips" :rows="4" />
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
                <a-radio-group v-model="form.superficialInjuryCorners">
                  <a-radio :value="1" :disabled="loading"> Si </a-radio>
                  <a-radio :value="2" :disabled="loading"> No </a-radio>
                </a-radio-group>
              </a-form-model-item>
            </a-col>
            <!-- Lesión profunda -->
            <a-col :span="24" :md="24">
              <a-form-model-item label="Lesión profunda" :label-col="{ span: 6 }" labelAlign="left">
                <a-radio-group v-model="form.deepInjuryCorners">
                  <a-radio :value="1" :disabled="loading"> Si </a-radio>
                  <a-radio :value="2" :disabled="loading"> No </a-radio>
                </a-radio-group>
              </a-form-model-item>
            </a-col>
            <a-col :span="24">
              <a-form-model-item label="Descripción de la característica de la lesión">
                <a-textarea v-model="form.observationCorners" :rows="4" />
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
                <a-radio-group v-model="form.superficialInjuryMuous">
                  <a-radio :value="1" :disabled="loading"> Si </a-radio>
                  <a-radio :value="2" :disabled="loading"> No </a-radio>
                </a-radio-group>
              </a-form-model-item>
            </a-col>
            <!-- Lesión profunda -->
            <a-col :span="24" :md="24">
              <a-form-model-item label="Lesión profunda" :label-col="{ span: 6 }" labelAlign="left">
                <a-radio-group v-model="form.deepInjuryMuous">
                  <a-radio :value="1" :disabled="loading"> Si </a-radio>
                  <a-radio :value="2" :disabled="loading"> No </a-radio>
                </a-radio-group>
              </a-form-model-item>
            </a-col>
            <a-col :span="24">
              <a-form-model-item label="Descripción de la característica de la lesión">
                <a-textarea v-model="form.observationMuous" :rows="4" />
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
                <a-radio-group v-model="form.superficialInjuryHardPalate">
                  <a-radio :value="1" :disabled="loading"> Si </a-radio>
                  <a-radio :value="2" :disabled="loading"> No </a-radio>
                </a-radio-group>
              </a-form-model-item>
            </a-col>
            <!-- Lesión profunda -->
            <a-col :span="24" :md="24">
              <a-form-model-item label="Lesión profunda" :label-col="{ span: 6 }" labelAlign="left">
                <a-radio-group v-model="form.deepInjuryHardPalate">
                  <a-radio :value="1" :disabled="loading"> Si </a-radio>
                  <a-radio :value="2" :disabled="loading"> No </a-radio>
                </a-radio-group>
              </a-form-model-item>
            </a-col>
            <a-col :span="24">
              <a-form-model-item label="Descripción de la característica de la lesión">
                <a-textarea v-model="form.observationHardPalate" :rows="4" />
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
                <a-radio-group v-model="form.superficialInjurySoftPalate">
                  <a-radio :value="1" :disabled="loading"> Si </a-radio>
                  <a-radio :value="2" :disabled="loading"> No </a-radio>
                </a-radio-group>
              </a-form-model-item>
            </a-col>
            <!-- Lesión profunda -->
            <a-col :span="24" :md="24">
              <a-form-model-item label="Lesión profunda" :label-col="{ span: 6 }" labelAlign="left">
                <a-radio-group v-model="form.deepInjurySoftPalate">
                  <a-radio :value="1" :disabled="loading"> Si </a-radio>
                  <a-radio :value="2" :disabled="loading"> No </a-radio>
                </a-radio-group>
              </a-form-model-item>
            </a-col>
            <a-col :span="24">
              <a-form-model-item label="Descripción de la característica de la lesión">
                <a-textarea v-model="form.observationSoftPalate" :rows="4" />
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
                <a-radio-group v-model="form.superficialInjuryOropharynx">
                  <a-radio :value="1" :disabled="loading"> Si </a-radio>
                  <a-radio :value="2" :disabled="loading"> No </a-radio>
                </a-radio-group>
              </a-form-model-item>
            </a-col>
            <!-- Lesión profunda -->
            <a-col :span="24" :md="24">
              <a-form-model-item label="Lesión profunda" :label-col="{ span: 6 }" labelAlign="left">
                <a-radio-group v-model="form.deepInjuryOropharynx">
                  <a-radio :value="1" :disabled="loading"> Si </a-radio>
                  <a-radio :value="2" :disabled="loading"> No </a-radio>
                </a-radio-group>
              </a-form-model-item>
            </a-col>
            <a-col :span="24">
              <a-form-model-item label="Descripción de la característica de la lesión">
                <a-textarea v-model="form.observationOropharynx" :rows="4" />
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
                <a-radio-group v-model="form.superficialInjuryMouthfloor">
                  <a-radio :value="1" :disabled="loading"> Si </a-radio>
                  <a-radio :value="2" :disabled="loading"> No </a-radio>
                </a-radio-group>
              </a-form-model-item>
            </a-col>
            <!-- Lesión profunda -->
            <a-col :span="24" :md="24">
              <a-form-model-item label="Lesión profunda" :label-col="{ span: 6 }" labelAlign="left">
                <a-radio-group v-model="form.deepInjuryMouthfloor">
                  <a-radio :value="1" :disabled="loading"> Si </a-radio>
                  <a-radio :value="2" :disabled="loading"> No </a-radio>
                </a-radio-group>
              </a-form-model-item>
            </a-col>
            <a-col :span="24">
              <a-form-model-item label="Descripción de la característica de la lesión">
                <a-textarea v-model="form.observationMouthfloor" :rows="4" />
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
                <a-radio-group v-model="form.superficialInjuryTonge">
                  <a-radio :value="1" :disabled="loading"> Si </a-radio>
                  <a-radio :value="2" :disabled="loading"> No </a-radio>
                </a-radio-group>
              </a-form-model-item>
            </a-col>
            <!-- Lesión profunda -->
            <a-col :span="24" :md="24">
              <a-form-model-item label="Lesión profunda" :label-col="{ span: 6 }" labelAlign="left">
                <a-radio-group v-model="form.deepInjuryTonge">
                  <a-radio :value="1" :disabled="loading"> Si </a-radio>
                  <a-radio :value="2" :disabled="loading"> No </a-radio>
                </a-radio-group>
              </a-form-model-item>
            </a-col>
            <a-col :span="24">
              <a-form-model-item label="Descripción de la característica de la lesión">
                <a-textarea v-model="form.observationTonge" :rows="4" />
              </a-form-model-item>
            </a-col>
          </a-row>
        </a-col>
        <!-- Tamaño -->
        <a-col :span="24" :md="24">
          <a-form-model-item label="Tamaño" :label-col="{ span: 6 }" labelAlign="left">
            <a-input v-model="form.size" />
          </a-form-model-item>
        </a-col>
        <!-- Base -->
        <a-col :span="24" :md="24">
          <a-form-model-item label="Base" :label-col="{ span: 4 }" labelAlign="left">
            <a-radio-group v-model="form.base">
              <a-radio :value="1" :disabled="loading"> Sésil </a-radio>
              <a-radio :value="2" :disabled="loading"> Pepiculada </a-radio>
              <a-radio :value="3" :disabled="loading"> Plano </a-radio>
              <a-radio :value="4" :disabled="loading"> Indurada </a-radio>
            </a-radio-group>
          </a-form-model-item>
        </a-col>
        <!-- Color -->
        <a-col :span="24" :md="24">
          <a-form-model-item label="Color" :label-col="{ span: 4 }" labelAlign="left">
            <a-radio-group v-model="form.color">
              <a-radio :value="1" :disabled="loading"> Leucoplasica </a-radio>
              <a-radio :value="2" :disabled="loading"> Eritroplacia </a-radio>
            </a-radio-group>
          </a-form-model-item>
        </a-col>
        <!-- Bordes -->
        <a-col :span="24" :md="24">
          <a-form-model-item label="Bordes" :label-col="{ span: 4 }" labelAlign="left">
            <a-radio-group v-model="form.borders">
              <a-radio :value="1" :disabled="loading"> Irregular </a-radio>
              <a-radio :value="2" :disabled="loading"> Definidos </a-radio>
              <a-radio :value="3" :disabled="loading"> Sinuosos </a-radio>
              <a-radio :value="4" :disabled="loading"> Elevados </a-radio>
              <a-radio :value="5" :disabled="loading"> Indurados </a-radio>
            </a-radio-group>
          </a-form-model-item>
        </a-col>
        <!-- Superficie -->
        <a-col :span="24" :md="24">
          <a-form-model-item label="Superficie" :label-col="{ span: 4 }" labelAlign="left">
            <a-radio-group v-model="form.area">
              <a-radio :value="1" :disabled="loading"> Ulceada </a-radio>
              <a-radio :value="2" :disabled="loading"> No ulcerada </a-radio>
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
              <a-radio :value="1" :disabled="loading"> Blada </a-radio>
              <a-radio :value="2" :disabled="loading"> Dura </a-radio>
              <a-radio :value="3" :disabled="loading"> Fluctuante </a-radio>
              <a-radio :value="4" :disabled="loading"> Renitente </a-radio>
              <a-radio :value="5" :disabled="loading"> Otro </a-radio>
            </a-radio-group>
          </a-form-model-item>
        </a-col>
        <!-- Movilidad -->
        <a-col :span="24" :md="24">
          <a-form-model-item label="Movilidad" :label-col="{ span: 4 }" labelAlign="left">
            <a-radio-group v-model="form.move">
              <a-radio :value="1" :disabled="loading"> Si </a-radio>
              <a-radio :value="2" :disabled="loading"> No </a-radio>
            </a-radio-group>
          </a-form-model-item>
        </a-col>
        <!-- Exudado o secreción -->
        <a-col :span="24" :md="24">
          <a-form-model-item label="Exudado o secreción" :label-col="{ span: 4 }" labelAlign="left">
            <a-radio-group v-model="form.exudate">
              <a-radio :value="1" :disabled="loading"> Si </a-radio>
              <a-radio :value="2" :disabled="loading"> No </a-radio>
            </a-radio-group>
          </a-form-model-item>
        </a-col>
        <!-- Diagama de la lesión -->
        <a-col :span="24" :md="24">
          <a-form-model-item label="Diagama de la lesión">
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
        <!-- Diagnóstico presuntivo -->
        <a-col :span="24" :md="24">
          <a-form-model-item label="Diagnóstico presuntivo" :label-col="{ span: 6 }" labelAlign="left">
            <a-input v-model="form.presumptiveDiagnosis" />
          </a-form-model-item>
        </a-col>
        <!-- Examenes auxiliares -->
        <a-col :span="24" :md="12">
          <a-form-model-item label="Examenes auxiliares">
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
        <!-- RX -->
        <a-col :span="24" :md="12">
          <a-form-model-item label="RX">
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
        <!-- Tomografía -->
        <a-col :span="24" :md="12">
          <a-form-model-item label="Tomografía">
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
        <!-- Análisis clínicos -->
        <a-col :span="24" :md="12">
          <a-form-model-item label="Análisis clínicos">
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
        <!-- Biopsia exisional -->
        <a-col :span="24" :md="12">
          <a-form-model-item label="Biopsia exisional">
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
        <!-- Biopsia exofoliativa -->
        <a-col :span="24" :md="12">
          <a-form-model-item label="Biopsia exofoliativa">
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
        <!-- Otros -->
        <a-col :span="24" :md="12">
          <a-form-model-item label="Otros">
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
        <!-- Diagnóstico definitivo -->
        <a-col :span="24" :md="24">
          <a-form-model-item label="Diagnóstico definitivo" :label-col="{ span: 6 }" labelAlign="left">
            <a-input v-model="form.defineDiagnosis" />
          </a-form-model-item>
        </a-col>
        <!-- Tratamiento -->
        <a-col :span="24" :md="24">
          <a-form-model-item label="Tratamiento" :label-col="{ span: 6 }" labelAlign="left">
            <a-input v-model="form.treatment" />
          </a-form-model-item>
        </a-col>
        <!-- Pronósticos -->
        <a-col :span="24" :md="24">
          <a-form-model-item label="Pronósticos" :label-col="{ span: 6 }" labelAlign="left">
            <a-input v-model="form.forecasts" />
          </a-form-model-item>
        </a-col>
        <!-- Evolución -->
        <a-col :span="24" :md="24">
          <a-form-model-item label="Evolución" :label-col="{ span: 6 }" labelAlign="left">
            <a-input v-model="form.evolution" />
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
