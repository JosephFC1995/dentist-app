export default {
    ssr: false,
    target: 'static',
    head: {
        titleTemplate: '%s | Dentist',
        title: process.env.npm_package_name || '',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: '' },
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
            {
                rel: 'stylesheet',
                href: '//unicons.iconscout.com/release/v3.0.3/css/line.css',
            },
        ],
    },

    css: [
        'bootstrap-4-grid/css/grid.min.css',
        '~/assets/less/_ant.less',
        '~/assets/_all.scss',
    ],

    plugins: [
        '@/plugins/antd-ui',
        { src: '@/plugins/vue-json-excel', ssr: false },
    ],

    components: true,

    buildModules: [
        '@nuxtjs/eslint-module',
        '@nuxtjs/google-fonts',
        '@nuxtjs/moment',
    ],

    moment: {
        defaultLocale: 'es',
        locales: ['es'],
    },
    googleFonts: {
        families: { Lato: [100, 300, 400, 600, 800] },
    },
    modules: ['@nuxtjs/axios'],

    axios: {},

    build: {
        loaders: {
            less: {
                lessOptions: {
                    javascriptEnabled: true,
                },
            },
        },
    },
}