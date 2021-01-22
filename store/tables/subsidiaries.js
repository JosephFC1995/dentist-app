import Vue from 'vue'
import Vuex from 'vuex'
import _ from 'lodash'

Vue.use(Vuex)

export const state = () => ({
    subsidiaries: [],
    loading: false,
})

export const mutations = {
    SET_SUBSIDIARIES(state, payload) {
        state.subsidiaries = payload
    },
    SET_LOADING(state, payload) {
        state.loading = payload
    },
}

export const actions = {
    async GET_SUBSIDIARIES_TABLE({ commit, state }, options) {
        const { data } = await this.$axios.$get('/subsidiaries', { params: options })
        commit('SET_LOADING', false)
        commit('SET_SUBSIDIARIES', data)
    },
    async GET_SUBSIDIARY_SELECT({ commit, state }, id) {
        const { data } = await this.$axios.$get(`/subsidiaries/${id}`)
            // commit('SET_USER', data)
        return data
    },
    async DELETE_SUBSIDIARY_SELECTED({ commit, state }, id) {
        return await this.$axios.$delete(`/subsidiaries/${id}`)
            // commit('SET_USER', data)
    },
    async CHANGE_LOADING({ commit, state }, loading) {
        commit('SET_LOADING', loading)
    },
}

export const getters = {
    getSubsidiaries: (state) => {
        return _.orderBy(state.subsidiaries, ['id'], ['asc'])
    },
    getLoading: (state) => {
        return state.loading
    },
}