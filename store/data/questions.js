import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const state = () => ({
    questions: [],
    loading: false,
})

export const mutations = {
    SET_QUESTIONS(state, payload) {
        state.questions = payload
    },
    SET_LOADING(state, payload) {
        state.loading = payload
    },
}

export const actions = {
    async GET_QUESTIONS({ commit, state }, options) {
        const { data } = await this.$axios.$get('/question_records', { params: options })
        commit('SET_LOADING', false)
        commit('SET_QUESTIONS', data)
    },
    async CHANGE_LOADING({ commit, state }, loading) {
        commit('SET_LOADING', loading)
    },
}

export const getters = {
    getQuestions: (state) => {
        return _.orderBy(state.questions, ['id'], ['asc'])
    },
    getLoading: (state) => {
        return state.loading
    },
}