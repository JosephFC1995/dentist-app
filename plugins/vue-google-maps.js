import Vue from 'vue'
import * as VueGoogleMaps from 'vue2-google-maps'

Vue.use(VueGoogleMaps, {
    load: {
        key: 'AIzaSyDSqlR9aIRbDbp_FleXuIq8lw7ssjT-hpE',
        libraries: 'places',
    },
})