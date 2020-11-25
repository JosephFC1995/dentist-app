<template>
  <div class="card-info-pacient">
    <a-card :title="false" :bordered="false">
      <a-row :gutter="16">
        <a-col :span="24" :md="24" class="d-flex justify-content-center mb-3">
          <a-avatar :size="100" icon="user" />
        </a-col>
        <a-col :span="24" :md="12" class="custom--data">
          <span class="label"> DNI </span>
          <span class="data"> 123456789 </span>
        </a-col>
        <a-col :span="24" :md="12" class="custom--data">
          <span class="label"> Teléfono </span>
          <span class="data"> 987 654 312 </span>
        </a-col>
      </a-row>
    </a-card>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss">
.custom--data {
  .label {
    display: block;
    line-height: 39.9999px;
    font-weight: 600;
  }
  .data {
    color: rgb(119 119 119);
  }
}
</style>
