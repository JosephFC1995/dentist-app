<template>
  <div class="component-file">
    <a-card class="ant-card mb-0 bg-color-white p-0 ant-card-bordered">
      <a
        slot="cover"
        href="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
        target="_blank"
        :style="{ height: '170px' }"
      >
        <img
          alt="example"
          src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
          :style="{ height: '100%', objectFit: 'cover' }"
        />
      </a>
      <template slot="actions" class="ant-card-actions">
        <a-tooltip placement="top" title="Ver imagen">
          <a href="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" target="_blank">
            <i class="uil uil-eye" :style="{ fontSize: '18px' }"></i>
          </a>
        </a-tooltip>
        <a-tooltip placement="top" title="Editar">
          <i class="uil uil-edit-alt" :style="{ fontSize: '18px' }" @click="() => (openDrawerInfoPicture = true)"></i>
        </a-tooltip>
        <a-tooltip placement="top" title="Eliminar">
          <i class="uil uil-trash-alt" :style="{ fontSize: '18px' }" @click="() => (openModal = true)"></i>
        </a-tooltip>
      </template>
      <a-card-meta>
        <span slot="title" :style="{ fontWeight: 'bold' }">
          <a href="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" target="_blank" style="color: #000">
            {{ title }}
          </a>
        </span>
      </a-card-meta>
    </a-card>
    <!-- Modal eliminar imagen -->
    <a-modal v-model="openModal" @ok="okModal" :centered="true" :forceRender="true">
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
          <button type="button" class="ant-btn ant-btn-danger" @click="okModal">
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
    >
      <template slot="title">
        <div class="title-block p-0 m-0">
          <h4 class="modal-title m-0" style="color: #336cfb">{{ title }}</h4>
        </div>
        <CardInfoPicture :name="title" />
      </template>
    </a-drawer>
  </div>
</template>

<script>
import CardInfoPicture from '~/components/card/CardInfoPicture'

export default {
  components: {
    CardInfoPicture,
  },
  props: {
    title: {
      type: String,
      default: 'Archivo',
    },
  },
  data() {
    return {
      openModal: false,
      openDrawerInfoPicture: false,
      widthDrawerResponsive: window.innerWidth > 900 ? 500 : window.innerWidth - 100,
    }
  },
  methods: {
    okModal(e) {
      console.log(e)
      this.openModal = false
    },
    closeDrawerInfoPicture() {
      this.openDrawerInfoPicture = false
    },
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
