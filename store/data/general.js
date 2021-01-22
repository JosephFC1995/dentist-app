import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const state = () => ({
    roles: [],
    typeDocuments: [],
    subsidiaries: [],
    specialitys: [],
    genders: [],
    civilStatus: [],
    ocupations: [],
    insurances: [],
    referreds: [],
    nacionalities: [],
    languajes: [],
    reasons: [],
    supplies: [],
})

export const mutations = {
    SET_ROLES(state, roles) {
        state.roles = roles
    },
    SET_TYPE_DOCUMENT(state, document) {
        state.typeDocuments = document
    },
    SET_SUBSIDIARIES(state, subsidiaries) {
        state.subsidiaries = subsidiaries
    },
    SET_ESPECIALITIES(state, specialitys) {
        state.specialitys = specialitys
    },
    SET_GENDER(state, genders) {
        state.genders = genders
    },
    SET_CIVIL_STATUS(state, civilStatus) {
        state.civilStatus = civilStatus
    },
    SET_OCUPATIONS(state, ocupations) {
        state.ocupations = ocupations
    },
    SET_INSURANCES(state, insurances) {
        state.insurances = insurances
    },
    SET_REFERREDS(state, referreds) {
        state.referreds = referreds
    },
    SET_NACIONALITIES(state, nacionalities) {
        state.nacionalities = nacionalities
    },
    SET_LANGUAJES(state, languajes) {
        state.languajes = languajes
    },
    SET_REASONS(state, reasons) {
        state.reasons = reasons
    },
    SET_SUPPLIES(state, supplies) {
        state.supplies = supplies
    },
}

export const actions = {
    async GET_ROLES({ commit, state }) {
        const { data } = await this.$axios.$get('/roles')
        commit('SET_ROLES', data)
    },
    async GET_TYPE_DOCUMENTS({ commit, state }) {
        const { data } = await this.$axios.$get('/type_document')
        commit('SET_TYPE_DOCUMENT', data)
    },
    async GET_SUBSIDIARIES({ commit, state }) {
        const { data } = await this.$axios.$get('/subsidiaries')
        commit('SET_SUBSIDIARIES', data)
    },
    async GET_ESPECIALITIES({ commit, state }) {
        const { data } = await this.$axios.$get('/specialitys')
        commit('SET_ESPECIALITIES', data)
    },
    async GET_GENDERS({ commit, state }) {
        const { data } = await this.$axios.$get('/genders')
        commit('SET_GENDER', data)
    },
    async GET_CIVIL_STATUS({ commit, state }) {
        const { data } = await this.$axios.$get('/civil_status')
        commit('SET_CIVIL_STATUS', data)
    },
    async GET_OCUPATIONS({ commit, state }) {
        const { data } = await this.$axios.$get('/ocupations')
        commit('SET_OCUPATIONS', data)
    },
    async GET_INSURANCES({ commit, state }) {
        const { data } = await this.$axios.$get('/clinical_insurances')
        commit('SET_INSURANCES', data)
    },
    async GET_REFERREDS({ commit, state }) {
        const { data } = await this.$axios.$get('/referreds')
        commit('SET_REFERREDS', data)
    },
    async GET_NACIONALITIES({ commit, state }) {
        const { data } = await this.$axios.$get('/nacionalities')
        commit('SET_NACIONALITIES', data)
    },
    async GET_LANGUAJES({ commit, state }) {
        const { data } = await this.$axios.$get('/languajes')
        commit('SET_LANGUAJES', data)
    },
    async GET_REASONS({ commit, state }) {
        const { data } = await this.$axios.$get('/reasons')
        commit('SET_REASONS', data)
    },
    async GET_SUPPLIES({ commit, state }) {
        const { data } = await this.$axios.$get('/supplies')
        commit('SET_SUPPLIES', data)
    },
}

export const getters = {
    getTypeDocuments: (state) => {
        return _.orderBy(state.typeDocuments, ['name'], ['asc'])
    },
    getGenders: (state) => {
        return _.orderBy(state.genders, ['name'], ['asc'])
    },
    getInsurances: (state) => {
        return _.orderBy(state.insurances, ['name'], ['asc'])
    },
    getSubsidiaries: (state) => {
        return _.orderBy(state.subsidiaries, ['name'], ['asc'])
    },
    getReasons: (state) => {
        return _.orderBy(state.reasons, ['name'], ['asc'])
    },
    getReferreds: (state) => {
        return _.orderBy(state.referreds, ['name'], ['asc'])
    },
    getSupplies: (state) => {
        return _.orderBy(state.supplies, ['name'], ['asc'])
    },
}