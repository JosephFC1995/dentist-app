import Vue from 'vue'
import * as VueGoogleMaps from 'vue2-google-maps'
require('dotenv').config()
Vue.use(VueGoogleMaps, {
    load: {
        key: process.env.BASE_GOOGLE_MAPS,
        libraries: 'places',
    },
})