import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const state = () => ({
    dashboard: [{
            title: '-',
            total: 0,
            ico: 'user-nurse',
        },
        {
            title: '-',
            total: 0,
            ico: 'user-plus',
        },
        {
            title: '-',
            total: 0,
            ico: 'stethoscope',
        },
        {
            title: '-',
            total: 0,
            ico: 'medical-drip',
        },
    ],
    loading: false,
})

export const mutations = {
    SET_DATA_DASHBOARD(state, payload) {
        state.dashboard = payload
    },
    SET_LOADING(state, payload) {
        state.loading = payload
    },
}

export const actions = {
    async GET_DATA_DASHBOARD({ commit, state }) {
        commit('SET_LOADING', true)
        const { data } = await this.$axios.$get('dashboard')
        commit('SET_LOADING', false)
        commit('SET_DATA_DASHBOARD', data)
    },
}

export const getters = {
    getDashboard: (state) => {
        return state.dashboard
    },
    getLoading: (state) => {
        return state.loading
    },
}