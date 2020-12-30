import Vue from 'vue'
import Vuex from 'vuex'
import _ from 'lodash'

Vue.use(Vuex)

export const state = () => ({
    patients: [],
    patient: null,
})

export const mutations = {
    SET_PATIENTS(state, patients) {
        state.patients = patients
    },
    SET_PATIENT_INIT(state, payload) {
        state.patient = payload
    },
    SET_PATIENT(state, payload) {
        _.assign(state.patient, payload)
        state.patient = _.cloneDeep(payload)
    },
}

export const actions = {
    async GET_PATIENTS_TABLE({ commit, state }) {
        const { data } = await this.$axios.$get('/pacients')
        commit('SET_PATIENTS', data)
    },
    async GET_PATIENTS_SELECTED({ commit, state }, patientID) {
        const { data } = await this.$axios.$get(`/pacients/${patientID}`)
        commit('SET_PATIENT_INIT', data)
    },
    async DELETE_PATIENTS_SELECTED({ commit, state }, patientID) {
        return await this.$axios.$delete(`/pacients/${patientID}`)
            // commit('SET_USER', data)
    },
}

export const getters = {
    getPatients: (state) => {
        return _.orderBy(state.patients, ['last_name_father'], ['asc'])
    },
    getPatient: (state) => {
        return state.patient
    },
}