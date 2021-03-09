<template>
  <div class="form-general">
    <a-form-model :model="form" ref="newPacient">
      <a-row :gutter="16">
        <!-- Exámenes clínicos -->
        <a-col :span="24" :md="24">
          <a-form-model-item label="Adjuntar archivos radiográficos">
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
        <!-- Cámara pulpar -->
        <a-col :span="24" :md="24">
          <a-form-model-item label="Cámara pulpar">
            <a-radio-group v-model="form.pulpar_camera">
              <a-radio :value="1" :disabled="loading"> Abierta </a-radio>
              <a-radio :value="2" :disabled="loading"> Cerrada </a-radio>
              <a-radio :value="3" :disabled="loading"> Amplia </a-radio>
              <a-radio :value="4" :disabled="loading"> Estrecha </a-radio>
              <a-radio :value="5" :disabled="loading"> Cálculos pulpar </a-radio>
            </a-radio-group>
          </a-form-model-item>
        </a-col>
        <!-- Conductos -->
        <a-col :span="24" :md="24">
          <a-form-model-item label="Conductos">
            <a-radio-group v-model="form.ducts">
              <a-radio :value="1" :disabled="loading" :style="horizontal"> Únicos </a-radio>
              <a-radio :value="2" :disabled="loading" :style="horizontal"> 2 conductos </a-radio>
              <a-radio :value="3" :disabled="loading" :style="horizontal"> 3 conductos </a-radio>
              <a-radio :value="4" :disabled="loading" :style="horizontal"> 4 conductos </a-radio>
              <a-radio :value="5" :disabled="loading" :style="horizontal"> Amplio </a-radio>
              <a-radio :value="6" :disabled="loading" :style="horizontal"> Estrecho </a-radio>
              <a-radio :value="7" :disabled="loading" :style="horizontal"> Recto </a-radio>
              <a-radio :value="8" :disabled="loading" :style="horizontal"> Curvo </a-radio>
              <a-radio :value="9" :disabled="loading" :style="horizontal"> Tratado anterio </a-radio>
            </a-radio-group>
          </a-form-model-item>
        </a-col>
        <a-col :span="24">
          <a-divider dashed> </a-divider>
        </a-col>
        <!-- Ápice abierto -->
        <a-col :span="24" :md="24">
          <a-form-model-item label="Ápice abierto">
            <a-radio-group v-model="form.apex_open">
              <a-radio :value="1" :disabled="loading"> Si </a-radio>
              <a-radio :value="2" :disabled="loading"> No </a-radio>
            </a-radio-group>
          </a-form-model-item>
        </a-col>
        <!-- Lesión abierto -->
        <a-col :span="24" :md="8">
          <a-form-model-item label="Lesión abierto">
            <a-radio-group v-model="form.injury_furca">
              <a-radio :value="1" :disabled="loading"> Si </a-radio>
              <a-radio :value="2" :disabled="loading"> No </a-radio>
            </a-radio-group>
          </a-form-model-item>
        </a-col>
        <!-- Lesión aplica -->
        <a-col :span="24" :md="8">
          <a-form-model-item label="Lesión aplica">
            <a-radio-group v-model="form.injury_apical">
              <a-radio :value="1" :disabled="loading"> Si </a-radio>
              <a-radio :value="2" :disabled="loading"> No </a-radio>
            </a-radio-group>
          </a-form-model-item>
        </a-col>
        <!-- Lesión lateral -->
        <a-col :span="24" :md="8">
          <a-form-model-item label="Lesión lateral">
            <a-radio-group v-model="form.injury_lateral">
              <a-radio :value="1" :disabled="loading"> Si </a-radio>
              <a-radio :value="2" :disabled="loading"> No </a-radio>
            </a-radio-group>
          </a-form-model-item>
        </a-col>
        <!-- Lesión endo-perio -->
        <a-col :span="24" :md="8">
          <a-form-model-item label="Lesión endo-perio">
            <a-radio-group v-model="form.injury_endoperio">
              <a-radio :value="1" :disabled="loading"> Si </a-radio>
              <a-radio :value="2" :disabled="loading"> No </a-radio>
            </a-radio-group>
          </a-form-model-item>
        </a-col>
        <!-- Raíces enanas -->
        <a-col :span="24" :md="8">
          <a-form-model-item label="Raíces enanas">
            <a-radio-group v-model="form.roots_dwarf">
              <a-radio :value="1" :disabled="loading"> Si </a-radio>
              <a-radio :value="2" :disabled="loading"> No </a-radio>
            </a-radio-group>
          </a-form-model-item>
        </a-col>
        <!-- Ligamento Periodontal -->
        <a-col :span="24" :md="8">
          <a-form-model-item label="Ligamento Periodontal">
            <a-radio-group v-model="form.periodontalLigament">
              <a-radio :value="1" :disabled="loading"> Si </a-radio>
              <a-radio :value="2" :disabled="loading"> No </a-radio>
            </a-radio-group>
          </a-form-model-item>
        </a-col>
        <!-- Fractura radicular -->
        <a-col :span="24" :md="24">
          <a-form-model-item label="Fractura radicular">
            <a-radio-group v-model="form.root_fracture_radio">
              <a-radio :value="1" :disabled="loading"> Si </a-radio>
              <a-radio :value="2" :disabled="loading"> No </a-radio>
            </a-radio-group>
          </a-form-model-item>
        </a-col>
        <a-col :span="24" :md="24">
          <a-form-model-item>
            <a-checkbox-group v-model="form.root_fracture_check">
              <a-checkbox :value="1" name="Vertical" :disabled="loading || form.rootFracture_radio != 1"> Vertical </a-checkbox>
              <a-checkbox :value="2" name="Horizontal" :disabled="loading || form.rootFracture_radio != 1">
                Horizontal
              </a-checkbox>
            </a-checkbox-group>
          </a-form-model-item>
        </a-col>
        <!-- Calificación -->
        <a-col :span="24" :md="8">
          <a-form-model-item label="Calificación">
            <a-radio-group v-model="form.calification">
              <a-radio :value="1" :disabled="loading"> Si </a-radio>
              <a-radio :value="2" :disabled="loading"> No </a-radio>
              <a-radio :value="2" :disabled="loading"> Total </a-radio>
              <a-radio :value="4" :disabled="loading"> Parcial </a-radio>
            </a-radio-group>
          </a-form-model-item>
        </a-col>
        <!-- Reabsorción -->
        <a-col :span="24" :md="24">
          <a-form-model-item label="Reabsorción">
            <a-radio-group v-model="form.reabsorption_radio">
              <a-radio :value="1" :disabled="loading"> Si </a-radio>
              <a-radio :value="2" :disabled="loading"> No </a-radio>
            </a-radio-group>
          </a-form-model-item>
        </a-col>
        <a-col :span="24" :md="24">
          <a-form-model-item>
            <a-checkbox-group v-model="form.reabsorption_check">
              <a-checkbox :value="1" name="Interna" :disabled="loading || form.reabsorption_radio != 1"> Intera </a-checkbox>
              <a-checkbox :value="2" name="Externa" :disabled="loading || form.reabsorption_radio != 1"> Externa </a-checkbox>
            </a-checkbox-group>
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
