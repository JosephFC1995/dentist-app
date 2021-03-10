<template>
  <div class="form-general">
    <a-alert
      message="Por favor seleccione una fecha para poder editar este formulario"
      type="warning"
      show-icon
      class="mb-3"
      v-if="!selectDate"
    />
    <a-form-model :model="form" ref="form">
      <a-row :gutter="16">
        <!-- Exámenes clínicos -->
        <a-col :span="24" :md="24">
          <a-form-model-item label="Adjuntar archivos radiográficos">
            <a-upload-dragger
              :disabled="loading || !selectDate"
              :action="apiHost + '/file/upload'"
              :headers="headers"
              :multiple="false"
              :file-list="form.ex_exams"
              @change="changeUpload"
              :beforeUpload="beforeUpload"
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
              <a-radio :value="1" :disabled="loading || !selectDate"> Abierta </a-radio>
              <a-radio :value="2" :disabled="loading || !selectDate"> Cerrada </a-radio>
              <a-radio :value="3" :disabled="loading || !selectDate"> Amplia </a-radio>
              <a-radio :value="4" :disabled="loading || !selectDate"> Estrecha </a-radio>
              <a-radio :value="5" :disabled="loading || !selectDate"> Cálculos pulpar </a-radio>
            </a-radio-group>
          </a-form-model-item>
        </a-col>
        <!-- Conductos -->
        <a-col :span="24" :md="24">
          <a-form-model-item label="Conductos">
            <a-radio-group v-model="form.ducts">
              <a-radio :value="1" :disabled="loading || !selectDate" :style="horizontal"> Únicos </a-radio>
              <a-radio :value="2" :disabled="loading || !selectDate" :style="horizontal"> 2 conductos </a-radio>
              <a-radio :value="3" :disabled="loading || !selectDate" :style="horizontal"> 3 conductos </a-radio>
              <a-radio :value="4" :disabled="loading || !selectDate" :style="horizontal"> 4 conductos </a-radio>
              <a-radio :value="5" :disabled="loading || !selectDate" :style="horizontal"> Amplio </a-radio>
              <a-radio :value="6" :disabled="loading || !selectDate" :style="horizontal"> Estrecho </a-radio>
              <a-radio :value="7" :disabled="loading || !selectDate" :style="horizontal"> Recto </a-radio>
              <a-radio :value="8" :disabled="loading || !selectDate" :style="horizontal"> Curvo </a-radio>
              <a-radio :value="9" :disabled="loading || !selectDate" :style="horizontal"> Tratado anterio </a-radio>
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
              <a-radio :value="1" :disabled="loading || !selectDate"> Si </a-radio>
              <a-radio :value="2" :disabled="loading || !selectDate"> No </a-radio>
            </a-radio-group>
          </a-form-model-item>
        </a-col>
        <!-- Lesión abierto -->
        <a-col :span="24" :md="8">
          <a-form-model-item label="Lesión abierto">
            <a-radio-group v-model="form.injury_furca">
              <a-radio :value="1" :disabled="loading || !selectDate"> Si </a-radio>
              <a-radio :value="2" :disabled="loading || !selectDate"> No </a-radio>
            </a-radio-group>
          </a-form-model-item>
        </a-col>
        <!-- Lesión aplica -->
        <a-col :span="24" :md="8">
          <a-form-model-item label="Lesión aplica">
            <a-radio-group v-model="form.injury_apical">
              <a-radio :value="1" :disabled="loading || !selectDate"> Si </a-radio>
              <a-radio :value="2" :disabled="loading || !selectDate"> No </a-radio>
            </a-radio-group>
          </a-form-model-item>
        </a-col>
        <!-- Lesión lateral -->
        <a-col :span="24" :md="8">
          <a-form-model-item label="Lesión lateral">
            <a-radio-group v-model="form.injury_lateral">
              <a-radio :value="1" :disabled="loading || !selectDate"> Si </a-radio>
              <a-radio :value="2" :disabled="loading || !selectDate"> No </a-radio>
            </a-radio-group>
          </a-form-model-item>
        </a-col>
        <!-- Lesión endo-perio -->
        <a-col :span="24" :md="8">
          <a-form-model-item label="Lesión endo-perio">
            <a-radio-group v-model="form.injury_endoperio">
              <a-radio :value="1" :disabled="loading || !selectDate"> Si </a-radio>
              <a-radio :value="2" :disabled="loading || !selectDate"> No </a-radio>
            </a-radio-group>
          </a-form-model-item>
        </a-col>
        <!-- Raíces enanas -->
        <a-col :span="24" :md="8">
          <a-form-model-item label="Raíces enanas">
            <a-radio-group v-model="form.roots_dwarf">
              <a-radio :value="1" :disabled="loading || !selectDate"> Si </a-radio>
              <a-radio :value="2" :disabled="loading || !selectDate"> No </a-radio>
            </a-radio-group>
          </a-form-model-item>
        </a-col>
        <!-- Ligamento Periodontal -->
        <a-col :span="24" :md="8">
          <a-form-model-item label="Ligamento Periodontal">
            <a-radio-group v-model="form.periodontalLigament">
              <a-radio :value="1" :disabled="loading || !selectDate"> Si </a-radio>
              <a-radio :value="2" :disabled="loading || !selectDate"> No </a-radio>
            </a-radio-group>
          </a-form-model-item>
        </a-col>
        <!-- Fractura radicular -->
        <a-col :span="24" :md="24">
          <a-form-model-item label="Fractura radicular">
            <a-radio-group v-model="form.root_fracture_radio">
              <a-radio :value="1" :disabled="loading || !selectDate"> Si </a-radio>
              <a-radio :value="2" :disabled="loading || !selectDate"> No </a-radio>
            </a-radio-group>
          </a-form-model-item>
        </a-col>
        <a-col :span="24" :md="24">
          <a-form-model-item>
            <a-checkbox-group v-model="form.root_fracture_check">
              <a-checkbox :value="1" name="Vertical" :disabled="loading || !selectDate || form.root_fracture_radio != 1">
                Vertical
              </a-checkbox>
              <a-checkbox :value="2" name="Horizontal" :disabled="loading || !selectDate || form.root_fracture_radio != 1">
                Horizontal
              </a-checkbox>
            </a-checkbox-group>
          </a-form-model-item>
        </a-col>
        <!-- Calificación -->
        <a-col :span="24" :md="8">
          <a-form-model-item label="Calificación">
            <a-radio-group v-model="form.calification">
              <a-radio :value="1" :disabled="loading || !selectDate"> Si </a-radio>
              <a-radio :value="2" :disabled="loading || !selectDate"> No </a-radio>
              <a-radio :value="3" :disabled="loading || !selectDate"> Total </a-radio>
              <a-radio :value="4" :disabled="loading || !selectDate"> Parcial </a-radio>
            </a-radio-group>
          </a-form-model-item>
        </a-col>
        <!-- Reabsorción -->
        <a-col :span="24" :md="24">
          <a-form-model-item label="Reabsorción">
            <a-radio-group v-model="form.reabsorption_radio">
              <a-radio :value="1" :disabled="loading || !selectDate"> Si </a-radio>
              <a-radio :value="2" :disabled="loading || !selectDate"> No </a-radio>
            </a-radio-group>
          </a-form-model-item>
        </a-col>
        <a-col :span="24" :md="24">
          <a-form-model-item>
            <a-checkbox-group v-model="form.reabsorption_check">
              <a-checkbox :value="1" name="Interna" :disabled="loading || !selectDate || form.reabsorption_radio != 1">
                Intera
              </a-checkbox>
              <a-checkbox :value="2" name="Externa" :disabled="loading || !selectDate || form.reabsorption_radio != 1">
                Externa
              </a-checkbox>
            </a-checkbox-group>
          </a-form-model-item>
        </a-col>
        <a-col :span="24" class="d-flex justify-content-end">
          <a-button type="primary" html-type="submit" @click="submit" :loading="loading" :disabled="!selectDate">
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
  data() {
    return {
      form: {
        ex_exams: [],
      },
      apiHost: process.env.apiHost,
      headers: {
        Authorization: this.$auth.strategy.token.get(),
      },
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
    beforeUpload(info, fileList) {},
    changeUpload(info) {
      const status = info.file.status
      let fileList = [...info.fileList]

      fileList = fileList.map((file) => {
        if (file.response) {
          file.url = file.response.file.url
        }
        return file
      })

      this.form.ex_exams = fileList

      if (status !== 'uploading') {
        // console.log(info.file, info.fileList)
      }
      if (status === 'done') {
        // this.$message.success(`${info.file.name} file uploaded successfully.`)
      } else if (status === 'error') {
        this.$message.error(`${info.file.name} file upload failed.`)
      }
    },
    submit() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          let _self = this
          this.changeLoading(true)
          let response = false
          response = await _self.$axios.$put(`/endodontic_radiographic_exam/${this.form.id}`, this.form).catch((errors) => {
            this.changeLoading(false)
          })
          if (response.success) this.$message.success(response.message)
          this.changeLoading(false)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    ...mapActions({
      changeLoading: 'data/endodontics/CHANGE_LOADING',
    }),
  },
  watch: {
    endodonticRadiographicExamSelect(newValue, oldValue) {
      this.form = _.cloneDeep(newValue)
    },
  },
  computed: {
    ...mapGetters({
      loading: 'data/endodontics/getLoading',
      selectDate: 'data/endodontics/getSeletedDate',
      endodonticSelect: 'data/endodontics/getEndodonticSelect',
      endodonticRadiographicExamSelect: 'data/endodontics/getEndodonticRadiographicExamSelect',
      questions: 'data/questions/getQuestions',
      diseases: 'data/diseases/getDiseases',
      otherDiseases: 'data/other_diseases/getOtherDiseases',
    }),
  },
  mounted() {
    this.form = this.endodonticRadiographicExamSelect ? _.cloneDeep(this.endodonticRadiographicExamSelect) : {}
  },
}
</script>

<style></style>
