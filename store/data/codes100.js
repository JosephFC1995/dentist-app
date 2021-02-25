import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const state = () => ({
    codes100: [],
    loading: false,
})

export const mutations = {
    SET_CODES(state, payload) {
        state.codes100 = payload
    },
    SET_LOADING(state, payload) {
        state.loading = payload
    },
}

export const actions = {
    async GET_DISEASES({ commit, state }, options) {
        const { data } = await this.$axios.$get('/codes_100', { params: options })
        commit('SET_LOADING', false)
        commit('SET_CODES', data)
    },
    async CHANGE_LOADING({ commit, state }, loading) {
        commit('SET_LOADING', loading)
    },
}

export const getters = {
    getCode100: (state) => {
        return _.orderBy(state.codes100, ['id'], ['asc'])
    },
    getLoading: (state) => {
        return state.loading
    },
}