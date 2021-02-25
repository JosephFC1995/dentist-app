import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const state = () => ({
    documents: [],
    documentsPatient: [],
    loading: false,
})

export const mutations = {
    SET_DOCUMENTS(state, payload) {
        state.documents = payload
    },
    SET_DOCUMENTS_BY_PATIENT(state, payload) {
        state.documentsPatient = payload
    },
    SET_LOADING(state, payload) {
        state.loading = payload
    },
}

export const actions = {
    async GET_DOCUMENTS({ commit, state }, options) {
        const { data } = await this.$axios.$get('/document_patient', { params: options })
        commit('SET_LOADING', false)
        commit('SET_DOCUMENTS', data)
    },
    async GET_DOCUMENTS_BY_PATIENT({ commit, state }, options) {
        const { data } = await this.$axios.$get(`/document_patient`, { params: options })
        commit('SET_LOADING', false)
        commit('SET_DOCUMENTS_BY_PATIENT', data)
            // return data
    },
    async DELETE_DOCUMENTS_BY_ID({ commit, state }, id) {
        return await this.$axios.$delete(`/document_patient/${id}`)
    },
    async CHANGE_LOADING({ commit, state }, loading) {
        commit('SET_LOADING', loading)
    },
}

export const getters = {
    getDocuments: (state) => {
        return _.orderBy(state.documents, ['id'], ['asc'])
    },

    getDocumentsPatient: (state) => {
        return _.orderBy(state.documentsPatient, ['id'], ['desc'])
    },
    getLoading: (state) => {
        return state.loading
    },
}