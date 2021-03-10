import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const state = () => ({
    dates: [],
    hasSelectedDate: false,
    endodonticSelect: {},
    endodonticMedicalRecordSelect: {},
    endodonticMedicalExamSelect: {},
    endodonticRadiographicExamSelect: {},
    endodonticOperativeAccidentSelect: {},
    endodonticForecastSelect: {},
    endodonticTreatmentSelect: {},
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
    SET_ENDODONTIC_MEDICAL_EXAM_SELECT(state, payload) {
        state.endodonticMedicalExamSelect = payload
    },
    SET_ENDODONTIC_RADIOGRAPHIC_EXAM_SELECT(state, payload) {
        state.endodonticRadiographicExamSelect = payload
    },
    SET_ENDODONTIC_OPERATIVE_ACCIDENT_SELECT(state, payload) {
        state.endodonticOperativeAccidentSelect = payload
    },
    SET_ENDODONTIC_FORECAST_SELECT(state, payload) {
        state.endodonticForecastSelect = payload
    },
    SET_ENDODONTIC_TREATMENT_SELECT(state, payload) {
        state.endodonticTreatmentSelect = payload
    },
    SET_LOADING(state, payload) {
        state.loading = payload
    },
    SET_SELECTED(state, payload) {
        state.hasSelectedDate = payload
    },
    SET_CLEAR(state) {
        state.endodonticMedicalRecordSelect = {}
        state.endodonticMedicalExamSelect = {}
        state.endodonticRadiographicExamSelect = {}
        state.endodonticOperativeAccidentSelect = {}
        state.endodonticForecastSelect = {}
        state.endodonticTreatmentSelect = {}
        state.endodonticSelect = {}
        state.hasSelectedDate = false
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
        const {
            endodontic_medical_record,
            endodontic_clinical_exams,
            endodontics_radiographic_exam,
            endodontics_operative_accidents,
            endodontics_forecast,
            endodontics_treatments,
        } = data
        commit('SET_ENDODONTIC_MEDICAL_RECORD_SELECT', endodontic_medical_record)
        commit('SET_ENDODONTIC_MEDICAL_EXAM_SELECT', endodontic_clinical_exams)
        commit('SET_ENDODONTIC_RADIOGRAPHIC_EXAM_SELECT', endodontics_radiographic_exam)
        commit('SET_ENDODONTIC_OPERATIVE_ACCIDENT_SELECT', endodontics_operative_accidents)
        commit('SET_ENDODONTIC_FORECAST_SELECT', endodontics_forecast)
        commit('SET_ENDODONTIC_TREATMENT_SELECT', endodontics_treatments)

        //return data
    },
    CHANGE_SELECTED_DATE({ commit, state }, payload) {
        commit('SET_SELECTED', payload)
    },
    async CHANGE_LOADING({ commit, state }, loading) {
        commit('SET_LOADING', loading)
    },
    async CLEAR_ALL({ commit, state }) {
        commit('SET_CLEAR')
    },
}

export const getters = {
    getDates: (state) => {
        return _.orderBy(state.dates, ['date'], ['desc'])
    },
    getSeletedDate: (state) => {
        return state.hasSelectedDate
    },
    getEndodonticSelect: (state) => {
        return state.endodonticSelect
    },
    getEndodonticMedicalRecordSelect: (state) => {
        return state.endodonticMedicalRecordSelect
    },
    getEndodonticMedicalExamSelect: (state) => {
        return state.endodonticMedicalExamSelect
    },
    getEndodonticRadiographicExamSelect: (state) => {
        return state.endodonticRadiographicExamSelect
    },
    getEndodonticOperativeAccidentSelect: (state) => {
        return state.endodonticOperativeAccidentSelect
    },
    getEndodonticForecastSelect: (state) => {
        return state.endodonticForecastSelect
    },
    getEndodonticTreatmentSelect: (state) => {
        return state.endodonticTreatmentSelect
    },
    getLoading: (state) => {
        return state.loading
    },
}