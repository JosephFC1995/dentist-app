import Vue from 'vue'
import * as VueGoogleMaps from 'vue2-google-maps'
require('dotenv').config()
console.log('LOGSSSS')
console.log(process.env.BASE_GOOGLE_MAPS)
console.log(process.env.keyGoogleMaps)
Vue.use(VueGoogleMaps, {
    load: {
        key: process.env.keyGoogleMaps,
        libraries: 'places',
    },
})