import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const state = () => ({
    otherDiseases: [],
    loading: false,
})

export const mutations = {
    SET_OTHER_DISEASES(state, payload) {
        state.otherDiseases = payload
    },
    SET_LOADING(state, payload) {
        state.loading = payload
    },
}

export const actions = {
    async GET_OTHER_DISEASES({ commit, state }, options) {
        const { data } = await this.$axios.$get('/other_diseases', { params: options })
        commit('SET_LOADING', false)
        commit('SET_OTHER_DISEASES', data)
    },
    async CHANGE_LOADING({ commit, state }, loading) {
        commit('SET_LOADING', loading)
    },
}

export const getters = {
    getOtherDiseases: (state) => {
        return _.orderBy(state.otherDiseases, ['id'], ['asc'])
    },
    getLoading: (state) => {
        return state.loading
    },
}