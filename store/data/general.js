import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const state = () => ({
    roles: [],
    typeDocuments: [],
    subsidiarys: [],
    specialitys: [],
})

export const mutations = {
    SET_ROLES(state, roles) {
        state.roles = roles
    },
    SET_TYPE_DOCUMENT(state, document) {
        state.typeDocuments = document
    },
    SET_SUBSIDIARIES(state, subsidiarys) {
        state.subsidiarys = subsidiarys
    },
    SET_ESPECIALITIES(state, specialitys) {
        state.specialitys = specialitys
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
        const { data } = await this.$axios.$get('/subsidiarys')
        commit('SET_SUBSIDIARIES', data)
    },
    async GET_ESPECIALITIES({ commit, state }) {
        const { data } = await this.$axios.$get('/specialitys')
        commit('SET_ESPECIALITIES', data)
    },
}