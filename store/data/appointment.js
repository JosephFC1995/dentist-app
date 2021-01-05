import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const state = () => ({
    appointmentStatus: [],
    appointments: [],
    loading: false,
})

export const mutations = {
    SET_APPOINTMENT_STATUS(state, payload) {
        state.appointmentStatus = payload
    },
    SET_APPOINTMENTS(state, payload) {
        state.appointments = payload
    },
    SET_LOADING(state, payload) {
        state.loading = payload
    },
}

export const actions = {
    async GET_APPOINTMENT_STATUS({ commit, state }) {
        const { data } = await this.$axios.$get('/appointment_status')
        commit('SET_APPOINTMENT_STATUS', data)
    },
    async GET_APPOINTMENTS({ commit, state }, options) {
        const { data } = await this.$axios.$get('/appointment', { params: options })
        commit('SET_LOADING', false)
        commit('SET_APPOINTMENTS', data)
    },
    async CHANGE_LOADING({ commit, state }, loading) {
        commit('SET_LOADING', loading)
    },
}

export const getters = {
    getAppointments: (state) => {
        return _.orderBy(state.appointments, ['id'], ['asc'])
    },
    getAppointmentStatus: (state) => {
        return _.orderBy(state.appointmentStatus, ['name'], ['asc'])
    },
    getLoading: (state) => {
        return state.loading
    },
}