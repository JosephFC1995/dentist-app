import Vue from 'vue'
import * as VueGoogleMaps from 'vue2-google-maps'
export default ({ app, isServer, env }) => {
    Vue.use(VueGoogleMaps, {
        load: {
            key: env.keyGoogleMaps,
            libraries: 'places',
        },
    })
}