import Vue from 'vue'
import Vuex from 'vuex'
import _ from 'lodash'

Vue.use(Vuex)

export const state = () => ({
    supplies: [],
    loading: false,
})

export const mutations = {
    SET_SUPPLIES(state, payload) {
        state.supplies = payload
    },
    SET_LOADING(state, payload) {
        state.loading = payload
    },
}

export const actions = {
    async GET_SUPPLIES_TABLE({ commit, state }, options) {
        const { data } = await this.$axios.$get('/supplies', { params: options })
        commit('SET_LOADING', false)
        commit('SET_SUPPLIES', data)
    },
    async GET_SUPPLY_SELECT({ commit, state }, id) {
        const { data } = await this.$axios.$get(`/supplies/${id}`)
            // commit('SET_USER', data)
        return data
    },
    async DELETE_SUPPLY_SELECTED({ commit, state }, id) {
        return await this.$axios.$delete(`/supplies/${id}`)
            // commit('SET_USER', data)
    },
    async CHANGE_LOADING({ commit, state }, loading) {
        commit('SET_LOADING', loading)
    },
}

export const getters = {
    getSupplies: (state) => {
        return _.orderBy(state.supplies, ['id'], ['asc'])
    },
    getLoading: (state) => {
        return state.loading
    },
}