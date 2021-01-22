import Vue from 'vue'
import Vuex from 'vuex'
import _ from 'lodash'

Vue.use(Vuex)

export const state = () => ({
    expenses: [],
    loading: false,
})

export const mutations = {
    SET_EXPENSES(state, payload) {
        state.expenses = payload
    },
    SET_LOADING(state, payload) {
        state.loading = payload
    },
}

export const actions = {
    async GET_EXPENSES_TABLE({ commit, state }, options) {
        const { data } = await this.$axios.$get('/expenses', { params: options })
        commit('SET_LOADING', false)
        commit('SET_EXPENSES', data)
    },
    async GET_EXPENSE_SELECT({ commit, state }, id) {
        const { data } = await this.$axios.$get(`/expenses/${id}`)
        return data
    },
    async DELETE_EXPENSE_SELECTED({ commit, state }, id) {
        return await this.$axios.$delete(`/expenses/${id}`)
    },
    async CHANGE_LOADING({ commit, state }, loading) {
        commit('SET_LOADING', loading)
    },
}

export const getters = {
    getExpenses: (state) => {
        return _.orderBy(state.expenses, ['date'], ['desc'])
    },
    getLoading: (state) => {
        return state.loading
    },
}