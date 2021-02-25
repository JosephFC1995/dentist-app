import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const state = () => ({
    diagnosis: [],
    diagnosisSelected: {},
    loading: false,
})

export const mutations = {
    SET_DIAGNOSIS(state, payload) {
        state.diagnosis = payload
    },
    SET_LOADING(state, payload) {
        state.loading = payload
    },
}

export const actions = {
    async GET_ANAMNESIS_DIAGNOSIS({ commit, state }, options) {
        const { data } = await this.$axios.$get('/diagnosis', { params: options })
        commit('SET_LOADING', false)
        commit('SET_DIAGNOSIS', data)
    },
    async GET_ANAMNESIS_DIAGNOSIS_BY_PATIENT({ commit, state }, options) {
        const { data } = await this.$axios.$get(`/diagnosis`, { params: options })
        return data
    },
    async CHANGE_LOADING({ commit, state }, loading) {
        commit('SET_LOADING', loading)
    },
}

export const getters = {
    getDiagnosis: (state) => {
        return _.orderBy(state.diagnosis, ['id'], ['asc'])
    },
    getLoading: (state) => {
        return state.loading
    },
}