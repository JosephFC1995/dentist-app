import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const state = () => ({
    dents: [],
    loading: false,
})

export const mutations = {
    SET_DENTS(state, payload) {
        state.dents = payload
    },
    SET_LOADING(state, payload) {
        state.loading = payload
    },
}

export const actions = {
    async GET_DENTS({ commit, state }, options) {
        const { data } = await this.$axios.$get('/dents', { params: options })
        commit('SET_LOADING', false)
        commit('SET_DENTS', data)
    },
    async CHANGE_LOADING({ commit, state }, loading) {
        commit('SET_LOADING', loading)
    },
}

export const getters = {
    getDents: (state) => {
        return _.orderBy(state.dents, ['name'], ['asc'])
    },
    getLoading: (state) => {
        return state.loading
    },
}