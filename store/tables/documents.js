import Vue from 'vue'
import Vuex from 'vuex'
import _ from 'lodash'

Vue.use(Vuex)

export const state = () => ({
    documents: [],
    loading: false,
})

export const mutations = {
    SET_DOCUMENTS(state, payload) {
        state.documents = payload
    },
    SET_LOADING(state, payload) {
        state.loading = payload
    },
}

export const actions = {
    async GET_DOCUMENTS_TABLE({ commit, state }, options) {
        const { data } = await this.$axios.$get('/documents', { params: options })
        commit('SET_LOADING', false)
        commit('SET_DOCUMENTS', data)
    },
    async GET_DOCUMENT_SELECT({ commit, state }, id) {
        const { data } = await this.$axios.$get(`/documents/${id}`)
            // commit('SET_USER', data)
        return data
    },
    async DELETE_DOCUMENT_SELECTED({ commit, state }, id) {
        return await this.$axios.$delete(`/documents/${id}`)
            // commit('SET_USER', data)
    },
    async CHANGE_LOADING({ commit, state }, loading) {
        commit('SET_LOADING', loading)
    },
}

export const getters = {
    getDocuments: (state) => {
        return _.orderBy(state.documents, ['id'], ['asc'])
    },
    getLoading: (state) => {
        return state.loading
    },
}