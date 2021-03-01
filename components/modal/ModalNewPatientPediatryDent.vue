<template>
  <!-- Modal -->
  <a-modal v-model="openModal" @ok="okModal" :forceRender="true" :footer="false" :destroyOnClose="true">
    <template slot="title">
      <div class="title-block p-0 m-0">
        <h3 class="modal-title m-0" style="color: rgb(237, 85, 100)">{{ modalTitle }}</h3>
      </div>
    </template>
    <FormNewPediatryDentPatient @cancel="() => (openModal = false)" />
  </a-modal>
</template>

<script>
export default {
  props: {
    modalTitle: {
      type: String,
      default: 'Agregar',
    },
    openModalProp: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    okModal(e) {
      console.log(e)
      this.$emit('close')
      // this.openModal = false
    },
  },
  computed: {
    openModal: {
      get() {
        return this.openModalProp
      },
      set(value) {
        this.$emit('close')
      },
    },
  },
}
</script>

<style></style>
