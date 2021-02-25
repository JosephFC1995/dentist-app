import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const state = () => ({
    anamnesisDisease: [],
    anamnesisDiseaseSelected: {},
    loading: false,
})

export const mutations = {
    SET_ANAMNESIS_DISEASE(state, payload) {
        state.anamnesisDisease = payload
    },
    SET_LOADING(state, payload) {
        state.loading = payload
    },
}

export const actions = {
    async GET_ANAMNESIS_DISEASE({ commit, state }, options) {
        const { data } = await this.$axios.$get('/anamnesis_diseases', { params: options })
        commit('SET_LOADING', false)
        commit('SET_DISEASES', data)
    },
    async GET_ANAMNESIS_DISEASE_BY_PATIENT({ commit, state }, options) {
        const { data } = await this.$axios.$get(`/anamnesis_diseases`, { params: options })
        return data
    },
    async CHANGE_LOADING({ commit, state }, loading) {
        commit('SET_LOADING', loading)
    },
}

export const getters = {
    getAnamnesisDiseases: (state) => {
        return _.orderBy(state.anamnesisDisease, ['id'], ['asc'])
    },
    getLoading: (state) => {
        return state.loading
    },
}