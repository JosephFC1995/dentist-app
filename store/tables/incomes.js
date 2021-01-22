import Vue from 'vue'
import Vuex from 'vuex'
import _ from 'lodash'

Vue.use(Vuex)

export const state = () => ({
    insumes: [],
    loading: false,
})

export const mutations = {
    SET_INCOMES(state, payload) {
        state.insumes = payload
    },
    SET_LOADING(state, payload) {
        state.loading = payload
    },
}

export const actions = {
    async GET_INCOMES_TABLE({ commit, state }, options) {
        const { data } = await this.$axios.$get('/incomes', { params: options })
        commit('SET_LOADING', false)
        commit('SET_INCOMES', data)
    },
    async GET_INCOME_SELECT({ commit, state }, id) {
        const { data } = await this.$axios.$get(`/incomes/${id}`)
            // commit('SET_USER', data)
        return data
    },
    async DELETE_INCOME_SELECTED({ commit, state }, id) {
        return await this.$axios.$delete(`/incomes/${id}`)
            // commit('SET_USER', data)
    },
    async CHANGE_LOADING({ commit, state }, loading) {
        commit('SET_LOADING', loading)
    },
}

export const getters = {
    getIncomes: (state) => {
        return _.orderBy(state.insumes, ['date'], ['desc'])
    },
    getLoading: (state) => {
        return state.loading
    },
}