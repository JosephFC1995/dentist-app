<template>
  <div class="content--page--default logging h--100">
    <a-layout id="layout-user" class="h--100">
      <a-layout-sider
        v-model="collapsed"
        :trigger="null"
        collapsible
        width="250"
        theme="light"
        class="navbar vertical"
        breakpoint="md"
        collapsed-width="0"
      >
        <div class="logo">
          <img
            :src="company.avatar ? company.avatar.url : +'/assets/images/logo.jpeg'"
            alt=""
            width="auto"
            height="auto"
            class="logo-img"
          />
        </div>
        <div class="main-menu false">
          <nav class="main-menu-wrap">
            <a-menu theme="light" mode="inline" :default-selected-keys="['1']" class="menu-ul">
              <a-menu-item
                class="menu-item"
                v-for="(route, index) in $auth.hasScope('doctor') ? routesDoctor : routes"
                :key="index"
                :class="[route.type == 'title' ? 'group' : '']"
              >
                <template v-if="route.type == 'route'">
                  <nuxt-link :to="{ name: route.name }" class="item-link">
                    <span class="link-icon">
                      <i class="uil" :class="['uil-' + route.ico]"></i>
                    </span>
                    <span class="link-text">{{ route.title }}</span>
                  </nuxt-link>
                </template>
                <template v-if="route.type == 'title'">
                  <span class="group-title">{{ route.title }}</span>
                </template>
              </a-menu-item>
            </a-menu>
          </nav>
        </div>
      </a-layout-sider>
      <a-layout>
        <a-layout-header style="background: #f0f2f5; padding: 0">
          <div class="trigger-collapse trigger" @click="() => (collapsed = !collapsed)">
            <i class="uil uil-bars"></i>
          </div>
          <div class="container">
            <div class="content-navbar d-flex justify-content-between">
              <div class="left-navtop">
                <span> Bienvenido {{ this.$auth.user.name }} </span>
                <!-- Izquierda -->
              </div>
              <div class="right-navtop d-flex">
                <div class="">
                  <a-dropdown :trigger="['click']" placement="bottomRight">
                    <a class="ant-dropdown-link" @click="(e) => e.preventDefault()">
                      <a-avatar
                        size="small"
                        icon="user"
                        :src="this.$auth.user.avatar ? this.$auth.user.avatar.path : null"
                        :style="{ width: '40px', height: '40px', lineHeight: '40px', fontSize: '18px' }"
                      />

                      <i class="uil uil-angle-down"></i>
                    </a>
                    <a-menu slot="overlay" :style="{ top: '10px' }">
                      <a-menu-item class="action-item">
                        <a class="d-flex w-100" :to="{ name: 'app-settings-profile' }" :style="{ margin: 0, padding: '0px 0px' }">
                          <i class="uil uil-user"></i>
                          <span class="text">Editar perfil</span>
                        </a>
                      </a-menu-item>
                      <a-menu-item class="action-item">
                        <nuxt-link class="d-flex w-100" :to="{ name: 'app-calendar' }" :style="{ margin: 0, padding: '0px 0px' }">
                          <i class="uil uil-calender"></i>
                          <span class="text">Calendario</span>
                        </nuxt-link>
                      </a-menu-item>
                      <a-menu-item class="action-item">
                        <a class="d-flex w-100" @click="logout()" :style="{ margin: 0, padding: '0px 0px' }">
                          <i class="uil uil-sign-out-alt"></i>
                          <span class="text">Cerrar sesión</span>
                        </a>
                      </a-menu-item>
                    </a-menu>
                  </a-dropdown>
                </div>
              </div>
            </div>
          </div>
        </a-layout-header>
        <a-layout-content class="layout-content" :style="{ background: '#fff' }">
          <div class="container">
            <Nuxt />
          </div>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'

export default {
  data() {
    return {
      collapsed: false,
      routes: [
        {
          type: 'title',
          name: null,
          title: 'General',
          ico: null,
        },
        {
          type: 'route',
          name: 'app-dashboard',
          title: 'Dashboard',
          ico: 'dashboard',
        },
        {
          type: 'route',
          name: 'app-calendar',
          title: 'Agenda de citas',
          ico: 'schedule',
        },
        {
          type: 'route',
          name: 'app-patients',
          title: 'Pacientes',
          ico: 'users-alt',
          scope: 'administrator',
        },
        {
          type: 'title',
          name: null,
          title: 'Administración',
          ico: null,
          scope: 'administrator',
        },
        {
          type: 'route',
          name: 'app-admin-users',
          title: 'Usuarios',
          ico: 'users-alt',
          scope: 'administrator',
        },
        {
          type: 'route',
          name: 'app-admin-reasons',
          title: 'Motivos',
          ico: 'comment-lines',
          scope: 'administrator',
        },
        // {
        //   type: 'route',
        //   name: 'app-admin-status',
        //   title: 'Estados',
        //   ico: 'rocket',
        // },
        // {
        //   type: 'route',
        //   name: 'app-admin-covenants',
        //   title: 'Convenios',
        //   ico: 'hospital',
        // },
        // {
        //   type: 'route',
        //   name: 'app-admin-presentatios',
        //   title: 'Presentaciones',
        //   ico: 'game-structure',
        // },
        {
          type: 'route',
          name: 'app-admin-documents',
          title: 'Documentos',
          ico: 'files-landscapes',
          scope: 'administrator',
        },
        {
          type: 'route',
          name: 'app-admin-referreds',
          title: 'Referidos',
          ico: 'user-arrows',
          scope: 'administrator',
        },
        {
          type: 'route',
          name: 'app-admin-subsidiaries',
          title: 'Sucursales',
          ico: 'building',
          scope: 'administrator',
        },
        {
          type: 'route',
          name: 'app-admin-supplies',
          title: 'Insumos',
          ico: 'tablets',
          scope: 'administrator',
        },
        {
          type: 'route',
          name: 'app-admin-income',
          title: 'Ingresos',
          ico: 'money-withdraw',
          scope: 'administrator',
        },
        {
          type: 'route',
          name: 'app-admin-expenses',
          title: 'Salidas',
          ico: 'money-insert',
          scope: 'administrator',
        },
        {
          type: 'route',
          name: 'app-admin-stock',
          title: 'Stock de insumos',
          ico: 'box',
          scope: 'administrator',
        },
        {
          type: 'title',
          name: null,
          title: 'Configuraciones',
          ico: null,
        },
        {
          type: 'route',
          name: 'app-settings-company',
          title: 'Empresa',
          ico: 'compact-disc',
        },
        {
          type: 'route',
          name: 'app-settings-profile',
          title: 'Mi perfil',
          ico: 'user',
        },
        // {
        //   type: 'route',
        //   name: 'app-settings-calendar',
        //   title: 'Calendario',
        //   ico: 'schedule',
        // },
        // {
        //   type: 'route',
        //   name: 'app-settings-holiday',
        //   title: 'Feriados',
        //   ico: 'football',
        // },
        // {
        //   type: 'route',
        //   name: 'app-settings-facturation',
        //   title: 'Facturación',
        //   ico: 'bill',
        // },
        // {
        //   type: 'title',
        //   name: null,
        //   title: 'Reportes',
        //   ico: null,
        // },
      ],
      routesDoctor: [
        {
          type: 'title',
          name: null,
          title: 'General',
          ico: null,
        },
        {
          type: 'route',
          name: 'app-dashboard',
          title: 'Dashboard',
          ico: 'dashboard',
        },
        {
          type: 'route',
          name: 'app-calendar',
          title: 'Agenda de citas',
          ico: 'schedule',
        },
        {
          type: 'route',
          name: 'app-patients',
          title: 'Pacientes',
          ico: 'users-alt',
          scope: 'administrator',
        },
        {
          type: 'title',
          name: null,
          title: 'Configuraciones',
          ico: null,
        },

        {
          type: 'route',
          name: 'app-settings-profile',
          title: 'Mi perfil',
          ico: 'user',
        },
      ],
      breakpoint: {
        xs: '480px',
        sm: '576px',
        md: '768px',
        lg: '992px',
        xl: '1200px',
        xxl: '1600px',
      },
    }
  },
  methods: {
    async logout() {
      this.$loading(true)
      await this.$auth.logout().then(() => {
        this.$loading(false)
      })
    },
  },
  computed: {
    ...mapGetters({
      company: 'data/company/getCompany',
    }),
  },
}
</script>

<style lang="scss">
#layout-user {
  .trigger {
    font-size: 18px;
    line-height: 64px;
    padding: 0 24px;
    cursor: pointer;
    transition: color 0.3s;
    @media (min-width: 768px) {
      display: none;
    }
  }
  .logo {
    height: 32px;
    margin: 16px;
  }
}
</style>

<style lang="scss" scoped>
// .right-navtop {
//   height: 64px;
//   .ant-dropdown-link {
//     display: flex;
//     align-items: center;
//     margin-right: 11px;
//   }
// }
.left-navtop {
  color: #1f2022;
  display: block;
  opacity: 0.3;
  font-size: 16px;
  font-weight: 600;
}
</style>
