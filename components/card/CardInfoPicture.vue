<template>
  <div class="card-info-pacient">
    <a-card :title="false" :bordered="false">
      <a-row :gutter="16">
        <a-col :span="24" :md="24" class="d-flex justify-content-center mb-4">
          <a-card class="ant-card mb-0 bg-color-white p-0 ant-card-bordered">
            <img slot="cover" alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />
          </a-card>
        </a-col>
        <a-col :span="24" :md="24" class="custom--data">
          <span class="label"> Nombre archivo </span>
          <span class="data"> {{ name }} </span>
        </a-col>
        <a-col :span="24" :md="24" class="custom--data">
          <span class="label"> Fecha de creación </span>
          <span class="data"> 12 de noviembre del 2020 </span>
        </a-col>
      </a-row>
    </a-card>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default: 'Archivo',
    },
  },
}
</script>

<style lang="scss"></style>
