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
            src="http://medic-app-react.next-item.com/static/media/logo.5e5f1d31.svg"
            alt=""
            width="auto"
            height="auto"
            class="logo-img"
          />
        </div>
        <div class="main-menu false">
          <nav class="main-menu-wrap">
            <a-menu
              theme="light"
              mode="inline"
              :default-selected-keys="['1']"
              class="menu-ul"
            >
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
          <div
            class="trigger-collapse trigger"
            @click="() => (collapsed = !collapsed)"
          >
            <i class="uil uil-bars"></i>
          </div>
        </a-layout-header>
        <a-layout-content
          class="layout-content"
          :style="{ background: '#fff' }"
        >
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
          name: 'app-administration-users',
          title: 'Usuarios',
          ico: 'users-alt',
        },
        {
          type: 'route',
          name: 'app-administration-motives',
          title: 'Motivos',
          ico: 'comment-lines',
        },
        {
          type: 'route',
          name: 'app-administration-status',
          title: 'Estados',
          ico: 'rocket',
        },
        {
          type: 'route',
          name: 'app-administration-covenants',
          title: 'Convenios',
          ico: 'hospital',
        },
        {
          type: 'route',
          name: 'app-administration-presentatios',
          title: 'Presentaciones',
          ico: 'game-structure',
        },
        {
          type: 'route',
          name: 'app-administration-documents',
          title: 'Documentos',
          ico: 'files-landscapes',
        },
        {
          type: 'route',
          name: 'app-administration-clinicians',
          title: 'Clinicos',
          ico: 'user-md',
        },
        {
          type: 'route',
          name: 'app-administration-recipe-template',
          title: 'Plantillas de recetas',
          ico: 'receipt-alt',
        },
        {
          type: 'route',
          name: 'app-administration-referrals',
          title: 'Referidos',
          ico: 'user-arrows',
        },
        {
          type: 'route',
          name: 'app-administration-expenses',
          title: 'Egresos',
          ico: 'money-withdraw',
        },
        {
          type: 'route',
          name: 'app-administration-supplies',
          title: 'Insumos',
          ico: 'tablets',
        },
        {
          type: 'title',
          name: null,
          title: 'Configuraciones',
          ico: null,
        },
        {
          type: 'route',
          name: 'app-settings-branch-offices',
          title: 'Sucursales',
          ico: 'building',
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
          title: 'Facturaión',
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
    &:hover {
    }
  }
  .logo {
    height: 32px;
    margin: 16px;
  }
}
</style>
