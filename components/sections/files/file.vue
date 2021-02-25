<template>
  <div class="component-file">
    <a-card class="ant-card mb-0 bg-color-white p-0 ant-card-bordered">
      <a
        slot="cover"
        :href="file.url"
        target="_blank"
        :style="{ height: '170px' }"
        :title="file.name_original ? file.name_original : file.name"
      >
        <img alt="example" :src="file.url" :style="{ height: '100%', objectFit: 'cover', width: '100%' }" />
      </a>
      <template slot="actions" class="ant-card-actions">
        <a-tooltip placement="top" title="Ver imagen">
          <a :href="file.url" target="_blank">
            <i class="uil uil-eye" :style="{ fontSize: '18px' }"></i>
          </a>
        </a-tooltip>
        <a-tooltip placement="top" title="Mas información">
          <i class="uil uil-info-circle" :style="{ fontSize: '18px' }" @click="() => (openDrawerInfoPicture = true)"></i>
        </a-tooltip>
        <a-tooltip placement="top" title="Eliminar">
          <i class="uil uil-trash-alt" :style="{ fontSize: '18px' }" @click="() => (openModal = true)"></i>
        </a-tooltip>
      </template>
      <a-card-meta>
        <span slot="title" :style="{ fontWeight: 'bold' }">
          <a-tooltip placement="leftTop" :title="file.name_original ? file.name_original : file.name">
            <a :href="file.url" target="_blank" style="color: #000">
              {{ file.name_original ? file.name_original : file.name }}
            </a>
          </a-tooltip>
        </span>
      </a-card-meta>
    </a-card>
    <!-- Modal eliminar imagen -->
    <a-modal v-model="openModal" @ok="deletePicture" :centered="true" :forceRender="true" :destroyOnClose="true">
      <template slot="title">
        <div class="title-block p-0 m-0">
          <h5 class="modal-title m-0" style="color: #000">Eliminar imagen</h5>
        </div>
      </template>
      <div class="d-flex flex-column">
        <div class="event-pacient flex-column mb-0">
          <span :style="{ color: '#B9BABA' }"> ¿Desea eliminar la imagen? </span>
        </div>
      </div>
      <template slot="footer">
        <div class="d-flex justify-content-between modal-footer">
          <button type="button" class="ant-btn ant-btn-dangerous" @click="() => (openModal = false)">
            <span>Cancelar</span>
          </button>
          <button type="button" class="ant-btn ant-btn-danger" @click="deletePicture">
            <span>Eliminar</span>
          </button>
        </div>
      </template>
    </a-modal>
    <!-- !Drawer información imagen -->
    <a-drawer
      :width="widthDrawerResponsive"
      :visible="openDrawerInfoPicture"
      :body-style="{ paddingBottom: '80px' }"
      @close="closeDrawerInfoPicture"
      :destroyOnClose="true"
    >
      <template slot="title">
        <div class="title-block p-0 m-0">
          <h4 class="modal-title m-0" style="color: #336cfb">{{ title }}</h4>
        </div>
        <CardInfoPicture :file="file" />
      </template>
    </a-drawer>
  </div>
</template>

<script>
import CardInfoPicture from '~/components/card/CardInfoPicture'
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'

export default {
  components: {
    CardInfoPicture,
  },
  props: {
    title: {
      type: String,
      default: 'Archivo',
    },
    id: {
      type: Number,
      default: null,
    },
    file: {
      type: Object,
      default: {},
    },
  },
  data() {
    return {
      openModal: false,
      openDrawerInfoPicture: false,
      widthDrawerResponsive: window.innerWidth > 900 ? 500 : window.innerWidth - 100,
      selectFile: {},
    }
  },
  methods: {
    async deletePicture() {
      this.changeLoading(true)
      let response = false
      this.openModal = false
      response = await this.$axios.$delete(`/pictures/${this.id}`).catch((errors) => {
        this.changeLoading(false)
      })
      if (response.success) this.$message.success(response.message)
      await this.getPicturesPatient({ id_patient: this.$route.params.id })
    },
    closeDrawerInfoPicture() {
      this.openDrawerInfoPicture = false
    },
    ...mapActions({
      changeLoading: 'data/pictures/CHANGE_LOADING',
      getPicturesPatient: 'data/pictures/GET_PICTURES_BY_PATIENT',
    }),
  },
  mounted() {
    window.onresize = () => {
      let width = window.innerWidth
      this.widthDrawerResponsive = width > 900 ? 700 : width - 100
    }
  },
}
</script>

<style></style>
