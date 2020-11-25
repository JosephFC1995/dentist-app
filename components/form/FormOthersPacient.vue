<template>
  <div class="form-general">
    <a-form-model :model="form" ref="newPacient">
      <a-row :gutter="16">
        <!-- Titulo -->
        <a-col :span="24" :md="24">
          <h6 class="mt-0 mb-1" :style="{ color: '#B9BABA' }">Otros datos</h6>
        </a-col>
        <!-- Peso -->
        <a-col :span="24" :md="8">
          <a-form-model-item label="Peso" class="with-button">
            <a-input
              v-model="form.weight"
              placeholder="Peso"
              :disabled="loading"
              :maxLength="3"
            />
            <span class="ml-3" :style="{ fontSize: '12px', color: '#B9BABA' }">
              Kilográmos
            </span>
          </a-form-model-item>
        </a-col>
        <!-- Talla -->
        <a-col :span="24" :md="8">
          <a-form-model-item label="Talla" class="with-button">
            <a-input
              v-model="form.size"
              placeholder="Talla"
              :disabled="loading"
              :maxLength="3"
            />
            <span class="ml-3" :style="{ fontSize: '12px', color: '#B9BABA' }">
              Centrímetros
            </span>
          </a-form-model-item>
        </a-col>
        <!-- IMC -->
        <a-col :span="24" :md="8">
          <a-form-model-item label="IMC" class="with-button">
            <a-input v-model="form.imc" placeholder="IMC" :disabled="true" />
          </a-form-model-item>
        </a-col>
        <!-- Exámenes clínicos -->
        <a-col :span="24" :md="24">
          <a-form-model-item label="Exámenes clínicos">
            <a-upload-dragger
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              :multiple="true"
              :default-file-list="defaultListFiles"
              @change="changeUpload"
            >
              <p class="ant-upload-drag-icon">
                <i class="uil uil-cloud-upload"></i>
              </p>
              <p class="ant-upload-text">
                Haga clic o arrastre el archivo a esta área para cargar
              </p>
              <p class="ant-upload-hint">
                Compatibilidad con una carga única o masiva. Prohibir
                estrictamente cargando datos de la empresa u otros archivos de
                banda
              </p>
            </a-upload-dragger>
          </a-form-model-item>
        </a-col>
        <!-- Exámenes clínicos Estomatolódicos -->
        <a-col :span="24" :md="24">
          <a-form-model-item label="Exámenes clínicos Estomatolódicos">
            <a-upload-dragger
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              :multiple="true"
              :default-file-list="defaultListFiles"
              @change="changeUpload"
            >
              <p class="ant-upload-drag-icon">
                <i class="uil uil-cloud-upload"></i>
              </p>
              <p class="ant-upload-text">
                Haga clic o arrastre el archivo a esta área para cargar
              </p>
              <p class="ant-upload-hint">
                Compatibilidad con una carga única o masiva. Prohibir
                estrictamente cargando datos de la empresa u otros archivos de
                banda
              </p>
            </a-upload-dragger>
          </a-form-model-item>
        </a-col>

        <!-- Exámenes auxiliares -->
        <a-col :span="24" :md="24">
          <a-form-model-item label="Exámenes auxiliares">
            <a-upload-dragger
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              :multiple="true"
              :default-file-list="defaultListFiles"
              @change="changeUpload"
            >
              <p class="ant-upload-drag-icon">
                <i class="uil uil-cloud-upload"></i>
              </p>
              <p class="ant-upload-text">
                Haga clic o arrastre el archivo a esta área para cargar
              </p>
              <p class="ant-upload-hint">
                Compatibilidad con una carga única o masiva. Prohibir
                estrictamente cargando datos de la empresa u otros archivos de
                banda
              </p>
            </a-upload-dragger>
          </a-form-model-item>
        </a-col>

        <a-col :span="24" class="d-flex justify-content-end">
          <a-button
            type="primary"
            html-type="submit"
            @click="() => $emit('close')"
          >
            Guardar
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
      form: {
        weight: 0,
        size: 0,
        imc: 0,
      },
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
            url:
              'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            thumbUrl:
              'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
          },
          xhr: {},
          url:
            'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        },
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
  watch: {
    'form.weight'(newValue, oldValue) {
      this.form.imc = ''
      let calc = (newValue / (this.form.size / 100)) * 2
      this.form.imc = isFinite(calc) ? calc.toFixed(2) : 0
    },
    'form.size'(newValue, oldValue) {
      this.form.imc = ''
      let calc = (this.form.weight / (newValue / 100)) * 2
      this.form.imc = isFinite(calc) ? calc.toFixed(2) : 0
    },
  },
}
</script>

<style></style>
