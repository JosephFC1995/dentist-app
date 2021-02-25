import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const state = () => ({
    diseases: [],
    loading: false,
})

export const mutations = {
    SET_DISEASES(state, payload) {
        state.diseases = payload
    },
    SET_LOADING(state, payload) {
        state.loading = payload
    },
}

export const actions = {
    async GET_DISEASES({ commit, state }, options) {
        const { data } = await this.$axios.$get('/diseases', { params: options })
        commit('SET_LOADING', false)
        commit('SET_DISEASES', data)
    },
    async CHANGE_LOADING({ commit, state }, loading) {
        commit('SET_LOADING', loading)
    },
}

export const getters = {
    getDiseases: (state) => {
        return _.orderBy(state.diseases, ['id'], ['asc'])
    },
    getLoading: (state) => {
        return state.loading
    },
}