import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const state = () => ({
    dates: [],
    loading: false,
})

export const mutations = {
    SET_DATES_PATHOLOGY(state, payload) {
        state.dates = payload
    },
    SET_LOADING(state, payload) {
        state.loading = payload
    },
}

export const actions = {
    async GET_DATES_PATHOLOGY({ commit, state }, options) {
        const { data } = await this.$axios.$get('/pathology_patient', { params: options })
        commit('SET_LOADING', false)
        commit('SET_DATES_PATHOLOGY', data)
    },
    async GET_PATHOLOGY_BY_PATIENT({ commit, state }, id, options = {}) {
        const { data } = await this.$axios.$get(`/pathology_patient/${id}`, { params: options })
        return data
    },
    async CHANGE_LOADING({ commit, state }, loading) {
        commit('SET_LOADING', loading)
    },
}

export const getters = {
    getDates: (state) => {
        return _.orderBy(state.dates, ['date'], ['desc'])
    },
    getLoading: (state) => {
        return state.loading
    },
}