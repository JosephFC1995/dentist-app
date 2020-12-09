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

    css: ['bootstrap-4-grid/css/grid.min.css', '~/assets/less/_ant.less', '~/assets/_all.scss'],

    plugins: ['@/plugins/antd-ui', { src: '@/plugins/vue-json-excel', ssr: false }, { src: '@/plugins/vue-loading', ssr: false }],

    components: true,

    buildModules: ['@nuxtjs/eslint-module', '@nuxtjs/google-fonts', '@nuxtjs/moment', '@nuxtjs/dotenv'],

    moment: {
        defaultLocale: 'es',
        locales: ['es'],
    },
    googleFonts: {
        families: { Lato: [100, 300, 400, 600, 800] },
    },
    modules: ['@nuxtjs/axios', '@nuxtjs/axios', '@nuxtjs/auth-next', '@nuxtjs/proxy'],

    axios: {
        proxy: true,
    },
    proxy: {
        '/api': process.env.AXIOS_URL,
        '/laravel': {
            target: 'https://app-dent.josephfc.vercel.app',
            pathRewrite: { '^/laravel': '/' },
        },
    },
    auth: {
        resetOnError: true,
        redirect: {
            login: '/singin',
            logout: '/singin',
            callback: '/singin',
            home: '/app/dashboard',
        },
        strategies: {
            laravelJWT: {
                provider: 'laravel/jwt',
                url: process.env.AXIOS_URL,
                endpoints: {
                    login: { url: '/auth/login', method: 'post' },
                    logout: { url: '/auth/logout', method: 'post' },
                    refresh: { url: '/auth/refresh', method: 'post' },
                    user: { url: '/auth/user', method: 'get' },
                },
                token: {
                    property: 'access_token',
                    maxAge: 60 * 60,
                },
                refreshToken: {
                    maxAge: 20160 * 60,
                },
            },
        },
    },

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