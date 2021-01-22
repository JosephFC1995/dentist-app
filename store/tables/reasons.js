import Vue from 'vue'
import Vuex from 'vuex'
import _ from 'lodash'

Vue.use(Vuex)

export const state = () => ({
    reasons: [],
    loading: false,
})

export const mutations = {
    SET_REASONS(state, payload) {
        state.reasons = payload
    },
    SET_LOADING(state, payload) {
        state.loading = payload
    },
}

export const actions = {
    async GET_REASONS_TABLE({ commit, state }, options) {
        const { data } = await this.$axios.$get('/reasons', { params: options })
        commit('SET_LOADING', false)
        commit('SET_REASONS', data)
    },
    async GET_REASON_SELECT({ commit, state }, id) {
        const { data } = await this.$axios.$get(`/reasons/${id}`)
            // commit('SET_USER', data)
        return data
    },
    async DELETE_REASON_SELECTED({ commit, state }, id) {
        return await this.$axios.$delete(`/reasons/${id}`)
            // commit('SET_USER', data)
    },
    async CHANGE_LOADING({ commit, state }, loading) {
        commit('SET_LOADING', loading)
    },
}

export const getters = {
    getReasons: (state) => {
        return _.orderBy(state.reasons, ['id'], ['asc'])
    },
    getLoading: (state) => {
        return state.loading
    },
}