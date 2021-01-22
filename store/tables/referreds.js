import Vue from 'vue'
import Vuex from 'vuex'
import _ from 'lodash'

Vue.use(Vuex)

export const state = () => ({
    referreds: [],
    loading: false,
})

export const mutations = {
    SET_REFERREDS(state, payload) {
        state.referreds = payload
    },
    SET_LOADING(state, payload) {
        state.loading = payload
    },
}

export const actions = {
    async GET_REFERREDS_TABLE({ commit, state }, options) {
        const { data } = await this.$axios.$get('/referreds', { params: options })
        commit('SET_LOADING', false)
        commit('SET_REFERREDS', data)
    },
    async GET_REFERRED_SELECT({ commit, state }, id) {
        const { data } = await this.$axios.$get(`/referreds/${id}`)
            // commit('SET_USER', data)
        return data
    },
    async DELETE_REFERRED_SELECTED({ commit, state }, id) {
        return await this.$axios.$delete(`/referreds/${id}`)
            // commit('SET_USER', data)
    },
    async CHANGE_LOADING({ commit, state }, loading) {
        commit('SET_LOADING', loading)
    },
}

export const getters = {
    getReferreds: (state) => {
        return _.orderBy(state.referreds, ['id'], ['asc'])
    },
    getLoading: (state) => {
        return state.loading
    },
}