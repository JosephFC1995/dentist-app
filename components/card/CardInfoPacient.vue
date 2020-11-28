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
        <!-- Titulo -->
        <a-col :span="24" :md="24">
          <h6 class="mt-0 mb-1" :style="{ color: '#B9BABA' }">
            Campos de emergencia
          </h6>
        </a-col>

        <a-col :span="24" :md="12" class="custom--data">
          <span class="label"> Nombre </span>
          <span class="data"> Pepe Luna </span>
        </a-col>
        <a-col :span="24" :md="12" class="custom--data">
          <span class="label"> Parentezco </span>
          <span class="data"> Tatarabuelo </span>
        </a-col>
        <a-col :span="24" :md="12" class="custom--data">
          <span class="label"> Teléfono </span>
          <span class="data"> 987 654 312 </span>
        </a-col>
        <a-col :span="24" :md="12" class="custom--data">
          <span class="label"> Correo </span>
          <span class="data"> pepe@company.om </span>
        </a-col>
        <!-- Titulo -->
        <a-col :span="24" :md="24">
          <h6 class="mt-0 mb-1" :style="{ color: '#B9BABA' }">Antecedentes</h6>
        </a-col>
        <a-col :span="24" :md="12" class="custom--data">
          <span class="label"> Antecedentes familiares </span>
          <span class="data">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae sequi
            explicabo eius magni tempore reiciendis fugiat deleniti asperiores,
            ex animi ratione ut iste dolorem. Sapiente!
          </span>
        </a-col>
        <a-col :span="24" :md="12" class="custom--data">
          <span class="label"> Antecedentes personales </span>
          <span class="data">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae sequi
            explicabo eius magni tempore reiciendis fugiat deleniti asperiores,
            ex animi ratione ut iste dolorem. Sapiente!
          </span>
        </a-col>
        <a-col :span="24" :md="12" class="custom--data">
          <span class="label"> Alergias </span>
          <span class="data">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae sequi
            explicabo eius magni tempore reiciendis fugiat deleniti asperiores,
            ex animi ratione ut iste dolorem. Sapiente!
          </span>
        </a-col>
        <a-col :span="24" :md="12" class="custom--data">
          <span class="label"> Medicamentos </span>
          <span class="data">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae sequi
            explicabo eius magni tempore reiciendis fugiat deleniti asperiores,
            ex animi ratione ut iste dolorem. Sapiente!
          </span>
        </a-col>
      </a-row>
    </a-card>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss"></style>
