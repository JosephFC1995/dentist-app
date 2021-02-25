import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const state = () => ({
    others: [],
    otherSelected: {},
    loading: false,
})

export const mutations = {
    SET_OTHER(state, payload) {
        state.others = payload
    },
    SET_LOADING(state, payload) {
        state.loading = payload
    },
}

export const actions = {
    async GET_ANAMNESIS_DISEASE({ commit, state }, options) {
        const { data } = await this.$axios.$get('/others', { params: options })
        commit('SET_LOADING', false)
        commit('SET_OTHER', data)
    },
    async GET_ANAMNESIS_DISEASE_BY_PATIENT({ commit, state }, options) {
        const { data } = await this.$axios.$get(`/others`, { params: options })
        return data
    },
    async CHANGE_LOADING({ commit, state }, loading) {
        commit('SET_LOADING', loading)
    },
}

export const getters = {
    getOthers: (state) => {
        return _.orderBy(state.others, ['id'], ['asc'])
    },
    getLoading: (state) => {
        return state.loading
    },
}