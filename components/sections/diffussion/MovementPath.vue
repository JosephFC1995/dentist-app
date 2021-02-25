<template>
  <div class="movement-path">
    <div class="title">
      <span> {{ this.title }} </span>
    </div>
    <div class="select--active">
      <a-popover v-model="visible" trigger="click" class="popover--movement">
        <span slot="title" class="popover--movement--title"> Movimiento </span>
        <a slot="content">
          <div class="popover--movement--content-select">
            <div
              class="popover--movement--select--item"
              v-for="item in alter ? arrayCierreSimple : arrayAperturaSimple"
              :key="item.id"
              @click="selectItem(item)"
              :class="[value == item.id || (value == 0 && item.id == 0) ? 'active' : '']"
            >
              <img :src="item.img" />
            </div>
          </div>
        </a>
        <img :src="value != 0 ? getImageFromId(value) : defaultValue.imgSelected" />
      </a-popover>
    </div>
  </div>
</template>

<script>
import { isEqual, find } from 'lodash'

export default {
  props: {
    title: {
      type: String,
      default: 'Apertura',
    },
    alter: {
      type: Boolean,
      default: false,
    },
    value: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      isEqual,
      visible: false,
      defaultValue: {
        id: 0,
        img: '/assets/movement-path/empty.png',
        imgSelected: '/assets/movement-path/flecha_trayectoria_0_general.png',
      },
      arrayAperturaSimple: [
        {
          id: 0,
          img: '/assets/movement-path/empty.png',
          imgSelected: '/assets/movement-path/flecha_trayectoria_0_general.png',
        },
        {
          id: 1,
          img: '/assets/movement-path/flecha_trayectoria_1_es_simple.png',
          imgSelected: '/assets/movement-path/flecha_trayectoria_1_es.png',
        },
        {
          id: 2,
          img: '/assets/movement-path/flecha_trayectoria_2_es_simple.png',
          imgSelected: '/assets/movement-path/flecha_trayectoria_2_es.png',
        },
        {
          id: 3,
          img: '/assets/movement-path/flecha_trayectoria_3_es_simple.png',
          imgSelected: '/assets/movement-path/flecha_trayectoria_3_es.png',
        },
        {
          id: 4,
          img: '/assets/movement-path/flecha_trayectoria_4_es_simple.png',
          imgSelected: '/assets/movement-path/flecha_trayectoria_4_es.png',
        },
        {
          id: 5,
          img: '/assets/movement-path/flecha_trayectoria_5_es_simple.png',
          imgSelected: '/assets/movement-path/flecha_trayectoria_5_es.png',
        },
      ],
      arrayCierreSimple: [
        {
          id: 0,
          img: '/assets/movement-path/empty.png',
          imgSelected: '/assets/movement-path/flecha_trayectoria_0_general.png',
        },
        {
          id: 1,
          img: '/assets/movement-path/flecha_trayectoria_c_1_es_simple.png',
          imgSelected: '/assets/movement-path/flecha_trayectoria_c_1_es.png',
        },
        {
          id: 2,
          img: '/assets/movement-path/flecha_trayectoria_c_2_es_simple.png',
          imgSelected: '/assets/movement-path/flecha_trayectoria_c_2_es.png',
        },
        {
          id: 3,
          img: '/assets/movement-path/flecha_trayectoria_c_3_es_simple.png',
          imgSelected: '/assets/movement-path/flecha_trayectoria_c_3_es.png',
        },
        {
          id: 4,
          img: '/assets/movement-path/flecha_trayectoria_c_4_es_simple.png',
          imgSelected: '/assets/movement-path/flecha_trayectoria_c_4_es.png',
        },
        {
          id: 5,
          img: '/assets/movement-path/flecha_trayectoria_c_5_es_simple.png',
          imgSelected: '/assets/movement-path/flecha_trayectoria_c_5_es.png',
        },
      ],
    }
  },
  methods: {
    hide() {
      this.visible = false
    },
    getImageFromId(id) {
      let selectArray = this.alter ? this.arrayCierreSimple : this.arrayAperturaSimple

      let finding = find(selectArray, ['id', id])

      return finding ? finding.imgSelected : null
    },
    selectItem(item) {
      // this.selectedItem = item
      this.visible = false
      console.log(item)
      this.$emit('input', item.id)
    },
  },
}
</script>

<style lang="scss">
.movement-path {
  .title {
    text-align: center;
    font-weight: 600;
    margin-bottom: 1rem;
  }
  .select--active {
    margin: 0 auto;
    text-align: center;
    img {
      width: 60px;
      height: auto;
      cursor: pointer;
    }
  }
}
.popover--movement {
  &--title {
    text-align: center;
    display: block;
    font-weight: 600;
  }
  &--select--item {
    padding: 10px 5px;
    border-radius: 5px;
    background: #fff;
    margin-right: 10px;
    transition: 0.3s all;
    img {
      height: 50px;
    }
    &:hover {
      background: rgb(204 204 204 / 0.4);
    }
    &:last-child {
      margin-right: 0;
    }
    &.active {
      pointer-events: none;
      cursor: not-allowed;
      opacity: 0.3;
      img {
        cursor: not-allowed;
      }
    }
  }
  &--content-select {
    display: flex;
    justify-content: space-between;
  }
}
</style>
