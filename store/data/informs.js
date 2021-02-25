import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const state = () => ({
    informs: [],
    informPatient: [],
    loading: false,
})

export const mutations = {
    SET_INFORMS(state, payload) {
        state.informs = payload
    },
    SET_INFORMS_BY_PATIENT(state, payload) {
        state.informPatient = payload
    },
    SET_LOADING(state, payload) {
        state.loading = payload
    },
}

export const actions = {
    async GET_INFORMS({ commit, state }, options) {
        const { data } = await this.$axios.$get('/informs', { params: options })
        commit('SET_LOADING', false)
        commit('SET_INFORMS', data)
    },
    async GET_INFORMS_BY_PATIENT({ commit, state }, options) {
        const { data } = await this.$axios.$get(`/informs`, { params: options })
        commit('SET_LOADING', false)
        commit('SET_INFORMS_BY_PATIENT', data)
            // return data
    },
    async DELETE_INFORMS_BY_ID({ commit, state }, id) {
        return await this.$axios.$delete(`/informs/${id}`)
    },
    async CHANGE_LOADING({ commit, state }, loading) {
        commit('SET_LOADING', loading)
    },
}

export const getters = {
    getInforms: (state) => {
        return _.orderBy(state.informs, ['id'], ['asc'])
    },

    getInformsPatient: (state) => {
        return _.orderBy(state.informPatient, ['id'], ['desc'])
    },
    getLoading: (state) => {
        return state.loading
    },
}