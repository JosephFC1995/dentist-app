import Vue from 'vue'
import Vuex from 'vuex'
import _ from 'lodash'

Vue.use(Vuex)

export const state = () => ({
    medical_records: [],
    loading: false,
})

export const mutations = {
    SET_MEDICAL_RECORDS(state, payload) {
        state.medical_records = payload
    },
    SET_LOADING(state, payload) {
        state.loading = payload
    },
}

export const actions = {
    async GET_MEDICAL_RECORDS_TABLE({ commit, state }, options) {
        const { data } = await this.$axios.$get('/medical_records', { params: options })
        commit('SET_LOADING', false)
        commit('SET_MEDICAL_RECORDS', data)
    },
    async GET_MEDICAL_RECORDS_BY_ID({ commit, state }, id) {
        const { data } = await this.$axios.$get(`/medical_records/${id}`)
        return data
    },
    async DELETE_MEDICAL_RECORDS_SELECTED({ commit, state }, id) {
        return await this.$axios.$delete(`/medical_records/${id}`)
    },
    async CHANGE_LOADING({ commit, state }, loading) {
        commit('SET_LOADING', loading)
    },
}

export const getters = {
    getMedicalRecords: (state) => {
        return _.orderBy(state.medical_records, ['date'], ['desc'])
    },
    getLoading: (state) => {
        return state.loading
    },
}