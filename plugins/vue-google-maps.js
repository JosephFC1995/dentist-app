import Vue from 'vue'
import * as VueGoogleMaps from 'vue2-google-maps'
require('dotenv').config()
console.log(process.env.KEY_GOOGLE_MAPS)
Vue.use(VueGoogleMaps, {
    load: {
        key: process.env.KEY_GOOGLE_MAPS,
        libraries: 'places',
    },
})