import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const state = () => ({
    company: {},
    loading: false,
})

export const mutations = {
    SET_DATA_COMPANY(state, payload) {
        state.company = payload
    },
    SET_LOADING(state, payload) {
        state.loading = payload
    },
}

export const actions = {
    async GET_DATA_COMPANY({ commit, state }) {
        commit('SET_LOADING', true)
        const { data } = await this.$axios.$get('company')
        commit('SET_LOADING', false)
        commit('SET_DATA_COMPANY', data)
    },
    async CHANGE_LOADING({ commit, state }, loading) {
        commit('SET_LOADING', loading)
    },
}

export const getters = {
    getCompany: (state) => {
        return state.company
    },
    getLoading: (state) => {
        return state.loading
    },
}