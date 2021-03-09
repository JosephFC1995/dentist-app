import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const state = () => ({
    dates: [],
    endodonticSelect: {},
    endodonticMedicalRecordSelect: {},
    endodonticMedicalExamSelect: {},
    loading: false,
})

export const mutations = {
    SET_DATES_ENDODONTICS(state, payload) {
        state.dates = payload
    },
    SET_ENDODONTIC_SELECT(state, payload) {
        state.endodonticSelect = payload
    },
    SET_ENDODONTIC_MEDICAL_RECORD_SELECT(state, payload) {
        state.endodonticMedicalRecordSelect = payload
    },
    SET_LOADING(state, payload) {
        state.loading = payload
    },
}

export const actions = {
    async GET_DATES_ENDODONTICS({ commit, state }, options) {
        const { data } = await this.$axios.$get('/endodontic_patient', { params: options })
        commit('SET_LOADING', false)
        commit('SET_DATES_ENDODONTICS', data)
    },
    async GET_ENDODONTICS_BY_PATIENT({ commit, state }, id, options = {}) {
        const { data } = await this.$axios.$get(`/endodontic_patient/${id}`, { params: options })
        commit('SET_LOADING', false)
        commit('SET_ENDODONTIC_SELECT', data)
        const { endodontic_medical_record } = data
        commit('SET_ENDODONTIC_MEDICAL_RECORD_SELECT', endodontic_medical_record)

        //return data
    },
    async CHANGE_LOADING({ commit, state }, loading) {
        commit('SET_LOADING', loading)
    },
}

export const getters = {
    getDates: (state) => {
        return _.orderBy(state.dates, ['date'], ['desc'])
    },
    getEndodonticSelect: (state) => {
        return state.endodonticSelect
    },
    getEndodonticMedicalRecordSelect: (state) => {
        return state.endodonticMedicalRecordSelect
    },
    getLoading: (state) => {
        return state.loading
    },
}