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
          <img src="/assets/logo.svg" alt="" width="auto" height="auto" class="logo-img" />
        </div>
        <div class="main-menu false">
          <nav class="main-menu-wrap">
            <a-menu theme="light" mode="inline" :default-selected-keys="['1']" class="menu-ul">
              <a-menu-item
                class="menu-item"
                v-for="(route, index) in routes"
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
              <div class="left-navtop">a</div>
              <div class="right-navtop">
                <a-dropdown :trigger="['click']" placement="topRight">
                  <a class="ant-dropdown-link" @click="(e) => e.preventDefault()">
                    <a-avatar
                      src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                      :style="{ width: '40px', height: '40px', lineHeight: '40px', fontSize: '18px' }"
                    />
                    <i class="uil uil-angle-down"></i>
                  </a>
                  <a-menu slot="overlay" :style="{ top: '10px' }">
                    <a-menu-item class="action-item">
                      <a class="d-flex w-100" href="#" :style="{ margin: 0, padding: '0px 0px' }">
                        <i class="uil uil-user"></i>
                        <span class="text">Editar perfil</span>
                      </a>
                    </a-menu-item>
                    <a-menu-item class="action-item">
                      <a class="d-flex w-100" href="#" :style="{ margin: 0, padding: '0px 0px' }">
                        <i class="uil uil-calender"></i>
                        <span class="text">Calendario</span>
                      </a>
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
        },
        {
          type: 'title',
          name: null,
          title: 'Administración',
          ico: null,
        },
        {
          type: 'route',
          name: 'app-admin-users',
          title: 'Usuarios',
          ico: 'users-alt',
        },
        {
          type: 'route',
          name: 'app-admin-reasons',
          title: 'Motivos',
          ico: 'comment-lines',
        },
        {
          type: 'route',
          name: 'app-admin-status',
          title: 'Estados',
          ico: 'rocket',
        },
        {
          type: 'route',
          name: 'app-admin-covenants',
          title: 'Convenios',
          ico: 'hospital',
        },
        {
          type: 'route',
          name: 'app-admin-presentatios',
          title: 'Presentaciones',
          ico: 'game-structure',
        },
        {
          type: 'route',
          name: 'app-admin-documents',
          title: 'Documentos',
          ico: 'files-landscapes',
        },
        {
          type: 'route',
          name: 'app-admin-clinicians',
          title: 'Clinicos',
          ico: 'user-md',
        },
        {
          type: 'route',
          name: 'app-admin-recipe-template',
          title: 'Plantillas de recetas',
          ico: 'receipt-alt',
        },
        {
          type: 'route',
          name: 'app-admin-referrals',
          title: 'Referidos',
          ico: 'user-arrows',
        },
        {
          type: 'route',
          name: 'app-admin-subsidiaries',
          title: 'Sucursales',
          ico: 'building',
        },
        {
          type: 'route',
          name: 'app-admin-supplies',
          title: 'Insumos',
          ico: 'tablets',
        },
        {
          type: 'route',
          name: 'app-admin-income',
          title: 'Ingresos',
          ico: 'money-withdraw',
        },
        {
          type: 'route',
          name: 'app-admin-expenses',
          title: 'Salidas',
          ico: 'money-insert',
        },
        {
          type: 'route',
          name: 'app-admin-stock',
          title: 'Stock de insumos',
          ico: 'box',
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
          name: 'app-settings-calendar-information',
          title: 'Información de agenda',
          ico: 'info-circle',
        },
        {
          type: 'route',
          name: 'app-settings-holiday',
          title: 'Feriados',
          ico: 'football',
        },
        {
          type: 'route',
          name: 'app-settings-facturation',
          title: 'Facturación',
          ico: 'bill',
        },
        {
          type: 'title',
          name: null,
          title: 'Reportes',
          ico: null,
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
  mounted() {},
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
