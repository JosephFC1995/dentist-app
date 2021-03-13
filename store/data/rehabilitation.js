import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const state = () => ({
    dates: [],
    idRehabilitation: null,
    hasSelectedDate: false,
    rehabilitationSelect: {},
    rehabilitationRehabilitationTab1Select: {},
    rehabilitationRehabilitationTab2Select: {},
    rehabilitationRehabilitationTab3Select: {},
    rehabilitationRehabilitationTableEspige: [],
    rehabilitationRehabilitationTableFixed: [],
    loading: false,
})

export const mutations = {
    SET_DATES_REHABILITATIONS(state, payload) {
        state.dates = payload
    },
    SET_REHABILITATION_SELECT(state, payload) {
        state.rehabilitationSelect = payload
    },
    SET_REHABILITATION_TAB_1_SELECT(state, payload) {
        state.rehabilitationRehabilitationTab1Select = payload
    },
    SET_REHABILITATION_TAB_2_SELECT(state, payload) {
        state.rehabilitationRehabilitationTab2Select = payload
    },
    SET_REHABILITATION_TAB_3_SELECT(state, payload) {
        state.rehabilitationRehabilitationTab3Select = payload
    },
    SET_REHABILITATION_TABLE_ESPIGE_SELECT(state, payload) {
        state.rehabilitationRehabilitationTableEspige = payload
    },
    SET_REHABILITATION_TABLE_FIXED_SELECT(state, payload) {
        state.rehabilitationRehabilitationTableFixed = payload
    },
    SET_LOADING(state, payload) {
        state.loading = payload
    },
    SET_SELECTED(state, payload) {
        state.hasSelectedDate = payload
    },
    SET_ID_REHABILITATION(state, payload) {
        state.idRehabilitation = payload
    },
    SET_CLEAR(state) {
        state.rehabilitationRehabilitationTab1Select = {}
        state.rehabilitationRehabilitationTab2Select = {}
        state.rehabilitationRehabilitationTab3Select = {}
        state.rehabilitationRehabilitationTableEspige = []
        state.rehabilitationRehabilitationTableFixed = []
        state.rehabilitationSelect = {}
        state.hasSelectedDate = false
    },
}

export const actions = {
    async GET_DATES_REHABILITATIONS({ commit, state }, options) {
        const { data } = await this.$axios.$get('/rehabilitation_patient', { params: options })
        commit('SET_LOADING', false)
        commit('SET_DATES_REHABILITATIONS', data)
    },
    async GET_REHABILITATIONS_BY_PATIENT({ commit, state }, id, options = {}) {
        const { data } = await this.$axios.$get(`/rehabilitation_patient/${id}`, { params: options })
        commit('SET_LOADING', false)
        commit('SET_REHABILITATION_SELECT', data)
        const {
            rehabilitation_tab_1,
            rehabilitation_tab_2,
            rehabilitation_tab_3,
            rehabilitation_table_espige,
            rehabilitation_table_fixed,
        } = data
        commit('SET_REHABILITATION_TAB_1_SELECT', rehabilitation_tab_1)
        commit('SET_REHABILITATION_TAB_2_SELECT', rehabilitation_tab_2)
        commit('SET_REHABILITATION_TAB_3_SELECT', rehabilitation_tab_3)
        commit('SET_REHABILITATION_TABLE_ESPIGE_SELECT', rehabilitation_table_espige)
        commit('SET_REHABILITATION_TABLE_FIXED_SELECT', rehabilitation_table_fixed)

        //return data
    },
    SET_ID_SELECT_REHABILITATION({ commit, state }, id) {
        commit('SET_ID_REHABILITATION', id)
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
    getRehabilitationSelect: (state) => {
        return state.rehabilitationSelect
    },
    getRehabilitationRehabilitationTab1Select: (state) => {
        return state.rehabilitationRehabilitationTab1Select
    },
    getRehabilitationRehabilitationTab2Select: (state) => {
        return state.rehabilitationRehabilitationTab2Select
    },
    getRehabilitationRehabilitationTab3Select: (state) => {
        return state.rehabilitationRehabilitationTab3Select
    },
    getRehabilitationRehabilitationTableEspige: (state) => {
        return state.rehabilitationRehabilitationTableEspige
    },
    getRehabilitationRehabilitationTableFixed: (state) => {
        return state.rehabilitationRehabilitationTableFixed
    },
    getIDSelectRehabilitation: (state) => {
        return state.idRehabilitation
    },
    getLoading: (state) => {
        return state.loading
    },
}